import Api from './api'

export default {
  // 账号校验
  validateAccount: () => {
    return {
      validator: async (_, value: string) => {
        if (!value) {
          return Promise.reject('请输入账号')
        }
        const res = await Api.checkAccount({ account: value })
        if (res) {
          return Promise.reject('账号已存在')
        }
        return Promise.resolve()
      }
    }
  },
  // 密码验证
  validatePassword: () => {
    return {
      validator: async (_, value: string) => {
        if (!value) {
          return Promise.reject('请输入密码')
        }
        if (value.length < 6) {
          return Promise.reject('密码长度不能小于6位')
        }
        if (value.length > 18) {
          return Promise.reject('密码长度不能大于18位')
        }
        return Promise.resolve()
      }
    }
  },
  // 邮箱验证
  validateEmail: () => {
    return {
      validator: async (_, value: string) => {
        if (!value) {
          return Promise.reject('请输入邮箱')
        }
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(value)) {
          return Promise.reject('邮箱格式不正确')
        }
        return Promise.resolve()
      }
    }
  },
  // 验证码验证
  validateCaptcha: () => {
    return {
      validator: async (_, value: string) => {
        if (!value) {
          return Promise.reject('请输入验证码')
        }
        if (value.length !== 6) {
          return Promise.reject('验证码长度不正确')
        }
        return Promise.resolve()
      }
    }
  }
}
