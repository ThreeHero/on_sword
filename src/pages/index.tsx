import { useMemo } from 'react'
import { Header, Content, Store } from './components'
import { config } from '@/config'
import { observer } from 'mobx-react'
import { AnimationBg } from '@/components'
const Home = () => {
  const store = useMemo(() => new Store(), [])
  return (
    <div>
      <AnimationBg src={config.homeBg} height="50vh" />
      <Header store={store} />
      <Content store={store} />
    </div>
  )
}

export default observer(Home)
