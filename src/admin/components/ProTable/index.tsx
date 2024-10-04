import { observer } from 'mobx-react'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Dropdown, Form, Modal, Table, Tooltip, Typography } from 'antd'
import Store, { IProps, findValue } from './proStore'
import SearchBar from './SearchBar'
import useCalcTableHeight from './useCalcTableHeight'
import cls from 'classnames'
import styles from './index.less'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ActionModal from './ActionModal'

const ProTable = (props: IProps, ref: any) => {
  const {
    columns,
    dataSource,
    span,
    actions,
    contextMenus,
    contextClickMap = {},
    className,
    ...rest
  } = props
  const [form] = Form.useForm()
  const [modalForm] = Form.useForm()
  const store = useMemo(() => {
    return new Store(props, form, modalForm)
  }, [props])

  const SearchBarRef = useRef()

  const tableHeight = useCalcTableHeight(SearchBarRef, [store.fold])

  const tableColumns = useMemo(() => {
    const render = (val: any, record: any, index: number) => {
      return (
        <Tooltip title={<Typography.Text copyable>{val}</Typography.Text>}>
          <Typography.Text ellipsis>{val}</Typography.Text>
        </Tooltip>
      )
    }
    return columns
      .filter(column => !column.ignore)
      .map(column => {
        return {
          ...column,
          title: findValue(['label', 'title'], column),
          dataIndex: findValue(['dataIndex', 'name', 'key', 'value'], column),
          key: findValue(['dataIndex', 'name', 'key', 'value'], column),
          render: typeof column.render === 'function' ? column.render : render
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

  const contextMenuList = useMemo(() => {
    if (!contextMenus)
      return [
        {
          label: '编辑',
          key: 'EDIT',
          icon: <EditOutlined />
        },
        {
          label: '删除',
          key: 'DELETE',
          danger: true,
          icon: <DeleteOutlined />
        }
      ]
    return Array.isArray(contextMenus) ? contextMenus : [contextMenus]
  }, [contextMenus])

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
          // showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          onChange: store.changePage
        }}
        className={cls(className, styles.table)}
        onRow={(record, rowIndex) => {
          return {
            onContextMenu: e => {
              store.setRowRecord(record)
            }
          }
        }}
        components={{
          body: {
            row: (props: any) => {
              return (
                <Dropdown
                  trigger={['contextMenu']}
                  menu={{
                    items: contextMenuList,
                    onClick: ({ key }) => {
                      if (key === 'EDIT') {
                        store.modalOpen = true
                      }
                      if (key === 'DELETE') {
                        const name = ['nickname', 'title', 'name']
                        return Modal.confirm({
                          title: `确定删除${store.rowRecord[name.find(item => !!store.rowRecord[item])] ?? '该条数据'}吗`,
                          okText: '确定',
                          cancelText: '取消',
                          onOk: store.remove
                        })
                      }
                      if (typeof contextClickMap[key] === 'function') {
                        return contextClickMap[key](store.rowRecord)
                      }
                    }
                  }}
                >
                  <tr {...props} />
                </Dropdown>
              )
            }
          }
        }}
        {...rest}
        columns={tableColumns}
        loading={store.loading}
        dataSource={store.dataSource}
      />
      <ActionModal store={store} columns={columns} />
    </Form>
  )
}

export default observer(forwardRef<IProps, any>(ProTable))
