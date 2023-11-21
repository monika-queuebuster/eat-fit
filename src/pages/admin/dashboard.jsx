import React, { useEffect, useState } from 'react'
import { adminSidebar } from '../../constants'
import styles from '../../styles/admin/Dashboard.module.css'
import AddCategory from '../../components/AddCategory';
import ViewCategory from '../../components/ViewCategory';
import EditCategory from '../../components/EditCategory';
import ViewMeal from '../../components/ViewMeal';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AddMeal from '../../components/AddMeal';
import EditMeal from '../../components/EditMeal';
import AddSubscription from '../../components/AddSubscription';
import ViewSubscription from '../../components/ViewSubscription';
import EditSubscription from '../../components/EditSubscription';

const dashboard = () => {
  const [showSubmenu, setShowmenu] = useState({
    menu: "Category",
    submenu: "Add Category",
    active: true
  });
  const [categoryAction, setCategoryAction] = useState({ action: "", data: null })
  const [mealAction, setMealAction] = useState({ action: "", data: null })
  const [subsAction, setSubsAction] = useState({ action: "", data: null })

  console.log('--show menu--', showSubmenu);

  return (
    <div className={styles.dahboard_container}>
      <div className={styles.sidebar}>
        <h3>Admin</h3>
        {
          adminSidebar?.map((ele) => {
            return (
              <div key={ele?.id} className={styles.sidebar_ele_container}>
                <div className={styles.sidebar_ele}
                  onClick={() =>
                    setShowmenu({
                      menu: ele?.item,
                      active: true,
                      submenu: ele?.item === "Category" ? "Add Category"
                        : ele?.item === "Food Meal" ? "Add Meal"
                          : ele?.item === "Subscription" ? "Add Subscription"
                            : ele?.item === "User" ? "Registered User"
                              : null
                    })}>
                  {ele?.item} {(showSubmenu?.active && showSubmenu?.menu === ele?.item) ? < IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {
                  ele?.subItems?.map((sub) => <div className={`${(showSubmenu?.active && showSubmenu?.menu === ele?.item) ? styles.sidebar_subele : styles.sidebar_subele_hide} ${showSubmenu?.submenu === sub && styles.active_submenu}`} onClick={() => setShowmenu({ ...showSubmenu, submenu: sub })}>{sub}</div>)
                }
              </div>
            )
          })
        }
      </div>
      <div className={styles.form_section}>
        {
          showSubmenu?.submenu === "Add Category" ?
            <AddCategory setShowmenu={setShowmenu} showSubmenu={showSubmenu} />
            :
            showSubmenu?.submenu === "Category List" ?
              <ViewCategory setCategoryAction={setCategoryAction} categoryAction={categoryAction} setShowmenu={setShowmenu} showSubmenu={setShowmenu} />
              :
              showSubmenu?.submenu === "Edit Category" && showSubmenu?.menu === "Category" ?
                <EditCategory categoryData={categoryAction?.data} setShowmenu={setShowmenu} showSubmenu={showSubmenu} />
                :
                showSubmenu?.submenu === "Add Meal" ?
                  <AddMeal setShowmenu={setShowmenu} showSubmenu={showSubmenu} />
                  :
                  showSubmenu?.submenu === "Meal List" ?
                    <ViewMeal setMealAction={setMealAction} mealAction={mealAction} setShowmenu={setShowmenu} showSubmenu={setShowmenu} />
                    :
                    showSubmenu?.submenu === "Edit Category" && showSubmenu?.menu === "Food Meal" ?
                      <EditMeal mealData={mealAction?.data} setShowmenu={setShowmenu} showSubmenu={showSubmenu} />
                      :
                      showSubmenu?.submenu === "Add Subscription" ?
                        <AddSubscription setShowmenu={setShowmenu} showSubmenu={showSubmenu} />
                        :
                        showSubmenu?.submenu === "Subscription List" ?
                          <ViewSubscription setShowmenu={setShowmenu} showSubmenu={showSubmenu} setSubsAction={setSubsAction} subsAction={subsAction} />
                          :
                          showSubmenu?.submenu === "Edit Category" && showSubmenu?.menu === "Subscription" ?
                            <EditSubscription subsData={subsAction?.data} setShowmenu={setShowmenu} showSubmenu={showSubmenu} />
                            : null

        }
      </div>
    </div>
  )
}

export default dashboard