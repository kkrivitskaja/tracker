import CreateEntry from '~components/CreateEntry/CreateEntry'
import Question from '~components/Question'

import styles from './EntryControls.module.scss'

function EntryControls() {
  return (
    <div className={styles.root}>
      <Question />
      <CreateEntry />
    </div>
  )
}
export default EntryControls
