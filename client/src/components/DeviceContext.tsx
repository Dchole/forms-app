import { createContext, useEffect, useState } from "react";

export type TDevice = "mobile" | "desktop";

export const DeviceContext = createContext<TDevice>("mobile");

const DeviceContextProvider: React.FC = ({ children }) => {
  const [device, setDevice] = useState<TDevice>("mobile");

  useEffect(() => {
    const { userAgent } = navigator;
    // Set device state
    userAgent.includes("Mobi") ? setDevice("mobile") : setDevice("desktop");
  }, []);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};

export default DeviceContextProvider;
