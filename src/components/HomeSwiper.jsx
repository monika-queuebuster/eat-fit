import React, { useState } from 'react'
import styles from '../styles/components/HomeSwiper.module.css';
import Image from 'next/image';

const HomeSwiper = () => {

    const bannerImages = ["/assets/mealPlans/slider1.webp"]
    const [activeSlide, setActiveSlide] = useState(0);

    // timestamp for showing next banners
    setTimeout(()=> {
        if(activeSlide < bannerImages.length-1) {
            setActiveSlide( activeSlide + 1 );
        } else {
            setActiveSlide(0);
        }
    },[5000]);

    return (
        <div className={styles.banner}>
            <div className={styles.banner_img}><Image src={bannerImages[activeSlide]} alt='offerrs' fill /></div>
        </div>
    )
}

export default HomeSwiper