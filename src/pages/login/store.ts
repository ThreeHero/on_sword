import { FormInstance, message } from 'antd'
import { makeAutoObservable } from 'mobx'
import Api from './api'
import { debounce } from 'lodash-es'
import { md5 } from '@/utils'

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
  router = null

  constructor(form: FormInstance, router: any) {
    makeAutoObservable(this)
    this.formInstance = form
    this.router = router
  }

  isLoginPage = true
  /**
   * 忘记密码弹窗开关
   */
  openForgetModal = false

  changePage = (flag?: boolean) => {
    this.isLoginPage = flag ?? !this.isLoginPage
  }

  captchaCountdown = null

  // 发送注册验证码
  sendRegCaptcha = debounce(async () => {
    if (this.captchaCountdown) return
    try {
      const { email } = await this.formInstance.validateFields(['email'])
      this.captchaCountdown = Date.now() + 30 * 1000
      const msg = await Api.sendRegCaptcha({ email })
      message.success(msg)
    } catch (e) {
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
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields[0].errors[0]
      message.error(errorMessage)
    }
  }

  login = async () => {
    try {
      const namePath = ['loginAccount', 'loginPassword']
      const values = await this.formInstance.validateFields(namePath)
      const params: any = {}
      params.password = md5(values.loginPassword)
      params.account = values.loginAccount
      const msg = await Api.login(params)
      this.formInstance.resetFields(namePath)
      message.success(msg)
      this.router('/')
    } catch (e) {
      if (typeof e === 'string') return message.error(e)
      const errorFields = e.errorFields
      const errorMessage = errorFields?.[0]?.errors[0]
      if (errorMessage) {
        message.error(errorMessage)
      }
    }
  }
}

export default Store
