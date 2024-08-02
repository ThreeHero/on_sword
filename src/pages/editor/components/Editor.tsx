import { observer } from 'mobx-react'
import { MDEditor } from '@/components'
import { Form } from 'antd'

const Editor = ({ store }) => {
  return (
    <Form.Item name="content">
      <MDEditor />
    </Form.Item>
  )
}

export default observer(Editor)
