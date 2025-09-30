import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularGames from "@/components/PopularGames";
import JokiServices from "@/components/JokiServices";
import TopUpServices from "@/components/TopUpServices";
import OrderForm from "@/components/OrderForm";
import Testimonials from "@/components/Testimonials";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PopularGames />
      <JokiServices />
      <TopUpServices />
      <OrderForm />
      <Testimonials />
      <HowToOrder />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
