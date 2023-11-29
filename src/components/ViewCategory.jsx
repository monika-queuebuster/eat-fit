import React, { useEffect, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { getCategories } from '../services/apiServices';
import { toast } from 'react-toastify';
import { SlOptions } from 'react-icons/sl';
import { deleteCategory } from '../services/apiServices';
import DeleteConfirmation from './common/DeleteConfirmation';

const ViewCategory = ({ setCategoryAction, categoryAction, setShowmenu, showSubmenu, setComponentStack, componentStack }) => {

    const [category, setCategory] = useState();
    const [open, setOpen] = useState(false);
    const [categoryModal, setCategoryModal] = useState({ active: false, name: "" });
    const [remove, setRemove] = useState({ status: false, id: null });

    useEffect(() => {
        getAllCategories();
    }, [])
    
    useEffect(() => {
        let newArr = [...componentStack];
        const componentObj = {
            menu: "Category",
            submenu: "Category List"
        }
        newArr.push(componentObj);
        setComponentStack(newArr)
    }, [])

    useEffect(() => {
        if (remove?.status === true) {
            deleteCategoryItem(remove?.id)
        }
    }, [remove?.status])

    const getAllCategories = () => {
        getCategories().then((res) => {
            if (res?.status === 200) {
                console.log(res);
                setCategory(res?.data)
            }
        }).catch((err) => toast.error(err));
    }

    const deleteCategoryItem = (slug) => {
        setCategoryAction({ ...categoryAction, action: "Delete" })
        deleteCategory(slug).then((res) => {
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

    const openDeleteModal = (slug) => {
        setOpen(true)
        setRemove({ ...remove, id: slug })
    }

    return (
        <>
            <DeleteConfirmation isOpen={open} closeModal={() => setOpen(false)} setRemove={setRemove} remove={remove} />
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
                                        <div onClick={() => openDeleteModal(ele?.slug)}>Delete Category</div>
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

export default ViewCategory