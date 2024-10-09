import styles from './styles.less'
import { Avatar } from 'antd'
import { config } from '@/config'
import { parseContent } from '@/utils'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { useState } from 'react'
import ImagePreview from '../ImagePreview'
import { observer } from 'mobx-react'
import moment from 'moment'

const EssayItem = ({ essay, remove, showComment }) => {
  const [content, imgList] = parseContent(essay.content)
  const [selectedImgList, setSelectedImgList] = useState([])
  const [imgPreview, setImgPreview] = useState(false)

  return (
    <div className={styles.essay}>
      <div className={styles.avatar}>
        <Avatar src={essay.publisher?.avatar?.resource()} shape="square">
          <Avatar src={config.defaultAvatar} shape="square" />
        </Avatar>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.name}>{essay.publisher.nickname}</div>
        </div>
        <div className={styles.content}>
          {content}
          {/* 图片预览 */}
          <div className={styles.imgList}>
            {imgList.length > 0 &&
              (imgList as any).map((img, index) => {
                if (index > 3) return null
                return (
                  <img
                    src={img.url}
                    key={img.url}
                    title={img.name}
                    className={cls(styles.img, {
                      [styles.darkImg]: globalStore.isDark
                    })}
                    onClick={() => {
                      // @ts-ignore
                      setSelectedImgList(imgList)
                      setImgPreview(true)
                    }}
                  />
                )
              })}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.subInfo}>
            <div className={styles.time}>{moment(essay.createdAt).format('YYYY-MM-DD')}</div>
            <div>{essay.region}</div>
          </div>
          <div className={styles.action}>
            <div className={styles.comment} onClick={() => showComment(essay.id)}>
              留言 {essay.childCommentCount}
            </div>
            {globalStore.currentUser?.id === essay.publisherId && (
              <div className={styles.delete} onClick={() => remove(essay.id)}>
                删除
              </div>
            )}
          </div>
        </div>
      </div>
      <ImagePreview
        imgList={selectedImgList}
        visible={imgPreview}
        onCancel={() => setImgPreview(false)}
      />
    </div>
  )
}

export default observer(EssayItem)
