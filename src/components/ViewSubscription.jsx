import React, { useEffect, useState } from 'react'
import { deleteSubscription, getAllSubscriptions } from '../services/apiServices';
import styles from '../styles/components/Category.module.css';
import { toast } from 'react-toastify';
import { SlOptions } from 'react-icons/sl';
import { IoMdRadioButtonOn } from "react-icons/io";
import DeleteConfirmation from './common/DeleteConfirmation';

const ViewSubscription = ({ setShowmenu, showSubmenu, setSubsAction, subsAction, setComponentStack, componentStack }) => {
  const [subscription, setSubscription] = useState();
  const [mealModal, setMealModal] = useState({ active: false, name: "" });
  const [remove, setRemove] = useState({ status: false, id: null });
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getAllLists();
  }, [])

  useEffect(() => {
    if (remove?.status === true) {
      deleteSubscriptionData(remove?.id)
    }
  }, [remove?.status])

  useEffect(() => {
    let newArr = [...componentStack];
    const componentObj = {
      menu: "Subscription",
      submenu: "Subscription List"
    }
    newArr.push(componentObj);
    setComponentStack(newArr)
  }, [])

  const getAllLists = () => {
    getAllSubscriptions().then((res) => {
      if (res?.status === 200) {
        console.log(res);
        setSubscription(res?.data)
      }
    }).catch((err) => toast.error(err));
  }

  const deleteSubscriptionData = (slug) => {
    setSubsAction({ ...subsAction, action: "Delete" })
    deleteSubscription(slug).then((res) => {
      if (res?.status === 200) {
        toast.success(res?.message);
        getAllLists();
      }
    }).catch((err) => toast.error(err))
  }

  const editSubscriptionData = (product) => {
    console.log('--ele--', product)
    setSubsAction({ action: "Edit", data: product })
    setShowmenu({ ...showSubmenu, menu: "Subscription", submenu: "Edit Subscription" })
  }

  const openDeleteModal = (slug) => {
    setOpen(true)
    setRemove({ ...remove, id: slug })
  }

  return (
    <>
      <DeleteConfirmation isOpen={open} closeModal={() => setOpen(false)} setRemove={setRemove} remove={remove} />
      <div className={styles.category_container}>
        <h1>Subscription List</h1>
        <div className={styles.category_list_container}>
          {
            subscription?.map((ele, idx) => {
              return (
                <div key={ele?._id} className={styles.subscription}>
                  <div style={{ height: '25rem', display: 'flex', alignItems: 'center' }}><img src={ele?.img} alt='subscription image' className={styles.category_img} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                    <span><IoMdRadioButtonOn className={`${ele?.food_category === "Veg" ? styles.veg_sign : ele?.food_category === "Non-Veg" && styles.nonveg_sign} ${styles.category_sign}`} /></span>
                    <p className={styles.category_name}>{ele?.title}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <span className={styles.discount_price}>Starting from</span>
                    <span className={styles.real_price}>₹ {ele?.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <span className={styles.discount_price}>Offer prize</span>
                    <span className={styles.discount_price}>₹ {ele?.discount_price}</span>
                  </div>

                  <span className={styles.options} onClick={() => setMealModal({ active: !mealModal?.active, name: ele?.slug })}><SlOptions /></span>
                  <div className={`${(mealModal?.active && mealModal?.name === ele?.slug) ? styles.category_modal : styles.category_modal_hide} `}>
                    <div onClick={() => editSubscriptionData(ele)}>Edit Meal</div>
                    <div onClick={() => openDeleteModal(ele?.slug)}>Delete Meal</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ViewSubscription