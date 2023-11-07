import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomeSwiper from "../components/HomeSwiper";
import { useState } from "react";
import BreakfastMenu from "../components/BreakfastMenu";
import LunchMenu from "../components/LunchMenu";
import DinnerMenu from "../components/DinnerMenu";
import LoginModal from "../components/common/LoginModal";

export const Home = ({ loginModal, closeLoginModal, setLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("Breakfast");

  return (
    <>
      <Head>
        <title>Book your Tiffin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home_page}>
        <HomeSwiper />
        <div className={styles.page_header}>
          <h1 className={styles.page_heading}>Meal Plans</h1>
          <div className={styles.tabs}>
            <div
              className={`${styles.tab_element} ${
                activeTab === "Breakfast" && styles.active_tab
              }`}
              onClick={() => {
                setActiveTab("Breakfast");
              }}
            >
              Breakfast
            </div>
            <div
              className={`${styles.tab_element} ${
                activeTab === "Lunch" && styles.active_tab
              }`}
              onClick={() => {
                setActiveTab("Lunch");
              }}
            >
              Lunch
            </div>
            <div
              className={`${styles.tab_element} ${
                activeTab === "Dinner" && styles.active_tab
              }`}
              onClick={() => {
                setActiveTab("Dinner");
              }}
            >
              Dinner
            </div>
          </div>
        </div>

        <div>
          {activeTab === "Breakfast" ? (
            <BreakfastMenu />
          ) : activeTab === "Lunch" ? (
            <LunchMenu />
          ) : (
            <DinnerMenu />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
