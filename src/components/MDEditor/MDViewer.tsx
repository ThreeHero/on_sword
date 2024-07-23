import { Viewer } from '@bytemd/react'
import { plugins } from './plugins'

const MDViewer = ({ value }) => {
  return <Viewer value={value} plugins={plugins}></Viewer>
}

export default MDViewer
