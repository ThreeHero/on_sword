// @ts-ignore
import zhHans from 'bytemd/locales/zh_Hans.json' //默认是英文版，我们替换成中文的
import MDViewer from './MDViewer'
import MDNavbar from './MDNavbar'
import React, { FC } from 'react'
import { Editor } from '@bytemd/react'
import { plugins } from './plugins'

import './editor.css'

interface IProps {
  value?: string
  onChange?: (value: string) => any
  uploadImages?: (files: File[]) => any
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
    />
  )
}

MDEditor.Viewer = MDViewer
MDEditor.Navbar = MDNavbar
export default MDEditor
