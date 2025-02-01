import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Users, MapPin, Star, Heart, Coffee, Wifi, Pool } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const HotelBookingPage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hoveredHotel, setHoveredHotel] = useState(null);

  const hotels = [
    {
      id: 1,
      name: "Mountain View Resort",
      rating: 4.8,
      price: 250,
      location: "Swiss Alps",
      image: "/api/placeholder/400/250",
      amenities: ["Spa", "Pool", "Restaurant"],
      reviews: 128,
      discount: "15% OFF"
    },
    {
      id: 2,
      name: "Coastal Paradise Hotel",
      rating: 4.6,
      price: 180,
      location: "Maldives",
      image: "/api/placeholder/400/250",
      amenities: ["Beach", "Bar", "Gym"],
      reviews: 96,
      discount: "20% OFF"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header with Animated Background */}
      <div className="relative overflow-hidden rounded-xl bg-[#2A5C6D] text-white p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20 animate-gradient" />
        <h1 className="text-4xl font-bold mb-4 relative z-10">Find Your Perfect Stay</h1>
        <p className="text-blue-100 max-w-xl relative z-10">Discover handpicked hotels with exclusive deals and AI-powered recommendations</p>
      </div>

      {/* Enhanced Search Section */}
      <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
              <div className="flex items-center gap-3 border-2 border-orange-200 rounded-lg p-4 hover:border-orange-400 transition-colors">
                <MapPin className="text-orange-500" />
                <Input placeholder="Destination" className="border-0 bg-transparent focus:ring-0" />
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-green-100 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
              <div className="flex items-center gap-3 border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors">
                <Calendar className="text-green-500" />
                <Input type="date" className="border-0 bg-transparent focus:ring-0" />
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
              <div className="flex items-center gap-3 border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                <Users className="text-blue-500" />
                <Input type="number" placeholder="Guests" className="border-0 bg-transparent focus:ring-0" />
              </div>
            </div>

            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hotel Listings with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map(hotel => (
          <Card 
            key={hotel.id} 
            className="group transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
            onMouseEnter={() => setHoveredHotel(hotel.id)}
            onMouseLeave={() => setHoveredHotel(null)}
          >
            <div className="relative">
              <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="absolute top-4 right-4">
                <Heart className={`h-6 w-6 cursor-pointer transition-colors duration-300 ${
                  hoveredHotel === hotel.id ? 'text-red-500' : 'text-white'
                }`} />
              </div>
              {hotel.discount && (
                <Badge className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1">
                  {hotel.discount}
                </Badge>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2A5C6D] mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${
                          i < Math.floor(hotel.rating) ? 'text-orange-400 fill-orange-400' : 'text-gray-300'
                        }`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({hotel.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{hotel.location}</span>
              </div>

              <div className="flex gap-2 mb-4">
                {hotel.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                    {amenity}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-green-600">${hotel.price}</span>
                  <span className="text-sm text-gray-500">/night</span>
                </div>
                <Button className="bg-[#2A5C6D] hover:bg-[#1d4d5e] transition-colors">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelBookingPage;