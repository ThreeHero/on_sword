import { observer } from 'mobx-react'
import { FC, forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Form, Table } from 'antd'
import Store, { IProps, findValue } from './proStore'
import SearchBar from './SearchBar'
import useCalcTableHeight from './useCalcTableHeight'

const ProTable = (props: IProps, ref: any) => {
  const { columns, dataSource, span, actions, ...rest } = props
  const [form] = Form.useForm()
  const [modalForm] = Form.useForm()
  const store = useMemo(() => {
    return new Store(props, form, modalForm)
  }, [])

  const SearchBarRef = useRef()

  const tableHeight = useCalcTableHeight(SearchBarRef, [store.fold])

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

  const actionList = useMemo(() => {
    if (actions === false) return []
    if (!actions) return null
    return Array.isArray(actions) ? actions : [actions]
  }, [actions])

  return (
    <Form form={form} autoComplete="off">
      <SearchBar
        store={store}
        columns={columns}
        span={span}
        actions={actionList}
        ref={SearchBarRef}
      />
      <Table
        bordered
        rowKey={'id'}
        scroll={{
          y: tableHeight
        }}
        pagination={{
          current: store.page,
          pageSize: store.pageSize,
          total: store.total,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          onChange: store.changePage
        }}
        {...rest}
        columns={tableColumns}
        loading={store.loading}
        dataSource={store.dataSource}
      />
    </Form>
  )
}

export default observer(forwardRef<IProps, any>(ProTable))
