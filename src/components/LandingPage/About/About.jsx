import styles from "./About.module.css";

function About() {
    return (
        <div className={styles.about} id="about">
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h2>About Us</h2>
                <p>
                    At <span>7erfa</span>, we aim to bridge the gap between
                    customers and skilled workers. Our platform ensures a
                    seamless connection that saves time, enhances reliability,
                    and drives satisfaction. Whether you&apos;re a customer
                    looking for assistance or a worker seeking opportunities,{" "}
                    <span>7erfa</span> has you covered.
                </p>
                <button>
                    <a href="#services">Learn More</a>
                </button>
            </div>
        </div>
    );
}

export default About;
