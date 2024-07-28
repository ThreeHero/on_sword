// @ts-ignore
import zhHans from 'bytemd/locales/zh_Hans.json' //默认是英文版，我们替换成中文的
import MDViewer from './MDViewer'
import MDNavbar from './MDNavbar'
import { FC } from 'react'
import { Editor } from '@bytemd/react'
import { plugins } from './plugins'
import { Image } from 'mdast'

import './editor.css'

interface IProps {
  value?: string
  onChange?: (value: string) => any
  uploadImages?: (files: File[]) => Promise<Pick<Image, 'url' | 'alt' | 'title'>[]>
}

interface IExportComponent {
  Viewer: any
  Navbar: any
}

const MDEditor: FC<IProps> & IExportComponent = ({ value, onChange, uploadImages, ...props }) => {
  return (
    <Editor
      {...props}
      locale={zhHans}
      plugins={plugins}
      value={value}
      onChange={onChange}
      uploadImages={uploadImages}
      editorConfig={{
        tabSize: 2
      }}
    />
  )
}

MDEditor.Viewer = MDViewer
MDEditor.Navbar = MDNavbar
export default MDEditor
