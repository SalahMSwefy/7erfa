import styles from "./Categories.module.css";
const categories = [
    "Mechanical",
    "Electrical",
    "Plumbing",
    "Carpentry",
    "Painting",
    "Construction Worker",
];
function Categories() {
    return (
        <div className={styles.categories}>
            {categories.map((category, i) => (
                <Category key={i} name={category} i={i + 1} />
            ))}
        </div>
    );
}

export default Categories;

function Category({ name, i }) {
    return (
        <div className={styles.category}>
            <img src={`/categories/${i}.jpg`} alt="Category" />
            <h3>{name}</h3>
        </div>
    );
}
