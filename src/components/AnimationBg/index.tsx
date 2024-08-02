import cls from 'classnames'
import { observer } from 'mobx-react'
import { FC } from 'react'
import globalStore from '@/layout/store'

interface IProps {
  src: string
  height?: string
}
const AnimationBg: FC<IProps> = ({ src, height = '100vh' }) => {
  return (
    <>
      <div className="bg" style={{ height }} />
      <img
        className={cls('img-bg', {
          'dark-bg': globalStore.isDark
        })}
        src={src}
        style={{ height }}
        alt=""
      />
    </>
  )
}

export default observer(AnimationBg)
