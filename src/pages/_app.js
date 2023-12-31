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
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  console.log('---cartCount---', cartCount)

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
        autoClose={3000}
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
        cartCount={cartCount}
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
        setQuantity={setQuantity}
        quantity={quantity}
        setCartCount={setCartCount}
        cartCount={cartCount}
      />
      {(router.asPath != "/dashboard" && router.asPath != "/admin/dashboard") && <Footer />}
      <MobileNav />
    </>
  );
}
