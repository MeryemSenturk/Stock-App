import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import {
  fetchStockStart,
  getFirmsSuccess,
  fetchStockFail,
} from "../features/stockSlice";

const useStockRequest = () => {
const {axiosToken} = useAxios()
const dispatch = useDispatch()

  const getFirms = async () => {
    dispatch(fetchStockStart());
    try {
      const {data} =await axiosToken("/firms")
      console.log(data);
      dispatch(getFirmsSuccess(data.data));
    } catch (error) {
      dispatch(fetchStockFail());
      console.log(error);
    }
  }


  return { getFirms };
}

export default useStockRequest