import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Layout } from "../components";
const data = [
  {
    name: "Page A",
    count: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    count: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    count: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    count: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    count: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    count: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    count: 9300,
    amt: 5900,
  },
];

const Stats = () => {
  return (
    <Layout>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="date" />
          <YAxis  allowDecimals={false}/>
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default Stats;
