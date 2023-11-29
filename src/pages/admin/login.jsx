import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../../styles/admin/Login.module.css';
import { adminLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')

    const router = useRouter();

    const handleAdminLogin = () => {
        const adminData = {
            "email": email,
            "password": password
        }
        adminLogin(adminData).then((res) => {
            if (res?.status === 200) {
                localStorage.setItem("adminToken", res?.data?.token)
                toast.success(res?.message)
                router.push('/admin/dashboard')
            }
        }).catch((err) => toast.error(err))
    }

    const adminToken = typeof window !== "undefined" && localStorage.getItem("adminToken");
    useEffect(() => {
        !adminToken ? router.push('/admin/login') : router.push('/admin/dashboard')
    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <div className={styles.admin_form}>
                <h1>Admin Login</h1>
                <div className={styles.form_row}>
                    <label>Email</label>
                    <input autoComplete="off" className={styles.form_input} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.form_row}>
                    <label>Password</label>
                    <div>
                        <input autoComplete="off" style={{ width: '28rem' }} className={styles.form_input} type={passwordType} value={password} onChange={(e) => setPassword(e.target.value)} /><span className={styles.icon_container}>{passwordType === 'password' ? <AiOutlineEyeInvisible className={styles.password_icon} onClick={() => setPasswordType('text')} cl /> : <AiOutlineEye className={styles.password_icon} onClick={() => setPasswordType('password')} />}</span>
                    </div>
                </div>
                <button className={styles.login_btn} onClick={handleAdminLogin}>Log in</button>
            </div>
        </div>
    )
}

export default login