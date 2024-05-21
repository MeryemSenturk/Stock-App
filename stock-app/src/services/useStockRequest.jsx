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
 * @description Generates high-quality documentation for code given to it, and it
 * does that by providing an object with various methods for retrieving or manipulating
 * stock data: `getStock`, `deleteStock`, `putStock`, `postStock`, and `getProPurBraFirmStock`.
 * These methods return Promise objects, which allow the function to handle asynchronous
 * operations in a synchronous way.
 * 
 * @returns { array } an object containing five functions for fetching and managing
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
     * @description 1) dispatches an action to fetch stock data, 2) sends a request to
     * the API with the path parameter, 3) catches any errors that occur during the
     * request, and 4) logs the error or displays a toast message if there was an issue.
     * 
     * @param { string } path - URL path to fetch stock data from the API.
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
        * it displays a success toast and calls `getStock`. If unsuccessful, it displays an
        * error toast and logs the error.
        * 
        * @param { string } path - path of the resource to be deleted.
        * 
        * @param { integer } id - unique identifier for the firms record to be deleted.
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
        * @description Performs a POST request to the `/firms` endpoint, passing the required
        * information, and upon successful response, retrieves the updated data by calling
        * `getStock` function. If there's an error, it displays an error message and logs
        * the error.
        * 
        * @param { string } path - endpoint to which the `info` object is posted, typically
        * determining the type of stock data to be retrieved.
        * 
        * @param { object } info - data that needs to be sent to the API endpoint for the
        * specified path.
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
        * @description Updates the given stock's information using `axiosToken`. If successful,
        * it calls `getStock()` to retrieve the updated stock list; otherwise, it logs the
        * error and dispatches a `fetchStockFail()` action.
        * 
        * @param { string } path - name of the firms API endpoint.
        * 
        * @param { object } info - update information for the stock, which includes the
        * `_id`, `name`, `symbol`, `price`, and `quantity` properties.
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
        * @description Dispatches an action to fetch stock data from API endpoints for
        * products, purchases, brands, and firms. It then logs the received data and dispatches
        * another action to signal that the operation has completed successfully.
        */
       const getProPurBraFirmStock = async () => {
         dispatch(fetchStockStart());
         try {
           const [products, purchases, brands, firms] = await Promise.all([
             await axiosToken("/products"),
             await axiosToken("/purchases"),
             await axiosToken("/brands"),
             await axiosToken("/firms"),
           ]);
           console.log(products.data.data, firms);
           dispatch(getProPurBraFirmSuccess());
         } catch (error) {
           console.log(error);
         }
       };

  // return { getFirms};
  return { getStock, deleteStock, putStock, postStock, getProPurBraFirmStock };
}

export default useStockRequest