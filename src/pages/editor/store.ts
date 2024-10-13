import { makeAutoObservable } from 'mobx'
import { FormInstance, message } from 'antd'
import Api from './api'
import globalStore from '@/layout/store'
import { clearCache, md5 } from '@/utils'
import { config } from '@/config'

class Store {
  formInstance = null
  router = null
  constructor(form: FormInstance, router: any) {
    makeAutoObservable(this)
    this.formInstance = form
    this.router = router
    this.getTagList()
  }

  // 请求文章信息
  getArticleInfo = async (id: number) => {
    const res = await Api.getArticleInfo(id)

    this.formInstance.setFieldsValue({
      ...res,
      tagList: res.tagList.map(x => x.id)
    })
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
    // if (!values.cover) return message.error('请上传封面')
    if (!values.cover) {
      const response = await fetch(config.defaultArticleBg)
      const blob = await response.blob()
      values.cover = new File([blob], 'cover.png', { type: blob.type, lastModified: Date.now() })
    }
    if (!values.classificationId) return message.error('请选择分类')
    if (!values.tagList || values.tagList.length === 0) return message.error('请选择标签')
    if (
      values.accessType ===
        globalStore.getDictValue({
          by: 'label',
          value: '密码访问',
          dict: 'accessType',
          findField: 'value'
        }) &&
      !values.password
    )
      return message.error('请输入文章访问密码')
    if (values.password) {
      values.password = md5(values.password)
    }
    if (typeof values.cover !== 'string') {
      const formData = new FormData()
      formData.append('file', values.cover)
      // @ts-ignore
      formData.append('path', globalStore.currentUser.account + '/article/cover')
      const url = await Api.uploadFile(formData)
      values.cover = url
    }

    values.tagList = values.tagList.join(',')
    values.isComment = Number(values.isComment)
    let jumpId = ''
    if (values.id) {
      jumpId = await Api.edit(values)
    } else {
      jumpId = await Api.publish(values)
    }
    message.success('发布成功')
    this.submitDrawer = false
    clearCache(globalStore.currentUser?.id + '_article', false)

    this.formInstance.resetFields()
    this.router('/article/' + jumpId)
  }
}

export default Store
