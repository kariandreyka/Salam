import { useRouter } from 'next/router';
import styles from './PopUp.module.scss';

const PopUp = ({message, onClick, toggle}) =>{
    const router = useRouter();
    const handleClick = () =>{
        onClick();
        toggle();
    }
    return(
        <div className={`row no-gutters justify-content-center align-items-center ${styles.popup_wrap}`}>
            <div className={`${styles.popup_main}`}>
                <span className="d-block m-3">{message}</span>
                <div className={`row no-gutters justify-content-between mt-2`}>
                    <button className={styles.btn_decline} onClick={() => router.push('/')}>Decline</button>
                    <button className={styles.btn_accept} onClick={handleClick}>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp;