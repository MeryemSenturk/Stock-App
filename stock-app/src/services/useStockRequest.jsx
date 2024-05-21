import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import {
  fetchStockStart,
  getFirmsSuccess,
  fetchStockFail,
  getStockSuccess,
  getProPurBraFirmSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

/**
 * @description Provides an array of five functions for working with stock data:
 * `getFirms`, `getStock`, `deleteStock`, `putStock`, and `getProPurBraFirmStock`.
 * These functions use `axiosToken` to make requests to the server and provide different
 * ways to interact with stock data.
 * 
 * @returns { array } an object containing five functions for fetching and manipulating
 * stock data.
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
     * @description Performs an asynchronous API call to fetch stock data from a specified
     * path, logs the response to the console and dispatches a success or fail action to
     * update the state with the received data.
     * 
     * @param { string } path - path to the data that needs to be fetched and logged,
     * which in turn determines the URL for the API call.
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
        * @description Deletes a stock with the specified `id` from the `/firms` endpoint
        * using `axios`.
        * 
        * @param { string } path - path to the resource being deleted, such as `/firms/{id}`
        * 
        * @param { integer } id - unique identifier for the firm being deleted, which is
        * used to delete the corresponding record from the database.
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
        * @description Dispatches a `fetchStockStart` action, makes a POST request to the
        * specified path with information using `axiosToken`, catches any errors and handles
        * them accordingly, including displaying success or error notifications and logging
        * the error in the console.
        * 
        * @param { string } path - URL path for which the data is being fetched, and it is
        * used to construct the API endpoint for the data fetching operation.
        * 
        * @param { object } info - data to be sent to the `/${path}/` endpoint through the
        * `axiosToken.post()` method.
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
        * @description Updates the specified stock information using axios-token, and then
        * fetches the updated stock data from the API.
        * 
        * @param { string } path - URL path to which the axios PUT request is sent for
        * updating the specified information.
        * 
        * @param { object } info - data to be updated on the firms API endpoint.
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


       /**
        * @description Dispatches a actions for fetching data from APIs using promises, then
        * it handles the response from the APIs and stores the data in states for products,
        * purchases, brands, and firms.
        */
       const getProPurBraFirmStock = async () => {
         dispatch(fetchStockStart());
         try {
           const [pro, pur, bra, fir] = await Promise.all([
           axiosToken("/products"),
           axiosToken("/purchases"),
           axiosToken("/brands"),
           axiosToken("/firms"),
           ]);
           const products = pro?.data?.data
           const purchases = pur?.data?.data;
           const brands = bra?.data?.data;
           const firms = fir?.data?.data;
           dispatch(
             getProPurBraFirmSuccess({ products, purchases, brands, firms })
           );
         } catch (error) {
           console.log(error);
         }
       };

  // return { getFirms};
  return { getStock, deleteStock, putStock, postStock, getProPurBraFirmStock };
}

export default useStockRequest