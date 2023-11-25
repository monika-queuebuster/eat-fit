import React, { useState } from 'react'
import Modal from 'react-modal';
import styles from '../../styles/components/common/EmailModal.module.css'
import { RxCross2 } from 'react-icons/rx';
import { addCartItem } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)'
    },
};

const CartModal = ({ isOpen, closeModal, selectedItem, setSelectedItem, quantity, setQuantity }) => {

    const router = useRouter();

    const addToCart = () => {
        const item = {
            meal_id: selectedItem?._id,
            meal_price: selectedItem?.discount_price * quantity,
            meal_qty: quantity
        }
        addCartItem(item).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message);
                router.push('/cart');
                closeModal()
            }
        }).catch((err) => toast.error(err))
    }

    const handleDecQty = () => {
        quantity >= 1 ? setQuantity(quantity - 1) : setQuantity(0)
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.cart_modal_size} style={customStyles}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><p className={styles.cart_heading}>Shop Now</p></div>
            <div className={styles.first_row}>
                <img src={selectedItem?.img} className={styles.modal_image} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <p className={styles.item_name}>{selectedItem?.title}</p>
                        <p className={styles.item_price}>₹ {selectedItem?.discount_price}</p>
                    </div>
                    <div className={styles.qty_container}>
                        <p>Quantity</p>
                        <div className={styles.qty_manage}>
                            <button onClick={handleDecQty} className={styles.dec_btn}> - </button>
                            <span className={styles.qty}>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className={styles.inc_btn}> + </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.second_row}>
                <div className={styles.total_container}>
                    <p className={styles.total_text}>TOTAL UNIT</p>
                    <p className={styles.total_text}>{quantity}</p>
                </div>
                <div className={styles.total_container}>
                    <p className={styles.total_text}>TOTAL AMOUNT</p>
                    <p className={styles.total_text}>{selectedItem?.discount_price * quantity}</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className={styles.cart_close_btn} onClick={closeModal}><RxCross2 /></button><button className={styles.add_to_cart_btn} onClick={addToCart}>Add to Cart</button>
            </div>
        </Modal>
    )
}

export default CartModal