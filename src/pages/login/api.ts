import { http } from '@/utils'

export default {
  // 检查账号是否存在
  checkAccount: params => http.get('/users/account', { params }),
  /**
   * 发送注册验证码
   */
  sendRegCaptcha: params => http.post('/users/captcha', null, { params }),
  /**
   * 发送忘记密码验证码
   */
  sendForgetCaptcha: params => http.post('/users/code', null, { params }),
  /**
   * 注册
   */
  register: data => http.post('/users/reg', data),
  /**
   * 忘记密码
   */
  forgetPassword: data => http.post('/users/forget', data),
  /**
   * 登录
   */
  login: data => http.post('/users/login', data)
}
