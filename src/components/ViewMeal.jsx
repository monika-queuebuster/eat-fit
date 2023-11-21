import React, { useEffect, useState } from 'react'
import { deleteMeal, getMealList } from '../services/apiServices';
import styles from '../styles/components/Category.module.css';
import { toast } from 'react-toastify';
import { SlOptions } from 'react-icons/sl';
import { IoMdRadioButtonOn } from "react-icons/io";

const ViewMeal = ({ setMealAction, mealAction, setShowmenu, showSubmenu }) => {
  const [meal, setMeal] = useState();
  const [mealModal, setMealModal] = useState({ active: false, name: "" });

  useEffect(() => {
    getAllCategories();
  }, [])

  const getAllCategories = () => {
    getMealList().then((res) => {
      if (res?.status === 200) {
        console.log(res);
        setMeal(res?.data)
      }
    }).catch((err) => toast.error(err));
  }

  const deleteMealItem = (product) => {
    setMealAction({ ...mealAction, action: "Delete" })
    deleteMeal(product?.slug).then((res) => {
      if (res?.status === 200) {
        toast.success(res?.message);
        getAllCategories();
      }
    }).catch((err) => toast.error(err))
  }

  const editMealItem = (product) => {
    setMealAction({ action: "Edit", data: product })
    setShowmenu({ ...showSubmenu, menu: "Food Meal", submenu: "Edit Category" })
  }

  return (
    <div className={styles.category_container}>
      <h1>Meal List</h1>
      <div className={styles.category_list_container}>
        {
          meal?.map((ele, idx) => {
            return (
              <div key={ele?._id} className={styles.meal}>
                <div style={{ height: '25rem', display: 'flex', alignItems: 'center' }}><img src={ele?.img} alt='meal image' className={styles.category_img} /></div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem'}}>
                  <span><IoMdRadioButtonOn className={`${ele?.food_category === "Veg" ? styles.veg_sign : ele?.food_category === "Non-Veg" && styles.nonveg_sign} ${styles.category_sign}`} /></span>
                  <p className={styles.category_name}>{ele?.title}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <span className={styles.discount_price}>₹ {ele?.discount_price}/per meal</span>
                  <span className={styles.real_price}>₹ {ele?.price}/per meal</span>
                </div>
                <span className={styles.options} onClick={() => setMealModal({ active: !mealModal?.active, name: ele?.slug })}><SlOptions /></span>
                <div className={`${(mealModal?.active && mealModal?.name === ele?.slug) ? styles.category_modal : styles.category_modal_hide} `}>
                  <div onClick={() => editMealItem(ele)}>Edit Meal</div>
                  <div onClick={() => deleteMealItem(ele)}>Delete Meal</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ViewMeal