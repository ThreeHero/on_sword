import { observer } from 'mobx-react'
import cls from 'classnames'
import styles from './index.less'
import { Logo, MenuGroup } from './components'
import { useMouseWheel, useTitle, useTranscend } from '@/hooks'
import { useState, useEffect } from 'react'
import { config } from '@/config'

const Header = () => {
  const [hidden, setHidden] = useState<boolean>(false)
  useMouseWheel(v => setHidden(!v))
  const isBg = useTranscend()

  useTitle(config.appName)

  useEffect(() => {
    function changeTitle() {
      if (document.hidden) {
        document.title = '不要走！'
      } else {
        document.title = config.appName + '-欢迎回来！'
      }
    }

    const shield = e => e.preventDefault()
    document.addEventListener('contextmenu', shield)
    document.addEventListener('visibilitychange', changeTitle)

    return () => {
      document.removeEventListener('visibilitychange', changeTitle)
      document.removeEventListener('contextmenu', shield)
    }
  }, [])

  return (
    <div
      className={cls(styles.header, {
        [styles.hidden]: hidden && isBg,
        [styles['has-bg']]: isBg
      })}
    >
      <Logo isBg={isBg} />
      <MenuGroup />
    </div>
  )
}
export default observer(Header)
