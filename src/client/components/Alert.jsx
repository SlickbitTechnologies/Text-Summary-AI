import Snackbar from "@mui/material/Snackbar";
import { PropTypes } from "prop-types";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useEffect, useState } from "react";
const AlertToast = ({
  open,
  message,
  vertical = "bottom",
  horizontal = "middle",
  severity = "success",
}) => {
  const [isOpen, setIsOpen] = useState(open);
  console.log(isOpen)
  useEffect(() => {
    setIsOpen(open);
  }, [open])
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={3000}
      TransitionComponent={SlideTransition}
      key={vertical + horizontal}
      onClose={handleClose}
    >
      <Alert severity={severity} variant="filled" style={{fontWeight: 600}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

AlertToast.prototype = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
export default AlertToast;
