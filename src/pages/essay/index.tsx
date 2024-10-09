import { observer } from 'mobx-react'
import { config } from '@/config'
import { AnimationBg } from '@/components'
import Store from './store'
import { useMemo } from 'react'
import { Header, Content } from './components'

const Essay = () => {
  const store = useMemo(() => new Store(), [])
  return (
    <div>
      <AnimationBg src={config.essayBg} height={'50vmin'} />
      <Header store={store} />
      <Content store={store} />
    </div>
  )
}

export default observer(Essay)
