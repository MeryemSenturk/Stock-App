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
 * @description Provides four utility functions for working with stock data: `getStock`,
 * `deleteStock`, `putStock`, and `postStock`. These functions make asynchronous
 * requests to the API using `axiosToken` and dispatch actions to update the UI upon
 * success or failure.
 * 
 * @returns { object } an object with four functions: `getFirms`, `deleteStock`,
 * `putStock`, and `postStock`.
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
     * @description Performs a request to the API endpoint for stock data given the path
     * parameter, logs the response to the console and dispatches an action with the
     * retrieved data and path to the Redux store.
     * 
     * @param { string } path - URL path of the endpoint to retrieve stock data from.
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
        console.log(error);
      }
    };


       /**
        * @description Deletes a specified stock from a firms array via axios Token API.
        * 
        * @param { string } path - name of the resource or data type to be deleted, which
        * is used as the URL for the API call to delete the specified resource or data type.
        * 
        * @param { integer } id - id of the stock to be deleted.
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
        * @description Performs a POST request to `/firms/` using the axios Token, passing
        * the information `info`, and upon successful response, calls `getStock` and displays
        * a success notification, otherwise it calls `fetchStockFail` and displays an error
        * notification.
        * 
        * @param { string } path - API endpoint for the requested data.
        * 
        * @param { object } info - additional data required to make an API call to `/${path}/`,
        * where `/path` is a string representing the desired endpoint, and is passed to the
        * `axiosToken.post()` method for posting to that endpoint.
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
        * @description Updates the stock information for a given ID in the `/firms` endpoint
        * using `axios` token authentication, and then retrieves the updated stock information
        * using the `getStock` function.
        * 
        * @param { string } path - path to the stock data that needs to be updated.
        * 
        * @param { object } info - data to be updated or inserted in the specified path on
        * the server.
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