import React from 'react'
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
import { debounce } from 'lodash-es'
import { TableProps } from 'antd'
import type { ColumnType } from 'antd/lib/table'
import type { FormInstance } from 'antd/lib'

export type SearchType = {
  title?: string // 搜索条标题
  options?: any[] // 搜索选项
  type?: 'input' | 'select' | 'date' | 'range' | 'switch' | 'cascader' | 'treeSelect'
  render?: () => React.ReactNode
}

export interface IColumn extends ColumnType<any> {
  ignore?: boolean // 是否忽略表格显示
  search?: SearchType | false
}

export interface IProps extends TableProps {
  api?: string // 请求 结果放到 dataSource中
  columns?: IColumn[]
  span?: number // 每行表单项的数量 默认3
}

export const findValue = (fieldList: any[], obj: any) => {
  const field = fieldList.find(item => !!obj[item])
  return obj[field]
}

class Store {
  props: IProps = {}
  dataSource = []
  formInstance: FormInstance = null
  constructor(props: IProps, form: FormInstance) {
    makeAutoObservable(this)
    this.props = props
    this.formInstance = form
    this.getList()
  }

  getFormInstance() {
    return this.formInstance
  }

  page = 1
  pageSize = 10

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
          params: { ...params, page: this.page, pageSize: this.pageSize }
        })
        this.dataSource = res.records
      } else {
        this.dataSource = [...(this.props.dataSource || [])]
      }
    } finally {
      this.loading = false
    }
  }

  // 搜索条变化时 进行重新请求分页
  searchList = debounce(() => {
    this.getList(this.formInstance.getFieldsValue())
  }, 300)

  reload = debounce(() => {
    this.formInstance.resetFields()
    this.getList()
  }, 300)
}

export default Store
