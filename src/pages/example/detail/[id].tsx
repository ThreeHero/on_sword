import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { MDEditor } from '@/components'
const Home = () => {
  const params = useParams()
  const [content, setContent] = useState<string>('')
  // useEffect(() => {
  //   fetch('http://127.0.0.1:30000/articles/' + params.id)
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(res => {
  //       const result = res.data.content
  //       setContent(result)
  //     })
  // }, [])

  return (
    <>
      <div style={{ width: 980, margin: '0 auto' }}>
        <MDEditor.Viewer value={content} onChange={setContent} />
      </div>
      <div style={{ position: 'fixed', top: 40, right: 10, width: 300 }}>
        <MDEditor.Navbar value={content} />
      </div>
    </>
  )
}

export default Home
