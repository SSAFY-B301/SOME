import React from "react";
import styles from "styles/album.module.scss";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/types/StateType";
import { setCategoryState } from "@/features/albumStatusSlice";

interface categoriesTable {
  [index: number]: string;
}

const categoriesTable: categoriesTable = {
  1: "사람",
  2: "단체",
  3: "음식",
  4: "동물",
  5: "운동",
  6: "물건",
  7: "기타",
};

const categories: number[] = [1, 2, 3, 4, 5, 6, 7];

function Categories() {
  let dispatch = useDispatch();
  const categoryId = useSelector(
    (state: StateType) => state.albumStatus.categoryId
  );

  /**
   * 선택된 카테고리 변경
   * @param id 카테고리 id
   */
  const selectCategory = (id: number) => {
    dispatch(setCategoryState({ categoryId: id }));
  };
  return (
    <section className={`${styles.categories} justify-start px-4`}>
      <p
        onClick={() => selectCategory(0)}
        className={categoryId === 0 ? styles.is_selected : ""}
      >
        전체
      </p>
      {/* 서버에서 받아온 분류 기준 랜더 */}
      {categories.map((category: number) => (
        <p
          onClick={() => selectCategory(category)}
          className={categoryId === category ? styles.is_selected : ""}
          key={category}
        >
          {categoriesTable[category]}
        </p>
      ))}
    </section>
  );
}

export default Categories;
