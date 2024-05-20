import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import {
  fetchStockStart,
  getFirmsSuccess,
  fetchStockFail,
  getStockSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

/**
 * @description Provides an API to fetch or modify stock-related data through Axios
 * token-based authentication. It returns four functions: `getFirms`, `deleteStock`,
 * `putStock`, and `postStock`, each with its own method for interacting with the
 * stock data.
 * 
 * @returns { object } an object that provides four functions for retrieving, deleting,
 * updating, and posting stock information.
 */
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
    /**
     * @description Retrieves stock data from an API using a token, logs the received
     * data, and dispatches an action to display the data success message or failure notification.
     * 
     * @param { string } path - path to the API endpoint that will be fetched for the
     * stock data.
     */
    const getStock = async (path = "firms") => {
      dispatch(fetchStockStart());
      try {
        const { data } = await axiosToken(`/${path}`);
        console.log(data);
        const stockData = data.data;
        dispatch(getStockSuccess({ stockData, path }));
      } catch (error) {
        dispatch(fetchStockFail());
         toastErrorNotify(`${path} verileri çekilememiştir.`);
        console.log(error);
      }
    };


       /**
        * @description Deletes a stock with the given `id` using `axiosToken`. If successful,
        * it displays a toast message and calls `getStock` with the updated `path`. If an
        * error occurs, it displays a different toast message and logs the error.
        * 
        * @param { string } path - URL path of the resource to be deleted.
        * 
        * @param { string } id - unique identifier for the record being deleted in the
        * specified path.
        */
       const deleteStock = async (path="firms", id) => {
         dispatch(fetchStockStart());
         try {
          await axiosToken.delete(`/${path}/${id}`);
          toastSuccessNotify(`${path} basariliyla silinmiştir.`);
        getStock(path)
           
         } catch (error) {
           dispatch(fetchStockFail());
           toastErrorNotify(`${path} silinememiştir.`);
           console.log(error);
         }
       };

       /**
        * @description Dispatches an action to fetch stock data, sends a POST request to the
        * API with the required information, and displays a successful or failed notification
        * to the user depending on the response from the API.
        * 
        * @param { string } path - route to which the `info` object is being sent in an
        * asynchronous manner using `axiosToken.post()` method.
        * 
        * @param { object } info - additional data that needs to be sent to the `/${path}/`
        * endpoint via an HTTP POST request.
        */
       const postStock = async (path = "firms", info) => {
         dispatch(fetchStockStart());
         try {
           await axiosToken.post(`/${path}/`, info);
           getStock(path);
           toastSuccessNotify(`${path} basariliyla eklenmiştir.`);
         } catch (error) {
           dispatch(fetchStockFail());
           toastErrorNotify(`${path} eklenememiştir.`);
           console.log(error);
         }
       };

       /**
        * @description Updates stock information for a specific ID in the `firms` path using
        * axios and dispatches actions to fetch the updated stock information and handle any
        * errors.
        * 
        * @param { string } path - resource being manipulated, in this case it's the "firms"
        * resource.
        * 
        * @param { object } info - ID of the stock to update.
        */
       const putStock = async (path = "firms", info) => {
         dispatch(fetchStockStart());
         try {
           await axiosToken.put(`/${path}/${info._id}`, info);
           getStock(path);
         } catch (error) {
           dispatch(fetchStockFail());
           console.log(error);
         }
       };

  // return { getFirms};
  return { getStock, deleteStock, putStock, postStock };
}

export default useStockRequest