import React, { useState, useEffect } from "react";
import { FaSolarPanel, FaWind } from "react-icons/fa";
import { LuCalendarDays, LuMapPin, LuSun, LuRefreshCw } from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card";  // Adjust path as needed


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Main data state
  const [data, setData] = useState({
    temperature: 26.5,
    sunlight: 750,
    windspeed: 4.2,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    location: "New Delhi",
    longitude: "77.1025",
    latitude: "28.7041",
    forecast: {
      solar: {
        current: 750,
        max: 950,
        min: 150,
        nonGeneratingHours: 12,
        predicted: [2, 5.5, 2, 8.5, 1.5, 5, 6.8, 7.2, 5.5, 3.2, 1.8, 0.5],
      },
      wind: {
        current: 4.2,
        max: 7.8,
        min: 1.2,
        nonGeneratingHours: 8,
        predicted: [3, 4.5, 4, 8.5, 1, 5, 5.5, 6.2, 4.8, 3.6, 2.1, 1.2],
      },
    },
    loading: false,
    predictionAccuracy: 87.5,
    hourlyForecast: [],
  });

  // Generate hourly forecast data
  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      time: `${i.toString().padStart(2, "0")}:00`,
      temperature: (Math.random() * 10 + 20).toFixed(1),
      wind: (Math.random() * 8 + 1).toFixed(1),
      solar: i >= 6 && i <= 18 ? (Math.random() * 800 + 200).toFixed(0) : "0",
    }));

    setData((prev) => ({ ...prev, hourlyForecast: hours }));
  }, []);

  // Chart data formatting
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    name: `${(i + 6) % 24}:00`,
    solar: data.forecast.solar.predicted[i],
    wind: data.forecast.wind.predicted[i],
  }));

  // Update clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setData((prevData) => ({
        ...prevData,
        time: now.toLocaleTimeString(),
        date: now.toLocaleDateString(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch weather data
  const fetchWeatherData = () => {
    setData((prev) => ({ ...prev, loading: true }));

    // Simulate API call
    setTimeout(() => {
      const temp = (Math.random() * 10 + 20).toFixed(1);
      const wind = (Math.random() * 8 + 1).toFixed(1);
      const solar = (Math.random() * 800 + 200).toFixed(0);

      setData((prev) => ({
        ...prev,
        temperature: temp,
        windspeed: wind,
        sunlight: solar,
        loading: false,
      }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
            AI-Powered Renewable Energy Forecasting
          </h1>
          <Badge className="bg-indigo-600" variant="default">
            NTPC Project
          </Badge>
        </div>

        {/* Main Dashboard Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 pb-2">
            <CardTitle className="text-xl text-indigo-800">
              Current Conditions
            </CardTitle>
            <CardDescription>Real-time weather and energy data</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Location & Weather */}
              <div className="space-y-6">
                {/* Location Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">
                        Longitude
                      </label>
                      <Input
                        value={data.longitude}
                        name="longitude"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">
                        Latitude
                      </label>
                      <Input
                        value={data.latitude}
                        name="latitude"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={fetchWeatherData}
                    disabled={data.loading}
                    className="h-full mt-6"
                  >
                    {data.loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Loading</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LuRefreshCw size={16} />
                        <span>Update</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Temperature */}
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-indigo-900">
                    {data.temperature}
                  </span>
                  <span className="text-2xl text-indigo-600 mb-1">°C</span>
                </div>

                {/* Date, Time & Location */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuCalendarDays size={18} />
                    <span>
                      {data.date} • {data.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuMapPin size={18} />
                    <span>{data.location}</span>
                  </div>
                </div>
              </div>

              {/* Right side - Current Metrics */}
              <div className="grid grid-cols-1 gap-4">
                {/* Model Accuracy */}
                <Card className="shadow-sm border-indigo-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-700">
                        AI Model Accuracy
                      </h3>
                      <span className="text-xl font-bold text-indigo-600">
                        {data.predictionAccuracy}%
                      </span>
                    </div>
                    <Progress value={data.predictionAccuracy} className="h-2" />
                  </CardContent>
                </Card>

                {/* Current Wind */}
                <Card className="shadow-sm border-indigo-100">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FaWind size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Wind Speed</p>
                        <p className="font-medium">{data.windspeed} m/s</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {data.windspeed > 3 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Optimal
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          Moderate
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Solar */}
                <Card className="shadow-sm border-indigo-100">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <LuSun size={20} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Solar Radiation</p>
                        <p className="font-medium">{data.sunlight} W/m²</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {data.sunlight > 600 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Excellent
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          Good
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Generation Forecast */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 pb-2">
            <CardTitle className="text-xl text-indigo-800">
              Energy Generation Forecast
            </CardTitle>
            <CardDescription>
              12-hour prediction based on weather patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="mt-0">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.375rem",
                          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="solar"
                        stroke="#f59e0b"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Solar (kW)"
                      />
                      <Line
                        type="monotone"
                        dataKey="wind"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Wind (kW)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Solar Stats */}
                  <Card className="shadow-sm border-amber-100">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <FaSolarPanel className="text-amber-500" />
                        <CardTitle className="text-lg">Solar Panel</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Today's Max:</span>
                          <span className="font-medium">
                            {data.forecast.solar.max} W/m²
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Today's Min:</span>
                          <span className="font-medium">
                            {data.forecast.solar.min} W/m²
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Non-generating Hours:
                          </span>
                          <span className="font-medium">
                            {data.forecast.solar.nonGeneratingHours} hours
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                          <span className="text-gray-700 font-medium">
                            Estimated Output:
                          </span>
                          <span className="font-bold text-amber-600">
                            {(data.forecast.solar.max * 0.15).toFixed(1)} kWh/m²
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wind Stats */}
                  <Card className="shadow-sm border-blue-100">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <FaWind className="text-blue-500" />
                        <CardTitle className="text-lg">Wind Turbine</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Today's Max:</span>
                          <span className="font-medium">
                            {data.forecast.wind.max} m/s
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Today's Min:</span>
                          <span className="font-medium">
                            {data.forecast.wind.min} m/s
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Non-generating Hours:
                          </span>
                          <span className="font-medium">
                            {data.forecast.wind.nonGeneratingHours} hours
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                          <span className="text-gray-700 font-medium">
                            Estimated Output:
                          </span>
                          <span className="font-bold text-blue-600">
                            {(data.forecast.wind.max * 0.5).toFixed(1)} kWh
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Hourly Forecast */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 pb-2">
            <CardTitle className="text-xl text-indigo-800">
              24-Hour Forecast
            </CardTitle>
            <CardDescription>
              Hourly weather and energy prediction
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-3 min-w-max">
                {data.hourlyForecast.map((hour, index) => (
                  <Card
                    key={index}
                    className="shadow-sm w-32 flex-shrink-0 transition-all hover:shadow-md"
                  >
                    <CardContent className="p-3 text-center">
                      <p className="font-medium text-gray-700 mb-2">
                        {hour.time}
                      </p>
                      <p className="text-lg font-bold mb-2">
                        {hour.temperature}°C
                      </p>
                      <div className="flex justify-between text-sm text-gray-600 mt-3">
                        <div className="flex items-center">
                          <FaWind size={12} className="mr-1" />
                          <span>{hour.wind}</span>
                        </div>
                        <div className="flex items-center">
                          <LuSun size={12} className="mr-1" />
                          <span>{hour.solar}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;