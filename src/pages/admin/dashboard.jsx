import React, { useState } from 'react'
import { adminSidebar } from '../../constants'
import styles from '../../styles/admin/Dashboard.module.css'
import AddCategory from '../../components/AddCategory';
import ViewCategory from '../../components/ViewCategory';

const dashboard = () => {
  const [showSubmenu, setShowmenu] = useState({
    menu: "Category",
    submenu: "Add Category",
    active: true
  });
  return (
    <div className={styles.dahboard_container}>
      <div className={styles.sidebar}>
        <h3>Admin</h3>
        {
          adminSidebar?.map((ele) => {
            return (
              <div key={ele?.id} className={styles.sidebar_ele_container}>
                <div className={styles.sidebar_ele} onClick={() => setShowmenu({ menu: ele?.item, active: !showSubmenu?.active })}>{ele?.item}</div>
                {
                  ele?.subItems?.map((sub) => <div className={`${(showSubmenu?.active && showSubmenu?.menu === ele?.item) ? styles.sidebar_subele : styles.sidebar_subele_hide}`} onClick={() => setShowmenu({ ...showSubmenu, submenu: sub })}>{sub}</div>)
                }
              </div>
            )
          })
        }
      </div>
      <div className={styles.form_section}>
        {
          showSubmenu?.submenu === "Add Category" ?
            <AddCategory />
            : 
            showSubmenu?.submenu === "Category List" ?
            <ViewCategory />
            : null
        }
      </div>
    </div>
  )
}

export default dashboard