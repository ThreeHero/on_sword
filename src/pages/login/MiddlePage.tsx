import { observer } from 'mobx-react'
import styles from './styles.less'

const MiddlePage = ({ store }) => {
  return (
    <div className={styles.middle}>
      <h1>欢迎{store.isLoginPage ? '光临' : '回来'}</h1>
      <p className={styles.desc}>
        {store.isLoginPage
          ? '输入您的个人资料，并与我们一起开始旅程'
          : '与我们保持联系请登录您的个人信息'}
      </p>
      <div className={styles.btn} onClick={() => store.changePage()}>
        {store.isLoginPage ? '注册' : '登录'}
      </div>
    </div>
  )
}

export default observer(MiddlePage)
