import { observer } from 'mobx-react'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Dropdown, Form, Table, Tooltip, Typography } from 'antd'
import Store, { IProps, findValue } from './proStore'
import SearchBar from './SearchBar'
import useCalcTableHeight from './useCalcTableHeight'
import cls from 'classnames'
import styles from './index.less'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

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
    if (contextMenus === false) return []
    if (!contextMenus) return []
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
      {/* TODO 右键获取行数据 */}
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
        components={{
          body: {
            row: (props: any) => {
              return (
                <Dropdown
                  trigger={['contextMenu']}
                  menu={{
                    items: [
                      contextMenus !== false && {
                        label: '编辑',
                        key: 'edit',
                        icon: <EditOutlined />
                      },
                      ...contextMenuList,
                      contextMenus !== false && {
                        label: '删除',
                        key: 'delete',
                        danger: true,
                        icon: <DeleteOutlined />
                      }
                    ],
                    onClick: ({ key }) => {
                      // TODO 编辑和删除处理
                      console.log(key)
                      if (typeof contextClickMap[key] === 'function') {
                        contextClickMap[key]({}) // params 参数传 行数据
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
    </Form>
  )
}

export default observer(forwardRef<IProps, any>(ProTable))
