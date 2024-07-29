import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  isLoginPage = true

  changePage = (flag?: boolean) => {
    this.isLoginPage = flag ?? !this.isLoginPage
  }
}

export default new Store()
