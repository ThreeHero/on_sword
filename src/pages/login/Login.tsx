import { observer } from 'mobx-react'
import cls from 'classnames'

import styles from './styles.less'
import { Button, ConfigProvider, Form, Input } from 'antd'
import validate from '@/pages/login/validate'
import ForgetPassword from './ForgetPassword'
import QrCode from './QrCode'
import { QrcodeOutlined } from '@ant-design/icons'
import { detectDeviceType } from '@/utils/base'

const Login = ({ store }) => {
  return (
    <div className={cls(styles.login, styles.page)}>
      <div className={styles.form}>
        <h2 className={styles.title}>登录</h2>
        <Form.Item name={'loginAccount'} rules={[{ required: true, message: '请输入账号或邮箱' }]}>
          <Input placeholder="账号/邮箱" onPressEnter={store.login} />
        </Form.Item>
        <Form.Item name={'loginPassword'} rules={[validate.validatePassword]}>
          <Input.Password placeholder="密码" onPressEnter={store.login} />
        </Form.Item>
        <div className={styles.text} onClick={() => (store.openForgetModal = true)}>
          忘记密码
        </div>
        <Button block ghost onClick={store.login}>
          登录
        </Button>
        <QrCode store={store} hidden={detectDeviceType() === 'mobile'}>
          <div className={styles['qr-box']} onClick={() => (store.isPolling = true)}>
            <QrcodeOutlined />
          </div>
        </QrCode>
      </div>
      <ConfigProvider prefixCls="ant">
        <ForgetPassword store={store} />
      </ConfigProvider>
    </div>
  )
}

export default observer(Login)
