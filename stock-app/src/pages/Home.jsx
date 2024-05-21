import React from 'react'
import KPICards from "../components/KPICards"
import Charts from "../components/Charts"
import { useEffect } from 'react'
import useStockRequest from "../services/useStockRequest";

/**
 * @description Fetches stock data from APIs using the `useStockRequest` hook and
 * stores it in the component state.
 * 
 * @returns { array } a combination of KPI cards and charts related to stock sales
 * and purchases.
 */
const Home = () => {
  const {getStock} = useStockRequest()
  
  
  useEffect(() => {
    getStock("sales")
    getStock("purchases")
  }, [])
  
  return (
    <div>
      <KPICards/>
      <Charts/>
    </div>
  )
}

export default Home