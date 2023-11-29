import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { getAllSubscriptions } from '../services/apiServices';
import { toast } from 'react-toastify';
import { updateTiffin } from '../services/apiServices';

const EditTiffin = ({ tiffinData, setShowmenu, showSubmenu, setComponentStack, componentStack }) => {

    const [mealSubscription, setMealSubscription] = useState({
        title: tiffinData?.title,
        description: tiffinData?.description,
        img: tiffinData?.img,
        food_category: tiffinData?.food_category,
        breakfast: tiffinData?.breakfast,
        lunch: tiffinData?.lunch,
        dinner: tiffinData?.dinner
    })

    console.log('---tiffin data---', tiffinData)

    const [breakfastData, setBreakfastData] = useState();
    const [lunchData, setLunchData] = useState();
    const [dinnerData, setDinnerData] = useState();

    useEffect(() => {
        let newArr = [...componentStack];
        const componentObj = {
            menu: "Tiffin",
            submenu: "Edit Tiffin"
        }
        newArr.push(componentObj);
        setComponentStack(newArr)
        mealData();
    }, [])

    const mealData = () => {
        getAllSubscriptions("breakfast")
            .then((res) => {
                if (res?.status) {
                    setBreakfastData(res?.data);
                }
            })
            .catch((err) => toast.error(err));

        getAllSubscriptions("lunch")
            .then((res) => {
                if (res?.status) {
                    setLunchData(res?.data);
                }
            })
            .catch((err) => toast.error(err));

        getAllSubscriptions("dinner")
            .then((res) => {
                if (res?.status) {
                    setDinnerData(res?.data);
                }
            })
            .catch((err) => toast.error(err));
    };

    const foodCategoryList = [
        { name: 'Veg', value: 'Veg' },
        { name: 'Non-Veg', value: 'Non-Veg' },
        { name: 'Mix', value: 'Mix' },
        { name: 'Fast Food', value: 'Fast-Food' },
    ]

    const hiddenFileInput = useRef(null);

    const handleFileChange = (e) => {
        setMealSubscription({ ...mealSubscription, imgUrl: e.target.files[0] })
    }

    const handleFormSubmit = () => {
        const formData = new FormData();
        formData.append("title", mealSubscription?.title);
        formData.append("description", mealSubscription?.description);
        formData.append("food_category", mealSubscription?.food_category);
        formData.append("img", mealSubscription?.img);
        formData.append("breakfast", mealSubscription?.breakfast);
        formData.append("lunch", mealSubscription?.lunch);
        formData.append("dinner", mealSubscription?.dinner);

        updateTiffin(formData, tiffinData?.slug).then((res)=> {
            if(res?.status === 200) {
                toast.success(res?.message);
                setShowmenu(...showSubmenu, submenu = "Tiffin List");
            }
        }).catch((err)=> toast.error(err))
    }

    return (
        <div className={styles.category_container}>
            <h1>Meal Subscription</h1>
            <div className={styles.form_row}>
                <div className={styles.input_container}>
                    <label>Title</label>
                    <input className={styles.form_input} type='text' value={mealSubscription?.title} onChange={(e) => setMealSubscription({ ...mealSubscription, title: e.target.value })} />
                </div>
                <div className={styles.input_container}>
                    <label>Description</label>
                    <input className={styles.form_input} value={mealSubscription?.description} onChange={(e) => setMealSubscription({ ...mealSubscription, description: e.target.value })} />
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
                    <label>Food Category</label>
                    <select name='foodCategory' value={mealSubscription?.food_category} onChange={(e) => setMealSubscription({ ...mealSubscription, food_category: e.target.value })} className={styles.select_input}>
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

            <div className={styles.form_col}>
                <div className={styles.day_col_container}>
                    <label>Breakfast</label>
                    <div className={styles.day_container}>
                        {
                            breakfastData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setMealSubscription({ ...mealSubscription, breakfast: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === mealSubscription?.breakfast && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.day_col_container}>
                    <label>Lunch</label>
                    <div className={styles.day_container}>
                        {
                            lunchData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setMealSubscription({ ...mealSubscription, lunch: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === mealSubscription?.lunch && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.day_col_container}>
                <label>Dinner</label>
                <div className={styles.day_container}>
                    {
                        dinnerData?.map((ele) => {
                            return (
                                <div className={styles.meal_container} onClick={() => setMealSubscription({ ...mealSubscription, dinner: ele?._id })}>
                                    <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === mealSubscription?.dinner && styles.selected}`} />
                                    <p className={styles.meal_name}>{ele?.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button onClick={handleFormSubmit} className={styles.submit_btn}>Submit</button>
        </div>
    )
}

export default EditTiffin