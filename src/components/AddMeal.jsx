import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { createMealItem } from '../services/apiServices';
import { toast } from 'react-toastify';

const AddMeal = ({setShowmenu, showSubmenu}) => {
  const categoryListString = typeof window != 'undefined' && localStorage.getItem("categoryList");
  const categoryList = JSON.parse(categoryListString);

  const [createMeal, setCreateMeal] = useState({
    title: '',
    description: '',
    price: null,
    discount_price: null,
    food_category: 'Veg',
    meal_type: 'breakfast',
    category: null,
    imgUrl: null,
  })

  useEffect(()=> {
    if(categoryList) {
      setCreateMeal({...createMeal, category: categoryList[0]?._id})
    }
  },[categoryList])

  const foodCategoryList = [
    { name: 'Veg', value: 'Veg' },
    { name: 'Non-Veg', value: 'Non-Veg' },
    { name: 'Mix', value: 'Mix' },
    { name: 'Fast Food', value: 'Fast-Food' },
  ]

  const mealType = [
    { name: 'Breakfast', value: 'breakfast' },
    { name: 'Lunch', value: 'lunch' },
    { name: 'Dinner', value: 'dinner' },
  ]

  const hiddenFileInput = useRef(null);

  const handleFileChange = (e) => {
    setCreateMeal({ ...createMeal, imgUrl: e.target.files[0] })
  }

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("title", createMeal?.title);
    formData.append("description", createMeal?.description);
    formData.append("price", createMeal?.price);
    formData.append("discount_price", createMeal?.discount_price);
    formData.append("food_category", createMeal?.food_category);
    formData.append("meal_type", createMeal?.meal_type);
    formData.append("category", createMeal?.category);
    formData.append("img", createMeal?.imgUrl);

    createMealItem(formData).then((res)=> {
      if(res?.status === 200) {
        toast.success(res?.message);
        setShowmenu({...showSubmenu, submenu: "Meal List"})
      }
    }).catch((err)=> toast.error(err))
  }

  return (
    <div className={styles.category_container}>
      <h1>Add Meal</h1>
      <div className={styles.form_row}>
        <div className={styles.input_container}>
          <label>Title</label>
          <input className={styles.form_input} type='text' value={createMeal?.title} onChange={(e) => setCreateMeal({ ...createMeal, title: e.target.value })} />
        </div>
        <div className={styles.input_container}>
          <label>Meal Type</label>
          <select name='meal' className={styles.select_input} value={createMeal?.meal_type} onChange={(e)=> setCreateMeal({...createMeal, meal_type: e.target.value})}>
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
          <input className={styles.form_input} type='number' value={createMeal?.price} onChange={(e) => setCreateMeal({ ...createMeal, price: e.target.value })} />
        </div>
        <div className={styles.input_container}>
          <label>Discounted Price</label>
          <input className={styles.form_input} type='number' value={createMeal?.discount_price} onChange={(e) => setCreateMeal({ ...createMeal, discount_price: e.target.value })} />
        </div>
      </div>
      <div className={styles.form_row}>
        <div className={styles.input_container}>
          <label>Category</label>
          <select name='category' className={styles.select_input} value={createMeal?.category} onChange={(e)=> setCreateMeal({...createMeal, category: e.target.value})}>
            {
              categoryList?.map((ele) => {
                return (
                  <option value={ele?._id}>{ele?.slug}</option>
                )
              })
            }
          </select>
        </div>
        <div className={styles.input_container}>
          <label>Food Category</label>
          <select name='foodCategory' value={createMeal?.food_category} onChange={(e)=> setCreateMeal({...createMeal, food_category: e.target.value})} className={styles.select_input}>
            {
              foodCategoryList?.map((ele) => {
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
          <textarea className={styles.form_textarea} value={createMeal?.description} rows={3} onChange={(e) => setCreateMeal({ ...createMeal, description: e.target.value })} />
        </div>
      </div>
      <button onClick={handleFormSubmit} className={styles.submit_btn}>Submit</button>
    </div>
  )
}

export default AddMeal