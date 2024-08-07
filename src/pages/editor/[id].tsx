import { observer } from 'mobx-react'
import Editor from './index'
import { useParams } from 'react-router'

const Index = () => {
  const params = useParams()
  return <Editor params={params} />
}

export default observer(Index)
