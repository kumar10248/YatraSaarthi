import { motion } from 'framer-motion';
import { Star, Users, Globe, MessageCircle, Instagram, Twitter, Heart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const CommunityPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      name: "Adventure Seekers Group",
      location: "Bali, Indonesia",
      text: "YatraSaarthi transformed our group trip! The AI suggestions matched everyone's interests perfectly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318"
    },
    {
      name: "Family Explorers",
      location: "Swiss Alps",
      text: "The collaborative planning feature made including everyone's preferences a breeze!",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa"
    },
    // Add more testimonials
  ];

  const communityStats = [
    { value: "500K+", label: "Active Travelers", icon: <Users /> },
    { value: "150+", label: "Destinations", icon: <Globe /> },
    { value: "98%", label: "Positive Reviews", icon: <MessageCircle /> }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-blue-900/30 to-green-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                YatraSaarthi
              </span>{' '}
              Community
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join millions of travelers sharing experiences, stories, and adventures
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Featured Travel Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1506929562872-bb5a63eaa4a2' : item === 2 ? '1469854523086-cc02fe5d8800' : '1473625247510-8ceb1760943f'}`}
                  alt="Travel story"
                  className="w-full h-96 object-cover transform group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold mb-2">Mountain Escape</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>Adventure Group</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-900/20 to-green-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-800"
              >
                <div className="text-blue-400 mb-4 mx-auto w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative" ref={ref}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Traveler Experiences
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
              >
                <div className="flex items-start mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="ml-2 text-gray-400">{testimonial.rating}/5</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            #YatraSaarthiMoments
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={`https://source.unsplash.com/random/800x800/?travel,${item}`}
                  alt="Social post"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-5 h-5 text-pink-400" />
                    <span className="text-sm">@traveler_{item}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Share Your Journey?
          </h2>
          <p className="text-xl mb-8">
            Join our community of passionate travelers and start sharing your adventures!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold flex items-center justify-center mx-auto space-x-2"
          >
            <Heart className="w-5 h-5" />
            <span>Join Community</span>
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;