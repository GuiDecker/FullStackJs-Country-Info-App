import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box } from "@mui/material";

export default function PopulationChart({ populationData, formatPopulation }) {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Population Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={populationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatPopulation} />
          <Tooltip formatter={(value) => formatPopulation(value)} />
          <Line type="monotone" dataKey="population" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
