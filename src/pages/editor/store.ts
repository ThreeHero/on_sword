import { makeAutoObservable } from 'mobx'
import { FormInstance } from 'antd'

class Store {
  formInstance = null
  router = null
  constructor(form: FormInstance, router: any) {
    makeAutoObservable(this)
    this.formInstance = form
    this.router = router
  }
}

export default Store
