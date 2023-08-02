import React from 'react'
import { Alert } from 'antd'
import styles from './alert-error.module.scss'

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
