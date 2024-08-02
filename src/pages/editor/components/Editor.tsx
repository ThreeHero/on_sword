import { observer } from 'mobx-react'
import { MDEditor } from '@/components'
import { Form, Input } from 'antd'
import { FC, useState } from 'react'

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
}
const FormEditor: FC<IProps> = ({ value, onChange }) => {
  const [_, refresh] = useState(false)
  const handleChange = (v: string) => {
    refresh(f => !f)
    onChange(v)
  }
  return <MDEditor value={value ?? ''} onChange={handleChange} />
}

const Editor = ({ store }) => {
  return (
    <>
      <Form.Item name="content">
        <FormEditor />
      </Form.Item>
      <Form.Item dependencies={['content']} noStyle>
        {({ getFieldValue, setFieldValue }) => {
          const totalCount = countWordsInMarkdown(getFieldValue('content'))
          setFieldValue('contentCount', totalCount)
          return (
            <Form.Item name="contentCount" hidden>
              <Input />
            </Form.Item>
          )
        }}
      </Form.Item>
    </>
  )
}

export default observer(Editor)
