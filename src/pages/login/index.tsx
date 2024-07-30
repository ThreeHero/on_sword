import { observer } from 'mobx-react'
import cls from 'classnames'
import store from './store'
import styles from './styles.less'
import Login from './Login'
import Register from './Register'
import MiddlePage from './MiddlePage'
import { Form } from 'antd'
import Store from './store'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'

const Index = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const store = useMemo(() => new Store(form, navigate), [form])

  return (
    <div className={styles.container}>
      <img className="bg" src={require('@/assets/bg/login_bg.png')} />
      <Form autoComplete="off" form={store.formInstance}>
        <div className={styles.box}>
          <div
            className={cls(styles['slider-page'], {
              [styles['is-login']]: store.isLoginPage
            })}
          >
            <Register store={store} />
            <MiddlePage store={store} />
            <Login store={store} />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default observer(Index)
