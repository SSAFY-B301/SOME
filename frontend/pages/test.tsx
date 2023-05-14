import { useEffect, useMemo, useState } from "react";
import styles from "styles/test.module.scss";

function Test() {
  // const cubeEl = useMemo(() => document.querySelector(".cube"), []);
  const [cubeEl, setCubeEl] = useState<Element | undefined>(undefined);
  useEffect(() => {
    const temp = document.querySelector(".cube");
    if (temp) {
      setCubeEl(temp);
    }
  }, []);

  if (cubeEl) {
    let clickX = 0;
    let clickY = 0;

    let moveX = 0;
    let moveY = 0;

    let lastX = -25;
    let lastY = 25;

    ///////////////////
    // 마우스 클릭 이벤트 //
    ///////////////////

    cubeEl.addEventListener("mousedown", (e) => {
      let isClick = true;
      console.log(e);

      clickX = e.screenX;
      clickY = e.screenY;

      window.addEventListener("mousemove", (e) => {
        if (isClick) {
          const nowX = e.screenX;
          const nowY = e.screenY;

          moveX = lastX + clickY - nowY;
          moveY = 0;

          console.log(`X 회전각 : ${moveX}
Y 회전각 : ${moveY}`);

          gsap.to(cubeEl, 0, {
            transform: `rotateX(${moveX}deg) rotateY(${moveY}deg)`,
          });
        }
      });

      window.addEventListener(
        "mouseup",
        (e) => {
          if (isClick) {
            lastX = moveX;
            lastY = moveY;
            isClick = false;
          }
        },
        { once: true }
      );
    });

    ///////////////////
    //   터치 이벤트    //
    ///////////////////

    cubeEl.addEventListener(
      "touchstart",
      (e) => {
        let isTouch = true;

        clickX = e.targetTouches[0].screenX;
        clickY = e.targetTouches[0].screenY;

        window.addEventListener("touchmove", (e) => {
          if (isTouch) {
            const nowX = e.targetTouches[0].screenX;
            const nowY = e.targetTouches[0].screenY;

            moveX = lastX + clickY - nowY;
            moveY = lastY - clickX + nowX;

            console.log(`X 회전각 : ${moveX}
Y 회전각 : ${moveY}`);

            gsap.to(cubeEl, 0, {
              transform: `rotateX(${moveX}deg) rotateY(${moveY}deg)`,
            });
          }
        });

        window.addEventListener(
          "touchend",
          (e) => {
            if (isTouch) {
              lastX = moveX;
              lastY = moveY;
              isTouch = false;
            }
          },
          { once: true }
        );
      },
      false
    );
  }
  return (
    <>
      {/* <div>
        <a rel="ar" href="class3.usdz">
          <img src="class3.jpg" />
        </a>
      </div> */}
      {/* <main className={styles.main}>
        <section>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </main> */}
      <section className={styles.body}>
        <div className={`${styles.cube} `}>
          <div className={`${styles.face} ${styles.front}`}></div>
          <div className={`${styles.face} ${styles.back}`}></div>
          <div className={`${styles.face} ${styles.top}`}></div>
          <div className={`${styles.face} ${styles.bottom}`}></div>
          <div className={`${styles.face} ${styles.left}`}></div>
          <div className={`${styles.face} ${styles.right}`}></div>
        </div>
      </section>
    </>
  );
}

export default Test;
