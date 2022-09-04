import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { MODAL_BOX_STYLES } from "../../constants/styles";

type TPropsType = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  message: string
}
const MessageModal = (props: TPropsType) => {
  const { open, setOpen, message } = props;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={MODAL_BOX_STYLES}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default MessageModal;
