import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/dashboard.module.css';
import Image from 'next/image';
import { dashboardOptions } from '../constants';
import { useRouter } from 'next/router';
import { MdOutlineGirl, MdBoy } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmailModal from '../components/common/EmailModal';

const dashboard = ({ loginSuccess }) => {

    const router = useRouter();
    const hiddenFileInput = useRef(null);
    const [userData, setUserData] = useState({
        name: 'monika',
        phone: 8882045075,
        email: '',
        workEmail: '',
        gender: '',
        profileImg: null
    })
    const [date, setDate] = useState(new Date());
    const [emailModal, setEmailModal] = useState(false);
    const [emailTitle, setEmailTitle] = useState('');

    useEffect(()=> {
        !loginSuccess && router.push('/')
    },[loginSuccess])

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // setUserData(reader.result);
                setUserData({ profileImg: reader.result })
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    return (
        <>
            <EmailModal isOpen={emailModal} closeModal={() => setEmailModal(false)} title={emailTitle} setUserData={setUserData} />
            <div className={styles.dashboard_container}>
                <div className={styles.left_container}>
                    <div className={styles.name_container}>
                        <div className={styles.image_container}><Image src='/assets/navigation/user-mobile.png' alt='user image' fill /></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>Monika</span>
                            <span style={{ fontSize: '1.5rem' }}>VIEW PROFILE</span>
                        </div>
                    </div>
                    <div className={styles.options_container}>
                        {
                            dashboardOptions?.map((ele) => {
                                return (
                                    <div className={styles.option}><span>{ele?.option}</span> <div><Image src={ele?.icon} alt='dashboard option' fill /></div></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.image_section}>
                        <button className={styles.select_user_img} onClick={handleClick}>
                            <div className={styles.user_image}><Image src={userData?.profileImg ? userData?.profileImg : '/assets/navigation/user-mobile.png'} alt='user image' fill /></div>
                            <div className={styles.edit_text}>EDIT</div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={hiddenFileInput}
                                onChange={handleFileChange}
                            />
                        </button>
                    </div>
                    <div>
                        <h2>PROFILE</h2>
                        <div className={styles.form_row}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label>NAME</label>
                                <input className={styles.form_input} type='text' value={userData?.name} onChange={(e) => setUserData({ name: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label>PHONE NUMBER</label>
                                <div>
                                    <span className={styles.country_code}>+91-</span>
                                    <input className={styles.form_input} type='number' value={userData?.phone} onChange={(e) => setUserData({ phone: e.target.value })} style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_row}>
                            <div>
                                <label>GENDER</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input className={styles.form_input} type='text' value={userData?.gender} style={{ width: '75%' }} />
                                    <span>
                                        <MdOutlineGirl className={styles.gender_icon} style={{ borderRight: '1px solid grey', cursor: 'pointer' }} onClick={() => setUserData({ gender: 'Female' })} />
                                        <MdBoy className={styles.gender_icon} style={{ cursor: 'pointer' }} onClick={() => setUserData({ gender: 'Male' })} />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label>Date Of Birth</label>
                                {/* <input className={styles.form_input} type='number' /> */}
                                <DatePicker
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    showYearDropdown
                                    yearDropdownItemNumber={50}
                                    scrollableYearDropdown
                                    maxDate={new Date()}
                                    className={styles.calender_input}
                                />
                            </div>
                        </div>
                        <div className={styles.form_row}>
                            <div>
                                <label>EMAIL</label>
                                <input className={styles.form_input} type='text' value={userData?.email} onClick={() => (setEmailModal(true), setEmailTitle('Email Adderss'))} />
                            </div>
                            <div>
                                <label>WORK EMAIL</label>
                                <input className={styles.form_input} type='text' value={userData?.workEmail} onClick={() => (setEmailModal(true), setEmailTitle('Work Email Adderss'))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default dashboard