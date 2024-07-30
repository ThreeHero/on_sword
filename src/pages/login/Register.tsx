import { observer } from 'mobx-react'
import cls from 'classnames'

import styles from './styles.less'
import { Button, Form, Input } from 'antd'

const Register = ({ store }) => {
  return (
    <div className={cls(styles.reg, styles.page)}>
      <div className={styles.form}>
        <h2 className={styles.title}>注册</h2>
        {/* 输入时检测 */}
        <Form.Item name={'account'}>
          <Input placeholder="账号" />
        </Form.Item>
        {/* 密码校验 */}
        <Form.Item name={'regPassword'}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        {/* 邮箱校验 */}
        <Form.Item name={'email'}>
          <Input placeholder="邮箱" />
        </Form.Item>
        {/* 验证码校验 */}
        <Form.Item name={'captcha'} className={styles.textItem}>
          <Input placeholder="验证码" />
        </Form.Item>
        <div className={styles.text}>发送验证码</div>
        <Button block ghost>
          注册
        </Button>
      </div>
    </div>
  )
}

export default observer(Register)
