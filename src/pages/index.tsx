import { useMemo } from 'react'
import { Header, Content, Store } from './components'
import { config } from '@/config'
import { observer } from 'mobx-react'
const Home = () => {
  const store = useMemo(() => new Store(), [])
  return (
    <div>
      <img className="bg" src={config.homeBg} alt="" style={{ height: '50%' }} />
      <Header store={store} />
      <Content store={store} />
    </div>
  )
}

export default observer(Home)
