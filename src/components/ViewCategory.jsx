import React, { useEffect, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { getCategories } from '../services/apiServices';
import { toast } from 'react-toastify';
import { SlOptions } from 'react-icons/sl';
import { deleteCategory } from '../services/apiServices';

const ViewCategory = ({ setCategoryAction, categoryAction, setShowmenu, showSubmenu }) => {

    const [category, setCategory] = useState();
    const [categoryModal, setCategoryModal] = useState({ active: false, name: "" });

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = () => {
        getCategories().then((res) => {
            if (res?.status === 200) {
                console.log(res);
                setCategory(res?.data)
                localStorage.setItem("categoryList", JSON.stringify(res?.data));
            }
        }).catch((err) => toast.error(err));
    }

    const deleteCategoryItem = (product) => {
        setCategoryAction({ ...categoryAction, action: "Delete" })
        deleteCategory(product?.slug).then((res) => {
            if (res?.status === 200) {
                toast.success(res?.message);
                getAllCategories();
            }
        }).catch((err) => toast.error(err))
    }

    const editCategoryItem = (product) => {
        setCategoryAction({ action: "Edit", data: product })
        setShowmenu({ ...showSubmenu, menu: 'Category', submenu: "Edit Category" })
    }

    return (
        <div className={styles.category_container}>
            <h1>Category List</h1>
            <div className={styles.category_list_container}>
                {
                    category?.map((ele, idx) => {
                        return (
                            <div key={ele?._id} className={styles.category}>
                                <div style={{ height: '25rem', display: 'flex', alignItems: 'center' }}><img src={ele?.imgUrl} alt='category image' className={styles.category_img} /></div>
                                <p className={styles.category_name}>{ele?.slug}</p>
                                <span className={styles.options} onClick={() => setCategoryModal({ active: !categoryModal?.active, name: ele?.slug })}><SlOptions /></span>
                                <div className={`${(categoryModal?.active && categoryModal?.name === ele?.slug) ? styles.category_modal : styles.category_modal_hide} `}>
                                    <div onClick={() => editCategoryItem(ele)}>Edit Category</div>
                                    <div onClick={() => deleteCategoryItem(ele)}>Delete Category</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewCategory