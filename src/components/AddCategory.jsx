import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/Category.module.css';
import { addCategory } from '../services/apiServices';
import { toast } from 'react-toastify';

const AddCategory = ({setShowmenu, showSubmenu, setComponentStack, componentStack }) => {
    const [createCategory, setCreateCategory] = useState({
        title: '',
        imgUrl: null,
    })

    useEffect(()=> {
        let newArr = [...componentStack];
        const componentObj = {
            menu: "Category",
            submenu: "Add Category"
        }
        newArr.push(componentObj);
        setComponentStack(newArr)
    },[])

    const hiddenFileInput = useRef(null);

    const handleFileChange = (e) => {
        setCreateCategory({ ...createCategory, imgUrl: e.target.files[0] })
    }

    const handleFormSubmit = () => {
        const formData = new FormData();
        formData.append('title', createCategory.title);
        formData.append('imgUrl', createCategory.imgUrl);
        addCategory(formData).then((res) => {
            if (res?.status) {
                toast.success(res?.message)
                setShowmenu({...showSubmenu, submenu: "Category List"})
            }
        }).catch((err) => {
            toast.error(err)
        })
    }

    return (
        <div className={styles.category_container}>
            <h1>Add Category</h1>
            <div className={styles.form_row}>
                <div className={styles.input_container}>
                    <label>Title</label>
                    <input className={styles.form_input} type='text' value={createCategory?.title} onChange={(e) => setCreateCategory({ ...createCategory, title: e.target.value })} />
                </div>
                <div className={styles.input_container}>
                    <label>Upload Picture</label>
                    <button onClick={() => hiddenFileInput.current.click()} className={styles.image_btn}>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={hiddenFileInput}
                            onChange={(e)=>handleFileChange(e)}
                        />
                        Select Image
                    </button>
                </div>
            </div>
            <button onClick={handleFormSubmit} className={styles.submit_btn}>Submit</button>
        </div>
    )
}

export default AddCategory