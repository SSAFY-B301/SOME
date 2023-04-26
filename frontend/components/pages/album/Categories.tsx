import styles from "@/styles/album.module.scss";

interface CategoriesType {
  categories: number[];
}

interface categoriesTable {
  [index: number]: string;
}

const categoriesTable: categoriesTable = {
  1: "자연",
  2: "동물",
  3: "개인",
  4: "단체",
  5: "음식",
};

function Categories({ categories }: CategoriesType) {
  return (
    <section className={`${styles.categories}`}>
      {categories.map((category: number) => (
        <p key={category}>{categoriesTable[category]}</p>
      ))}
    </section>
  );
}

export default Categories;
