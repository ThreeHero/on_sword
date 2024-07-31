import { Typewriter } from '@/components'
import { useState } from 'react'
const Home = () => {
  const [value, setValue] = useState<string>('云想衣裳花想容，春风拂槛露华浓。')

  return (
    <div>
      <img className="bg" src={require('@/assets/bg/login_bg.png')} alt="" />
      {new Array(1000).fill(0).map((item, index) => {
        return <p key={index}>{index}</p>
      })}
    </div>
  )
}

export default Home
