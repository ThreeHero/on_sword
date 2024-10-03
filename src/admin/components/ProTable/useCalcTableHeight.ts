import { useEffect, useState } from 'react'

const useCalcTableHeight: (ref: any, deps?: any[]) => number = (ref, deps) => {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    if (!!ref.current) {
      const windowHeight = window.innerHeight
      const headerHeight = 64
      const paginationHeight = 32 + 16 + 16
      const tableHeaderHeight = 55
      const searchBarHeight = ref.current.offsetHeight
      const contentPadding = 16
      const contentMargin = 8
      const tableHeight =
        windowHeight -
        headerHeight -
        paginationHeight -
        tableHeaderHeight -
        searchBarHeight -
        contentPadding * 2 -
        contentMargin * 2
      setHeight(tableHeight)
    }
  }, [...(deps || []), ref.current])
  return height
}
export default useCalcTableHeight
