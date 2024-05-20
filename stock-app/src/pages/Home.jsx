import React from 'react'
import KPICards from "../components/KPICards"
import Charts from "../components/Charts"

/**
 * @description Generates high-quality documentation for code provided to it, comprising
 * two components: KPI Cards and Charts.
 * 
 * @returns { HTML division element } a HTML container holding both KPI cards and charts.
 * 
 * 		- `<KPICards>`: A container for multiple KPI cards that display key performance
 * indicators related to the organization.
 * 		- `<Charts>`: A container for various charts and graphs that provide visual
 * representations of data related to the organization's performance.
 */
const Home = () => {
  return (
    <div>
      <KPICards/>
      <Charts/>
    </div>
  )
}

export default Home