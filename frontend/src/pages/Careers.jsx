import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Shield, CheckCircle, ArrowRight, UploadSimple, Briefcase, Certificate, Clock } from "@phosphor-icons/react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const requirements = [
  { icon: Certificate, title: "SIA License", description: "Valid Door Supervisor or Security Guard license" },
  { icon: Clock, title: "Availability", description: "Flexible working hours including nights and weekends" },
  { icon: Briefcase, title: "Experience", description: "Previous security experience preferred but not required" },
  { icon: Shield, title: "Right to Work", description: "Must have the right to work in the UK" },
];

const benefits = ["Competitive hourly rates", "Weekly pay", "Flexible shifts", "Career progression", "Full training provided", "Uniform & equipment", "Pension scheme", "24/7 support"];

export default function Careers() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", sia_license: "", experience_years: "", cover_letter: "" });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.experience_years) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        sia_license: formData.sia_license || null,
        experience_years: parseInt(formData.experience_years),
        cover_letter: formData.cover_letter || null,
      };
      await axios.post(`${API}/careers/apply-json`, payload);
      toast.success("Application submitted successfully! We'll be in touch soon.");
      setFormData({ name: "", email: "", phone: "", sia_license: "", experience_years: "", cover_letter: "" });
      setCvFile(null);
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="careers-page" className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Careers</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">Join Our Team</h1>
            <p className="text-lg text-slate-300 leading-relaxed">We're always looking for dedicated professionals to join our growing team of security officers. Start your career with B21 Security today.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Requirements</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <motion.div key={req.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-[#0A0F1C] border border-white/10 p-6">
                    <req.icon weight="duotone" className="w-10 h-10 text-yellow-500 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{req.title}</h3>
                    <p className="text-sm text-slate-400">{req.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Benefits</h2>
              <div className="bg-[#0A0F1C] border border-white/10 p-8">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.li key={benefit} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle weight="fill" className="w-5 h-5 text-emerald-500 flex-shrink-0" />{benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Apply Now</h2>
            <p className="text-slate-300">Fill out the form below to start your application</p>
          </div>
          <form onSubmit={handleSubmit} data-testid="career-form" className="bg-[#050810] border border-white/10 p-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Full Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} data-testid="career-name" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="John Smith" required />
              </div>
              <div>
                <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} data-testid="career-email" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="john@email.com" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Phone *</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} data-testid="career-phone" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="07123 456789" required />
              </div>
              <div>
                <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">SIA License Number</label>
                <input type="text" value={formData.sia_license} onChange={(e) => setFormData({ ...formData, sia_license: e.target.value })} data-testid="career-sia" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="1234-5678-9012-3456" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Years of Experience *</label>
              <select value={formData.experience_years} onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })} data-testid="career-experience" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500" required>
                <option value="">Select experience</option>
                <option value="0">No experience</option>
                <option value="1">1-2 years</option>
                <option value="3">3-5 years</option>
                <option value="5">5+ years</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Upload CV</label>
              <div className="bg-[#0A0F1C] border border-dashed border-white/20 p-8 text-center hover:border-yellow-500/50 transition-colors cursor-pointer" onClick={() => document.getElementById("cv-upload").click()}>
                <UploadSimple weight="duotone" className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">{cvFile ? cvFile.name : "Click to upload your CV (PDF, DOC, DOCX)"}</p>
                <input type="file" id="cv-upload" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setCvFile(e.target.files[0])} />
              </div>
            </div>
            <div className="mb-6">
              <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Cover Letter</label>
              <textarea value={formData.cover_letter} onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })} data-testid="career-cover" rows={4} className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600 resize-none" placeholder="Tell us why you'd like to join B21 Security..." />
            </div>
            <button type="submit" disabled={loading} data-testid="career-submit" className="w-full bg-yellow-500 text-black font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? "Submitting..." : (<>Submit Application <ArrowRight weight="bold" className="w-4 h-4" /></>)}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
