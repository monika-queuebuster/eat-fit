import React from 'react'
import {breakfastData} from '../constants'
import ProductCard from './common/ProductCard'
import styles from '../styles/components/Menu.module.css'

const BreakfastMenu = () => {
  return (
    <div className={styles.menu_container}>
      {
        breakfastData?.map((ele) => {
          return (
            <ProductCard key={ele?.id}
              id={ele?.id}
              image={ele?.img}
              altText={ele?.altText}
              staringFrom={ele?.staringFrom}
              offerPrice={ele?.OfferPrice}
            />
          )
        })
      }
    </div>
  )
}

export default BreakfastMenu