/**
 * 判断当前滚动距离是否超过了参数的距离
 */
type Target = { current: Element } | Element
const useTranscend = (target: Target = document.querySelector('.bg')) => {
  if (!target) return false
  if ('current' in target) {
    target = target.current
  }
  return window.scrollY > Number(window.getComputedStyle(target).height?.replace('px', ''))
}

export default useTranscend
