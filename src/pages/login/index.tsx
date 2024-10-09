import { observer } from 'mobx-react'
import cls from 'classnames'
import store from './store'
import styles from './styles.less'
import Login from './Login'
import Register from './Register'
import MiddlePage from './MiddlePage'
import { ConfigProvider, Form } from 'antd'
import Store from './store'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { config } from '@/config'
import { AnimationBg } from '@/components'

const Index = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const store = useMemo(() => new Store(form, navigate), [form])

  return (
    <ConfigProvider prefixCls="login">
      <div className={styles.container}>
        <AnimationBg src={config.loginBg} />
        <Form autoComplete="off" form={store.formInstance} preserve={false}>
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
    </ConfigProvider>
  )
}

export default observer(Index)
