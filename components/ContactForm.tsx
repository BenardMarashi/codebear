'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
      });
      
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={ref} id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="absolute inset-0 bg-grid-small opacity-20" />

      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#285E4B]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#378268]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect glass-border rounded-3xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.name')} <span className="text-[#378268]">{t('form.required')}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('form.namePlaceholder')}
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#285E4B] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.email')} <span className="text-[#378268]">{t('form.required')}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#285E4B] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('form.companyPlaceholder')}
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#285E4B] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('form.phonePlaceholder')}
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#285E4B] transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('form.service')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#285E4B] transition-all bg-transparent"
                >
                  <option value="" className="bg-black">{t('form.selectService')}</option>
                  <option value="shopify" className="bg-black">{t('form.services.shopify')}</option>
                  <option value="webapp" className="bg-black">{t('form.services.webapp')}</option>
                  <option value="ai" className="bg-black">{t('form.services.ai')}</option>
                  <option value="marketing" className="bg-black">{t('form.services.marketing')}</option>
                  <option value="seo" className="bg-black">{t('form.services.seo')}</option>
                  <option value="optimization" className="bg-black">{t('form.services.optimization')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('form.message')} <span className="text-[#378268]">{t('form.required')}</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('form.messagePlaceholder')}
                  className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#285E4B] transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className="w-full btn-primary py-4 text-lg shadow-2xl shadow-[#285E4B]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-effect glass-border rounded-xl text-center"
                >
                  <p className="text-green-400">{t('form.successMessage')}</p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-effect glass-border rounded-xl text-center"
                >
                  <p className="text-red-400">{t('form.errorMessage')}</p>
                </motion.div>
              )}
            </form>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-center mb-4">{t('reachUs')}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
                <a href="mailto:hello@codebear.at" className="text-[#378268] hover:text-[#285E4B] transition-colors">
                  {t('email')}
                </a>
                <a href="tel:+43XXXXXXXXX" className="text-[#378268] hover:text-[#285E4B] transition-colors">
                  {t('phone')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}