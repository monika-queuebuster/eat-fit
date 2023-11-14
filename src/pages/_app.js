import { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import MobileNav from "../components/common/MobileNav";
import NavigationBar from "../components/common/NavigationBar";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoginModal from "../components/common/LoginModal";
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }) {
  const [loginModal, setLoginModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const closeLoginModal = () => setLoginModal(false);
  useEffect(()=> {
    const userId = window != 'undefined' && localStorage.getItem("userId");
    userId && setLoginSuccess(true);
  },[])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NavigationBar
        setLoginModal={setLoginModal}
        loginSuccess={loginSuccess}
        setLoginSuccess={setLoginSuccess}
      />
      <LoginModal
        isOpen={loginModal}
        closeModal={closeLoginModal}
        isLogin={setLoginSuccess}
      />
      <Component
        {...pageProps}
        loginModal={loginModal}
        closeLoginModal={closeLoginModal}
        setLoginSuccess={setLoginSuccess}
        loginSuccess={loginSuccess}
      />
      {(router.asPath != "/dashboard" && router.asPath != "/admin/dashboard") && <Footer />}
      <MobileNav />
    </>
  );
}
