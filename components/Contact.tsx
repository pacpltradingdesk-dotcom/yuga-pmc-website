// components/Contact.tsx
"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { fadeUp, slideInLeft, slideInRight, stagger } from "@/animations/variants";
import { COMPANY, CAPACITY_OPTIONS } from "@/lib/company-data";

type FormData = {
  name: string;
  phone: string;
  email: string;
  capacity: string;
  message: string;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Bio-Bitumen Plant Inquiry: ${data.capacity}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCapacity: ${data.capacity}\n\n${data.message}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-gold/40 focus:bg-white/8 transition-all";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <section id="contact" className="py-32 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Contact</motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Start Your{" "}
            <span className="text-gradient">Plant Journey</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-xl mx-auto">
            Free consultation. No commitment. Prince Shah personally reviews
            every inquiry.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — col-span-3 */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle2 size={48} className="text-green" />
                <h3 className="font-display font-bold text-2xl text-white">
                  Thank you!
                </h3>
                <p className="text-text-secondary">
                  Your inquiry is being routed to{" "}
                  <span className="text-gold">{COMPANY.email}</span>. We&apos;ll
                  respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Full Name"
                      className={inputClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="Phone Number"
                      type="tel"
                      className={inputClass}
                    />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <input
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email Address"
                    type="email"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                <div>
                  <select
                    {...register("capacity", { required: "Please select a capacity" })}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Plant Capacity / Investment
                    </option>
                    {CAPACITY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-charcoal">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.capacity && <p className={errorClass}>{errors.capacity.message}</p>}
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Tell us about your project (optional)"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-amber-400 text-black font-bold py-4 rounded-xl text-sm uppercase tracking-wider glow-gold hover:opacity-90 transition-opacity"
                >
                  Book Free Consultation
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info stack — col-span-2 */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-0.5">Call us</p>
                <p className="text-white font-semibold text-sm">{COMPANY.phone}</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-0.5">Email</p>
                <p className="text-white font-semibold text-sm">{COMPANY.email}</p>
              </div>
            </div>

            <motion.a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20YUGA%20PMC%2C%20I%27m%20interested%20in%20bio-bitumen%20plant%20setup.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full bg-green text-black font-bold py-4 rounded-2xl text-sm glow-green hover:bg-emerald-400 transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </motion.a>

            <div className="glass rounded-2xl p-5">
              <p className="text-text-muted text-xs mb-1">Operations</p>
              <p className="text-white text-sm font-medium">{COMPANY.address}</p>
              <p className="text-text-muted text-xs mt-2">{COMPANY.registered}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <a
          href="#contact"
          className="flex items-center justify-center bg-gold text-black font-bold py-4 rounded-full text-sm uppercase tracking-wider glow-gold"
        >
          Book Free Consultation
        </a>
      </div>
    </section>
  );
}
