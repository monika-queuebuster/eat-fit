import Image from 'next/image'
import React from 'react'
import styles from '../../styles/components/common/Card.module.css';
import { useRouter } from 'next/router';

const ProductCard = ({ id, image, altText, staringFrom, offerPrice }) => {
    const router = useRouter();

    return (
        <div className={styles.product_card} onClick={()=> router.push(`/purchase-order/${id}`)}>
            <div className={styles.product_image}><Image src={image} alt={altText} fill /></div>
            <div className={styles.price}>
                <p>Starting from</p>
                <p className={styles.starting_price}>₹ {staringFrom} / per meal</p>
            </div>
            <div style={{marginTop: "0.5rem"}} className={styles.price}>
                <p>Offer Price</p>
                <p>₹ {offerPrice} / per meal</p>
            </div>
        </div>
    )
}

export default ProductCard