import styles from "./Hero.module.css";

function Hero() {
    return (
        <div className={styles.hero} id="hero">
            <h1>7erfa</h1>
            <p>
                Connecting customers with the right workers seamlessly and
                efficiently.
            </p>
            <button>
                <a href="#about">find out more</a>
            </button>
        </div>
    );
}

export default Hero;
