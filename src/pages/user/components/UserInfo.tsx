import { observer } from 'mobx-react'
import styles from './index.less'
import globalStore from '@/layout/store'
import { Button, ConfigProvider, Form, Input, Modal, Space, Upload, Statistic, message } from 'antd'
import { FC, useMemo, useState } from 'react'
import cls from 'classnames'
import { config } from '@/config'
import { debounce } from 'lodash-es'
import { getUserinfo, http, setUserinfo } from '@/utils'

const Avatar: FC<{ [props: string]: any }> = observer(({ value, onChange }) => {
  const handleUpload = f => {
    onChange(f)
    return false
  }

  const src = useMemo(() => {
    if (!value) return config.defaultAvatar
    if (typeof value === 'string') {
      // @ts-ignore
      return value.resource()
    } else {
      const URL = window.URL
      return URL.createObjectURL(value)
    }
  }, [value])

  return (
    <Upload maxCount={1} beforeUpload={handleUpload} showUploadList={false}>
      <img
        src={src}
        alt=""
        className={cls(styles.cover, {
          [styles.darkImg]: globalStore.isDark
        })}
      />
    </Upload>
  )
})

const { Countdown } = Statistic
const SpaceInput: FC<{ [props: string]: any }> = observer(({ form, ...rest }) => {
  const [captchaCountdown, setCaptchaCountdown] = useState<number | null>(null)
  const sendForgetCaptcha = debounce(async () => {
    if (captchaCountdown) return
    const { email } = await form.validateFields(['email'])
    const msg = await http.post('/users/emailCaptcha', null, { params: { email } })
    setCaptchaCountdown(Date.now() + 30 * 1000)
    message.success(msg)
  }, 1000)

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input {...rest} />
      <div onClick={sendForgetCaptcha} className={styles['send-btn']}>
        {captchaCountdown ? (
          <Countdown
            value={captchaCountdown}
            format="ss"
            onFinish={() => setCaptchaCountdown(null)}
          />
        ) : (
          '发送'
        )}
      </div>
    </Space.Compact>
  )
})

const Email: FC<{ [props: string]: any }> = observer(({ value, onChange, id }) => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const changeEmail = async () => {
    const values = await form.validateFields()
    await http.put('/users/email', values)
    message.success('修改成功')
    onChange(values.email)
  }

  return (
    <>
      <div className={styles.emailBox}>
        <Input.TextArea rows={1} className={styles.emailArea} readOnly value={value} />
        <Button type="default" onClick={() => setOpen(true)}>
          修改
        </Button>
      </div>
      <ConfigProvider prefixCls="ant">
        <Modal
          destroyOnClose
          title="修改邮箱"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={changeEmail}
        >
          <Form
            preserve={false}
            form={form}
            autoComplete="off"
            initialValues={{ email: value, id }}
          >
            <Form.Item name="id" hidden />
            <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
              <SpaceInput placeholder="请输入验证码" form={form} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  )
})

const UserInfo = () => {
  const [form] = Form.useForm()
  const currentUser = globalStore.currentUser

  const change = async () => {
    const values = await form.validateFields()
    if (!!values.avatar && typeof values.avatar !== 'string') {
      // 上传头像
      const formData = new FormData()
      formData.append('file', values.avatar)
      // @ts-ignore
      formData.append('path', currentUser.account + '/user/avatar')
      const url = await http.post('/file/upload', formData)
      values.avatar = url
    }
    await http.put('/users', values)
    const info = getUserinfo()
    setUserinfo({ ...info, ...values })
    message.success('修改成功')
  }

  return (
    <ConfigProvider prefixCls="user">
      <Form
        form={form}
        style={{ height: '100%' }}
        className={styles.userInfo}
        initialValues={currentUser}
        autoComplete="off"
      >
        <Form.Item name={'id'} hidden />
        <Form.Item name="avatar" style={{ textAlign: 'center' }}>
          <Avatar />
        </Form.Item>
        <Form.Item name="account">
          <Input disabled />
        </Form.Item>
        <Form.Item name="email">
          <Email id={currentUser.id} />
        </Form.Item>
        <Form.Item name="nickname">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item name="introduction">
          <Input.TextArea placeholder="简介" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" onClick={change}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}

export default observer(UserInfo)
