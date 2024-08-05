import { observer } from 'mobx-react'
import { useParams } from 'react-router'
import Store from './store'
import { AnimationBg } from '@/components'
import { useMemo } from 'react'

const Index = () => {
  const params = useParams()
  const store = useMemo(() => new Store(params.id), [])
  return (
    <div>
      <AnimationBg src={store.articleInfo?.cover?.resource()} height="50vh" />
    </div>
  )
}

export default observer(Index)
