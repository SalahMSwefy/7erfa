import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div
            className={`${styles.header} ${
                isScrolled ? styles.headerScrolled : ""
            }`}>
            <Logo />
            <Navbar />
            <Buttons isScrolled={isScrolled} />
            <MenuIcon toggleMenu={toggleMenu} />
            <Menu isMenuOpen={isMenuOpen} />
        </div>
    );
}

function Logo() {
    return (
        <div className={styles.logo}>
            <img src="/logo.gif" alt="Logo" />
            <a href="#">7erfa</a>
        </div>
    );
}

function Navbar() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
                <li>
                    <a href="#Services">Services</a>
                </li>
                <li>
                    <a href="#team">Team</a>
                </li>
            </ul>
        </nav>
    );
}

function Buttons({ isScrolled }) {
    return (
        <div
            className={`${styles.buttons} ${
                isScrolled ? styles.buttonsScrolled : ""
            }`}>
            <button className={styles.button}>Sign Up</button>
            <button className={styles.button}>Log In</button>
        </div>
    );
}

function MenuIcon({ toggleMenu }) {
    return (
        <button className={styles.menuIcon} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
        </button>
    );
}

function Menu({ isMenuOpen }) {
    return (
        isMenuOpen && (
            <div className={styles.menu}>
                <ul>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                    <li>
                        <a href="#Services">Services</a>
                    </li>
                    <li>
                        <a href="#team">Team</a>
                    </li>
                </ul>
            </div>
        )
    );
}
