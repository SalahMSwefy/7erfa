import styles from "./Footer.module.css";
function Footer() {
    return (
        <div>
            <footer className={styles.footer}>
                <div className={styles.logo}>
                    <h2>7erfa</h2>
                    <p>save your time</p>
                </div>
                <div className={styles.rights}>
                    <div className={styles.links}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                    <p>
                        <strong>7erfa Platform</strong> © 2024 All rights
                        reserved
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
