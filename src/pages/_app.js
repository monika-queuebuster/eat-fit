import Footer from "../components/common/Footer";
import NavigationBar from "../components/common/NavigationBar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavigationBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
