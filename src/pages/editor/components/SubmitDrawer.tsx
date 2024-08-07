import { Button, Drawer, Form, Input, Radio, Select, Space, Switch, Tag, Upload } from 'antd'
import { observer } from 'mobx-react'
import globalStore from '@/layout/store'
import styles from '../styles.less'
import { FC, useEffect } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import cls from 'classnames'

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

const Cover: FC<IFormItemChild> = observer(({ value, onChange, store }) => {
  const handleUpload = f => {
    onChange(f)
    return false
  }

  if (value) {
    let src = ''
    if (typeof value === 'string') {
      // @ts-ignore
      src = value.resource()
    } else {
      const URL = window.URL
      src = URL.createObjectURL(value)
    }
    return (
      <div className={styles.coverBox}>
        <img
          src={src}
          alt=""
          className={cls(styles.cover, {
            [styles.darkImg]: globalStore.isDark
          })}
        />
        <DeleteOutlined className={styles.delete} onClick={() => onChange(null)} />
      </div>
    )
  }
  return (
    <Upload maxCount={1} beforeUpload={handleUpload} showUploadList={false}>
      <div className={styles.upload}>
        <PlusOutlined className={styles.plus} />
        <div className={styles.explain}>上传封面</div>
      </div>
    </Upload>
  )
})

const SubmitDrawer = ({ store }) => {
  useEffect(() => {
    if (store.submitDrawer) {
      store.getClassList()
      // store.getTagList()
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
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="publisherId" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="cover" label="封面">
        <Cover store={store} />
      </Form.Item>
      <Form.Item name="classificationId" label="分类">
        <ClassList store={store} />
      </Form.Item>
      <Form.Item noStyle dependencies={['classificationId']}>
        {({ getFieldValue }) => {
          console.log(
            store.tagList.filter(
              (t: any) => +t.classificationId === getFieldValue('classificationId')
            ),
            getFieldValue('tagList')
          )
          if (!getFieldValue('classificationId')) return null
          return (
            <Form.Item name="tagList" label="标签">
              <Select
                placeholder="请选择标签"
                maxCount={3}
                mode="multiple"
                options={store.tagList.filter(
                  (t: any) => +t.classificationId === getFieldValue('classificationId')
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
