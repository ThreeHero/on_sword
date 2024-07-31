import { observer } from 'mobx-react'
import cls from 'classnames'
import styles from './index.less'
import { Logo, MenuGroup } from './components'
import { useMouseWheel, useTranscend } from '@/hooks'
import { useState } from 'react'

const Header = () => {
  const [hidden, setHidden] = useState<boolean>(false)
  useMouseWheel(v => setHidden(!v))
  const isBg = useTranscend()

  return (
    <div
      className={cls(styles.header, {
        [styles.hidden]: hidden,
        [styles['has-bg']]: isBg
      })}
    >
      <Logo isBg={isBg} />
      <MenuGroup />
    </div>
  )
}
export default observer(Header)
