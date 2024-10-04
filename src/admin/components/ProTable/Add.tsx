import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from 'antd'
import { observer } from 'mobx-react'
import { useMemo, FC } from 'react'
import { Fragment } from 'react/jsx-runtime'
import type Store from './proStore'
import { FormItemType, IColumn, findValue } from './proStore'
import FormRow from './FormRow'

const Add: FC<{ store: Store; columns: IColumn[] }> = observer(({ store, columns }) => {
  const modalColumns = useMemo(() => {
    return columns
      .filter(column => !!column.model)
      .map(column => {
        const model = column.model as FormItemType
        const options = model.options
        return {
          ...model,
          type: model.type || (!!options ? 'select' : 'input'),
          label: model.title || findValue(['label', 'title'], column),
          name: model.name || findValue(['dataIndex', 'name', 'key', 'value'], column),
          key: findValue(['dataIndex', 'name', 'key', 'value'], column)
        }
      })
  }, [columns])

  return (
    <Fragment key="add">
      <Button type="primary" icon={<PlusOutlined />} onClick={() => (store.modalOpen = true)}>
        新增
      </Button>
      <Modal
        title="新增"
        open={store.modalOpen}
        onCancel={() => (store.modalOpen = false)}
        onOk={store.add}
        destroyOnClose
      >
        <Form form={store.modalFormInstance} autoComplete="off" preserve={false}>
          <FormRow list={modalColumns} onOk={store.add} />
        </Form>
      </Modal>
    </Fragment>
  )
})

export default Add
