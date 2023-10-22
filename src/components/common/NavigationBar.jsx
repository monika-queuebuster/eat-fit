import Image from 'next/image'
import React from 'react'
import styles from '../../styles/components/common/Navigation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavigationBar = () => {
  const router = useRouter();

  return (
    <div className={styles.navigation_bar}>
      <nav className={styles.nav}>
        <div className={styles.nav_logo}><Image src='/assets/navigation/eatfit-logo.svg' alt='eat fit' fill /></div>
        <div className={styles.nav_mid_links}>
          <div className={`${styles.link_ele} ${router.asPath === '/' && styles.active_link}`}><Link href="/">Meal Plans</Link></div>
          <div className={`${styles.link_ele} ${router.asPath === '/search' && styles.active_link}`}><Link href="/">Search</Link></div>
          <div className={`${styles.link_ele} ${router.asPath === '/food-pass' && styles.active_link}`}><Link href="/">Food Pass</Link></div>
        </div>
        <div className={styles.nav_end_links}>
          <div><Link href='https://wa.me/919606032257'><div className={styles.whatsapp_icon}><Image src='/assets/navigation/whatsapp-icon.svg' alt='whatsapp icon' fill /></div></Link></div>
          <div className={styles.login_container}><div className={styles.user_icon}><Image src='/assets/navigation/user-image.svg' alt='/user-image' fill /></div> Login</div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar