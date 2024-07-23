import { MDEditor } from '@/components'
import { useState } from 'react'

const Home = () => {
  const [value, setValue] = useState<string>(`---
theme: github
---  
  
  
# Markdown-Navbar Demo
 
## Chicken Chicken
 
Chicken Chicken Chicken Chicken Chicken.
 
* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.
* Chicken Chicken Chicken Chicken Chicken.
 
### Chicken Chicken Chicken
 
Chicken Chicken Chicken Chicken Chicken.
 
#### Chicken Chicken Chicken Chicken
 
Chicken Chicken Chicken Chicken Chicken Chicken.`)

  return (
    <div style={{ width: '', display: 'flex' }}>
      <MDEditor.Viewer value={value} onChange={setValue} />
      <MDEditor.Navbar value={value} onChange={setValue} />
    </div>
  )
}

export default Home
