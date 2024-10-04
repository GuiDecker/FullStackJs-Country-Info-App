"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Country List
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {countries.map((country) => (
            <ListItem
              key={country.countryCode}
              sx={{
                borderBottom: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemText
                primary={
                  <Link
                    href={`/country/${country.countryCode}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      padding: "10px 15px",
                      borderRadius: "4px",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#ede8e8",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Typography variant="body1">{country.name}</Typography>
                    {/* {country.name} */}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
