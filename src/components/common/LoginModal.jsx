import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/components/common/LoginModal.module.css';
import { RxCross2 } from 'react-icons/rx';
import { BsArrowLeftShort } from 'react-icons/bs';
import Image from 'next/image';
import { userLogin, userVerify, resendOTP } from '../../services/apiServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)'
    },
};

const LoginModal = ({ isOpen, closeModal, isLogin }) => {

    const [phone, setPhone] = useState(null);
    const [continueBtn, setContinueBtn] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);
    const [otpField, setOtpField] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [userData, setUserData] = useState({ mobile_no: '' })

    const inputRefs = Array(6).fill(null).map((_, index) => useRef(null));
    const router = useRouter();

    // --------checking phone number length---------
    useEffect(() => {
        phone?.length === 10 ? setContinueBtn(true) : setContinueBtn(false);
    }, [phone])

    // ---------emptying number input on closing modal---------
    useEffect(() => {
        setPhone(null)
    }, [closeModal])

    useEffect(()=> {
        localStorage.setItem("userInfo", JSON.stringify(userData));
    })

    // --------------api call for sending otp-------------
    const sendOtp = () => {
        if (otpField) {
            resendOTP().then((res) => {
                if (res?.status === 200) {
                    toast.success(res?.message);
                }
            }).catch((err) => toast.error(err));
        } else {
            const userData = { "mobile_no": phone }
            userLogin(userData).then((res => {
                if (res?.status === 200) {
                    setOtpField(true);
                    toast.success(res?.message)
                    localStorage.setItem('userId', res?.data?.userId)
                }
            })).catch((err) => toast.error(err))
        }
    }

    const goBack = () => setOtpField(false);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (index === 5 && inputRefs[5] != '') {
            setActiveBtn(true);
        }
        // Handle backspace
        if (e.key === 'Backspace' && index > 0) {
            console.log('---step 3---')
            inputRefs[index - 1].current.focus();
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
        }
        // Handle delete
        else if (e.key === 'Delete' && index < 6 - 1 && otp[index] !== '') {
            inputRefs[index].current.value = '';
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input field if available
        if (index < 6 - 1 && value !== '') {
            inputRefs[index + 1].current.focus();
        }
    };

    // -----------api call for verifying otp-----------
    const verifyOtp = () => {
        console.log('otp', parseInt(otp.join('')))
        const userOtp = { "otp": parseInt(otp.join('')) }
        userVerify(userOtp).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message);
                setUserData({ mobile_no: res?.data?.mobile_no })
                localStorage.setItem("accessToken", res?.data?.token)
                isLogin(true);
                closeModal();
                router.push('/dashboard')
                setOtpField(false);
            }
        }).catch((err) => {
            toast.error(err);
        })
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.login_modal} style={customStyles}>
            <button className={styles.close_btn} onClick={closeModal}><RxCross2 /></button>

            {
                !otpField ?
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div><div className={styles.image_container}><Image src='/assets/navigation/byt_logo.png' alt='byt logo' fill /></div></div>
                        <div className={styles.number_container}><span>+91</span> <input type='number' placeholder='Enter your phone number' className={styles.number_input} onChange={(e) => setPhone(e.target.value)} /></div>
                        <button className={`${styles.continue_btn} ${continueBtn ? styles.active : styles.inactive}`} onClick={sendOtp}>Continue</button>
                        <p className={styles.tnc_text}>By Continuing you agree to the <span className={styles.color_text}>Terms of Services</span> and <span className={styles.color_text}>Privacy policy</span>.</p>
                    </div>
                    :
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}><BsArrowLeftShort className={styles.go_back} onClick={goBack} /> Enter OTP</div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5rem 0' }}>
                            <p className={styles.enter_code}>Please enter the code we just sent to {phone} to proceed</p>
                            <div className={styles.input_container}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyUp={(e) => handleChange(e, index)}
                                        ref={inputRefs[index]}
                                    />
                                ))}
                            </div>
                            <button className={`${styles.confirm_btn} ${activeBtn ? styles.active : styles.inactive}`} onClick={verifyOtp}>Confirm</button>
                            <p className={styles.resend_text}>Didn’t receive OTP? <span onClick={sendOtp} className={styles.color_text}>RESEND</span></p>
                        </div>
                    </div>
            }
        </Modal>
    )
}

export default LoginModal