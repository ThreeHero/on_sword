import { useState, useEffect, useRef, FC } from 'react'
import cls from 'classnames'
import styles from './styles.less'
import { debounce } from 'lodash-es'

interface IProps {
  value: string
  speed?: number
  className?: string
  noStyle?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}
const Typewriter: FC<IProps> = ({
  value,
  speed = 300,
  onClick,
  className,
  noStyle = false,
  style
}) => {
  // 显示的文字
  const [displayText, setDisplayText] = useState<string>('')
  // 显示到的索引
  const [index, setIndex] = useState<number>(0)
  // 打字方向
  const [flag, setFlag] = useState<boolean>(true)

  // 定时器
  const timer = useRef(null)

  useEffect(() => {
    if (index <= 0 && !flag) {
      setFlag(true)
    }
    if (index >= value.length && flag) {
      setFlag(false)
    }
  }, [value, speed, index])

  useEffect(() => {
    const speedMap = {
      0: speed * 2,
      [value.length]: speed * 4
    }
    timer.current = setTimeout(() => {
      if (flag) {
        setDisplayText(prev => prev + (value[index] ?? ''))
        setIndex(prev => prev + 1)
      } else {
        setDisplayText(prev => prev.substring(0, prev.length - 1))
        setIndex(prev => prev - 1)
      }
    }, speedMap[index] || speed)

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [value, speed, flag, index])

  const handleClick = debounce(() => {
    setFlag(false)
    // 用于设置文字
    onClick?.()
  }, speed)

  return (
    <div
      className={cls(className, { [styles.typewriter]: !noStyle })}
      onClick={handleClick}
      style={style}
    >
      {displayText}
    </div>
  )
}

export default Typewriter
