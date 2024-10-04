const axios = require("axios");
require("dotenv").config();

const COUNTRIES_API = process.env.COUNTRIES_API;
const COUNTRY_INFO_API = process.env.COUNTRY_INFO_API;
const COUNTRY_FLAG_API = process.env.COUNTRY_FLAG_API;
const COUNTRY_POPULATION_API = process.env.COUNTRY_POPULATION_API;

const getCountries = async (req, res) => {
  try {
    const response = await axios.get(COUNTRIES_API);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available countries" });
  }
};

const getCountryInfo = async (req, res) => {
  const countryCode = req.params.code;

  try {
    const countryInfoResponse = await axios.get(`${COUNTRY_INFO_API}${countryCode}`);
    const countryName = countryInfoResponse.data.commonName;

    const countryFlag = await axios.post(COUNTRY_FLAG_API, {
      iso2: countryCode,
    });

    const historicalPopulation = await axios.post(COUNTRY_POPULATION_API, {
      country: countryName,
    });

    const countryInfo = {
      borders: countryInfoResponse.data.borders,
      flag: countryFlag.data.data,
      population: historicalPopulation.data.data,
    };

    res.json(countryInfo);
  } catch (error) {
    console.error("Error fetching country info:", error);
    res.status(500).json({ error: "Failed to fetch country info" });
  }
};

module.exports = {
  getCountries,
  getCountryInfo,
};
