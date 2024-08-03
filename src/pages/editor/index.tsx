import { Form } from 'antd'
import { observer } from 'mobx-react'
import Store from './store'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Editor, Title } from './components'
import styles from './styles.less'

const Index = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const store = useMemo(() => new Store(form, navigate), [])
  return (
    <Form
      autoComplete="off"
      form={store.formInstance}
      preserve={false}
      initialValues={{
        accessType: 0,
        isComment: true
      }}
    >
      <div className={styles.placeholder} />
      <Title store={store} />
      <Editor store={store} />
    </Form>
  )
}

export default observer(Index)
