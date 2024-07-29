import { Typewriter } from '@/components'
import { useState } from 'react'
import { http } from '@/utils'
const Home = () => {
  const [value, setValue] = useState<string>('云想衣裳花想容，春风拂槛露华浓。')

  return (
    <Typewriter
      value={value}
      onClick={() => {
        setValue(' 倚阑凝望，独立渔翁满江雪。')
      }}
    />
  )
}

export default Home
