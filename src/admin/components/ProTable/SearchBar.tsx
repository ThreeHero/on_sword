import { observer } from 'mobx-react'
import { FC, useMemo, useState } from 'react'
import { IColumn, SearchType, findValue } from './proStore'
import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Select, Space } from 'antd'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './index.less'

interface IProps {
  store: any
  columns: IColumn[]
  span?: number // 每行表单项的数量 默认3
}

const { Item: FormItem } = Form

const FormItemMap = {
  input: Input,
  select: Select,
  dateRange: DatePicker.RangePicker
}

const getComponent = (type: string) => {
  const Component = FormItemMap[type] || Input
  return Component
}

const SearchBar: FC<IProps> = ({ store, columns, span = 3 }) => {
  const [fold, setFold] = useState(true) // 默认是折叠状态

  const searchColumns = useMemo(() => {
    return columns
      .filter(column => !!column.search)
      .map(column => {
        const search = column.search as SearchType
        const options = search.options
        return {
          ...search,
          type: search.type || (!!options ? 'select' : 'input'),
          label: search.title || findValue(['label', 'title'], column),
          name: findValue(['dataIndex', 'name', 'key', 'value'], column),
          key: findValue(['dataIndex', 'name', 'key', 'value'], column)
        }
      })
  }, [columns])

  const FormRow: FC<{ wrap: boolean; start: number; end?: number }> = ({ wrap, start, end }) => {
    return (
      <Row wrap={wrap} gutter={8} className={styles.searchRow}>
        {searchColumns.slice(start, end).map(column => {
          const Component =
            typeof column.render === 'function' ? column.render() : getComponent(column.type)
          return (
            <Col span={24 / span} key={column.key}>
              <FormItem name={column.name} label={column.label} style={{ marginBottom: 0 }}>
                <Component
                  style={{ width: '100%' }}
                  placeholder={(column.options ? '请选择' : '请输入') + column.label}
                  allowClear
                  {...column}
                  key={null}
                  onChange={store.searchList}
                />
              </FormItem>
            </Col>
          )
        })}
      </Row>
    )
  }

  // 上下布局
  return (
    <Flex vertical className={styles.searchBar} gap={16}>
      <FormRow wrap={false} start={0} end={span} />
      {searchColumns.length > span && (
        <>
          {!fold && <FormRow wrap start={span} />}
          <Divider dashed style={{ margin: '0' }}>
            <div className={styles.foldTitle} onClick={() => setFold(!fold)}>
              {fold ? '展开' : '折叠'}
            </div>
          </Divider>
        </>
      )}
      <Row wrap={false} align="middle" style={{ marginBottom: 16 }}>
        <Col flex={'auto'}>
          <Space>操作区域</Space>
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
  )
}

export default observer(SearchBar)
