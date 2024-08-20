import { useEffect, useState } from "react";

export const useWindowVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log("visibility change", document.visibilityState);
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return isVisible;
};
