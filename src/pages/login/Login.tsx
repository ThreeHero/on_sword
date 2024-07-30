import { observer } from 'mobx-react'
import cls from 'classnames'

import styles from './styles.less'
import { Button, Form, Input } from 'antd'

const Login = ({ store }) => {
  return (
    <div className={cls(styles.login, styles.page)}>
      <div className={styles.form}>
        <h2 className={styles.title}>登录</h2>
        <Form.Item name={'loginAccount'}>
          <Input placeholder="账号/邮箱" />
        </Form.Item>
        <Form.Item name={'loginPassword'}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <div className={styles.text}>忘记密码</div>
        <Button block ghost>
          登录
        </Button>
      </div>
    </div>
  )
}

export default observer(Login)
