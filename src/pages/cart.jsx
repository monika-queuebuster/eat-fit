import React, { useEffect, useState } from 'react';
import styles from '../styles/cart.module.css'
import { getCartItems, updateCartItem, deleteCartItem } from '../services/apiServices';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from '../components/common/DeleteConfirmation';

const cart = ({setCartCount}) => {

    const [cartItems, setCartItems] = useState();
    const [open, setOpen] = useState(false);
    const [remove, setRemove] = useState({ status: false, id: null });
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        getItem();
    }, []);

    useEffect(()=> {
        cartItems?.map((ele)=> setAmount(amount + ele?.price));
    }, [cartItems])

    useEffect(() => {
        if (remove?.status === true) {
            deleteItem(remove?.id)
        }
    }, [remove?.status])

    const getItem = () => {
        getCartItems().then((res) => {
            if (res?.status === 200) {
                setCartItems(res?.data)
                setCartCount(res?.data?.length)
            }
        }).catch((err) => toast.error(err));
    }

    const updateCart = (data, cartId) => {
        updateCartItem(data, cartId).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message);
            }
        }).catch((err) => toast.error(err));
    }

    const deleteItem = (cartId) => {
        deleteCartItem(cartId).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message);
                getItem()
            }
        }).catch((err) => toast.error(err));
    }

    const handleDecQty = (ele, idx, cartId) => {
        const newArray = ele;
        let price = ele?.price / ele?.meal_qty;
        newArray.meal_qty >= 2 ? newArray.meal_qty = newArray?.meal_qty - 1 : openDeleteModal(cartId)
        newArray.price = price * newArray?.meal_qty;
        const updatedArray = [newArray, ...cartItems.slice(1)]
        updateCart(updatedArray[idx], cartId);
        setCartItems(updatedArray)
    }

    const handleIncQty = (idx, cartId) => {
        const newArray = cartItems?.map((obj, index) => {
            if (index === idx) {
                let price = obj?.price / obj?.meal_qty;
                obj.meal_qty = obj?.meal_qty + 1
                obj.price = price * obj?.meal_qty;
            }
            return obj;
        });
        updateCart(newArray[idx], cartId);
        setCartItems(newArray)
    }

    const openDeleteModal = (eleId) => {
        setOpen(true)
        setRemove({ ...remove, id: eleId })
    }

    return (
        <>
            <DeleteConfirmation isOpen={open} closeModal={() => setOpen(false)} setRemove={setRemove} remove={remove} />
            <div className={styles.cart_container}>
                <div className={styles.cart_heading}>Your Cart</div>
                <div className={styles.cart_distribution}>
                    <div className={styles.cart_items}>
                        {
                            cartItems?.map((ele, idx) => {
                                return (
                                    <div className={styles.cart_ele}>
                                        <div style={{ display: 'flex', gap: '4rem' }}><p className={styles.item_title}>{ele?.meal?.title}</p><span><RiDeleteBin6Line className={styles.remove_icon} onClick={() => openDeleteModal(ele?._id)} /></span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className={styles.food_desc}>{ele?.meal?.description}</p>
                                            <img src={ele?.meal?.img} alt='food_img' className={styles.item_img} />
                                        </div>
                                        <div className={styles.pricing_container}>
                                            <p className={styles.meal_price}>₹ {ele?.price}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                                <button className={styles.inc_btn} onClick={() => handleDecQty(ele, idx, ele?._id)}> - </button>
                                                <span className={styles.qty}>{ele?.meal_qty}</span>
                                                <button className={styles.dec_btn} onClick={() => handleIncQty(idx, ele?._id)}> + </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.total_price}>
                        <div className={styles.price_heading}>PRICE DETAILS</div>
                        <div className={styles.calculation_section}>
                            <p style={{ marginBottom: '2rem' }}><span>Price</span> <span>₹ {amount}</span></p>
                            <p style={{ marginTop: '2rem' }}><span>Delivery Charges</span> <span>₹ 30</span></p>
                        </div>
                        <p className={styles.total_amount}><span>Total Amount</span><span>₹ {amount + 30}</span></p>
                        <p className={styles.free_order_text}>Add Product worth ₹ 120 more to get FREE delivery on your order.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default cart