import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

const MDNavbar = ({ value, ...rest }) => {
  return <MarkNav {...rest} source={value} />
}

export default MDNavbar
