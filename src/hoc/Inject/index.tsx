import { App } from 'antd'
const Inject = Component => {
  const path = window.location.pathname
  return (props = {}) => {
    return (
      <App>
        <Component {...props} path={path} />
      </App>
    )
  }
}

export default Inject
