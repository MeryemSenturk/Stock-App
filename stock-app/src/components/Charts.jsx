import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";


const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

/**
 * @description Maps sales data to create an AreaChart, while also creating another
 * AreaChart for purchases data based on the same mapping. Both charts display date
 * categories and amount values using different colors.
 * 
 * @returns {object} a charting component that displays sales and purchases data.
 */
const Charts = () => {

  const {sales, purchases} = useSelector((state) => state.stock)

  /**
   * @description Transforms an `item` object into a new JavaScript object containing
   * `date` and `amount` properties, where `date` is represented as a string in the
   * specified locale (`tr-TR`) and `amount` is the value of `item.amount`.
   * 
   * @param {object} item - metadata object containing information such as creation
   * date and amount for which the function generates documentation.
   * 
   * @returns {object} an object with `date` and `amount` properties, where `date` is
   * a string representing the date of the transaction in the format `dd-MM-yyyy`, and
   * `amount` is the amount of the transaction in the local currency.
   */
  const salesData = sales?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.amount,
  }
  ))
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
        // data={purchasesData}
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
