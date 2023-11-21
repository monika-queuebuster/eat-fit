import React, { useEffect, useState } from 'react'
import ProductCard from './common/ProductCard'
import styles from '../styles/components/Menu.module.css'
import { toast } from 'react-toastify'
import { getMealData } from '../services/apiServices'

const LunchMenu = ({ data }) => {

  return (
    <div className={styles.menu_container}>
      {
        !data && <p>No Data Available</p>
      }
      {
        data?.map((ele) => {
          return (
            <ProductCard key={ele?._id}
              id={ele?.slug}
              image={ele?.img}
              altText={'lunch'}
              staringFrom={ele?.price}
              offerPrice={ele?.discount_price}
            />
          )
        })
      }
    </div>
  )
}

export default LunchMenu