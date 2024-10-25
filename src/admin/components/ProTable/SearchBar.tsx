import { observer } from 'mobx-react'
import { forwardRef, useMemo } from 'react'
import { IColumn, FormItemType, findValue } from './proStore'
import { Button, Col, Divider, Flex, Row, Space } from 'antd'
import { ReloadOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import type Store from './proStore'
import styles from './index.less'
import React from 'react'
import FormRow from './FormRow'

interface IProps {
  store: Store
  columns: IColumn[]
  span?: number // 每行表单项的数量 默认3
  actions?: React.ReactNode[] // 操作区按钮
}

const SearchBar = forwardRef<any, IProps>(({ store, columns, span = 3, actions }, ref) => {
  // const [fold, setFold] = useState(true) // 默认是折叠状态
  const { fold, setFold } = store

  const searchColumns = useMemo(() => {
    return columns
      .filter(column => !!column.search)
      .map(column => {
        const search = column.search as FormItemType
        const options = search.options
        return {
          ...search,
          type: search.type || (!!options ? 'select' : 'input'),
          label: search.title || findValue(['label', 'title'], column),
          name: search.name || findValue(['dataIndex', 'name', 'key', 'value'], column),
          key: findValue(['dataIndex', 'name', 'key', 'value'], column)
        }
      })
  }, [columns])

  const actionList = useMemo(() => {
    if (!actions) {
      return [
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            store.rowRecord = {}
            store.modalOpen = true
          }}
          key="ADD"
        >
          新增
        </Button>
      ]
    }
    return actions
  }, [actions, columns])

  // 上下布局
  return (
    <div ref={ref}>
      <Flex vertical className={styles.searchBar} gap={16}>
        <FormRow
          wrap={false}
          start={0}
          end={span}
          list={searchColumns}
          onChange={store.searchList}
          span={span}
        />
        {searchColumns.length > span && (
          <>
            {!fold && (
              <FormRow
                wrap
                start={span}
                list={searchColumns}
                onChange={store.searchList}
                span={span}
              />
            )}
            <Divider dashed style={{ margin: '0' }}>
              <div className={styles.foldTitle} onClick={() => setFold(!fold)}>
                {fold ? '展开' : '折叠'}
              </div>
            </Divider>
          </>
        )}
        <Row wrap={false} align="middle" style={{ marginBottom: 16 }}>
          <Col flex={'auto'}>
            <Space>{actionList.map(action => action)}</Space>
          </Col>
          <Space>
            <Button type={'primary'} icon={<SearchOutlined />} onClick={store.searchList}>
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={store.reload}>
              重置
            </Button>
          </Space>
        </Row>
      </Flex>
    </div>
  )
})

export default observer(SearchBar)
