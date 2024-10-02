import { observer } from 'mobx-react'
import { FC, memo, useMemo } from 'react'
import styles from './styles.less'
import cls from 'classnames'

interface IProps {
  children: React.ReactNode
  noStyle?: boolean
  style?: React.CSSProperties
}

const Page: FC<IProps> = ({ children, noStyle, style }) => {
  const className = useMemo(() => {
    return cls({
      [styles.page]: !noStyle
    })
  }, [noStyle])

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
export default observer(Page)
