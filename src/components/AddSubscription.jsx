import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { getMealList, subscription } from '../services/apiServices';
import { toast } from 'react-toastify';


const AddSubscription = ({ setShowmenu, showSubmenu, setComponentStack, componentStack }) => {

    const [createSubscription, setCreateSubscription] = useState({
        title: '',
        description: '',
        price: null,
        discount_price: null,
        food_category: 'Veg',
        meal_type: 'breakfast',
        imgUrl: null,
        sunday: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
    })

    const [mealData, setMealData] = useState()

    useEffect(() => {
        getMealList(createSubscription?.meal_type).then((res) => {
            if (res?.status === 200) {
                setMealData(res?.data);
            }
        }).catch((err) => toast.error(err))
    }, [createSubscription?.meal_type])

    useEffect(() => {
        let newArr = [...componentStack];
        const componentObj = {
            menu: "Subscription",
            submenu: "Add Subscription"
        }
        newArr.push(componentObj);
        setComponentStack(newArr)
    }, [])

    console.log('---meal data---', mealData);

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
        setCreateSubscription({ ...createSubscription, imgUrl: e.target.files[0] })
    }

    const handleFormSubmit = () => {
        const formData = new FormData();
        formData.append("title", createSubscription?.title);
        formData.append("description", createSubscription?.description);
        formData.append("price", createSubscription?.price);
        formData.append("discount_price", createSubscription?.discount_price);
        formData.append("food_category", createSubscription?.food_category);
        formData.append("meal_type", createSubscription?.meal_type);
        formData.append("img", createSubscription?.imgUrl);
        formData.append("sunday", createSubscription?.sunday);
        formData.append("monday", createSubscription?.monday);
        formData.append("tuesday", createSubscription?.tuesday);
        formData.append("wednesday", createSubscription?.wednesday);
        formData.append("thursday", createSubscription?.thursday);
        formData.append("friday", createSubscription?.friday);
        formData.append("saturday", createSubscription?.saturday);

        subscription(formData).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message)
                setShowmenu({ ...showSubmenu, submenu: "Subscription List" })
            }
        }).catch((err) => toast.error(err))
    }

    const handleMealChange = (e) => {
        setCreateSubscription({ ...createSubscription, meal_type: e.target.value })
    }

    return (
        <div className={styles.category_container}>
            <h1>Add Subscription</h1>
            <div className={styles.form_row}>
                <div className={styles.input_container}>
                    <label>Title</label>
                    <input className={styles.form_input} type='text' value={createSubscription?.title} onChange={(e) => setCreateSubscription({ ...createSubscription, title: e.target.value })} />
                </div>
                <div className={styles.input_container}>
                    <label>Description</label>
                    <input className={styles.form_input} value={createSubscription?.description} onChange={(e) => setCreateSubscription({ ...createSubscription, description: e.target.value })} />
                </div>
            </div>
            <div className={styles.form_row}>
                <div className={styles.input_container}>
                    <label>Price</label>
                    <input className={styles.form_input} type='number' value={createSubscription?.price} onChange={(e) => setCreateSubscription({ ...createSubscription, price: e.target.value })} />
                </div>
                <div className={styles.input_container}>
                    <label>Discounted Price</label>
                    <input className={styles.form_input} type='number' value={createSubscription?.discount_price} onChange={(e) => setCreateSubscription({ ...createSubscription, discount_price: e.target.value })} />
                </div>
            </div>
            <div className={styles.form_row}>
                <div className={styles.input_container}>
                    <label>Food Category</label>
                    <select name='foodCategory' value={createSubscription?.food_category} onChange={(e) => setCreateSubscription({ ...createSubscription, food_category: e.target.value })} className={styles.select_input}>
                        {
                            foodCategoryList?.map((ele) => {
                                return (
                                    <option value={ele?.value}>{ele?.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={styles.input_container}>
                    <label>Meal Type</label>
                    <select name='meal' className={styles.select_input} value={createSubscription?.meal_type} onChange={(e) => handleMealChange(e)}>
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
            </div>
            <div className={styles.form_col}>
                <div className={styles.day_col_container}>
                    <label>Sunday</label>
                    <div className={styles.day_container}>
                        {
                            mealData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, sunday: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.sunday && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.day_col_container}>
                    <label>Monday</label>
                    <div className={styles.day_container}>
                        {
                            mealData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, monday: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.monday && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.form_col}>
                <div className={styles.day_col_container}>
                    <label>Tuesday</label>
                    <div className={styles.day_container}>
                        {
                            mealData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, tuesday: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.tuesday && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.day_col_container}>
                    <label>Wednesday</label>
                    <div className={styles.day_container}>
                        {
                            mealData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, wednesday: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.wednesday && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.form_col}>
                <div className={styles.day_col_container}>
                    <label>Thursday</label>
                    <div className={styles.day_container}>
                        {
                            mealData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, thursday: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.thursday && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.day_col_container}>
                    <label>Friday</label>
                    <div className={styles.day_container}>
                        {
                            mealData?.map((ele) => {
                                return (
                                    <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, friday: ele?._id })}>
                                        <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.friday && styles.selected}`} />
                                        <p className={styles.meal_name}>{ele?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.day_col_container}>
                <label>Saturday</label>
                <div className={styles.day_container}>
                    {
                        mealData?.map((ele) => {
                            return (
                                <div className={styles.meal_container} onClick={() => setCreateSubscription({ ...createSubscription, saturday: ele?._id })}>
                                    <img src={ele?.img} alt='meal item' className={`${styles.day_meal} ${ele?._id === createSubscription?.saturday && styles.selected}`} />
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

export default AddSubscription