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
import { useRouter } from 'next/router';
import { IoMdArrowBack } from "react-icons/io";

const dashboard = () => {
  const [showSubmenu, setShowmenu] = useState({
    menu: "Category",
    submenu: "Add Category",
    active: true
  });
  const [categoryAction, setCategoryAction] = useState({ action: "", data: null })
  const [mealAction, setMealAction] = useState({ action: "", data: null })
  const [subsAction, setSubsAction] = useState({ action: "", data: null })
  const [componentStack, setComponentStack] = useState([]);


  const router = useRouter();
  const adminToken = typeof window !== "undefined" && localStorage.getItem("adminToken");

  useEffect(() => {
    !adminToken ? router.push('/admin/login') : router.push('/admin/dashboard')
  }, [])

  const goBack = () => {
    if(componentStack.length <= 1) {
      router.push('/admin/login');
    }
    if (componentStack.length > 0) {
      const prevComponent = componentStack[componentStack.length-2];
      const newArr = [...componentStack];
      newArr.splice(-2);
      setComponentStack(newArr);
      console.log('--prev component--', componentStack, prevComponent);
      setShowmenu({ menu: prevComponent?.menu, submenu: prevComponent?.submenu });
    }
  };

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
                      active: showSubmenu?.menu !== ele?.item ? true : showSubmenu?.active === true ? false : true,
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
        <span onClick={goBack} style={{ cursor: "pointer", display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative', top: '2rem', left: '10rem' }}>
        <IoMdArrowBack /> Go Back
        </span>
        {
          showSubmenu?.submenu === "Add Category" ?
            <AddCategory setShowmenu={setShowmenu} showSubmenu={showSubmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
            :
            showSubmenu?.submenu === "Category List" ?
              <ViewCategory setCategoryAction={setCategoryAction} categoryAction={categoryAction} setShowmenu={setShowmenu} showSubmenu={setShowmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
              :
              showSubmenu?.submenu === "Edit Category" && showSubmenu?.menu === "Category" ?
                <EditCategory categoryData={categoryAction?.data} setShowmenu={setShowmenu} showSubmenu={showSubmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
                :
                showSubmenu?.submenu === "Add Meal" ?
                  <AddMeal setShowmenu={setShowmenu} showSubmenu={showSubmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
                  :
                  showSubmenu?.submenu === "Meal List" ?
                    <ViewMeal setMealAction={setMealAction} mealAction={mealAction} setShowmenu={setShowmenu} showSubmenu={setShowmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
                    :
                    showSubmenu?.submenu === "Edit Category" && showSubmenu?.menu === "Food Meal" ?
                      <EditMeal mealData={mealAction?.data} setShowmenu={setShowmenu} showSubmenu={showSubmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
                      :
                      showSubmenu?.submenu === "Add Subscription" ?
                        <AddSubscription setShowmenu={setShowmenu} showSubmenu={showSubmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
                        :
                        showSubmenu?.submenu === "Subscription List" ?
                          <ViewSubscription setShowmenu={setShowmenu} showSubmenu={showSubmenu} setSubsAction={setSubsAction} subsAction={subsAction} setComponentStack={setComponentStack} componentStack={componentStack} />
                          :
                          showSubmenu?.submenu === "Edit Category" && showSubmenu?.menu === "Subscription" ?
                            <EditSubscription subsData={subsAction?.data} setShowmenu={setShowmenu} showSubmenu={showSubmenu} setComponentStack={setComponentStack} componentStack={componentStack} />
                            : null

        }
      </div>
    </div>
  )
}

export default dashboard