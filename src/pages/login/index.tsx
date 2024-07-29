import { observer } from 'mobx-react'
import cls from 'classnames'
import store from './store'
import styles from './styles.less'
import Login from './Login'
import Register from './Register'
import MiddlePage from './MiddlePage'
import { Form } from 'antd'

const Index = () => {
  return (
    <div className={styles.container}>
      <Form autoComplete="off">
        <div className={styles.box}>
          <div
            className={cls(styles['slider-page'], {
              [styles['is-login']]: store.isLoginPage
            })}
          >
            <Register />
            <MiddlePage />
            <Login />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default observer(Index)
