import { useState, useEffect } from 'react';

const useCountUp = (targetValue, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOut * targetValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    if (targetValue > 0) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      setCount(0);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration]);

  return count;
};

export default useCountUp;
