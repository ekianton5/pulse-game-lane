import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);

    if (session) {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();
      
      setIsAdmin(!!roles);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleOrderClick = () => {
    if (isLoggedIn) {
      navigate("/order");
    } else {
      navigate("/auth");
    }
  };

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Layanan Joki", href: "#joki" },
    { name: "Top Up Game", href: "#topup" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "Cara Order", href: "#cara-order" },
    { name: "Kontak", href: "#kontak" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gradient">ArenaGame</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/admin")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button variant="neon" size="sm" onClick={handleOrderClick}>
                  Order Sekarang
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="neon" size="sm" onClick={handleOrderClick}>
                  Order Sekarang
                </Button>
        
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full"
                    onClick={() => {
                      navigate("/admin");
                      setIsOpen(false);
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
                <Button 
                  variant="neon" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => {
                    handleOrderClick();
                    setIsOpen(false);
                  }}
                >
                  Order Sekarang
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="neon" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => {
                    handleOrderClick();
                    setIsOpen(false);
                  }}
                >
                  Order Sekarang
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
