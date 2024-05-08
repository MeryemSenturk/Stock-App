import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFirmsFail, fetchFirmsStart, firmsSuccess } from "../features/firmsSlice"

const useStockRequest = () => {
const {axiosToken} = useAxios()
const dispatch = useDispatch()

  const getFirms = async () => {
    dispatch(fetchFirmsStart())
    try {
      const {data} =await axiosToken("/firms")
      console.log(data);
      dispatch (firmsSuccess(data))
    } catch (error) {
      dispatch(fetchFirmsFail())
      console.log(error);
    }
  }


  return { getFirms };
}

export default useStockRequest