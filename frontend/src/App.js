import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QuoteModalProvider } from "@/context/QuoteModalContext";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Industries from "@/pages/Industries";
import Pricing from "@/pages/Pricing";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

function App() {
  return (
    <QuoteModalProvider>
      <div className="min-h-screen bg-[#050810]">
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </div>
    </QuoteModalProvider>
  );
}

export default App;
