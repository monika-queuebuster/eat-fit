import React from 'react'
import styles from '../styles/about.module.css';
import { aboutusContent } from '../constants';

const about = () => {
    return (
        <div>
            <div className={styles.hero_section}>
                <h1>About us</h1>
            </div>
            <div className={styles.section2}>
                <div className={styles.about_bty}>
                    <h2 className={styles.section2_heading}>About "BYT"</h2>
                    <h3>BOOK YOUR TIFFIN</h3>
                    <p className={styles.founder_words}>We are developing a technology-enabled solution with a pool of skilled interdisciplinary Tiffin Services providers/Home-made /Bulk meal/other meal providers over cities. "Book Your Tiffin" freshest ingredients prepared into mouthwatering dishes for everyday eating, and straight to your house dishes cooked in an automated kitchen designed to mimic the experience of cooking at home. When it comes to food preparation, the kitchen adheres to the strictest standards of cleanliness and sanitation. You have the option of eating vegetarian or non-vegetarian food here, and the cuisines served include North Indian, South Indian, and desi Chinese.</p>
                    <p className={styles.founder_sign}>- Chandan Kumar</p>
                    <p className={styles.designation}>Founder, Book Your Tiffin (BYT)</p>
                </div>
                <div className={styles.section2_img_container} >
                    <img src='/assets/fpic.webp' alt='byt about' />
                </div>
            </div>
            <div className={styles.section3}>
                <div>
                    {
                        aboutusContent?.map((ele, idx) => {
                            return (
                                idx <= 2 &&
                                <div key={ele?.id} className={styles.features}>
                                    <h4 className={styles.section3_heading}>{ele?.title}</h4>
                                    <p className={styles.section3_para}>{ele?.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <img src='/assets/navigation/byt_logo.png' alt='byt logo' className={styles.logo} />
                <div>
                    {
                        aboutusContent?.map((ele, idx) => {
                            return (
                                idx >= 3 &&
                                <div key={ele?.id} className={styles.features}>
                                    <h4 className={styles.section3_heading}>{ele?.title}</h4>
                                    <p className={styles.section3_para}>{ele?.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default about