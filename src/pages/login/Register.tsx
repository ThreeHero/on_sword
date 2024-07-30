import { observer } from 'mobx-react'
import cls from 'classnames'
import { Button, Form, Input, Statistic } from 'antd'
import validate from './validate'
import styles from './styles.less'

const { Countdown } = Statistic

const Register = ({ store }) => {
  return (
    <div className={cls(styles.reg, styles.page)}>
      <div className={styles.form}>
        <h2 className={styles.title}>注册</h2>
        {/* 输入时检测 */}
        <Form.Item name={'account'} validateDebounce={300} rules={[validate.validateAccount]}>
          <Input placeholder="账号" />
        </Form.Item>
        {/* 密码校验 */}
        <Form.Item name={'regPassword'} rules={[validate.validatePassword]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        {/* 邮箱校验 */}
        <Form.Item name={'email'} rules={[validate.validateEmail]}>
          <Input placeholder="邮箱" />
        </Form.Item>
        {/* 验证码校验 */}
        <Form.Item name={'captcha'} rules={[validate.validateCaptcha]}>
          <Input placeholder="验证码" />
        </Form.Item>
        <div className={styles.text} onClick={store.sendRegCaptcha}>
          {store.captchaCountdown ? (
            <Countdown
              value={store.captchaCountdown}
              format="ss"
              onFinish={() => (store.captchaCountdown = null)}
            />
          ) : (
            '发送验证码'
          )}
        </div>
        <Button block ghost onClick={store.register}>
          注册
        </Button>
      </div>
    </div>
  )
}

export default observer(Register)
