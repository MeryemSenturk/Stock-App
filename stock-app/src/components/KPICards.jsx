
import Paper from "@mui/material/Paper";

/**
 * @description Renders an empty Paper elevation component with a zero value, effectively
 * removing any shadow or depth from the surrounding element.
 * 
 * @returns { HTMLDivElement } a div element with an elevation of 0.
 * 
 * 		- `<div>`: The HTML element for the container of the KPI cards.
 * 		- `<Paper elevation={0}>`: The CSS class for the card container with no elevation.
 */
const KPICards = () => {
  return (
    <div>
      <Paper elevation={0} />
    </div>
  );
}

export default KPICards