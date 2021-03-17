import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const PageLoader = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(true);
    }, 2000);
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {showLoader && <CircularProgress />}
    </Box>
  );
};

export default PageLoader;
