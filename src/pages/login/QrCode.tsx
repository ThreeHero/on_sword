import { Popover, QRCode } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

const QrCode = ({ children, store, hidden }) => {
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    if (store.isPolling) {
      store.qrStatus = 'loading'
      store.polling()
      store.qrTimer = setInterval(store.polling, 1000)
    }

    return () => {}
  }, [store.isPolling, refresh])

  return (
    !hidden && (
      <Popover
        open={!!store.isPolling && store.isLoginPage}
        trigger="click"
        content={
          <QRCode
            value={store.uuid ?? ' '}
            bordered={false}
            status={store.qrStatus}
            onRefresh={() => {
              store.isPolling = true
              setRefresh(f => !f)
            }}
          />
        }
      >
        {children}
      </Popover>
    )
  )
}
export default observer(QrCode)
