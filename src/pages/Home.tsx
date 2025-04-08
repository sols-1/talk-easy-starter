import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight, User, Users, Mail, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from 'sonner';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/chat');
    } else {
      navigate('/auth');
      toast.info("Please login or create an account to continue");
    }
  };

  const features = [
    {
      icon: <MessageSquare className="h-12 w-12 text-chat-primary" />,
      title: "AI-Powered Conversations",
      description: "Never run out of things to say with our intelligent conversation assistant."
    },
    {
      icon: <Users className="h-12 w-12 text-chat-secondary" />,
      title: "Social Skills Enhancement",
      description: "Build confidence and improve your communication in any social scenario."
    },
    {
      icon: <User className="h-12 w-12 text-purple-500" />,
      title: "Personalized Topics",
      description: "Get conversation topics tailored to your interests and personality."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "TalkEasy has transformed our networking events. Our team is more confident and engaging than ever!"
    },
    {
      name: "Michael Chen",
      role: "College Student",
      content: "As someone who struggles with social anxiety, TalkEasy has been a game-changer for making new friends."
    },
    {
      name: "Emily Rodriguez",
      role: "Sales Executive",
      content: "The conversation starters are brilliant. I close more deals because I connect better with clients."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-chat-primary/90 to-chat-secondary/90 text-white py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Never Run Out Of Things To Say
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              TalkEasy helps you master the art of conversation with AI-powered topics and responses that keep the dialogue flowing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-chat-primary hover:bg-gray-100 hover:text-chat-secondary transition-all transform hover:scale-105"
                onClick={handleGetStarted}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {!isAuthenticated && (
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl border border-white/30 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/30 p-3 rounded-lg ml-auto max-w-[80%]">Hi TalkEasy, I'm going to a job interview tomorrow. Can you help me?</div>
                  <div className="bg-chat-primary/40 p-3 rounded-lg max-w-[80%]">Of course! Here are some great topics to discuss: Your relevant experience, questions about company culture, and your passion for the industry.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Choose TalkEasy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our AI-powered platform is designed to help you become a more confident and engaging conversationalist.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                variants={itemVariants}
              >
                <div className="bg-gray-50 p-4 inline-block rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-chat-primary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">TalkEasy is helping thousands of people improve their communication skills.</p>
          </motion.div>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700 text-lg italic">&ldquo;{testimonial.content}&rdquo;</p>
                        <div>
                          <p className="font-semibold text-gray-800">{testimonial.name}</p>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-chat-secondary to-chat-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">10K+</h3>
              <p className="text-white/80">Active Users</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">5M+</h3>
              <p className="text-white/80">Conversations Started</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-4xl lg:text-5xl font-bold mb-2">98%</h3>
              <p className="text-white/80">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Interested in investing or partnering with TalkEasy? We'd love to hear from you.</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-chat-primary mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-gray-600">investors@talkeasy.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-chat-primary mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">Headquarters</p>
                        <p className="text-gray-600">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chat-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chat-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <textarea 
                        placeholder="Your Message" 
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chat-primary focus:border-transparent"
                      ></textarea>
                    </div>
                    <div>
                      <Button className="w-full bg-chat-primary hover:bg-chat-secondary transition-all" size="lg">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <MessageSquare className="h-6 w-6" />
                <h2 className="text-xl font-bold">TalkEasy</h2>
              </Link>
              <p className="text-gray-400 mb-4">Never run out of things to say. TalkEasy is your AI-powered conversation assistant.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} TalkEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
