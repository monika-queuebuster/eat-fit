import { useState } from "react";
import Footer from "../components/common/Footer";
import MobileNav from "../components/common/MobileNav";
import NavigationBar from "../components/common/NavigationBar";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoginModal from "../components/common/LoginModal";

export default function App({ Component, pageProps }) {

  const [loginModal, setLoginModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const closeLoginModal = () => setLoginModal(false);

  return (
    <>
      <NavigationBar setLoginModal={setLoginModal} loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess} />
      <LoginModal isOpen={loginModal} closeModal={closeLoginModal} isLogin={setLoginSuccess} />
      <Component {...pageProps} loginModal={loginModal} closeLoginModal={closeLoginModal} setLoginSuccess={setLoginSuccess} loginSuccess={loginSuccess} />
      {
        router.asPath != "/dashboard" && <Footer />
      }
      <MobileNav />
    </>
  );
}
