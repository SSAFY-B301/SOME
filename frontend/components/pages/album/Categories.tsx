import React from "react";
import styles from "styles/album.module.scss";

interface CategoriesType {
  categories: number[];
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
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

function Categories({ categories, selectedId, setSelectedId }: CategoriesType) {
  /**
   * 선택된 카테고리 변경
   * @param id 카테고리 id
   */
  const selectCategory = (id: number) => {
    setSelectedId(id);
  };
  return (
    <section className={`${styles.categories}`}>
      <p
        onClick={() => selectCategory(0)}
        className={selectedId === 0 ? styles.is_selected : ""}
      >
        전체
      </p>
      {/* 서버에서 받아온 분류 기준 랜더 */}
      {categories.map((category: number) => (
        <p
          onClick={() => selectCategory(category)}
          className={selectedId === category ? styles.is_selected : ""}
          key={category}
        >
          {categoriesTable[category]}
        </p>
      ))}
    </section>
  );
}

export default Categories;
