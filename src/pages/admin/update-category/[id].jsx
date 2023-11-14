import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/components/Category.module.css'
import { updateCategoryItem } from '../../../services/apiServices';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const updateCategory = () => {
    const [updateCategory, setUpdatecategory] = useState({
        title: '',
        imgUrl: null,
    })

    const router = useRouter();

    useEffect(()=> {
        const dataList = typeof window != 'undefined' && localStorage.getItem('categoryList');
        const categoryList = JSON.parse(dataList);
        const category = categoryList?.filter((ele) => ele?._id === router.query.id)
        setUpdatecategory({title: category[0]?.slug, imgUrl: category[0]?.imgUrl})
    },[router.query.id])

    const hiddenFileInput = useRef(null);

    const handleFileChange = (e) => {
        setUpdatecategory({ ...updateCategory, imgUrl: e.target.files[0] })
    }

    const handleFormSubmit = () => {
        const formData = new FormData();
        formData.append('title', updateCategory?.title);
        formData.append('imgUrl', updateCategory?.imgUrl);
        updateCategoryItem(formData, router.query.id).then((res)=> {
            if(res?.status === 200) {
                toast.success(res?.message);
            }
        }).catch((err)=> toast.error(err));
    }

    return (
        <div className={styles.category_container}>
            <h1>Update Category</h1>
            <div className={styles.form_row}>
                <div className={styles.input_container}>
                    <label>Title</label>
                    <input className={styles.form_input} type='text' value={updateCategory?.title} onChange={(e) => setUpdatecategory({ ...updateCategory, title: e.target.value })} />
                </div>
                <div className={styles.input_container}>
                    <button onClick={() => hiddenFileInput.current.click()} className={styles.select_user_img}>
                        <div><img src={`${updateCategory.imgUrl ? updateCategory.imgUrl : '/assets/navigation/user-mobile.png'}`} alt='user image' className={styles.user_image} /></div>
                        <div className={styles.edit_text}>EDIT</div>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={hiddenFileInput}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </button>
                </div>
            </div>
            <button onClick={handleFormSubmit} className={styles.submit_btn}>Update</button>
        </div>
    )
}

export default updateCategory