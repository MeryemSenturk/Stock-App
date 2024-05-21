import React from 'react'
import KPICards from "../components/KPICards"
import Charts from "../components/Charts"
import { useEffect } from 'react'
import useStockRequest from "../services/useStockRequest";

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