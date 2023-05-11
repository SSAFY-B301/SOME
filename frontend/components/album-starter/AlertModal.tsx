import React from "react";

const AlertModal = (): JSX.Element => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center">
      <div className="w-11/12 h-full flex flex-col justify-center items-center">
        <div className="w-full h-16 bg-white dark:bg-dark-block rounded-xl flex flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center items-center text-gray-400 dark:text-white">
            앨범을 만드는 중입니다
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
