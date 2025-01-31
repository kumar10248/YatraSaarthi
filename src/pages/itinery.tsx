import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Plus, Trash2, Save, Share2, Plane, Hotel, Utensils, Camera, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ItineraryPlanner = () => {
  const [days, setDays] = useState([
    {
      id: 1,
      date: "2025-02-01",
      activities: [
        {
          id: 1,
          time: "09:00",
          type: "attraction",
          title: "Visit Taj Mahal",
          location: "Agra, India",
          duration: "3 hours",
          notes: "Don't forget camera!"
        }
      ]
    }
  ]);

  const addDay = () => {
    const lastDay = days[days.length - 1];
    const newDate = new Date(lastDay.date);
    newDate.setDate(newDate.getDate() + 1);
    
    setDays([...days, {
      id: days.length + 1,
      date: newDate.toISOString().split('T')[0],
      activities: []
    }]);
  };

  const addActivity = (dayId) => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [...day.activities, {
            id: day.activities.length + 1,
            time: "12:00",
            type: "attraction",
            title: "New Activity",
            location: "Location",
            duration: "1 hour",
            notes: ""
          }]
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case "transport": return <Plane className="h-5 w-5" />;
      case "hotel": return <Hotel className="h-5 w-5" />;
      case "food": return <Utensils className="h-5 w-5" />;
      default: return <Camera className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-400">Trip Planner</h1>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outline" className="text-gray-100 border-gray-400">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Plan
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Trip Overview */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Trip Name</label>
                <Input 
                  placeholder="Enter trip name"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  defaultValue="Amazing India Tour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
                <Input 
                  type="date"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  defaultValue="2025-02-01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">End Date</label>
                <Input 
                  type="date"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                  defaultValue="2025-02-07"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          {days.map((day) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                      <h3 className="text-xl font-semibold">Day {day.id}</h3>
                      <span className="ml-4 text-gray-400">{day.date}</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-gray-100 border-gray-600"
                        onClick={() => addActivity(day.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Activity
                      </Button>
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    {day.activities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gray-600 p-2 rounded-lg">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <div className="flex items-center mb-2">
                                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-300">{activity.time}</span>
                                <span className="mx-2 text-gray-500">•</span>
                                <span className="text-gray-300">{activity.duration}</span>
                              </div>
                              <h4 className="font-semibold mb-1">{activity.title}</h4>
                              <div className="flex items-center text-gray-400">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{activity.location}</span>
                              </div>
                              {activity.notes && (
                                <p className="text-gray-400 text-sm mt-2">{activity.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Day Button */}
        <motion.div 
          className="mt-8 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Button
            variant="outline"
            className="text-gray-100 border-gray-600"
            onClick={addDay}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Day
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;