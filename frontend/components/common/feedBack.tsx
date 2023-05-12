import useCustomAxios from "@/features/customAxios";
import { useState } from "react";
import styles from "styles/feedBack.module.scss";
import FeedBackIconn from "public/icons/feedback.svg";

interface propsType {
  isFeed: boolean;
  setIsFeed: React.Dispatch<React.SetStateAction<boolean>>;
}

function FeedBackIcon(props: propsType) {
  const toggle = () => {
    props.setIsFeed(!props.isFeed);
  };
  return (
    <section className={`${styles.feedbackIcon}`}>
      <button className={`${styles.open}`} onClick={toggle}>
        <span>피드백</span>
      </button>
      {props.isFeed && (
        <FeedBack isFeed={props.isFeed} setIsFeed={props.setIsFeed} />
      )}
    </section>
  );
}

export const FeedBack = (props: propsType) => {
  const [content, setContent] = useState<string>("");
  const [isSend, setIsSend] = useState(false);
  const [isAniEnd, setIsAniEnd] = useState(false);
  const inputText = (text: string) => {
    setContent(text);
  };

  const { customBoyAxios } = useCustomAxios();

  const send = () => {
    customBoyAxios.post(`/noti/feedback`, { content: content });
    setContent("");
    setIsSend(true);
    setTimeout(function () {
      setIsSend(false);
      props.setIsFeed(false);
    }, 2.0 * 1000);
  };

  const endAni = () => {
    setIsAniEnd(true);
  };

  return (
    <section className={`${styles.feedback}`} onAnimationEnd={() => endAni()}>
      {isAniEnd && (
        <>
          <textarea
            onChange={(e) => inputText(e.target.value)}
            name=""
            id=""
            cols={30}
            rows={10}
          ></textarea>
          <button onClick={send}>
            <span>피드백 보내기</span>
          </button>
          {/* {isSend && (
        <section>
          <span>감사합니다.</span>
        </section>
      )} */}
          {isSend && <Complete />}
        </>
      )}
    </section>
  );
};

const Complete = () => {
  return (
    <div className={styles.complete}>
      <div>
        <span>소중한 의견 감사합니다.</span>
      </div>
    </div>
  );
};

export default FeedBackIcon;
