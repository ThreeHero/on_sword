import styles from './styles.less'

const Loading = ({ loading, children }) => {
  return (
    <>
      {children}
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loader}></div>
        </div>
      )}
    </>
  )
}

export default Loading
