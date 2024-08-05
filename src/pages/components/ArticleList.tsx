import { Article, Loading } from '@/components'
import { observer } from 'mobx-react'
import { config } from '@/config'
const ArticleList = ({ store }) => {
  return store.loadingArticle ? (
    <Loading />
  ) : (
    <>
      {store.articleList.map((item, index) => {
        return <Article key={item.id} article={item} index={index} />
      })}
      {store.articleTotal > store.articleList.length ? (
        <div
          style={{
            textAlign: 'center',
            padding: '8px 0 20px',
            userSelect: 'none'
          }}
        >
          <span
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              store.currentPage++
              store.getArticleList(true)
            }}
          >
            加载更多
          </span>
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '8px 0 20px',
            userSelect: 'none'
          }}
        >
          {config.emptyText}
        </div>
      )}
    </>
  )
}
export default observer(ArticleList)
