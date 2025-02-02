import { Request, Response } from "express";
import { CountryMap } from "../CountryMapping.js"; // Ensure correct path
import axios from "axios";




const authenticateUser = async () => {
   
   const userDetails = {
    "clientId": "ApiIntegrationNew",
    "userName": "Hackathon",
    "password": "Hackathon@1234",
    "endUserIp": "192.168.11.120"
   }
  
        const response = await axios.post(
            "http://api.tektravels.com/SharedServices/SharedData.svc/rest/Authenticate",
           userDetails,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        // Extract TokenId from API response
        const tokenId = response.data?.TokenId;

      return tokenId;

   
    
}



const getSightSeeingLocations = async (req: Request, res: Response) => {

    var tokenId = authenticateUser();
    console.log("Request body:", req.body); // Log request body

    let { country, startDate, endDate } = req.body;


    const CountryCode = CountryMap[country];

    console.log(tokenId);

    // console.log(CountryCode);

    // // if (!CountryCode) {
    // //     return res.status(400).json({ message: "Invalid country name provided" });
    // // }

    // // Assign default values if missing
    
    if (!startDate) startDate = "2025-02-05";
    if (!endDate) endDate = "2025-02-08";

    // // Prepare API request payload
    const requestData = {
        CityId: "115936", // Ensure correct city ID
        CountryCode,
        FromDate: `${startDate}T00:00:00`,
        ToDate: `${endDate}T00:00:00`,
        AdultCount: 2,
        ChildCount: 0,
        ChildAge: ["0"],
        PreferredLanguage: 0,
        PreferredCurrency: "INR",
        IsBaseCurrencyRequired: false,
        BookingMode: 5,
        EndUserIp: "192.168.5.56", // Use requester's IP if available
        TokenId: tokenId,
        KeyWord: ""
    };

    console.log(requestData);

    try {
        const response = await axios.post(
            "https://SightseeingBE.tektravels.com/SightseeingService.svc/rest/Search",
            requestData
        );

        console.log("API Response:", response.data); // Log API response

        return res.status(200).json({
            message: "Sightseeing locations fetched successfully",
            data: response.data
        });
    } catch (error) {
        console.error("Error fetching sightseeing locations:", error);

        return res.status(200).json({
            message: "Failed to fetch sightseeing locations",
            error
        });
    }
};

export { getSightSeeingLocations };
