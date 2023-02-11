import {

  Typography,
  Box,

} from "@mui/material";
import React, { useEffect } from "react";

import Modal from "@mui/material/Modal";
const style = {
  position: "absolute" as "absolute",
  top: "15%",
  right: "2%",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

  const [open, setOpen] = React.useState(false);

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modal =()=>{
  <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Alert
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                user x liked your post
              </Typography>
            </Box>
          </>
        </Modal>

  }

  export default modal;