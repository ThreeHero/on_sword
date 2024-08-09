import { observer } from 'mobx-react'
import Store from '../store'
import { FC, useEffect, useMemo } from 'react'
import { ArticleTable } from '@/components'

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
  }, [type])
  return <ArticleTable data={store.articleList} type={type} />
}

export default observer(ArticleList)
