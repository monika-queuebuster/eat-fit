import React from 'react'
import styles from '../../styles/components/common/Footer.module.css'
import Image from 'next/image'
import { footerLinks } from '../../constants'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className={styles.footer_container}>
            <div className={styles.footer_logo_container}><Image src='/assets/footer-logo.svg' alt='logo' fill /></div>
            <p className={styles.footer_desc}>At Eatfit we offer healthy, yummy, honest & wholesome Indian food, made with real ingredients, zero trans fat, and lots of love!</p>
            <h3 className={styles.sitemap}>Site Map</h3>
            <div className={styles.footer_link_container}>
                {
                    footerLinks?.map((ele) => {
                        return (
                            <div>
                                <h4 className={styles.link_heading}>{ele?.heading}</h4>
                                <div className={styles.link_container}>
                                    {
                                        ele?.subLinks?.map((link) => <Link href='/'>{link}</Link>)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Footer