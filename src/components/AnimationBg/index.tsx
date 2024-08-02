const AnimationBg = ({ src, height = '100vh' }) => {
  return (
    <>
      <div className="bg" style={{ height }} />
      <img className="img-bg" src={src} style={{ height }} alt="" />
    </>
  )
}

export default AnimationBg
