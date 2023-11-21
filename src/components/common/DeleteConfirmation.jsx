import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import styles from '../../styles/components/common/DeleteModal.module.css'
import { RxCross2 } from 'react-icons/rx';


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)'
    },
};

const DeleteConfirmation = ({ isOpen, closeModal, setRemove, remove }) => {

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.modal_size} style={customStyles}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={styles.modal_heading}>Are you sure you want to Remove ?</p>
                <button className={styles.close_btn} onClick={closeModal}><RxCross2 /></button>
            </div>
            <div className={styles.btn_container}>
                <button onClick={() => (setRemove({ ...remove, status: true }), closeModal())} className={styles.btn}>Confirm</button>
                <button onClick={() => closeModal()} className={styles.btn}>Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteConfirmation