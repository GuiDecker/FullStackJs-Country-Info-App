"use client";
import { Box, Button, Typography, Card } from "@mui/material";
import { useRouter } from "next/router";

const ErrorComponent = ({ errorMessage }) => {
  const router = useRouter();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "100vh", padding: 2 }}>
      <Card elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {errorMessage || "An unexpected error occurred. Please try again later."}
        </Typography>
        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ErrorComponent;
