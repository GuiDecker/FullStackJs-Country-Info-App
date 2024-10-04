"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Container, Card, CardContent, Box, Typography } from "@mui/material";
import CountryFlagHeader from "../../components/CountryFlagHeader";
import PopulationChart from "../../components/PopulationChart";
import AccordionBorderCountries from "../../components/AccordionBoderCountries";
import ErrorPage from "../../components/ErrorPage";

export default function CountryInfo() {
  const router = useRouter();
  const { code } = router.query;
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(false);

  const getCountryData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/countries/${code}`)
      .then((response) => setCountryData(response.data))
      .catch((error) => {
        setError(true);
        console.error("Error fetching country info:", error);
      });
  };

  useEffect(() => {
    if (code) {
      getCountryData();
    }
  }, [code]);

  if (!countryData && !error) return <Loading />;
  if (error) return <ErrorPage />;

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
      <Card elevation={3} sx={{ padding: 2, borderRadius: 2, backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <CountryFlagHeader countryName={countryData.flag.name} flagUrl={countryData.flag.flag} />

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Border Countries
            </Typography>
            <AccordionBorderCountries borders={countryData.borders} />
          </Box>

          <PopulationChart populationData={populationData} formatPopulation={formatPopulation} />
        </CardContent>
      </Card>
    </Container>
  );
}
