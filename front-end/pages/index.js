"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);
  console.log("countries", countries);
  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.key}>
            <Link href={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
