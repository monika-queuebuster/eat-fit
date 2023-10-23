import React from 'react'
import styles from '../styles/PurchaseOrder.module.css'
import Image from 'next/image'


const WhySubscribe = () => {
    return (
        <div className={styles.whysubscribe_container}>
            <div className={styles.subscribe_card} style={{backgroundImage: 'linear-gradient(281deg, rgb(145, 216, 255), rgb(124, 255, 214))'}}>
                <div className={styles.subscirbe_icons}><Image src='/assets/discount.svg' alt='discount' fill /></div>
                <p>Save upto 25% with our Exclusive Meal Plans</p>
            </div>
            <div className={styles.subscribe_card} style={{backgroundImage: 'linear-gradient(95deg, rgb(244, 197, 255), rgb(251, 151, 194))'}}>
                <div className={styles.subscirbe_icons}><Image src='/assets/convenience.svg' alt='' fill /></div>
                <p>Flexible plan: Change your plan anytime</p>
            </div>
            <div className={styles.subscribe_card}  style={{backgroundImage: 'linear-gradient(102deg, rgb(255, 194, 109), rgb(255, 217, 126))'}}>
                <div className={styles.subscirbe_icons}><Image src='/assets/healthymeals.svg' alt='' fill /></div>
                <p>Healthy homely meals everyday</p>
            </div>
            <div className={styles.subscribe_card}  style={{backgroundImage: 'linear-gradient(112deg, rgb(37, 249, 240), rgb(198, 209, 255))'}}>
                <div className={styles.subscirbe_icons}><Image src='/assets/whatsapp.png' alt='' fill /></div>
                <p>Contact our Customer Care for queries</p>
            </div>
        </div>
    )
}

export default WhySubscribe