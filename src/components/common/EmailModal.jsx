import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import styles from '../../styles/components/common/EmailModal.module.css'
import { RxCross2 } from 'react-icons/rx';
import { cityData } from '../../constants';
import Image from 'next/image';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)'
    },
};

const EmailModal = ({ isOpen, closeModal, title, setUserData }) => {

    const[email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    useEffect(()=> {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        setValidEmail(emailPattern.test(email));
    },[email])

    const closeEmailPopup = () => {
        title === "Email Adderss" ? setUserData({email: email}) : setUserData({workEmail: email})
        setEmail('');
        closeModal();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.modal_size} style={customStyles}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}><p className={styles.modal_heading}>{title}</p><button className={styles.close_btn} onClick={closeModal}><RxCross2 /></button></div>
            <input type='email' placeholder='Enter your email id' className={styles.input_field} value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button className={`${styles.verify_button} ${validEmail ? styles.active : styles.not_active}`} onClick={closeEmailPopup}>Verify Email Address</button>
        </Modal>
    )
}

export default EmailModal