import { observer } from 'mobx-react'
import { MDEditor } from '@/components'
import { Form } from 'antd'
import { FC, useState } from 'react'

interface IProps {
  value?: string
  onChange?: (v: string) => void
}
const FormEditor: FC<IProps> = ({ value, onChange }) => {
  const [_, refresh] = useState(false)
  const handleChange = (v: string) => {
    refresh(f => !f)
    onChange(v)
  }
  return <MDEditor value={value ?? ''} onChange={handleChange} />
}

const Editor = ({ store }) => {
  return (
    <Form.Item name="content">
      <FormEditor />
    </Form.Item>
  )
}

export default observer(Editor)
