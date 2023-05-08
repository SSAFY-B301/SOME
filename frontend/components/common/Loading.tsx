import styles from "styles/loading.module.scss";

export const LoadingProfile = () => {
  return <div className={`${styles.profile} ${styles.loading}`}></div>;
};

export const LoadingTitle = () => {
  return <div className={`${styles.title} ${styles.loading}`}></div>;
};

export const LoadingPhoto = () => {
  return <div className={`${styles.photo} ${styles.loading}`}></div>;
};

export const LoadingCount = () => {
  return <div className={`${styles.count} ${styles.loading}`}></div>;
};

export const LoadingTotal = () => {
  return <div className={`${styles.total} ${styles.loading}`}></div>;
};
