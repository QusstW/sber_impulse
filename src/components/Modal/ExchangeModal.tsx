import React from "react";
import { Modal, Box, Typography, Slider, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setModal,
  setMySellItems,
  setSaleItems,
  setSalesmanItems,
  TCurrentSellingItem,
  TSellItem,
} from "../../redux/exchange/reducers";

const ExchangeModal = () => {
  const [sliderValue, setSliderValue] = React.useState<number>(1);

  const {
    modal,
    currentSellingItem,
    mySellItems,
    saleItems,
    salesmanSellItems,
  } = useAppSelector((state) => state.exchange);
  const dispatch = useAppDispatch();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onCLose = () => {
    dispatch(setModal(false));
  };

  const onChangeSlider = (e: any) => {
    setSliderValue(e.target.value);
  };

  const submit = () => {
    onCLose();
    if (currentSellingItem?.type === "My") {
      updateArr(mySellItems, currentSellingItem, "My")
    }
    if (currentSellingItem?.type === "salesman") {
      updateArr(salesmanSellItems, currentSellingItem, "salesman")
    }
  };

  const updateArr = (modifyArr: TSellItem[], currentSellingItem: TCurrentSellingItem, type: string) => {
    const isPresentInSale = saleItems.find((el) => el.id === currentSellingItem.id);

    if (sliderValue === currentSellingItem.quantity && !isPresentInSale) {
      const newSellItems = modifyArr.filter(
        (el) => el.id !== currentSellingItem.id
      );
      const newsaleItems = [...saleItems, currentSellingItem];

      if(type === 'My') {
        dispatch(setMySellItems(newSellItems));
        dispatch(setSaleItems(newsaleItems));
      } else {
        dispatch(setSalesmanItems(newSellItems));
        dispatch(setSaleItems(newsaleItems));
      }
    } else if(sliderValue === currentSellingItem.quantity && isPresentInSale) {
        const newSaleItems = modifyArr.filter((el) => el.id !== currentSellingItem.id);

        const newSalingItems = saleItems.map((el) => {
          if(el.id === currentSellingItem.id) {
            return {
              ...el,
              quantity: el.quantity + sliderValue
            }
          } else return el;
        });

        if(type === "My") {
          dispatch(setMySellItems(newSaleItems));
          dispatch(setSaleItems(newSalingItems));
        } else {
          dispatch(setSalesmanItems(newSaleItems));
          dispatch(setSaleItems(newSalingItems));
        }

    } 
    else {
      const newSellItems = modifyArr.map((el) => {
        if (el.id === currentSellingItem.id) {
          return {
            ...el,
            quantity: el.quantity - sliderValue,
          };
        } else return el;
      });
      let newsaleItems;
      if(isPresentInSale) {
        newsaleItems = saleItems.map((el) => {
          if(el.id === currentSellingItem.id) {
            return {
              ...el,
              quantity: el.quantity + sliderValue
            }
          } else return el;
        });
      } else newsaleItems = [
        ...saleItems,
        { ...currentSellingItem, quantity: sliderValue },
      ];
      if(type === 'My') {
      dispatch(setMySellItems(newSellItems));
      dispatch(setSaleItems(newsaleItems));
      } else {
        dispatch(setSalesmanItems(newSellItems));
        dispatch(setSaleItems(newsaleItems));
      }
    }
  }

  return (
    <Modal
      open={modal}
      onClose={onCLose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выберите колличество:
        </Typography>
        <Slider
          size="small"
          defaultValue={1}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={onChangeSlider}
          min={1}
          max={currentSellingItem?.quantity}
        />
        <Button variant="outlined" onClick={submit}>
          Подтвердить
        </Button>
      </Box>
    </Modal>
  );
};

export default ExchangeModal;
