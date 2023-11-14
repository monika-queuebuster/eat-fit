import React, { useEffect, useState } from 'react'
import styles from '../styles/components/Category.module.css';
import { getCategories } from '../services/apiServices';
import { toast } from 'react-toastify';
import { SlOptions } from 'react-icons/sl';
import { deleteCategory } from '../services/apiServices';
import { useRouter } from 'next/router';

const ViewCategory = () => {

    const [category, setCategory] = useState();
    const [categoryModal, setCategoryModal] = useState(false);
    const router = useRouter();

    useEffect(()=> {
        getCategories().then((res)=> {
            if(res?.status === 200) {
                console.log(res);
                setCategory(res?.data)
                localStorage.setItem("categoryList", JSON.stringify(res?.data));
            }
        }).catch((err)=> toast.error(err));
    },[])


    const deleteCategoryItem = (productId) => {
        deleteCategory(productId).then((res)=> {
            if(res?.status === 200) {
                toast.success(res?.message);
            }
        }).catch((err) => toast.error(err))
    }

    const editCategoryItem = (productId) => {
        router.push(`/admin/update-category/${productId}`);
    }

    return (
        <div className={styles.category_container}>
            <h1>Category List</h1>
            <div className={styles.category_list_container}>
                {
                    category?.map((ele, idx)=> {
                        return(
                            <div key={ele?._id} className={styles.category}>
                                <img src={ele?.imgUrl} alt='category image' className={styles.category_img} />
                                <p className={styles.category_name}>{ele?.slug}</p>
                                <span className={styles.options} onClick={()=> setCategoryModal(!categoryModal)}><SlOptions /></span>
                                <div className={`${categoryModal ? styles.category_modal : styles.category_modal_hide} `}>
                                    <div onClick={()=> editCategoryItem(ele?._id)}>Edit Category</div>
                                    <div onClick={() => deleteCategoryItem(ele?._id)}>Delete Category</div>
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