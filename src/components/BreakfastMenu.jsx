import React, { useEffect, useState } from 'react'
import ProductCard from './common/ProductCard'
import styles from '../styles/components/Menu.module.css'

const BreakfastMenu = ({ data }) => {

  return (
    <div className={styles.menu_container}>
      {
        data?.map((ele) => {
          return (
            <ProductCard key={ele?._id}
              id={ele?.slug}
              image={ele?.img}
              altText={'breakfast'}
              staringFrom={ele?.price}
              offerPrice={ele?.discount_price}
            />
          )
        })
      }
    </div>
  )
}

export default BreakfastMenu