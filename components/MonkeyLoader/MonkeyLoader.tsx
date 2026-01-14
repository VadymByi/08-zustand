import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./MonkeyLoader.module.css";

interface MonkeyLoaderProps {
  show: boolean;
  duration?: number;
}

const ANIMATION_TIME = 600;

const MonkeyLoader: React.FC<MonkeyLoaderProps> = ({
  show,
  duration = 3000,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [gifSrc, setGifSrc] = useState("/monkey.gif");

  const hideTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);

  const resetGif = () => {
    setGifSrc(`/monkey.gif?t=${Date.now()}`);
  };

  useEffect(() => {
    if (show) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);

      resetGif();
      setIsMounted(true);
    } else if (isMounted) {
      hideTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);

        unmountTimerRef.current = window.setTimeout(() => {
          setIsMounted(false);
        }, ANIMATION_TIME);
      }, duration);
    }

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
    };
  }, [show, duration, isMounted]);

  useLayoutEffect(() => {
    if (isMounted) {
      setIsVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className={`${styles.monkey} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <img src={gifSrc} alt="Monkey loader" />
    </div>
  );
};

export default MonkeyLoader;
