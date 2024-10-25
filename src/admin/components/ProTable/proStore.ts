import React from 'react'
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
import { debounce } from 'lodash-es'
import { message, TableProps } from 'antd'
import type { ColumnType } from 'antd/lib/table'
import type { FormInstance } from 'antd/lib'
import { MenuItemType } from 'antd/es/menu/interface'

export type FormItemType = {
  title?: string // 表单项标题
  name?: string // 表单项字段名
  options?: any[] // 下拉框选项
  type?: 'input' | 'select' | 'dateRange'
  render?: () => React.ReactNode
}

export interface IColumn extends ColumnType<any> {
  ignore?: boolean // 是否忽略表格显示
  search?: FormItemType
  model?: FormItemType
}

export interface IProps extends TableProps {
  api?: string // 请求 结果放到 dataSource中
  params?: any // 请求分页参数
  columns?: IColumn[]
  span?: number // 每行表单项的数量 默认3
  actions?: React.ReactNode | React.ReactNode[] // 操作区按钮 false 不显示 默认显示新增
  contextMenus?: MenuItemType | MenuItemType[] // 右键菜单
  contextClickMap?: { [props: string]: (params: any) => void } // 右键菜单点击事件 字典 key: 事件
  searchTransform?: (values: any) => any // 搜索条搜索之前参数 转换处理
}

export const findValue = (fieldList: any[], obj: any) => {
  const field = fieldList.find(item => !!obj[item])
  return obj[field]
}

class Store {
  props: IProps = {}
  dataSource = []
  formInstance: FormInstance = null
  modalFormInstance: FormInstance = null
  constructor(props: IProps, form: FormInstance, modalForm: FormInstance) {
    makeAutoObservable(this)
    this.props = props
    this.formInstance = form
    this.modalFormInstance = modalForm
    this.getList()
  }

  getDataList = () => {
    return this.dataSource
  }

  setDataList = (list: any[]) => {
    this.dataSource = list
  }

  getFormInstance() {
    return this.formInstance
  }

  page = 1
  pageSize = 10
  total = 0

  changePage = (page: number, pageSize: number) => {
    this.page = page
    this.pageSize = pageSize
    this.getList()
  }

  loading = false

  getList = async (params?: any) => {
    try {
      const { api } = this.props
      if (typeof api === 'string') {
        this.loading = true
        const res = await http.get(`/${api}/list`, {
          params: {
            ...(this.props.params || {}),
            ...params,
            page: this.page,
            pageSize: this.pageSize
          }
        })
        this.dataSource = res.records
        this.total = res.total
      } else {
        this.dataSource = [...(this.props.dataSource || [])]
        this.total = this.dataSource.length
      }
    } finally {
      this.loading = false
    }
  }

  fold = true // 搜索条是否折叠
  setFold = (v: boolean) => (this.fold = v)

  // 搜索条变化时 进行重新请求分页
  searchList = debounce(() => {
    let values = this.formInstance.getFieldsValue()
    values =
      typeof this.props.searchTransform === 'function' ? this.props.searchTransform(values) : values
    this.getList(values)
  }, 300)

  reload = debounce(() => {
    this.formInstance.resetFields()
    this.getList()
  }, 300)

  modalOpen = false

  add = async () => {
    const { api } = this.props
    const values = await this.modalFormInstance.validateFields()
    await http.post(`/${api}`, values)
    this.reload()
    this.modalOpen = false
    message.success('新增成功')
  }

  edit = async () => {
    const { api } = this.props
    const values = await this.modalFormInstance.validateFields()
    await http.put(`/${api}`, values)
    this.reload()
    this.modalOpen = false
    message.success('修改成功')
  }

  rowRecord: { [props: string]: any } = {}
  setRowRecord = (record: any) => {
    this.rowRecord = record
  }

  remove = async () => {
    const { api } = this.props
    const { rowRecord } = this
    await http.delete(`/${api}/${(rowRecord as any).id}`)
    this.reload()
    message.success('删除成功')
  }
}

export default Store
