import React from 'react'
import { foodPassTNC } from '../../constants'
import styles from '../../styles/foodPass.module.css'

const TNC = () => {
    return (
        <div style={{margin: '2rem 0'}}>
            <ul className={styles.unorderd_list}>
                {
                    foodPassTNC?.map((ele) => {
                        return (
                            <li style={{marginBottom: '1.5rem'}} key={ele?.id}>{ele?.pt}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TNC