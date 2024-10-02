import { observer } from 'mobx-react'
import { FC, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Form, Table } from 'antd'
import Store, { IProps, findValue } from './proStore'
import SearchBar from './SearchBar'

const ProTable = (props: IProps, ref: any) => {
  const { columns, dataSource, span, ...rest } = props
  const [form] = Form.useForm()
  const store = useMemo(() => {
    return new Store(props, form)
  }, [])

  const tableColumns = useMemo(() => {
    return columns
      .filter(column => !column.ignore)
      .map(column => {
        return {
          ...column,
          title: findValue(['label', 'title'], column),
          dataIndex: findValue(['dataIndex', 'name', 'key', 'value'], column),
          key: findValue(['dataIndex', 'name', 'key', 'value'], column),
          render: typeof column.render === 'function' ? column.render : undefined
        }
      })
  }, [columns])

  useImperativeHandle(ref, () => ({
    search: store.getList,
    changePage: store.changePage,
    getFormInstance: store.getFormInstance,
    getStore: () => store
  }))

  return (
    <Form form={form} autoComplete="off">
      <SearchBar store={store} columns={columns} span={span} />
      <Table
        bordered
        rowKey={'id'}
        {...rest}
        columns={tableColumns}
        loading={store.loading}
        dataSource={store.dataSource}
      />
    </Form>
  )
}

export default observer(forwardRef<IProps, any>(ProTable))
