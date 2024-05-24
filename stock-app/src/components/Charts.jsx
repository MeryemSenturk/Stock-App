import { AreaChart } from "@tremor/react";


const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

/**
 * @description Generates two area charts based on the given data, each chart displaying
 * a different dataset and using a distinct color for the category "amount".
 * 
 * @returns { Component } two area charts, one for sales and one for purchases,
 * displayed side-by-side with indigo and red colors, respectively.
 */
const Charts = () => {

  return (
    <>
      <AreaChart
        className="h-80"
        data={salesData}
        index="date"
        categories={["amount"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
      />

      <AreaChart
        className="h-80"
        data={purchasesData}
        index="date"
        categories={["amount"]}
        colors={["red"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
      />
    </>
  );
};
export default Charts;
