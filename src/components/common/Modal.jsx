import React, { useState } from 'react'
import Modal from 'react-modal';
import styles from '../../styles/components/common/Modal.module.css'
import { RiSearch2Line } from 'react-icons/ri'
import { cityData } from '../../constants';
import Image from 'next/image';

const ModalComponent = ({ isOpen, closeModal }) => {
    const allCities = ["Bangalore", "Delhi NCR", "Hyderabad", "Mumbai", "Chennai", "Jaipur", "Pune", "Ahmedabad", "Mysore", "Chandigarh", "Surat", "Coimbatore"]
    const [cities, setCities] = useState(allCities);

    const handleCitySearch = (e) => {
        if (e.target.value === "") {
            setCities(allCities);
        } else {
            let newArray = [];
            if(e.target.value.length === 1) {

            }
            
            cities?.filter((cityName) => {
                cityName.includes(e.target.value) && newArray.push(cityName);
            })
            setCities(newArray)
        }


    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.modal_size}>
            <div className={styles.header_container}><button className={styles.close_btn} onClick={closeModal}>X</button> <span className={styles.modal_heading}>Select Your City</span></div>
            <div className={styles.searchbar_container}>
                <span className={styles.icon_container}><RiSearch2Line className={styles.search_icon} /></span>
                <input placeholder='Search for city' className={styles.search_box} onChange={(e) => handleCitySearch(e)} />
            </div>

            <div className={styles.cities_container}>
                {
                    cityData?.map((ele) => {
                        return (
                            <>
                                {
                                    cities.includes(ele?.city) &&
                                    <div>
                                        <div className={styles.city_img}><Image src={ele?.img} alt={ele?.altText} fill /></div>
                                        <p className={styles.city_name}>{ele?.city}</p>
                                    </div>
                                }
                            </>
                        )
                    })
                }
            </div>
        </Modal>
    );
}

export default ModalComponent