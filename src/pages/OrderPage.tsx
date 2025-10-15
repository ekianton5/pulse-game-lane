import Navbar from "@/components/Navbar";
import OrderFormAuth from "@/components/OrderFormAuth";
import Footer from "@/components/Footer";

const OrderPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <OrderFormAuth />
      <Footer />
    </div>
  );
};

export default OrderPage;
