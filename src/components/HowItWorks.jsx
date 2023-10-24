import Image from 'next/image'
import React from 'react'
import styles from '../styles/PurchaseOrder.module.css'


const HowItWorks = () => {
    return (
        <div className={styles.howitworks_container}>
            <div className={styles.howitworks_step}>
                <div style={{height: '3.5rem', width: '3.5rem', position: 'relative'}}><Image src='/assets/packDetail.jpeg' alt='pack detail' fill /></div>
                <p>Our fresh meals will be delivered daily at your chosen time and address</p>
            </div>
            <div className={styles.howitworks_step}>
                <div style={{height: '3.5rem', width: '3.5rem', position: 'relative'}}><Image src='/assets/pauseResume.jpeg' alt='pause resume' fill /></div>
                <p>Full flexibility in meal change, delivery time and address</p>
            </div>
            <div className={styles.howitworks_step}>
                <div style={{height: '3.5rem', width: '4.5rem', position: 'relative'}}><Image src='/assets/refund.png' alt='refund' fill /></div>
                <p>Reach out to our Customer Support via Whatsapp and share your feedback. We are always here to hear from you!</p>
            </div>
        </div>
    )
}

export default HowItWorks