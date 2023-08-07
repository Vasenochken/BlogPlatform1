import React from 'react'
import { Alert } from 'antd'
import styles from './AlertError.module.scss'

const AlertError = ({ message }) => {
  return (
    <Alert
      className={styles.alert_error}
      message="Error"
      description={message}
      type="error"
      showIcon
    />
  )
}

export default AlertError
