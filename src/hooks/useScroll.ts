import { useEffect, useState } from 'react'

const useScroll = (isExact: boolean = true) => {
  const [top, setTop] = useState(0)

  const calculateScrollPercentage = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
    const clientHeight = document.documentElement.clientHeight || window.innerHeight
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100
    setTop(isExact ? Math.round(scrolled) : scrolled)
  }

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollPercentage)
    calculateScrollPercentage() // calculate once on mount

    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage)
    }
  }, [])

  return {
    top
  }
}

export default useScroll
