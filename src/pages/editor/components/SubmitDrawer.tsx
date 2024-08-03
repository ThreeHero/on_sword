import { Button, Drawer, Form, Input, message, Radio, Select, Space, Switch, Tag } from 'antd'
import { observer } from 'mobx-react'
import globalStore from '@/layout/store'
import styles from '../styles.less'
import { FC, useEffect } from 'react'

interface IFormItemChild {
  value?: any
  onChange?: (value: any) => void
  store: any
}

/**
 * 分类列表
 */
const ClassList: FC<IFormItemChild> = observer(({ value, onChange, store }) => {
  const handleChange = (id: number, flag: boolean) => {
    if (flag && id !== value) {
      onChange(id)
      store.formInstance.setFieldValue('tagList', [])
    } else {
      onChange(null)
    }
  }

  return (
    <div>
      {store.classList.map(c => {
        return (
          <Tag.CheckableTag
            key={c.id}
            checked={value === c.id}
            onChange={checked => handleChange(c.id, checked)}
          >
            {c.name}
          </Tag.CheckableTag>
        )
      })}
    </div>
  )
})

const SubmitDrawer = ({ store }) => {
  useEffect(() => {
    if (store.submitDrawer) {
      store.getClassList()
      store.getTagList()
    }
  }, [store.submitDrawer])
  return (
    <Drawer
      open={store.submitDrawer}
      closeIcon={false}
      onClose={() => (store.submitDrawer = false)}
      title="发布文章"
      width={500}
      maskClosable={false}
      className={styles.submitDrawer}
      footer={
        <Space>
          <Button type="primary" ghost onClick={store.publish}>
            发布
          </Button>
          <Button danger ghost onClick={() => (store.submitDrawer = false)}>
            取消
          </Button>
        </Space>
      }
    >
      <Form.Item name="cover" label="封面">
        <Input.Password />
      </Form.Item>
      <Form.Item name="classificationId" label="分类">
        <ClassList store={store} />
      </Form.Item>
      <Form.Item noStyle dependencies={['classificationId']}>
        {({ getFieldValue }) => {
          if (!getFieldValue('classificationId')) return null
          return (
            <Form.Item name="tagList" label="标签">
              <Select
                placeholder="请选择标签"
                maxCount={3}
                mode="multiple"
                options={store.tagList.filter(
                  t => +t.classificationId === getFieldValue('classificationId')
                )}
                fieldNames={{
                  label: 'name',
                  value: 'id'
                }}
              />
            </Form.Item>
          )
        }}
      </Form.Item>
      <Form.Item name="isComment" label="评论" valuePropName="checked">
        <Switch checkedChildren="允许评论" unCheckedChildren="禁止评论" />
      </Form.Item>
      <Form.Item name="accessType" label="访问权限">
        <Radio.Group>
          {globalStore.dict.accessType?.map(item => {
            return (
              <Radio value={item.value} key={item.value}>
                {item.label}
              </Radio>
            )
          })}
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle dependencies={['accessType']}>
        {({ getFieldValue }) => {
          const type = getFieldValue('accessType')
          if (
            type !=
            globalStore.getDictValue({
              by: 'label',
              value: '密码访问',
              dict: 'accessType',
              findField: 'value'
            })
          )
            return null
          return (
            <Form.Item name="password" label="密码">
              <Input.Password />
            </Form.Item>
          )
        }}
      </Form.Item>
    </Drawer>
  )
}

export default observer(SubmitDrawer)
