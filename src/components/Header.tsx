
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const isHomePage = location.pathname === '/';
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/');
  };
  
  return (
    <header className="bg-gradient-to-r from-chat-primary to-chat-secondary text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <MessageSquare className="h-6 w-6" />
          <h1 className="text-xl font-bold">TalkEasy</h1>
        </Link>
        
        <div className="flex items-center space-x-6">
          {isHomePage && (
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-white hover:text-white/80 transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-white/80 transition-colors">About Us</a>
              <a href="#contact" className="text-white hover:text-white/80 transition-colors">Contact</a>
            </nav>
          )}
          
          <p className="text-sm font-light hidden md:block mr-6">Never run out of things to say</p>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {!isHomePage && (
                <Link to="/">
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-chat-primary transition-colors">
                    Home
                  </Button>
                </Link>
              )}
              <div className="text-sm font-medium">Hi, {user?.name}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-chat-primary transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-chat-primary transition-colors">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
