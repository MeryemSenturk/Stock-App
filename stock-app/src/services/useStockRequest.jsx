import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import {
  fetchStockStart,
  getFirmsSuccess,
  fetchStockFail,
  getStockSuccess,
} from "../features/stockSlice";

const useStockRequest = () => {
const {axiosToken} = useAxios()
const dispatch = useDispatch()

  // const getFirms = async () => {
  //   dispatch(fetchStockStart());
  //   try {
  //     const {data} =await axiosToken("/firms")
  //     console.log(data);
  //     dispatch(getFirmsSuccess(data.data));
  //   } catch (error) {
  //     dispatch(fetchStockFail());
  //     console.log(error);
  //   }
  // }


  //? 7 tane fonksiyon yazmak yerine parametrik hale getirdik
    const getStock = async (path = "firms") => {
      dispatch(fetchStockStart());
      try {
        const { data } = await axiosToken(`/${path}`);
        console.log(data);
        const stockData = data.data;
        dispatch(getStockSuccess({ stockData, path }));
      } catch (error) {
        dispatch(fetchStockFail());
        console.log(error);
      }
    };


       const deleteStock = async (path="firms", id) => {
         dispatch(fetchStockStart());
         try {
          await axiosToken.delete(`/${path}/${id}`);
        getStock(path)
           
         } catch (error) {
           dispatch(fetchStockFail());
           console.log(error);
         }
       };

  // return { getFirms};
  return { getStock, deleteStock };
}

export default useStockRequest