import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/PurchaseOrder.module.css'

const UpcomingMeals = ({ includeWeekends }) => {
    const [selectedDay, setSelectedDay] = useState("MON");
    const protein = 28, fat = 32, carbs = 82, fibre = 12;
    const totalNutrients = protein + fat + carbs + fibre;
    const protienPer = ((protein / totalNutrients) * 100), fatPer = ((fat / totalNutrients) * 100), carbsPer = ((carbs / totalNutrients) * 100), fibrePer = ((fibre / totalNutrients) * 100);

    return (
        <div className={styles.upcoming_container}>
            <p className={styles.note}>* Sat & Sun meals will not be delivered if deliver on weekends is off</p>
            <div className={styles.meals_container}>
                {
                    includeWeekends &&
                    <div>
                        <div className={`${styles.meal_img} ${selectedDay === "SUN" && styles.selected_day}`} onClick={() => setSelectedDay('SUN')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                        <p className={styles.day_name}>SUN</p>
                    </div>
                }
                <div>
                    <div className={`${styles.meal_img} ${selectedDay === "MON" && styles.selected_day}`} onClick={() => setSelectedDay('MON')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                    <p className={styles.day_name}>MON</p>
                </div>
                <div>
                    <div className={`${styles.meal_img} ${selectedDay === "TUE" && styles.selected_day}`} onClick={() => setSelectedDay('TUE')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                    <p className={styles.day_name}>TUE</p>
                </div>
                <div>
                    <div className={`${styles.meal_img} ${selectedDay === "WED" && styles.selected_day}`} onClick={() => setSelectedDay('WED')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                    <p className={styles.day_name}>WED</p>
                </div>
                <div>
                    <div className={`${styles.meal_img} ${selectedDay === "THU" && styles.selected_day}`} onClick={() => setSelectedDay('THU')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                    <p className={styles.day_name}>THU</p>
                </div>
                <div>
                    <div className={`${styles.meal_img} ${selectedDay === "FRI" && styles.selected_day}`} onClick={() => setSelectedDay('FRI')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                    <p className={styles.day_name}>FRI</p>
                </div>
                {
                    includeWeekends &&
                    <div>
                        <div className={`${styles.meal_img} ${selectedDay === "SAT" && styles.selected_day}`} onClick={() => setSelectedDay('SAT')}><Image src='/assets/foodItem.webp' alt='food item' fill /></div>
                        <p className={styles.day_name}>SAT</p>
                    </div>
                }
            </div>

            <div className={styles.meal_desc}>
                <p className={styles.day_date}>{selectedDay.toLowerCase()}, 22 Oct</p>
                <p className={styles.food_items}>Wild Rice Tomato Sauce Paneer Protein Meal</p>
                <p className={styles.food_desc}>[Energy - 699Cal | Protein - 36gm]Delicious protein packed meal of soft paneer into creamy & spicy tomato sauce, healthy protein dense mix bean stew, and fresh raw veggie salad. Served along with special Wild Rice and green gram sprouts drizzled on top. Allergen information: Contains dairy, gluten, soy, traces of celery & mushroom</p>
                <h3 className={styles.nutrient_heading}>Nutritional Info.</h3>
                <p className={styles.calorie_count}>647 - Calories</p>

                <div className={styles.nutrients_measure}>
                    <div style={{ width: `${protienPer}%`, backgroundColor: 'rgb(79, 198, 255)', height: '1rem', display: 'inline-block', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}></div>
                    <div style={{ width: `${fatPer}%`, backgroundColor: 'rgb(255, 165, 34)', height: '1rem', display: 'inline-block' }}></div>
                    <div style={{ width: `${carbsPer}%`, backgroundColor: 'rgb(244, 109, 160)', height: '1rem', display: 'inline-block' }}></div>
                    <div style={{ width: `${fibrePer}%`, backgroundColor: 'rgb(145, 108, 174)', height: '1rem', display: 'inline-block', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}></div>
                </div>
                <div className={styles.nutrient_amount_detail}>
                    <div className={styles.single_nutrient}>
                        <div className={`${styles.dot}`} style={{ backgroundColor: 'rgb(79, 198, 255)' }}></div>
                        <p className={styles.nutrient_name}>Protien</p>
                        <p className={styles.nutrient_amount}>{protein}g</p>
                    </div>
                    <div className={styles.single_nutrient}>
                        <div className={`${styles.dot}`} style={{ backgroundColor: 'rgb(255, 165, 34)' }}></div>
                        <p className={styles.nutrient_name}>Fat</p>
                        <p className={styles.nutrient_amount}>{fat}g</p>
                    </div>
                    <div className={styles.single_nutrient}>
                        <div className={`${styles.dot}`} style={{ backgroundColor: 'rgb(244, 109, 160)' }}></div>
                        <p className={styles.nutrient_name}>Carbs</p>
                        <p className={styles.nutrient_amount}>{carbs}g</p>
                    </div>
                    <div className={styles.single_nutrient}>
                        <div className={`${styles.dot}`} style={{ backgroundColor: 'rgb(145, 108, 174)' }}></div>
                        <p className={styles.nutrient_name}>Fibre</p>
                        <p className={styles.nutrient_amount}>{fibre}g</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingMeals