import { MDEditor } from '@/components'
import { Button } from 'antd'
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
    <div>
      <MDEditor
        value={value}
        onChange={setValue}
      />
    </div>
  )
}

export default Home
