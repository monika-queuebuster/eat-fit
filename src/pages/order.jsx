import React, { useEffect, useState } from 'react';
import styles from '../styles/order.module.css';
import { getMealList } from '../services/apiServices';
import { toast } from 'react-toastify';
import CartModal from '../components/common/CartModal';

const order = ({ quantity, setQuantity }) => {
    const [data, setData] = useState();
    const [mealType, setMealType] = useState('all');
    const [veg, setVeg] = useState(false);
    const [cartModal, setCartModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        getAllMeal();
    }, [mealType])

    const getAllMeal = () => {
        mealType === "all" ?
            getMealList().then((res) => {
                if (res?.status === 200) {
                    setData(res?.data);
                }
            }).catch((err) => toast.error(err))
            :
            getMealList(mealType).then((res) => {
                if (res?.status === 200) {
                    setData(res?.data);
                }
            }).catch((err) => toast.error(err))
    }

    return (
        <>
            <CartModal isOpen={cartModal} closeModal={() => setCartModal(false)} selectedItem={selectedItem} setSelectedItem={setSelectedItem} quantity={quantity} setQuantity={setQuantity} />
            <div className={styles.page_container}>
                <div className={styles.filter_bar}>
                    <select onChange={(e) => setMealType(e.target.value)} className={styles.dropdown}>
                        <option value='all'>All</option>
                        <option value='breakfast'>Breakfast</option>
                        <option value='lunch'>Lunch</option>
                        <option value='dinner'>Dinner</option>
                    </select>

                    <div className={styles.checkbox_content}><input type='checkbox' /> <span>Veg Only</span></div>
                </div>
                <h1 className={styles.heading}>{mealType === 'all' ? "All Meals" : mealType === 'breakfast' ? "Breakfast Meals" : mealType === 'lunch' ? "Lunch Meal" : "Dinner Meals"}</h1>
                <div className={styles.items_container}>
                    {
                        data?.map((ele) => {
                            return (
                                <div key={ele?._id} className={styles.food_item}>
                                    <img src={ele?.img} alt='meal' className={styles.food_img} />
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <span className={styles.d_price}>₹{ele?.discount_price}</span>
                                        <span className={styles.price}>₹{ele?.price}</span>
                                        <span className={styles.percent_off}>{`${Math.round((ele?.price - ele?.discount_price) * 100 / ele?.price)}%`}</span>
                                    </div>
                                    <p className={styles.food_title}>{ele?.title}</p>
                                    <button className={styles.cart_btn} onClick={() => (setSelectedItem(ele), setCartModal(true))}>Add to cart</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default order