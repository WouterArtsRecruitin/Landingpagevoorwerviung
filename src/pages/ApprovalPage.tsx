import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { sendApprovedEmail } from '@/lib/resend';

interface ApprovalToken {
  id: string;
  page_id: string;
  token: string;
  client_email: string;
  client_name: string;
  status: string;
  expires_at: string;
  page: {
    id: string;
    slug: string;
    page_title: string;
    status: string;
  };
}

export default function ApprovalPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [approval, setApproval] = useState<ApprovalToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [action, setAction] = useState<'approved' | 'feedback' | 'rejected' | null>(null);

  useEffect(() => {
    async function loadApproval() {
      try {
        const { data, error } = await supabase
          .from('approval_tokens')
          .select(`
            *,
            page:landing_pages(id, slug, page_title, status)
          `)
          .eq('token', token)
          .single();

        if (error || !data) {
          setLoading(false);
          return;
        }

        // Check if expired
        if (new Date(data.expires_at) < new Date()) {
          setLoading(false);
          return;
        }

        setApproval(data as any);
      } catch (err) {
        console.error('Error loading approval:', err);
      } finally {
        setLoading(false);
      }
    }

    loadApproval();
  }, [token]);

  async function handleApprove() {
    if (!approval) return;
    setSubmitting(true);

    try {
      // 1. Update approval token
      await supabase
        .from('approval_tokens')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('token', token);

      // 2. Publish page
      await supabase
        .from('landing_pages')
        .update({
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', approval.page_id);

      // 3. Send confirmation email
      const liveUrl = `${window.location.origin}/v/${approval.page.slug}`;
      await sendApprovedEmail({
        clientEmail: approval.client_email,
        clientName: approval.client_name || 'Client',
        liveUrl,
        jobTitle: approval.page.page_title,
      });

      setAction('approved');
      setSubmitted(true);
    } catch (error) {
      alert('Er ging iets mis. Probeer opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleFeedback() {
    if (!approval || !feedback.trim()) return;
    setSubmitting(true);

    try {
      await supabase
        .from('approval_tokens')
        .update({
          status: 'feedback',
          feedback: feedback
        })
        .eq('token', token);

      setAction('feedback');
      setSubmitted(true);
    } catch (error) {
      alert('Er ging iets mis. Probeer opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReject() {
    if (!approval) return;
    setSubmitting(true);

    try {
      await supabase
        .from('approval_tokens')
        .update({ status: 'rejected' })
        .eq('token', token);

      setAction('rejected');
      setSubmitted(true);
    } catch (error) {
      alert('Er ging iets mis. Probeer opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!approval) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Link niet geldig</h1>
          <p className="text-gray-600 mb-4">
            Deze approval link is verlopen of niet geldig.
          </p>
          <p className="text-sm text-gray-500">
            Neem contact op als je hulp nodig hebt.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    const messages = {
      approved: {
        icon: '🎉',
        title: 'Pagina is live!',
        message: 'Je vacaturepagina is nu gepubliceerd en live. Je ontvangt een email met de live URL.',
        color: 'green',
      },
      feedback: {
        icon: '✅',
        title: 'Feedback ontvangen!',
        message: 'Bedankt voor je feedback. We verwerken je wijzigingen en sturen je binnen 24 uur een nieuwe versie.',
        color: 'blue',
      },
      rejected: {
        icon: '👍',
        title: 'Begrepen!',
        message: 'We maken een nieuw concept en sturen je dat zo snel mogelijk.',
        color: 'gray',
      },
    };

    const msg = action ? messages[action] : messages.feedback;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 max-w-md">
          <div className="text-6xl mb-4">{msg.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{msg.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{msg.message}</p>
          {action === 'approved' && (
            <a
              href={`/v/${approval.page.slug}`}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Bekijk live pagina →
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Review je vacaturepagina
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {approval.page.page_title}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Voor: {approval.client_name}
            </div>
          </div>
        </div>
      </div>

      {/* Preview iframe */}
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <iframe
            src={`/v/${approval.page.slug}`}
            className="w-full h-[600px] sm:h-[800px] border-0"
            title="Preview"
          />
        </div>

        {/* Action cards */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Wat vind je ervan?</h2>
          <p className="text-gray-600 mb-6">
            Kies een van de opties hieronder
          </p>

          <div className="space-y-4">
            {/* Approve */}
            <button
              onClick={handleApprove}
              disabled={submitting}
              className="w-full py-4 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>✅</span>
              <span>Goedkeuren & Direct Live</span>
            </button>

            {/* Feedback */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">📝 Feedback geven</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Wat wil je aangepast zien? Wees zo specifiek mogelijk..."
                className="w-full border border-gray-300 rounded-lg p-3 mb-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
              <button
                onClick={handleFeedback}
                disabled={!feedback.trim() || submitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Feedback versturen
              </button>
            </div>

            {/* Reject */}
            <button
              onClick={handleReject}
              disabled={submitting}
              className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
            >
              ❌ Afwijzen
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Vragen? Neem contact op via wouter@kandidatentekort.nl
          </p>
        </div>
      </div>
    </div>
  );
}
