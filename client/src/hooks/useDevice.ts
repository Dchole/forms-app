import { useEffect, useState } from "react";

export type TDevice = "mobile" | "desktop";

const useDevice = () => {
  const [device, setDevice] = useState<TDevice>("mobile");

  useEffect(() => {
    const { userAgent } = navigator;
    // Set device state
    userAgent.includes("Mobi") ? setDevice("mobile") : setDevice("desktop");
  }, []);

  return device;
};

export default useDevice;
