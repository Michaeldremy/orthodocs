import React from 'react'
import styles from './Poetry.module.css'

const Poetry = ({ children }) => <pre className={styles.poetry}>{children}</pre>

export default Poetry
