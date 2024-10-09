import { observer } from 'mobx-react'
import { config } from '@/config'
import { AnimationBg } from '@/components'
import styles from './styles.less'
import { useParams } from 'react-router'
import { ArticleList } from './components'
import { Space, Avatar } from 'antd'

const Index = () => {
  const params = useParams()
  return (
    <div className={styles.container}>
      <AnimationBg src={config.userBg} />
      <div className={styles.content}>
        {/* todo 关注 */}
        <div></div>
        <ArticleList type="otherUser" key={'otherUser' + params.id} userId={params.id} />
      </div>
    </div>
  )
}

export default observer(Index)
