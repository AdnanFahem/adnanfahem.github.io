import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "@phosphor-icons/react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-testid="cookie-banner"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#0A0F1C] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-start gap-4 flex-1">
                <Cookie
                  weight="duotone"
                  className="w-8 h-8 text-yellow-500 flex-shrink-0"
                />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze
                    site traffic, and personalize content. By clicking "Accept
                    All", you consent to our use of cookies in accordance with
                    our Cookie Policy.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={declineCookies}
                  data-testid="cookie-decline-button"
                  className="flex-1 md:flex-none px-6 py-3 bg-transparent border border-white/20 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={acceptCookies}
                  data-testid="cookie-accept-button"
                  className="flex-1 md:flex-none px-6 py-3 bg-yellow-500 text-black text-sm font-semibold uppercase tracking-wider hover:bg-yellow-400 transition-all"
                >
                  Accept All
                </button>
              </div>
              <button
                onClick={declineCookies}
                data-testid="cookie-close-button"
                className="absolute top-4 right-4 md:relative md:top-auto md:right-auto text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
