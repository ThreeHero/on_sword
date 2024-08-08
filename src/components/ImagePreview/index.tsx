import {
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons'
import { Modal } from 'antd'
import { observer } from 'mobx-react'
import { useState } from 'react'
import styles from './styles.less'
import globalStore from '@/layout/store'
import cls from 'classnames'

const ImagePreview = ({ imgList, visible, onCancel }) => {
  const [rotate, setRotate] = useState(0)
  const [reversal, setReversal] = useState([1, 1, 1])
  const [scale, setScale] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)

  const rotateImage = v => {
    setRotate(rotate => rotate + v)
  }

  const reversalImage = index => {
    const newReversal = [...reversal]
    newReversal[index] = reversal[index] * -1
    setReversal(newReversal)
  }

  const scaleImage = (n, v) => {
    setScale(scale => scale + n)
    const newReversal = [...reversal]
    newReversal[0] = reversal[0] * v
    newReversal[1] = reversal[1] * v
    setReversal(newReversal)
  }
  // const downloadImage = () => {
  //   const a = document.createElement('a')
  //   a.href = file
  //   a.download = 'image'
  //   a.click()
  // }
  return (
    <Modal open={visible} onCancel={onCancel} width={'90vw'} footer={false} closable={false}>
      <div className={styles['preview-image-container']}>
        <img
          key={imgIndex}
          className={cls(styles['preview-image'], {
            [styles.darkImg]: globalStore.isDark
          })}
          src={imgList[imgIndex]?.url}
          alt=""
          style={{
            transform: `translate3d(${scale}px, 0px, 0px) rotate(${rotate}deg) scale3d(${reversal})`
          }}
        />
        <div className={styles['preview-image-toolbar']}>
          {imgList.length > 1 && (
            <LeftOutlined
              className={styles['preview-image-toolbar-item']}
              onClick={() => {
                if (imgIndex <= 0) {
                  setImgIndex(imgList.length - 1)
                } else {
                  setImgIndex(imgIndex - 1)
                }
              }}
            />
          )}
          <SwapOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={() => reversalImage(0)}
          />
          <SwapOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={() => reversalImage(1)}
            style={{ transform: 'rotate(90deg)' }}
          />
          <RotateLeftOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={() => rotateImage(-90)}
          />
          <RotateRightOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={() => rotateImage(90)}
          />
          <ZoomOutOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={() => scaleImage(-0.25, 1 / 1.5)}
          />
          <ZoomInOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={() => scaleImage(0.25, 1.5)}
          />
          {imgList.length > 1 && (
            <RightOutlined
              onClick={() => {
                if (imgIndex >= imgList.length - 1) {
                  setImgIndex(0)
                } else {
                  setImgIndex(imgIndex + 1)
                }
              }}
            />
          )}
          {/* <DownloadOutlined
            className={styles['preview-image-toolbar-item']}
            onClick={downloadImage}
          /> */}
        </div>
      </div>
    </Modal>
  )
}

export default observer(ImagePreview)
