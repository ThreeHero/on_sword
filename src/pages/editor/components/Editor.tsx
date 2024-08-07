import { observer } from 'mobx-react'
import { MDEditor } from '@/components'
import { Form, Input } from 'antd'
import { FC, useEffect, useState } from 'react'
import { getCache, http, setCache } from '@/utils'
import globalStore from '@/layout/store'

/**
 * 统计markdown中 有效字符
 * @param text 字符
 * @returns 有效字符
 */
function countWordsInMarkdown(text: string) {
  if (!text) return 0
  // 去掉Markdown格式的标记
  const cleanText = text.replace(/[\*\_\[\]\(\)\!\#\`\~\>\-\+\=\|]/g, '')

  // 统计汉字数量
  const chineseCharacters = cleanText.match(/[\u4e00-\u9fff]/g) || []
  const chineseCount = chineseCharacters.length

  // 统计英文单词数量
  const englishWords = cleanText.match(/\b[a-zA-Z]+\b/g) || []
  const englishCount = englishWords.length

  // 统计数字数量
  const numberWords = cleanText.match(/\d/g) || []
  const numberCount = numberWords.length

  // 总数
  const totalCount = chineseCount + englishCount + numberCount
  return totalCount
}

interface IProps {
  value?: string
  onChange?: (v: string) => void
  store: any
}
const FormEditor: FC<IProps> = ({ value, onChange, store }) => {
  const [_, refresh] = useState(false)
  const handleChange = (v: string) => {
    refresh(f => !f)
    onChange(v)
    store.formInstance.setFieldValue('contentCount', countWordsInMarkdown(v))
    if (globalStore.currentUser) {
      // @ts-ignore
      setCache(globalStore.currentUser?.id + '_article', v, false)
    }
  }

  const handleUpload = async (files: File[]) => {
    const pathList = []
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      // @ts-ignore
      formData.append('path', 'article/' + globalStore.currentUser.account)
      const path = await http.post('/file/upload', formData)
      pathList.push({
        url: path?.resource(),
        alt: file.name,
        title: file.name
      })
    }

    return pathList
  }

  return <MDEditor value={value ?? ''} onChange={handleChange} uploadImages={handleUpload} />
}

const Editor = ({ store }) => {
  useEffect(() => {
    if (globalStore.currentUser) {
      // @ts-ignore
      const content = getCache(globalStore.currentUser?.id + '_article', false)
      if (content) {
        store.formInstance.setFieldValue('content', content)
        store.formInstance.setFieldValue('contentCount', countWordsInMarkdown(content))
      }
    }
  }, [])

  return (
    <>
      <Form.Item name="content">
        <FormEditor store={store} />
      </Form.Item>
      <Form.Item name="contentCount" hidden>
        <Input />
      </Form.Item>
    </>
  )
}

export default observer(Editor)
