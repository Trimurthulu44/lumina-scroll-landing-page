import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import { validateEmail, validatePhone, validateMinLength, validateRequired } from '../../utils/validators';
import { SectionHeading } from '../ui/SectionHeading';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { Reveal } from '../ui/Reveal';

export const Contact = () => {
  const [showToast, setShowToast] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const validate = (values) => {
    const errors = {};

    if (!validateRequired(values.name)) {
      errors.name = 'Full name is required.';
    } else if (!validateMinLength(values.name, 2)) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!validateRequired(values.email)) {
      errors.email = 'Email address is required.';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please provide a valid email format.';
    }

    if (values.phone && !validatePhone(values.phone)) {
      errors.phone = 'Please enter a valid phone number format.';
    }

    if (!validateRequired(values.subject)) {
      errors.subject = 'Subject is required.';
    } else if (!validateMinLength(values.subject, 3)) {
      errors.subject = 'Subject must be at least 3 characters.';
    }

    if (!validateRequired(values.message)) {
      errors.message = 'Project message is required.';
    } else if (!validateMinLength(values.message, 10)) {
      errors.message = 'Please share at least 10 characters describing your scope.';
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm(initialValues, validate);

  const handleFormSubmit = async (e) => {
    await handleSubmit(e, async () => {
      // Simulate asynchronous network request
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setShowToast(true);
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Start A Dialogue"
          title="Let's engineer your digital advantage."
          subtitle="Whether you need an end-to-end product built from scratch or an architectural audit of an existing React system, our team is ready."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Studio Contact Info (Left column) */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal variant="fade-left">
              <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-dark-card/60 backdrop-blur-md shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-lumina-600 dark:text-lumina-400">
                    Studio Headquarters
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Direct Engagements
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    We take on a limited number of studio sprint cohorts each quarter to preserve uncompromising quality and attention.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Inquiries</div>
                      <div className="font-semibold">partnerships@lumina-studio.io</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Direct Line</div>
                      <div className="font-semibold">+1 (415) 890-4220</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Presence</div>
                      <div className="font-semibold">San Francisco · London · Berlin</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-lumina-500/5 dark:bg-lumina-500/10 border border-lumina-500/20 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-lumina-500 shrink-0" />
                  <span>Avg response latency under 4 business hours</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form Container (Right column) */}
          <div className="lg:col-span-7">
            <Reveal variant="fade-right">
              <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-dark-card/70 backdrop-blur-md shadow-2xl relative">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Sprint Request Transmitted!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Our engineering director will review your project brief and reply with a tailored roadmap within 24 hours.
                    </p>
                    <div className="pt-6">
                      <Button variant="secondary" onClick={resetForm}>
                        Send Another Brief
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        name="name"
                        placeholder="Elena Woods"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                        touched={touched.name}
                        required
                        autoComplete="name"
                      />
                      <Input
                        label="Work Email"
                        name="email"
                        type="email"
                        placeholder="elena@enterprise.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        touched={touched.email}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Phone Number (Optional)"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone}
                        touched={touched.phone}
                        autoComplete="tel"
                      />
                      <Input
                        label="Project Subject"
                        name="subject"
                        placeholder="e.g. Design System Overhaul"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.subject}
                        touched={touched.subject}
                        required
                      />
                    </div>

                    <Textarea
                      label="Project Vision & Timeline"
                      name="message"
                      rows={4}
                      placeholder="Share details about your objectives, expected launch horizon, and technical tech stack requirements..."
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.message}
                      touched={touched.message}
                      required
                    />

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full py-4 text-base font-semibold"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Transmitting Brief...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>Submit Project Brief</span>
                            <Send className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                      We uphold strict NDA policies. Your information is never transferred to third parties.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Project Brief Delivered"
        message="We received your submission and will get in touch shortly."
      />
    </section>
  );
};
