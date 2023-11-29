import React from 'react'
import styles from '../styles/contact.module.css';

const contact = () => {
    return (
        <div>
            <div className={styles.hero_section}>
                <h1>About us</h1>
            </div>
            <div className={styles.section2}>
                <img src='/assets/contact-us.png' alt='contact us' className={styles.section2_img} />
            </div>
            <div className={styles.section3}>
                <div>
                    <h3 className={styles.heading}>Contact Us</h3>
                    <div className={styles.contact_container}>
                        <div>
                            <h4>ADDRESS</h4>
                            <p>Freshking India Pvt Ltd.</p>
                            <p>Raja Nagar, Sadhu Path Near Satish Memorial Hospital, Madhepura (BIHAR)</p>
                            <p>Contact :- +91 83404 04747</p>
                        </div>
                        <div>
                            <h4>SERVICE FEEDBACK/COMPLAINTS</h4>
                            <p>service@bookyourtiffin.com</p>
                        </div>
                        <div>
                            <h4>FOR BUSINESS ENQUIRY</h4>
                            <p>contact@bookyourtiffin.com</p>
                        </div>
                        {/* <div></div> */}
                    </div>
                </div>
                <div className={styles.form_container}>
                    <h3 className={styles.heading}>Let's Talk</h3>
                    <div className={styles.contact_form}>
                        <input type='text' placeholder='Name' className={styles.form_input} />
                        <input type='email' placeholder='Email' className={styles.form_input} />
                        <textarea rows={4} className={styles.form_input} placeholder='Message'></textarea>
                        <button className={styles.form_btn}>Submit your message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default contact