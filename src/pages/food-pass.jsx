import React, { useEffect, useState } from 'react'
import ModalComponent from '../components/common/Modal';
import Image from 'next/image';
import { foodPassCard, foodPassBenefits } from '../constants';
import styles from '../styles/foodPass.module.css';
import FAQ from '../components/common/FAQ';
import TNC from '../components/common/TNC';

const foodPass = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [iframeHtWt, setIframeHtWt] = useState({});

  const setWindowDimensions = () => {
    window.innerWidth < 540 ? setIframeHtWt({ht:350, wt: 500}) : setIframeHtWt({ht: 460, wt: 750});
  }

  useEffect(() => {
    setWindowDimensions();
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  useEffect(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.foodpass_container}>
      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} />
      {/* --------food pass-------- */}
      <div className={styles.section1}>
        <h1 className={styles.page_heading}>Save More with <span className={styles.pink_text}>Food Pass</span> on Every Singles Order</h1>
        <div className={styles.foodpass_card}>
          <div><div className={styles.ticket_img}><Image src='/assets/foodPass/food-pass-ticket.svg' alt='foodpass ticket' fill /></div></div>
          <p className={styles.card_price}>Pay Rs 150</p>
          <p className={styles.benefits}>Get Benefits upto Rs 219</p>
          <div>
            {
              foodPassCard?.map((ele) => {
                return (
                  <div className={styles.card_points} key={ele?.id}>
                    <div><div className={styles.bullet_point}><Image src='/assets/foodPass/bullet.svg' alt='bullrt points' fill /></div></div>
                    <span className={styles.benefit_point}>{ele?.point}</span>
                  </div>
                )
              })
            }
          </div>
          <button className={styles.foodpass_btn}>Buy Food Paas</button>
        </div>

        <div className={styles.arrow_img_container}><Image src='/assets/foodPass/step-down-line.svg' alt='down arrow' fill /></div>
      </div>

      {/* --------section 2 iframe-------- */}
      <div className={styles.iframe_container}>
        <iframe width={iframeHtWt?.wt} height={iframeHtWt?.ht} src="https://www.youtube.com/embed/JAKphVoPOCQ?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fwww.eatfit.in&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1" title="YouTube Video"></iframe>
      </div>

      {/* ---------section 3--------- */}
      <div className={styles.section3}>
        <h2>Unlock the <span className={styles.pink_text}>benefits</span> of Food Pass Shopping</h2>
        <p>Our food pass buying is packed with benefits that make it easy to save on every big order. Here's what you can look forward to:</p>
        <div className={styles.benefits_available}>
          {
            foodPassBenefits?.map((ele) => {
              return (
                <div key={ele?.id} className={styles.benefits_container}>
                  <div className={styles.benefits_img}><Image src={ele?.icon} alt={ele?.altText} fill /></div>
                  <h3>{ele?.title}</h3>
                  <p>{ele?.content}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* --------section 4 guiding steps-------- */}
      <div className={styles.section4}>
        <h2>Our <span className={styles.pink_text}>Two-Step</span> guide to buying and using food passes</h2>
        <div className={styles.section4_ic}>
          <div className={styles.section4_C}>
            <div className={styles.step_count1}><Image src='/assets/foodPass/01.svg' alt='step 1' fill /></div>
            <div style={{ display: 'flex', alignItems: 'center', height: '13rem' }}><div className={styles.pass_ticket_img}><Image src='/assets/foodPass/food-pass-ticket.svg' alt='foodpass ticket' fill /></div></div>
            <h4>Purchase Food pass</h4>
            <p>From the Food pass section, select the number of passes you want to buy. Complete your purchase and the Food passes will be added to your account.</p>
          </div>
          <div className={styles.next_step_line}><Image src='/assets/foodPass/step-line.svg' alt='indicating next step' fill /></div>
          <div className={styles.section4_C}>
            <div className={styles.step_count2}><Image src='/assets/foodPass/02.svg' alt='step 2' fill /></div>
            <div style={{ display: 'flex', alignItems: 'center', height: '13rem' }}><div className={styles.pass_info}><Image src='/assets/foodPass/buyFoodPassInfo.svg' alt='foodpass info' fill /></div></div>
            <h4>Pay with Food pass.</h4>
            <p>Your food pass automatically applies to your order total.You can add/remove Food pass depending on your total order value. Then complete your payment and enjoy your delicious food.</p>
          </div>
        </div>
      </div>

      {/* -----------section 5 FAQ------------- */}
      <div className={styles.section5}>
        <div className={styles.heading_container}>
          <div className={styles.faq_icon}><Image src='/assets/foodPass/faq.svg' alt='faq icon' fill /></div>
          <h4 className={styles.section5_heading}>Frequent Asked Questions</h4>
        </div>
        <FAQ />
      </div>

      {/* ------------section 6 TNC----------- */}
      <div className={styles.section6}>
        <div className={styles.heading_container}>
          <div className={styles.faq_icon}><Image src='/assets/foodPass/tnc.svg' alt='faq icon' fill /></div>
          <h4 className={styles.section6_heading}>Terms and Conditions</h4>
        </div>
        <TNC />
      </div>
    </div>
  )
}

export default foodPass