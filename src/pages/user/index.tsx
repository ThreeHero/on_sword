import { observer } from 'mobx-react'
import { config } from '@/config'
import { AnimationBg } from '@/components'
import styles from './styles.less'
import { Tabs } from 'antd'
import { ArticleList, UserInfo, ChangePwd } from './components'
import globalStore from '@/layout/store'

const Index = () => {
  const items = [
    {
      key: 'info',
      label: '用户信息',
      children: <UserInfo />
    },
    {
      key: 'pwd',
      label: '修改密码',
      children: <ChangePwd />
    },
    {
      key: 'article',
      label: '我的文章',
      children: <ArticleList key="user" type="user" userId={globalStore.currentUser.id} />
    },
    {
      key: 'like',
      label: '我的点赞',
      children: <ArticleList key="like" type="like" userId={globalStore.currentUser.id} />
    },
    {
      key: 'collect',
      label: '我的收藏',
      children: <ArticleList key="collect" type="collect" userId={globalStore.currentUser.id} />
    }
  ]
  return (
    <div className={styles.container}>
      <AnimationBg src={config.userBg} />
      <div className={styles.content}>
        <Tabs items={items} centered tabPosition="top" className={styles.tabs} />
      </div>
    </div>
  )
}

export default observer(Index)
