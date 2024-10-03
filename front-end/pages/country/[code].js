"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CountryInfo() {
  const router = useRouter();
  const { code } = router.query;
  const [countryData, setCountryData] = useState(null);

  console.log("code", code);

  const teste = () => {
    axios
      .get(`http://localhost:5000/countries/${code}`)
      .then((response) => setCountryData(response.data))
      .catch((error) => console.error("Error fetching country info:", error));
  };

  useEffect(() => {
    if (code) {
      axios
        .get(`http://localhost:5000/countries/${code}`)
        .then((response) => setCountryData(response.data))
        .catch((error) => console.error("Error fetching country info:", error));
    }
  }, [code]);

  if (!countryData) return <button onClick={teste}>Loading...</button>;

  console.log("countryData", countryData);

  return (
    <div>
      <h1>{code}</h1>
      {/* <img src={countryData.flag.flag} alt={`Flag of ${code}`} width="200" /> */}

      <h2>Border Countries</h2>
      <ul>
        {countryData.borders.map((border) => (
          <li key={border.countryCode}>
            <a href={`/country/${border.countryCode}`}>{border.commonName}</a>
          </li>
        ))}
      </ul>

      <h2>Population Data</h2>
      <p>Historical Population Data (Placeholder)</p>
      {/* Add charts here*/}
    </div>
  );
}
