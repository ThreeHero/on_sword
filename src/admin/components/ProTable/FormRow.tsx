import { FC } from 'react'
import { Col, Row, DatePicker, Form, Input, Select } from 'antd'
import styles from './index.less'
import { observer } from 'mobx-react'

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
const FormRow: FC<{
  wrap?: boolean
  start?: number
  end?: number
  list: any[]
  span?: number
  onChange?: () => void
  onOk?: () => void
}> = ({ wrap, start = 0, end, list, span = 1, onChange, onOk }) => {
  return (
    <Row wrap={wrap} gutter={[16, 16]} className={styles.searchRow}>
      {list.slice(start, end).map(column => {
        const Component =
          typeof column.render === 'function' ? column.render : getComponent(column.type)
        const { item = {}, ...rest } = column
        return (
          <Col span={24 / span} key={column.key}>
            <FormItem
              {...item}
              name={column.name}
              label={column.label}
              style={{ marginBottom: 0 }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Component
                style={{ width: '100%' }}
                placeholder={(column.options ? '请选择' : '请输入') + column.label}
                allowClear
                onPressEnter={column.type === 'input' && (() => onOk())}
                {...rest}
                key={null}
                onChange={onChange}
              />
            </FormItem>
          </Col>
        )
      })}
    </Row>
  )
}

export default observer(FormRow)
