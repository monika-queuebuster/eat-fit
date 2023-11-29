import React, { useEffect, useState } from 'react'
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next/router'
import { categoryMeals } from '../../services/apiServices';
import { toast } from 'react-toastify';
import CartModal from '../../components/common/CartModal';

const categoryItems = ({ quantity, setQuantity }) => {
    const router = useRouter();
    const slug = router.query;
    const [data, setData] = useState();
    const [cartModal, setCartModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {

        if (slug?.id) {
            categoryMeals(slug?.id).then((res) => {
                if (res?.status === 200) {
                    setData(res?.data);
                }
            }).then((err) => toast.error(err))
        }
    }, [slug?.id])


    return (
        <>
            <CartModal
                isOpen={cartModal}
                closeModal={() => setCartModal(false)}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                quantity={quantity}
                setQuantity={setQuantity}
            />
            <div className={styles.expanded_meal_container}>
                {
                    data?.map((ele) => {
                        return (
                            <div key={ele?._id} className={styles.food_container}>
                                <img
                                    src={ele?.img}
                                    alt={ele?.slug}
                                    className={styles.food_items_img}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    <span className={styles.d_price}>
                                        ₹{ele?.discount_price}
                                    </span>
                                    <span className={styles.price}>₹{ele?.price}</span>
                                    <span className={styles.percent_off}>{`${Math.round(
                                        ((ele?.price - ele?.discount_price) * 100) /
                                        ele?.price
                                    )}%`}</span>
                                </div>
                                <p>{ele?.title}</p>
                                <button
                                    className={styles.cart_btn}
                                    onClick={() => (
                                        setSelectedItem(ele), setCartModal(true)
                                    )}
                                >
                                    Add to cart
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default categoryItems