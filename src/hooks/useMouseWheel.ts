import { useState, useEffect } from 'react'
import useScroll from './useScroll'

function useMouseWheel(callback?: (isUp: boolean) => void) {
  const { top } = useScroll(false)
  const [oldY, setOldY] = useState(top)
  const [isUp, setIsUp] = useState(false)

  useEffect(() => {
    setIsUp(oldY >= top)
    setOldY(top)
    callback?.(oldY >= top)
  }, [top])

  return {
    isUp,
    top
  }
}

export default useMouseWheel
