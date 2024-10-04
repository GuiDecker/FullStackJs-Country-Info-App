import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

export default function CountryFlagHeader({ countryName, flagUrl }) {
  const router = useRouter();

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <IconButton onClick={() => router.push("/")} sx={{ position: "relative" }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" align="center" sx={{ flexGrow: 1, mr: -15 }}>
        {countryName}
      </Typography>
      <img
        src={flagUrl}
        alt={`Flag of ${countryName}`}
        width="200"
        style={{ display: "block", margin: "0 auto", borderRadius: "8px" }}
      />
    </Box>
  );
}
