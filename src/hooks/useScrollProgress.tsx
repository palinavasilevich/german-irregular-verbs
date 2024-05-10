import { useState, useEffect } from "react";

const useScrollProgress = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateSCrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        setCompletion(Number(currentProgress / scrollHeight).toFixed(2) * 100);
      }
    };

    window.addEventListener("scroll", updateSCrollCompletion);

    return () => window.removeEventListener("scroll", updateSCrollCompletion);
  }, []);

  return completion;
};

export default useScrollProgress;
