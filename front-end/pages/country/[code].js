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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

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

  console.log("countryData", countryData);

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
            <Paper elevation={1} sx={{ borderRadius: 2, padding: 2 }}>
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
                              "&:hover": {
                                backgroundColor: "#ede8e8",
                              },
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
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
