import styles from '../../styles/formStyles.module.scss'
import { useRef, HtmlHTMLAttributes, CSSProperties } from 'react'

interface InputProps {
    placeholder: string,
    className: string,
    style: CSSProperties,
    defaultColor: boolean,
    onChange: (event) => void
}

const Input = ({placeholder, className, onChange, style, defaultColor = false } : InputProps)=> {
    const inputRef = useRef(null);
    const handleClick = (e) => {
        if(e.currentTarget.value === '')
        inputRef.current.classList.add(styles.input_active);
    }

    const handleBlur = (e) =>{
        if(e.currentTarget.value === '')
            inputRef.current.classList.toggle(styles.input_active);
    }

    return (
        <div 
            ref={inputRef}
            style={style? style : null} 
            className={`${styles.input_container} ${defaultColor? styles.white: ''} ${className? className: ''}`}
        >
            <label htmlFor="input" className={styles.label}>{placeholder}</label>
            <input id="input" onFocus={handleClick} onChange={onChange} onBlur={handleBlur} type='text'/>
            <div className={styles.line}></div>
        </div>
    )
}

export default Input;