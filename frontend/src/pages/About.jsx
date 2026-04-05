import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  Target,
  Eye,
  Heart,
  CheckCircle,
  Users,
  Trophy,
  Clock,
  ArrowRight,
} from "@phosphor-icons/react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty in all our dealings with clients, employees, and partners.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for the highest standards in everything we do, continuously improving our services and operations.",
  },
  {
    icon: Eye,
    title: "Vigilance",
    description:
      "Our teams maintain constant awareness and readiness to protect your assets, people, and property.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "We genuinely care about the safety and wellbeing of our clients, their employees, and the communities we serve.",
  },
];

const whyChooseUs = [
  "SIA Approved Contractor Scheme (ACS) certified",
  "ISO 9001:2015 Quality Management certified",
  "Comprehensive vetting and background checks",
  "Ongoing training and professional development",
  "24/7 control room and emergency response",
  "Dedicated account managers for all clients",
  "Flexible contracts with no hidden fees",
  "UK-wide coverage with local expertise",
];

const milestones = [
  { year: "2003", event: "Secure Access founded in London" },
  { year: "2008", event: "Achieved SIA ACS accreditation" },
  { year: "2012", event: "Expanded to nationwide coverage" },
  { year: "2015", event: "Reached 1,000 active security officers" },
  { year: "2018", event: "Launched 24/7 CCTV monitoring center" },
  { year: "2023", event: "Celebrated 20 years of service" },
];

export default function About() {
  return (
    <div data-testid="about-page" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">
              Protecting What
              <br />
              Matters Most
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              For over two decades, Secure Access has been the trusted security
              partner for businesses across the United Kingdom. Our commitment
              to excellence, integrity, and professionalism has made us one of
              the leading security companies in the industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-[#050810] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Clock, value: "20+", label: "Years Experience" },
              { icon: Users, value: "5,000+", label: "Security Officers" },
              { icon: Trophy, value: "500+", label: "Active Clients" },
              { icon: Shield, value: "99.9%", label: "Incident Resolution" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon
                  weight="duotone"
                  className="w-10 h-10 text-yellow-500 mx-auto mb-4"
                />
                <p className="text-3xl md:text-4xl font-black text-white">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-wider text-slate-400 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0F1C] border border-white/10 p-8 md:p-12"
            >
              <div className="w-16 h-16 bg-yellow-500/10 flex items-center justify-center mb-6">
                <Target weight="duotone" className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To deliver exceptional security solutions that protect people,
                property, and assets while providing peace of mind to our
                clients. We are committed to maintaining the highest standards
                of professionalism, integrity, and service excellence in
                everything we do.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0F1C] border border-white/10 p-8 md:p-12"
            >
              <div className="w-16 h-16 bg-yellow-500/10 flex items-center justify-center mb-6">
                <Eye weight="duotone" className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Our Vision
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To be the UK's most trusted and respected security company,
                recognized for our innovation, reliability, and unwavering
                commitment to client satisfaction. We aim to set the industry
                standard for quality and professionalism in security services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`value-${value.title.toLowerCase()}`}
                className="bg-[#050810] border border-white/10 p-8 hover:border-yellow-500/50 transition-colors"
              >
                <value.icon
                  weight="duotone"
                  className="w-12 h-12 text-yellow-500 mb-6"
                />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
                The Secure Access Difference
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white mb-6">
                Why Choose Us?
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                When you partner with Secure Access, you're choosing a security
                company that puts your needs first. Our combination of
                experience, expertise, and dedication sets us apart from the
                competition.
              </p>
              <ul className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      weight="fill"
                      className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-slate-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1770529933902-d2f7851be31c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGd1YXJkJTIwdW5pZm9ybXxlbnwwfHx8fDE3NzU0MjY0MTF8MA&ixlib=rb-4.1.0&q=85"
                alt="Security guard in uniform"
                className="w-full h-auto border border-white/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-500 p-6 hidden md:block">
                <p className="text-3xl font-black text-black">20+</p>
                <p className="text-sm font-bold text-black uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white">
              Company Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    } pl-12 md:pl-0`}
                  >
                    <div className="bg-[#050810] border border-white/10 p-6 inline-block">
                      <p className="text-2xl font-black text-yellow-500 mb-2">
                        {milestone.year}
                      </p>
                      <p className="text-slate-300">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-yellow-500 transform -translate-x-1/2 z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Contact us today to discuss your security requirements and
              discover how Secure Access can help protect your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                data-testid="about-cta-contact"
                className="bg-yellow-500 text-black font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all inline-flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight weight="bold" className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="bg-transparent border border-white/20 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all inline-flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
