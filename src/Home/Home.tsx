import React from 'react'
import styles from './Home.module.css'
import { Todo } from './Todo/Todo'

export const Home = () => {
    return <div className={styles.container}>
        <Todo />
    </div>
}