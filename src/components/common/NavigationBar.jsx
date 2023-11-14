import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/common/Navigation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowDown } from 'react-icons/md';

const NavigationBar = ({ setLoginModal, loginSuccess, setLoginSuccess }) => {
  const router = useRouter();

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setLoginSuccess(false)
    setDropdown(false)
    localStorage.clear()
    router.push('/')
  }

  return (
    <>
      <div className={styles.navigation_bar}>
        <nav className={`${styles.nav} ${styles.desktop_nav}`}>
          <div className={styles.nav_logo} onClick={() => router.push('/')}><Image src='/assets/navigation/byt_logo.png' alt='eat fit' fill /></div>
          <div className={styles.nav_mid_links}>
            <div className={`${styles.link_ele} ${router.asPath === '/' && styles.active_link}`}><Link href="/">Meal Plans</Link></div>
            <div className={`${styles.link_ele} ${router.asPath === '/search' && styles.active_link}`}><Link href="/">Search</Link></div>
            <div className={`${styles.link_ele} ${router.asPath === '/food-pass' && styles.active_link}`}><Link href="/food-pass">Food Pass</Link></div>
          </div>
          <div className={styles.nav_end_links}>
            {
              router.asPath.includes('/admin') ? null
                :
                <>
                  <div><Link href='https://wa.me/919606032257'><div className={styles.whatsapp_icon}><Image src='/assets/navigation/whatsapp-icon.svg' alt='whatsapp icon' fill /></div></Link></div>
                  {
                    loginSuccess ?
                      <div className={styles.login_container}><div className={styles.user_icon}><Image src='/assets/navigation/user-image.svg' alt='/user-image' fill /></div><MdKeyboardArrowDown className={styles.down_arrow} onClick={() => setDropdown(!dropdown)} /></div>
                      :
                      <div className={styles.login_container} onClick={() => setLoginModal(true)}><div className={styles.user_icon}><Image src='/assets/navigation/user-image.svg' alt='/user-image' fill /></div> Login</div>
                  }
                </>
            }
          </div>
        </nav>

        <nav className={`${styles.nav} ${styles.mobile_nav}`}>
          <div className={styles.nav_logo} onClick={() => router.push('/')}><Image src='/assets/navigation/byt_logo.png' alt='eat fit' fill /></div>
        </nav>
      </div>
      <div className={`${styles.dropdown_menu} ${dropdown ? styles.show : styles.hide}`} ref={dropdownRef}>
        <span onClick={() => { router.push('/dashboard'), setDropdown(false) }}>Profile</span>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </>
  )
}

export default NavigationBar