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

export const LoadingInviteAlbum = () => {
  return <div className={`${styles.invite_album} ${styles.loading}`}></div>;
};

export const LoadingInviteFriendThumbnail = () => {
  return (
    <div
      className={`${styles.invite_friend_thumbnail} ${styles.loading}`}
    ></div>
  );
};

export const LoadingInviteFriendBtn = () => {
  return (
    <div className={`${styles.invite_friend_btn} ${styles.loading}`}></div>
  );
};

export const LoadingFav = () => {
  return <div className={`${styles.fav} ${styles.loading}`}></div>;
};
