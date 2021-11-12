import { Box } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  Brush,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { transformEatingHistory } from "utils";

/**
 * A graph to display resident eating history data
 * @todo
 * - [ ] Display calories goal
 */
export default function CaloriesGraph({ eatingHistory, ...props }) {
  const data = transformEatingHistory(eatingHistory);

  return (
    <LineChart width={500} height={200} data={data} {...props}>
      <Line type="linear" dataKey="calories" stroke="green" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Brush />
    </LineChart>
  );
}
