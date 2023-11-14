import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/dashboard.module.css';
import Image from 'next/image';
import { dashboardOptions } from '../constants';
import { useRouter } from 'next/router';
import { MdOutlineGirl, MdBoy } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmailModal from '../components/common/EmailModal';
import { profileUpdate, authorization } from '../services/apiServices';
import { toast } from 'react-toastify';
import moment from 'moment';

const dashboard = ({ loginSuccess }) => {

    const router = useRouter();
    const hiddenFileInput = useRef(null);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        workEmail: '',
        gender: '',
        img: null,
        dob: new Date()
    })
    const [emailModal, setEmailModal] = useState(false);
    const [emailTitle, setEmailTitle] = useState('');

    useEffect(() => {
        authorization().then((res => {
            if (res?.status === 200) {
                // console.log('---user data---', moment(JSON.parse(res?.user?.dob), 'mm/dd/yyyy').format('l'), moment(res?.user?.dob, 'mm/dd/yyyy').format('l'))
                console.log("---user data---",res?.user?.img)
                setUserData({ ...userData, name: res?.user?.name, phone: res?.user?.mobile_no, email: res?.user?.email, workEmail: res?.user?.workEmail, gender: res?.user?.gender, dob: new Date(res?.user?.dob), img: res?.user?.img })
            }
        })).catch((err) => toast.error(err))
        const userInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo');
        const mobile_no = JSON.parse(userInfo)?.mobile_no
        setUserData({ ...userData, phone: (mobile_no) });

        // -------checking if user is logged out----------
        if (!userInfo) {
            router.push('/')
        }
    }, [])

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    // -------------setting user profile image-------------
    const handleFileChange = (e) => {
        setUserData({ ...userData, img: e.target.files[0] })
    }

    // -------updating user info-------
    const updateUserInfo = () => {
        const formData = new FormData();
        formData.append('img', userData.img);
        formData.append('name', userData.name);
        formData.append('phone', userData.phone);
        formData.append('email', userData.email);
        formData.append('gender', userData.gender);
        formData.append('dob', moment(userData.dob, 'mm/dd/yyyy').format('l'));
        profileUpdate(formData).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message)
            }
        }).catch((err) => {
            toast.error(err)
        })
    }

    return (
        <>
            <EmailModal isOpen={emailModal} closeModal={() => setEmailModal(false)} title={emailTitle} userData={userData} setUserData={setUserData} />
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
                            <div><img src={`${userData.img ? userData.img : '/assets/navigation/user-mobile.png'}`} alt='user image' className={styles.user_image} /></div>
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
                                <input className={styles.form_input} type='text' value={userData?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label>PHONE NUMBER</label>
                                <div>
                                    <span className={styles.country_code}>+91-</span>
                                    <input className={styles.form_input} type='number' value={userData?.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_row}>
                            <div>
                                <label>GENDER</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input className={styles.form_input} type='text' value={userData?.gender} style={{ width: '75%' }} />
                                    <span>
                                        <MdOutlineGirl className={styles.gender_icon} style={{ borderRight: '1px solid grey', cursor: 'pointer' }} onClick={() => setUserData({ ...userData, gender: 'Female' })} />
                                        <MdBoy className={styles.gender_icon} style={{ cursor: 'pointer' }} onClick={() => setUserData({ ...userData, gender: 'Male' })} />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label>Date Of Birth</label>
                                {/* <input className={styles.form_input} type='number' /> */}
                                <DatePicker
                                    selected={userData?.dob}
                                    onChange={(date) => setUserData({ ...userData, dob: date })}
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
            <button className={styles.update_btn} onClick={updateUserInfo}>Update</button>
        </>
    )
}

export default dashboard