import { Form, Input, Modal } from 'antd'
import { observer } from 'mobx-react'
import { useMemo, FC } from 'react'
import type Store from './proStore'
import { FormItemType, IColumn, findValue } from './proStore'
import FormRow from './FormRow'

const ActionModal: FC<{ store: Store; columns: IColumn[] }> = observer(({ store, columns }) => {
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

  const isEdit = !!store.rowRecord.id

  return (
    <Modal
      title={isEdit ? '编辑' : '新增'}
      open={store.modalOpen}
      onCancel={() => (store.modalOpen = false)}
      onOk={isEdit ? store.edit : store.add}
      destroyOnClose
    >
      <Form form={store.modalFormInstance} autoComplete="off" preserve={false}>
        {isEdit && (
          <Form.Item name="id" hidden initialValue={store.rowRecord.id}>
            <Input />
          </Form.Item>
        )}
        <FormRow
          list={modalColumns}
          onOk={isEdit ? store.edit : store.add}
          initialValues={isEdit ? store.rowRecord : {}}
        />
      </Form>
    </Modal>
  )
})

export default ActionModal
