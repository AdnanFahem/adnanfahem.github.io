import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, ArrowRight, Phone, CheckCircle } from "@phosphor-icons/react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function QuoteModal({ isOpen, onClose, preselectedService = "" }) {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_required: preselectedService,
    package: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_required: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.service_required) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, formData);
      setSubmitted(true);
      toast.success("Quote request submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service_required: "",
      package: "",
      message: "",
    });
    setSubmitted(false);
    onClose();
  };

  const packages = [
    { id: "basic", name: "Basic", price: "From £12/hr" },
    { id: "standard", name: "Standard", price: "From £15/hr" },
    { id: "premium", name: "Premium", price: "Custom" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="quote-modal"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={resetAndClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-[#0A0F1C] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={resetAndClose}
              data-testid="quote-modal-close"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X weight="bold" className="w-6 h-6" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="p-8 md:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle weight="fill" className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Thank You!
                </h2>
                <p className="text-slate-300 mb-8">
                  Your quote request has been submitted successfully. Our team will
                  contact you within 24 hours with a tailored security solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetAndClose}
                    className="bg-yellow-500 text-black font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all"
                  >
                    Close
                  </button>
                  <a
                    href="tel:+447943715313"
                    className="bg-transparent border border-white/20 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Phone weight="fill" className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </div>
            ) : (
              /* Form */
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-2">
                    Free Quote
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Request Your Security Quote
                  </h2>
                  <p className="text-slate-400">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} data-testid="quote-modal-form">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid="quote-modal-name"
                        className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="quote-modal-email"
                        className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="quote-modal-phone"
                        className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600"
                        placeholder="+44 7123 456789"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        data-testid="quote-modal-company"
                        className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                        Service Required *
                      </label>
                      <select
                        value={formData.service_required}
                        onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                        data-testid="quote-modal-service"
                        className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                        Package
                      </label>
                      <select
                        value={formData.package}
                        onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                        data-testid="quote-modal-package"
                        className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500"
                      >
                        <option value="">Select a package</option>
                        {packages.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} - {p.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      data-testid="quote-modal-message"
                      rows={4}
                      className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600 resize-none"
                      placeholder="Tell us about your security requirements..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      data-testid="quote-modal-submit"
                      className="flex-1 bg-yellow-500 text-black font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Request
                          <ArrowRight weight="bold" className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <a
                      href="tel:+447943715313"
                      className="bg-transparent border border-white/20 text-white font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all inline-flex items-center justify-center gap-2"
                    >
                      <Phone weight="fill" className="w-4 h-4" />
                      Call Instead
                    </a>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
