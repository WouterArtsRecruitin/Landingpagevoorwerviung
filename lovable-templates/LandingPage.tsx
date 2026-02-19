import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Building2,
  MapPin,
  Clock,
  Euro,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';

interface LandingPageData {
  id: string;
  slug: string;
  page_title: string;
  company_name: string;
  company_website: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  primary_color: string;
  template_style: string;
  hero_headline: string;
  hero_subheadline: string;
  job_description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  why_join: string;
  company_culture: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  calendly_url?: string;
}

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    motivation: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadPage();
  }, [slug]);

  async function loadPage() {
    try {
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPage(data);
    } catch (err) {
      console.error('Error loading page:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await supabase.from('applications').insert({
        page_id: page?.id,
        applicant_name: formData.name,
        applicant_email: formData.email,
        applicant_phone: formData.phone,
        linkedin_url: formData.linkedin,
        motivation: formData.motivation,
      });

      setSubmitted(true);

      // Send email notifications (fire-and-forget, don't block the UI)
      const jobUrl = window.location.href;

      if (page?.contact_person_email) {
        supabase.functions.invoke('send-email', {
          body: {
            type: 'recruiter_notification',
            to: page.contact_person_email,
            job_title: page.page_title,
            applicant_name: formData.name,
            applicant_email: formData.email,
            applicant_phone: formData.phone,
            linkedin_url: formData.linkedin || undefined,
            motivation: formData.motivation,
          },
        }).catch((err) => console.error('Failed to send recruiter notification:', err));
      }

      if (formData.email) {
        supabase.functions.invoke('send-email', {
          body: {
            type: 'candidate_confirmation',
            to: formData.email,
            candidate_name: formData.name,
            job_title: page?.page_title,
            job_url: jobUrl,
          },
        }).catch((err) => console.error('Failed to send candidate confirmation:', err));
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Er ging iets mis. Probeer het opnieuw.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Deze vacature bestaat niet of is niet meer beschikbaar.</p>
        </div>
      </div>
    );
  }

  const primaryColor = page.primary_color || '#3B82F6';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}05 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                <TrendingUp className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-sm font-medium" style={{ color: primaryColor }}>
                  We're hiring!
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {page.hero_headline || page.page_title}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {page.hero_subheadline || page.job_description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">{page.company_name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5" />
                  <span>{page.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" />
                  <span>{page.job_type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Euro className="w-5 h-5" />
                  <span>€{page.salary_min?.toLocaleString()} - €{page.salary_max?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#apply"
                  className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  Solliciteer Direct
                  <ArrowRight className="w-5 h-5" />
                </a>

                {page.calendly_url && (
                  <a
                    href={page.calendly_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white border-2 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    <Calendar className="w-5 h-5" />
                    Plan een gesprek
                  </a>
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div
                  className="w-full h-96 rounded-2xl shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-32 h-32 text-white opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Description */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Over de functie</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>{page.job_description}</p>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      {page.responsibilities && page.responsibilities.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Wat ga je doen?</h2>
            <div className="grid gap-4">
              {page.responsibilities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: primaryColor }} />
                  <span className="text-lg text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      {page.requirements && page.requirements.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Wat zoeken we?</h2>
            <div className="grid gap-4">
              {page.requirements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                  <Star className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: primaryColor }} />
                  <span className="text-lg text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {page.benefits && page.benefits.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Wat bieden wij?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${primaryColor}20` }}>
                    <CheckCircle2 className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <p className="text-gray-800 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Solliciteer nu</h2>
            <p className="text-xl text-gray-600">
              Enthousiast geworden? Vul het formulier in en we nemen snel contact met je op!
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bedankt voor je sollicitatie!</h3>
              <p className="text-gray-700">
                We hebben je gegevens ontvangen en nemen binnen 2 werkdagen contact met je op.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volledige naam *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ focusRing: primaryColor }}
                  placeholder="Jan Jansen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email adres *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="jan@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefoonnummer *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="06 12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn profiel (optioneel)
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="https://linkedin.com/in/janjansen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivatie *
                </label>
                <textarea
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Waarom ben je geïnteresseerd in deze functie?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                Verstuur sollicitatie
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Vragen over deze vacature?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Neem gerust contact op met {page.contact_person_name || 'ons'}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {page.contact_person_email && (
              <a
                href={`mailto:${page.contact_person_email}`}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                {page.contact_person_email}
              </a>
            )}
            {page.contact_person_phone && (
              <a
                href={`tel:${page.contact_person_phone}`}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                {page.contact_person_phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-950 text-gray-400 text-center">
        <p>© {new Date().getFullYear()} {page.company_name}. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
