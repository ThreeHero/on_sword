import { Form } from 'antd'
import { observer } from 'mobx-react'
import Store from './store'
import { FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Editor, Title } from './components'
import styles from './styles.less'

const Index: FC<{ params?: any }> = ({ params = {} }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const store = useMemo(() => new Store(form, navigate), [])
  useEffect(() => {
    params.id && store.getArticleInfo(params.id)
  }, [params.id])
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
