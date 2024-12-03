import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div
            className={`${styles.header} ${
                isScrolled ? styles.headerScrolled : ""
            }`}>
            <Logo />
            <Navbar isMenuOpen={isMenuOpen} />
            <MenuIcon toggleMenu={toggleMenu} />
            <Buttons isScrolled={isScrolled} />
            <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
    );
}

function Logo() {
    return (
        <div className={styles.logo}>
            <img src="/logos/logo.gif" alt="Logo" />
            <a href="#">7erfa</a>
        </div>
    );
}

function Navbar({ isMenuOpen }) {
    return (
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <ul>
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#services">Services</a>
                </li>
                <li>
                    <a href="#categories">Categories</a>
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
            <button>Sign Up</button>
            <button>Log In</button>
        </div>
    );
}

function MenuIcon({ toggleMenu }) {
    return (
        <button className={styles.menuIcon} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
            </svg>
        </button>
    );
}

function Menu({ isMenuOpen, toggleMenu }) {
    return (
        isMenuOpen && (
            <div className={styles.menu}>
                <ul>
                    <li>
                        <a href="#about" onClick={toggleMenu}>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#services" onClick={toggleMenu}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#categories" onClick={toggleMenu}>
                            Categories
                        </a>
                    </li>
                    <li>
                        <a href="#team" onClick={toggleMenu}>
                            Team
                        </a>
                    </li>
                </ul>
                <br />
                <div>
                    <h1> Join us now </h1>
                    <div>
                        <button>Sign Up</button>
                        <button>Log In</button>
                    </div>
                </div>
            </div>
        )
    );
}
