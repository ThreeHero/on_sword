import { observer } from 'mobx-react'
import Store from './store'
import { useMemo } from 'react'

// TODO : 通知页面

const Index = () => {
  const store = useMemo(() => new Store(), [])
  return <div>1</div>
}

export default observer(Index)
