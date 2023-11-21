import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { editMealItem } from '../services/apiServices';
import { toast } from 'react-toastify';

const EditMeal = ({mealData, setShowmenu, showSubmenu}) => {
  const [editMeal, setEditMeal] = useState({
    title: mealData?.title,
    description: mealData?.description,
    price: mealData?.price,
    discount_price: mealData?.discount_price,
    food_category: mealData?.food_category,
    meal_type: mealData?.meal_type,
    category: mealData?.category,
    imgUrl: mealData?.imgUrl,
  })

  const categoryListString = typeof window != 'undefined' && localStorage.getItem("categoryList");
  const categoryList = JSON.parse(categoryListString);

  const foodCategoryList = [
    { name: 'Veg', value: 'Veg' },
    { name: 'Non-Veg', value: 'Non-Veg' },
    { name: 'Mix', value: 'Mix' },
    { name: 'Fast Food', value: 'Fast-Food' },
  ]

  const mealType = [
    { name: 'Breakfast', value: 'breakfas' },
    { name: 'Lunch', value: 'lunch' },
    { name: 'Dinner', value: 'dinner' },
  ]

  const hiddenFileInput = useRef(null);

  const handleFileChange = (e) => {
    setEditMeal({ ...editMeal, imgUrl: e.target.files[0] })
  }

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("title", editMeal?.title);
    formData.append("description", editMeal?.description);
    formData.append("price", editMeal?.price);
    formData.append("discount_price", editMeal?.discount_price);
    formData.append("food_category", editMeal?.food_category);
    formData.append("meal_type", editMeal?.meal_type);
    formData.append("category", editMeal?.category);
    formData.append("img", editMeal?.imgUrl);

    editMealItem(formData, mealData?.slug).then((res)=> {
      if(res?.status === 200) {
        toast.success(res?.message);
        setShowmenu({...showSubmenu, submenu: "Meal List"})
      }
    }).catch((err)=> toast.error(err))
  }

  return (
    <div className={styles.category_container}>
      <h1>Edit Meal</h1>
      <div className={styles.form_row}>
        <div className={styles.input_container}>
          <label>Title</label>
          <input className={styles.form_input} type='text' value={editMeal?.title} onChange={(e) => setEditMeal({ ...editMeal, title: e.target.value })} />
        </div>
        <div className={styles.input_container}>
          <label>Meal Type</label>
          <select name='mealType' className={styles.select_input} value={editMeal?.meal_type} onChange={(e)=> setEditMeal({...editMeal, meal_type: e.target.value})}>
            {
              mealType?.map((ele) => {
                return (
                  <option value={ele?.value}>{ele?.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className={styles.form_row}>
        <div className={styles.input_container}>
          <label>Price</label>
          <input className={styles.form_input} type='number' value={editMeal?.price} onChange={(e) => setEditMeal({ ...editMeal, price: e.target.value })} />
        </div>
        <div className={styles.input_container}>
          <label>Discounted Price</label>
          <input className={styles.form_input} type='number' value={editMeal?.discount_price} onChange={(e) => setEditMeal({ ...editMeal, discount_price: e.target.value })} />
        </div>
      </div>
      <div className={styles.form_row}>
        <div className={styles.input_container}>
          <label>Category</label>
          <select name='category' className={styles.select_input}  value={editMeal?.category} onChange={(e)=> setEditMeal({...editMeal, category: e.target.value})}>
            {
              categoryList?.map((ele) => {
                return (
                  <option onClick={()=> setEditMeal({...editMeal, category: ele?.value})} value={ele?._id}>{ele?.slug}</option>
                )
              })
            }
          </select>
        </div>
        <div className={styles.input_container}>
          <label>Food Category</label>
          <select name='foodCategory' className={styles.select_input} value={editMeal?.food_category} onChange={(e)=> setEditMeal({...editMeal, food_category: e.target.value})}>
            {
              foodCategoryList?.map((ele) => {
                return (
                  <option onClick={()=> setEditMeal({...editMeal, food_category: ele?.value})} value={ele?.value}>{ele?.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className={styles.form_row}>
        <div className={styles.input_container}>
          <label>Upload Picture</label>
          <button onClick={() => hiddenFileInput.current.click()} className={styles.image_btn}>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={hiddenFileInput}
              onChange={(e) => handleFileChange(e)}
            />
            Select Image
          </button>
        </div>
        <div className={styles.input_container}>
          <label>Description</label>
          <textarea className={styles.form_textarea} value={editMeal?.description} rows={3} onChange={(e) => setEditMeal({ ...editMeal, description: e.target.value })} />
        </div>
      </div>
      <button onClick={handleFormSubmit} className={styles.submit_btn}>Submit</button>
    </div>
  )
}

export default EditMeal