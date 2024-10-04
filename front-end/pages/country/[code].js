"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CountryInfo() {
  const router = useRouter();
  const { code } = router.query;
  const [countryData, setCountryData] = useState(null);

  const getCountryData = () => {
    axios
      .get(`http://localhost:5000/countries/${code}`)
      .then((response) => setCountryData(response.data))
      .catch((error) => console.error("Error fetching country info:", error));
  };

  useEffect(() => {
    if (code) {
      getCountryData();
    }
  }, [code]);

  if (!countryData) return <Loading />;

  const populationData = countryData.population.populationCounts
    ? countryData.population.populationCounts.map((entry) => ({
        year: entry.year,
        population: entry.value,
      }))
    : [];

  const formatPopulation = (value) => {
    return value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value;
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton onClick={() => router.push("/")} sx={{ position: "relative" }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" align="center" sx={{ flexGrow: 1, ml: -4 }}>
              {countryData.flag.name}
            </Typography>
          </Box>
          <img
            src={countryData.flag.flag}
            alt={`Flag of ${code}`}
            width="200"
            style={{ display: "block", margin: "0 auto", borderRadius: "8px" }}
          />

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Border Countries
            </Typography>
            <Accordion elevation={1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Bordering Countries</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ maxHeight: 250, overflowY: "auto" }}>
                <List>
                  {countryData.borders.length > 0 ? (
                    countryData.borders.map((border) => (
                      <ListItem
                        key={border.countryCode}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#ede8e8",
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Link
                              href={`/country/${border.countryCode}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                                display: "block",
                                padding: "10px 15px",
                                borderRadius: "4px",
                              }}
                            >
                              {border.commonName}
                            </Link>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No bordering countries." />
                    </ListItem>
                  )}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>

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
                <Line type="monotone" dataKey="population" stroke="#495ec9" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
