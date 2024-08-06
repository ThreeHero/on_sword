import { observer } from 'mobx-react'
import { useParams } from 'react-router'
import Store from './store'
import { AnimationBg } from '@/components'
import { useMemo } from 'react'
import styles from './styles.less'
import { Content } from './components'

const Index = () => {
  const params = useParams()
  const store = useMemo(() => new Store(params.id), [])
  const { articleInfo } = store

  return (
    <div className={styles.container}>
      <AnimationBg src={articleInfo?.cover?.resource()} height="50vmin" />
      <div className={styles.header} style={{ height: '50vmin' }}>
        {!!Object.keys(articleInfo).length && (
          <div className={`${styles.containerBox} containerBox`}>
            <div className={styles.title}>{articleInfo.title}</div>
            <div className={styles.toolBar}>
              <div>{articleInfo.userInfo?.nickname}</div>
              <div>{articleInfo.viewCount}热度</div>
              {articleInfo.classifications && <div>{articleInfo.classifications?.name}</div>}
              <div>阅读{articleInfo.recommendTime}分钟</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.placeholder} />
      <div className={styles.content}>
        <div className={`containerBox ${styles.contentBox}`}>
          <Content store={store} />
        </div>
      </div>
    </div>
  )
}

export default observer(Index)
