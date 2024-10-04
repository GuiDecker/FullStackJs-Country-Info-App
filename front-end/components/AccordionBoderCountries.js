import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

export default function AccordionBorderCountries({ borders }) {
  return (
    <Accordion elevation={1}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Bordering Countries</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ maxHeight: 200, overflowY: "auto" }}>
        <List>
          {borders.length > 0 ? (
            borders.map((border) => (
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
  );
}
