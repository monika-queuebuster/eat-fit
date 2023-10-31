import React, { useState } from 'react'
import { foodPassFAQ } from '../../constants'
import styles from '../../styles/components/common/FAQ.module.css';
import { MdKeyboardArrowDown } from 'react-icons/md';

const FAQ = () => {
    const [showAns, setShowAns] = useState(false);
    const [selectedQues, setSelectedQues] = useState('')

    const handleQuesSelection = (ques) => {
        setSelectedQues(ques);
        if (selectedQues === ques) {
            setShowAns(!showAns)
        } else {
            setShowAns(true);
        }
    }
    return (
        <div>
            {
                foodPassFAQ?.map((ele) => {
                    return (
                        <div key={ele?.id} className={styles.faq}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p onClick={() => handleQuesSelection(ele?.ques)}
                                    className={`${styles.faq_ques} ${(selectedQues === ele?.ques && showAns) && styles.selected_ques }`}>
                                    {ele?.ques}
                                </p>
                                <MdKeyboardArrowDown className={`${styles.arrow} ${(selectedQues === ele?.ques && showAns) && styles.rotate_arrow}`} />
                            </div>
                            <p className={`${(selectedQues === ele?.ques && showAns) ? styles.show_ans : styles.hide_ans}`}>{ele?.ans}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FAQ