import styles from './Header.module.scss';

const Header = () =>{
    return(
        <header className={styles.header}>
            <a href="/" className={styles.header_logo}>
                Salam
            </a>
            <div className={styles.header_buttons}>
                <a href='/create' className={styles.action_btn}>Create</a>
                <a href='/join' className={styles.action_btn}>Join</a>
            </div>
        </header>    
    )
}

export default Header;