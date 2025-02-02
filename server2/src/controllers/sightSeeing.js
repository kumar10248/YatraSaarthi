import { CountryMap } from "../../countryMapping.js"; // Ensure correct path
import axios from "axios";

const testApi = async (req, res) => {
  return res.status(200).json({ message: "Everythign working properly" });
};

const authenticateUser = async () => {
  const userDetails = {
    clientId: "ApiIntegrationNew",
    userName: "Hackathon",
    password: "Hackathon@1234",
    endUserIp: "192.168.11.120",
  };

  const response = await axios.post(
    "http://api.tektravels.com/SharedServices/SharedData.svc/rest/Authenticate",
    userDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Extract TokenId from API response
  const tokenId = response.data?.TokenId;

  return tokenId;
};

const requestData = {
  CityId: "115936",
  CountryCode: "AE",
  FromDate: "2025-02-28T00:00:00",
  ToDate: "2025-02-28T00:00:00",
  AdultCount: 2,
  ChildCount: 0,
  ChildAge: ["0"],
  PreferredLanguage: 0,
  PreferredCurrency: "INR",
  IsBaseCurrencyRequired: false,
  BookingMode: 5,
  EndUserIp: "192.168.5.56",
  TokenId: "74c8af88-d8e2-4cc2-bf4a-236b3ff8c94b", // Replace with actual token
  KeyWord: "",
};

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer your_auth_token_here", // Replace with actual authentication token if required
};

const getSightSeeingLocations = async (req, res) => {
  // const tokenID = authenticateUser();
  // requestData.TokenId = tokenID;
  console.log(req.cookies);

  try {
    const response = await axios.post(
      "https://SightseeingBE.tektravels.com/SightseeingService.svc/rest/Search",
      requestData,
      { headers }
    );

    console.log("Response Data:", response.data);
    return res
      .status(200)
      .json(response.data.Response.SightseeingSearchResults);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
  }
};

export { getSightSeeingLocations, testApi };
