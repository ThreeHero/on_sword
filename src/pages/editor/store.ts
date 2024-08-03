import { makeAutoObservable } from 'mobx'
import { FormInstance, message } from 'antd'
import Api from './api'

class Store {
  formInstance = null
  router = null
  constructor(form: FormInstance, router: any) {
    makeAutoObservable(this)
    this.formInstance = form
    this.router = router
  }

  /**
   * 提交的抽屉是否显示
   */
  submitDrawer = false

  // 分类列表
  classList = []

  // 标签列表
  tagList = []
  getClassList = async () => {
    const res = await Api.getClassList({ pageSize: 8 })
    this.classList = res.records
  }
  getTagList = async (classificationId?: number) => {
    const res = await Api.getTagList({ pageSize: 99, classificationId })
    this.tagList = res.records
  }

  publish = async () => {
    const values = this.formInstance.getFieldsValue()
    if (!values.title) return message.error('请输入标题')
    if (!values.content) return message.error('请输入文章内容')
    console.log(values)
  }
}

export default Store
