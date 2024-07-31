// @ts-nocheck
import { useState, createContext, useContext } from 'react'

const Demo = () => {
  const [value, setValue] = useState(0)
  const [childValue, setChildValue] = useState('a')
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
      }}
    >
      <Switch value={value} onChange={setValue}>
        <Case value={0}>0</Case>
        <Case value={1}>
          <Switch value={childValue} onChange={setChildValue}>
            <Case value={'a'}>a</Case>
            <Case value={'b'}>b</Case>
            <Case value={'c'}>c</Case>
            <Case value={'d'}>d</Case>
          </Switch>
        </Case>
        <Case value={2}>2</Case>
        <Case value={3}>3</Case>
      </Switch>
    </div>
  )
}

export default Demo

const switchContext = createContext()

const Switch = ({ value: activeValue, onChange, children }) => {
  children = Array.isArray(children) ? children : [children]
  activeValue ??= children?.[0]?.props?.value
  const result = children.map(item => {
    const value = item.props.value
    return (
      <div key={value} style={{ display: value === activeValue ? 'block' : 'none' }}>
        {item.props.children}
      </div>
    )
  })
  return (
    <>
      <switchContext.Provider value={{ activeValue, onChange }}>{children}</switchContext.Provider>
      {result}
    </>
  )
}

const Case = ({ value, children }) => {
  const ctx = useContext(switchContext)
  return (
    <div
      onClick={() => {
        if (ctx.activeValue !== value) {
          ctx.onChange(value)
        }
      }}
      style={{ padding: 6, border: '1px solid #000', cursor: 'pointer' }}
    >
      {value}
    </div>
  )
}
