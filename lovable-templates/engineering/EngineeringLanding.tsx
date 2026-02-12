import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
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
  Sparkles,
  Target,
  Award
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
  hero_headline: string;
  hero_subheadline: string;
  job_description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  calendly_url?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  motivation: string;
}

export default function EngineeringLanding() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    motivation: '',
  });
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);

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

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('success-message')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Er ging iets mis bij het versturen. Probeer het opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg text-gray-600 font-medium">Vacature laden...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            Deze vacature bestaat niet of is niet meer beschikbaar.
          </p>
          <p className="text-sm text-gray-500">
            Slug: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Engineering Hero - Tech Gradient */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px ependant 1px, rgb(59, 130, 246) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-100">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  We're Hiring Engineers!
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  {page.hero_headline || page.page_title}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
                  {page.hero_subheadline || page.job_description}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg shadow-sm">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{page.company_name}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg shadow-sm">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{page.location}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{page.job_type}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg shadow-sm">
                  <Euro className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">
                    €{page.salary_min?.toLocaleString()} - €{page.salary_max?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#apply"
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
                >
                  <span>Solliciteer Direct</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                {page.calendly_url && (
                  <a
                    href={page.calendly_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Plan Kennismaking</span>
                  </a>
                )}
              </div>
            </div>

            {/* Hero Visual - Engineering Theme */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-12 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>

                  {/* Tech Icons */}
                  <div className="relative grid grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
                      <Target className="w-16 h-16 text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
                      <Award className="w-16 h-16 text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center col-span-2">
                      <Building2 className="w-20 h-20 text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 transform -rotate-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Verified Company</div>
                      <div className="text-xs text-gray-500">Trusted Employer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Description */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">De Rol</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Over de functie</h2>
          </div>
          <div className="prose prose-lg prose-blue max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed">
              {page.job_description}
            </p>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      {page.responsibilities && page.responsibilities.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Verantwoordelijkheden</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Wat ga je doen?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {page.responsibilities.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-800 leading-relaxed flex-1">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      {page.requirements && page.requirements.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Vereisten</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Wat zoeken we?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {page.requirements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-gray-800 leading-relaxed flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {page.benefits && page.benefits.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-blue-200 uppercase tracking-wider">Voordelen</span>
              <h2 className="text-4xl font-bold mt-2">Wat bieden wij?</h2>
              <p className="text-xl text-blue-100 mt-4 max-w-2xl mx-auto">
                Werken bij {page.company_name} betekent werken in een inspirerende omgeving met uitstekende voorwaarden
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-medium text-lg leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      <section id="apply" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Solliciteer</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Klaar voor de volgende stap?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enthousiast geworden? Vul het formulier in en we nemen binnen 2 werkdagen contact met je op.
            </p>
          </div>

          {submitted ? (
            <div id="success-message" className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-3xl p-12 text-center shadow-xl">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Bedankt voor je sollicitatie!</h3>
              <p className="text-lg text-gray-700 mb-2">
                We hebben je gegevens ontvangen en nemen binnen 2 werkdagen contact met je op.
              </p>
              <p className="text-sm text-gray-600">
                Check ook je spam folder voor onze bevestigingsmail.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 space-y-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Volledige naam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                  placeholder="Jan Jansen"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Email adres <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                  placeholder="jan@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Telefoonnummer <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                  placeholder="06 12345678"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  LinkedIn profiel <span className="text-gray-500 font-normal">(optioneel)</span>
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                  placeholder="https://linkedin.com/in/janjansen"
                />
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Motivatie <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg resize-none"
                  placeholder="Vertel ons waarom je geïnteresseerd bent in deze functie en wat jou de ideale kandidaat maakt..."
                />
                <p className="text-sm text-gray-500 mt-2">Minimum 50 tekens</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full group px-8 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verzenden...</span>
                  </>
                ) : (
                  <>
                    <span>Verstuur Sollicitatie</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Door te solliciteren ga je akkoord met onze privacy policy
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Vragen over deze vacature?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Neem gerust contact op met <span className="font-semibold text-white">{page.contact_person_name || 'ons team'}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {page.contact_person_email && (
              <a
                href={`mailto:${page.contact_person_email}`}
                className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span>{page.contact_person_email}</span>
              </a>
            )}
            {page.contact_person_phone && (
              <a
                href={`tel:${page.contact_person_phone}`}
                className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span>{page.contact_person_phone}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-950 text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} {page.company_name}. Alle rechten voorbehouden.
            </p>
            {page.company_website && (
              <a
                href={page.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
              >
                Bezoek {page.company_name} →
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
