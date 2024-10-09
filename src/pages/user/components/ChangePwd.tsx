import { observer } from 'mobx-react'
import globalStore from '@/layout/store'
import { Button, Form, Input, message } from 'antd'
import { http, md5 } from '@/utils'

const ChangePwd = () => {
  const [form] = Form.useForm()
  const currentUser = globalStore.currentUser

  const changePwd = async () => {
    const values = await form.validateFields()

    await http.put('/users/password', {
      id: currentUser.id,
      oldPassword: md5(values.pwd),
      newPassword: md5(values.newPwd),
      confirmPwd: void 0
    })

    message.success('修改密码成功')
    form.resetFields()
  }

  return (
    <Form form={form} style={{ height: '100%' }} autoComplete="off">
      <Form.Item name="pwd" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password onPressEnter={changePwd} placeholder="原密码" />
      </Form.Item>
      <Form.Item
        name="newPwd"
        rules={[
          { required: true, message: '密码不能为空' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('pwd') === value) {
                return Promise.reject(new Error('新密码不能和原密码一致'))
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <Input.Password onPressEnter={changePwd} placeholder="新密码" />
      </Form.Item>
      <Form.Item
        name="confirmPwd"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('newPwd') !== value) {
                return Promise.reject(new Error('两次密码不一致'))
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <Input.Password onPressEnter={changePwd} placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <Button block onClick={changePwd} type="primary">
          确认
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(ChangePwd)
