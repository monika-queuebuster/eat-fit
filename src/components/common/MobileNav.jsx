import React from 'react'
import styles from '../../styles/components/common/Navigation.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MobileNav = () => {
    const router = useRouter();
    return (
        <div className={styles.mobile_bottom_nav}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onClick={()=>router.push('/')}>
                <div className={styles.nav_icon_container}><Image src='/assets/navigation/mealplan-icon.svg' alt='meal plan icon' fill /></div>
                <p className={`${router.asPath === '/' && styles.active_element}`}>Meal Plans</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onClick={()=>router.push('/food-pass')}>
                <div className={styles.nav_icon_container}><Image src='/assets/navigation/food-pass.svg' alt='food paas' fill /></div>
                <p className={`${router.asPath === '/food-paas' && styles.active_element}`}>Food Paas</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className={styles.nav_icon_container}><Image src='/assets/navigation/user-mobile.png' alt='user icon' fill /></div>
                <p>profile</p>
            </div>
        </div>
    )
}

export default MobileNav