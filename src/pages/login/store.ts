import { FormInstance, message } from 'antd'
import { makeAutoObservable } from 'mobx'
import Api from './api'
import { debounce } from 'lodash-es'
import { md5, setToken, setUserinfo } from '@/utils'
import globalStore from '@/layout/store'

const tryCatchWrapper = (callBack: () => any) => {
  try {
    callBack?.()
  } catch (e) {
    if (typeof e === 'string') return message.error(e)
    const errorFields = e.errorFields
    const errorMessage = errorFields?.[0]?.errors[0]
    if (errorMessage) {
      message.error(errorMessage)
    }
  }
}

class Store {
  /**
   * 表单实例
   */
  formInstance = null
  /**
   * 路由
   */
  router = null

  constructor(form: FormInstance, router: any) {
    makeAutoObservable(this)
    this.formInstance = form
    this.router = router
  }

  /**
   * 是否登录页面
   */
  isLoginPage = true
  /**
   * 切换登录注册页
   */
  changePage = (flag?: boolean) => {
    this.isLoginPage = flag ?? !this.isLoginPage
    this.isPolling = false
    this.uuid = null
    if (typeof this.qrCancel === 'function') {
      this.qrCancel()
    }
  }
  /**
   * 忘记密码弹窗开关
   */
  openForgetModal = false

  /**
   * 验证码倒计时
   */
  captchaCountdown = null

  /**
   * 二维码uuid
   */
  uuid = null
  /**
   * 是否开始轮询二维码状态
   */
  isPolling = false
  /**
   * 二维码状态
   */
  qrStatus: 'active' | 'expired' | 'loading' | 'scanned' = 'active'

  /**
   * 轮询定时器
   */
  qrTimer = null

  /**
   * 取消二维码轮训方法
   */
  qrCancel = (isCancel?: boolean) => {
    if (this.qrTimer) {
      clearInterval(this.qrTimer)
      this.qrTimer = null
    }
    this.uuid = null
    !isCancel && (this.isPolling = false)
  }

  // 发送注册验证码
  sendRegCaptcha = debounce(async () => {
    if (this.captchaCountdown) return
    try {
      const { email } = await this.formInstance.validateFields(['email'])
      this.captchaCountdown = Date.now() + 30 * 1000
      const msg = await Api.sendRegCaptcha({ email })
      message.success(msg)
    } catch (e) {
      message.destroy()
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields[0].errors[0]
      message.error(errorMessage)
    }
  }, 1000)

  // 注册
  register = async () => {
    try {
      const namePath = ['account', 'regPassword', 'email', 'captcha']
      const values = await this.formInstance.validateFields(namePath)
      values.password = md5(values.regPassword)
      this.formInstance.setFieldsValue({
        loginPassword: values.regPassword,
        loginAccount: values.account
      })
      delete values.regPassword
      const msg = await Api.register(values)
      this.formInstance.resetFields(namePath)
      message.success(msg)
      this.changePage(true)
    } catch (e) {
      message.destroy()
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields[0].errors[0]
      message.error(errorMessage)
    }
  }

  // 发送忘记密码验证码
  sendForgetCaptcha = debounce(async () => {
    if (this.captchaCountdown) return
    try {
      const { forgetEmail: email } = await this.formInstance.validateFields(['forgetEmail'])
      this.captchaCountdown = Date.now() + 30 * 1000
      const msg = await Api.sendForgetCaptcha({ email })
      message.success(msg)
    } catch (e) {
      message.destroy()
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields[0].errors[0]
      message.error(errorMessage)
    }
  }, 1000)

  // 提交忘记密码
  forgetPassword = async () => {
    try {
      const namePath = ['forgetEmail', 'forgetCaptcha', 'forgetPassword']
      const values = await this.formInstance.validateFields(namePath)
      const params: any = {}
      params.password = md5(values.forgetPassword)
      params.email = values.forgetEmail
      params.captcha = values.forgetCaptcha
      const msg = await Api.forgetPassword(params)
      this.formInstance.resetFields(namePath)
      message.success(msg)
      this.openForgetModal = false
    } catch (e) {
      message.destroy()
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields[0].errors[0]
      message.error(errorMessage)
    }
  }

  /**
   * 登录
   */
  login = async () => {
    try {
      const namePath = ['loginAccount', 'loginPassword']
      const values = await this.formInstance.validateFields(namePath)
      const params: any = {}
      params.password = md5(values.loginPassword)
      params.account = values.loginAccount
      const result = await Api.login(params)
      const { token, ...userInfo } = result || {}
      setToken(token)
      setUserinfo(userInfo)
      this.formInstance.resetFields(namePath)
      message.success('登录成功')
      globalStore.isLogin = true
      globalStore.currentUser = userInfo
      this.router('/')
    } catch (e) {
      message.destroy()
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields?.[0]?.errors[0]
      if (errorMessage) {
        message.error(errorMessage)
      }
    }
  }

  /**
   * 二维码轮训方法
   */
  polling = async () => {
    const res = await Api.qrcode({ uuid: this.uuid })
    const { type, uuid } = res || {}
    if (!this.uuid) {
      this.uuid = uuid
      this.qrStatus = 'active'
    }
    const map = {
      INIT: () => {},
      WAIT_SCAN: () => {},
      WAIT_CONFIRM: () => (this.qrStatus = 'scanned'),
      CONFIRMED: () => {
        const { token, ...userInfo } = res || {}
        setToken(token)
        setUserinfo(userInfo)
        this.qrCancel()
        globalStore.isLogin = true
        globalStore.currentUser = userInfo
        this.router('/')
        message.success('登录成功')
      },
      CANCEL: () => {
        message.info('取消登录')
        this.qrCancel()
      },
      EXPIRE: () => {
        this.qrStatus = 'expired'
        this.qrCancel(true)
      }
    }

    map[type]?.()
  }
}

export default Store
