import React, { useState } from 'react'
import { breakfastData } from '@/constants'
import { useRouter } from 'next/router'
import Image from 'next/image';
import styles from '../../styles/PurchaseOrder.module.css'

const purchaseDetail = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Upcoming meals");
    const [foodType, setFoodType] = useState("Non veg")
    const [purchaseType, setPurchaseType] = useState("Monthly")
    const [includeWeekends, setIncludeWeekends] = useState(false);

    return (
        <div className={styles.purchase_page}>
            <div>
                <div className={styles.food_img}><Image src='' alt='' fill /></div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className={`${styles.tab_element} ${activeTab === "Upcoming meals" && styles.active_tab}`} onClick={() => setActiveTab("Upcoming meals")}>Upcoming meals</div>
                    <div className={`${styles.tab_element} ${activeTab === "How it works" && styles.active_tab}`} onClick={() => setActiveTab("How it works")}>How it works</div>
                    <div className={`${styles.tab_element} ${activeTab === "Why subscribe" && styles.active_tab}`} onClick={() => setActiveTab("Why subscribe")}>Why subscribe</div>
                    <div className={`${styles.tab_element} ${activeTab === "FAQ" && styles.active_tab}`} onClick={() => setActiveTab("FAQ")}>FAQ</div>
                </div>
            </div>
            <div>
                <h1 className={styles.meal_heading}>HRX Protein Meal</h1>
                <p className={styles.meal_para}>This HRX Meals are packed with protein from whole, clean ingredients that not only ups your protein per meal but also provides fibre. This pack fills you with both satiety and variety.</p>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div className={styles.data_container}>
                        <div className={styles.variable_data}>
                            <p className={styles.prev_price}>₹ 7836</p>
                            <p>₹ 3918</p>
                            <p>for 22 days</p>
                        </div>
                        <div className={styles.variable_box}>
                            <div className={styles.selectable_box}>
                                <div onClick={() => setFoodType("Veg")} className={`${styles.type_container} ${foodType === "Veg" && styles.selected_type}`} style={{ borderRight: '1px solid rgb(231, 231, 231)' }}>Veg</div>
                                <div onClick={() => setFoodType("Non veg")} className={`${styles.type_container} ${foodType === "Non veg" && styles.selected_type}`}>Non veg</div>
                            </div>
                            <div className={styles.selectable_box}>
                                <div onClick={() => setPurchaseType("Monthly")} className={`${styles.type_container} ${purchaseType === "Monthly" && styles.selected_type}`} style={{ borderRight: '1px solid rgb(231, 231, 231)' }}>Monthly</div>
                                <div onClick={() => setPurchaseType("Weekly")} className={`${styles.type_container} ${purchaseType === "Weekly" && styles.selected_type}`}>Weekly</div>
                            </div>
                            <div>
                                <label className={styles.switch}>
                                    <input type="checkbox" />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                </label>
                                <span className={styles.checkbox_label}>Include Weekends</span>
                            </div>
                        </div>
                    </div>
                    <button className={styles.subscribe_btn}>Subscribe Meal Plan</button>
                    <hr style={{border: '1.2px solid #d8d8d8', width: '97%', textAlign: 'center'}} />
                </div>
            </div>
        </div>
    )
}

export default purchaseDetail