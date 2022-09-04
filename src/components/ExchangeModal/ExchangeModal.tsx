import React from "react";
import { Modal, Box, Typography, Slider, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setModal,
  setMySellItems,
  setSaleItems,
  setSalesmanItems
} from "../../redux/exchange/reducers";
import { TSellItem, TCurrentSellingItem, saleStatus } from "../../redux/exchange/types";
import { MODAL_BOX_STYLES } from "../../constants/styles";


const DEFAULT_SLIDER_VALUE = 1;

const ExchangeModal = () => {
  const [sliderValue, setSliderValue] = React.useState<number>(DEFAULT_SLIDER_VALUE);

  const {
    modal,
    currentSellingItem,
    mySellItems,
    saleItems,
    salesmanSellItems,
  } = useAppSelector((state) => state.exchange);
  const dispatch = useAppDispatch();

  const onCLose = () => {
    dispatch(setModal(false));
  };

  const onChangeSlider = (e: any) => {
    setSliderValue(e.target.value);
  };

  const submit = () => {
    onCLose();
    if (currentSellingItem?.type === saleStatus.MY) {
      updateArr(mySellItems, currentSellingItem, saleStatus.MY)
    }
    if (currentSellingItem?.type === saleStatus.SALESMAN) {
      updateArr(salesmanSellItems, currentSellingItem, saleStatus.SALESMAN)
    }

    setSliderValue(DEFAULT_SLIDER_VALUE);
  };

  const updateArr = (modifyArr: TSellItem[], currentSellingItem: TCurrentSellingItem, type: string) => {
    const isPresentInSale = saleItems.find((el) => el.id === currentSellingItem.id);
    const isFullSliderValue = sliderValue === currentSellingItem.quantity;

    if (isFullSliderValue && !isPresentInSale) {
      const newSellItems = modifyArr.filter((el) => el.id !== currentSellingItem.id);
      const newsaleItems = [...saleItems, currentSellingItem];

      if(type === saleStatus.MY) {
        dispatch(setMySellItems(newSellItems));
        dispatch(setSaleItems(newsaleItems));
      } else {
        dispatch(setSalesmanItems(newSellItems));
        dispatch(setSaleItems(newsaleItems));
      }
    } 
    else if(isFullSliderValue && isPresentInSale) {
        const newSaleItems = modifyArr.filter((el) => el.id !== currentSellingItem.id);

        const newSalingItems = saleItems.map((el) => {
          if(el.id === currentSellingItem.id) {
            return {
              ...el,
              quantity: el.quantity + sliderValue
            }
          } else return el;
        });

        if(type === saleStatus.MY) {
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
  };

  return (
    <Modal
      open={modal}
      onClose={onCLose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={MODAL_BOX_STYLES}>
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
