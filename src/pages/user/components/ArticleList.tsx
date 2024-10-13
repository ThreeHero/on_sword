import { observer } from 'mobx-react'
import Store from '../store'
import { FC, useEffect, useMemo } from 'react'
import { ArticleTable } from '@/components'
import styles from './index.less'
import { Avatar, Button, Space } from 'antd'
import { config } from '@/config'
import globalStore from '@/layout/store'

interface IProps {
  type: string
  userId?: number | string
}

const ArticleList: FC<IProps> = ({ type, userId }) => {
  const store = useMemo(() => new Store(), [type])

  useEffect(() => {
    if (type === 'collect') {
      store.collectArticleList()
    } else if (type === 'like') {
      store.likeArticleList()
    } else {
      store.getArticleList({ type, publisherId: userId })
    }
    if (type === 'otherUser') {
      store.getOtherUserInfo(userId)
    }
  }, [type])

  const userInfo = store.otherUserInfo || {}
  return (
    <>
      {type === 'otherUser' && (
        <div className={styles.otherUserInfo}>
          {/* 头像 名称 关注按钮 */}
          <div className={styles.firstRow}>
            <Space>
              <Avatar src={userInfo?.avatar?.resource()}>
                <Avatar src={config.defaultAvatar} />
              </Avatar>
              <div>{userInfo.nickname}</div>
            </Space>
            <Button type="link" danger={store.isFollow} onClick={() => store.follow(userInfo.id)}>
              {store.isFollow ? '取消关注' : '关注'}
            </Button>
          </div>
          <div>{userInfo.introduction}</div>
        </div>
      )}
      <ArticleTable
        data={store.articleList}
        type={type}
        search={store.getArticleList}
        changePage={store.changePage}
        page={store.page}
        pageSize={store.pageSize}
        total={store.total}
        userId={userId}
      />
    </>
  )
}

export default observer(ArticleList)
