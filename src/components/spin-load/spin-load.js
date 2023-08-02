import React from 'react'
import { Spin } from 'antd'
import styles from './spin-load.module.scss'

const Spinner = () => {
  return <Spin className={styles.spinner} size="large"></Spin>
}

export default Spinner
