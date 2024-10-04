"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Container, Card, CardContent, Box } from "@mui/material";
import CountryFlagHeader from "../../components/CountryFlagHeader";
import BorderCountriesAccordion from "../../components/BorderCountriesAccordion";
import PopulationChart from "../../components/PopulationChart";

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
          <CountryFlagHeader countryName={countryData.flag.name} flagUrl={countryData.flag.flag} />

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Border Countries
            </Typography>
            <BorderCountriesAccordion borders={countryData.borders} />
          </Box>

          <PopulationChart populationData={populationData} formatPopulation={formatPopulation} />
        </CardContent>
      </Card>
    </Container>
  );
}
