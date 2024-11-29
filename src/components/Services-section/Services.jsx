import styles from "./Services.module.css";

function Services() {
  return (
    <div className={styles.services} id="services">
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2>At Your Service</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Connect Easily</h3>
            <p>
              Our platform helps workers and customers connect effortlessly.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Find Suitable Workers</h3>
            <p>
              Customers can easily find workers that meet their specific needs.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Showcase Your Work</h3>
            <p>
              Workers can display their projects and skills on our platform.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Efficient Communication</h3>
            <p>
              Ensuring smooth and effective communication between workers and
              customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
