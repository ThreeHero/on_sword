import { FormInstance } from 'antd'
import { makeAutoObservable } from 'mobx'

class Store {
  /**
   * 表单实例
   */
  formInstance = null

  constructor(form: FormInstance) {
    makeAutoObservable(this)
    this.formInstance = form
  }

  isLoginPage = true

  changePage = (flag?: boolean) => {
    this.isLoginPage = flag ?? !this.isLoginPage
  }
}

export default Store
