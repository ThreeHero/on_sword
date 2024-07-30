import { Button, Form, Input, Modal, Space, Statistic } from 'antd'
import { observer } from 'mobx-react'
import validate from '@/pages/login/validate'
import styles from './styles.less'

const { Countdown } = Statistic
const SpaceInput = observer(({ store, ...rest }) => {
  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input {...rest} />
      <div onClick={store.sendForgetCaptcha} className={styles['send-btn']}>
        {store.captchaCountdown ? (
          <Countdown
            value={store.captchaCountdown}
            format="ss"
            onFinish={() => (store.captchaCountdown = null)}
          />
        ) : (
          '发送'
        )}
      </div>
    </Space.Compact>
  )
})

const ForgetPassword = ({ store }) => {
  return (
    <Modal
      title="找回密码"
      width={300}
      open={store.openForgetModal}
      onCancel={() => (store.openForgetModal = false)}
      className={styles.forgetModal}
      destroyOnClose
      footer={
        <Button block onClick={store.forgetPassword}>
          提交
        </Button>
      }
    >
      <Form.Item name={'forgetEmail'} rules={[validate.validateEmail]}>
        <Input
          placeholder="请输入邮箱"
          onPressEnter={() => {
            if (store.captchaCountdown) {
              store.forgetPassword()
            } else {
              store.sendForgetCaptcha()
            }
          }}
        />
      </Form.Item>
      <Form.Item name={'forgetCaptcha'} rules={[validate.validateCaptcha]}>
        <SpaceInput placeholder="验证码" onPressEnter={store.forgetPassword} store={store} />
      </Form.Item>
      <Form.Item name={'forgetPassword'} rules={[validate.validatePassword]}>
        <Input.Password placeholder="新密码" onPressEnter={store.forgetPassword} />
      </Form.Item>
    </Modal>
  )
}

export default observer(ForgetPassword)
