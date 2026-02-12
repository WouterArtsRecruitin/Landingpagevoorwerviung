import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { sendApprovalEmail } from '@/lib/resend';

interface ShareWithClientButtonProps {
  pageId: string;
  onShared?: () => void;
}

export function ShareWithClientButton({ pageId, onShared }: ShareWithClientButtonProps) {
  const [loading, setLoading] = useState(false);
  const [shared, setShared] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approvalUrl, setApprovalUrl] = useState<string>('');
  const [recipientInfo, setRecipientInfo] = useState<{ name: string; email: string } | null>(null);

  // Load recipient info on mount
  useEffect(() => {
    async function loadRecipient() {
      const { data } = await supabase
        .from('landing_pages')
        .select('contact_person_name, contact_person_email')
        .eq('id', pageId)
        .single();

      if (data?.contact_person_email) {
        setRecipientInfo({
          name: data.contact_person_name || 'Onbekend',
          email: data.contact_person_email,
        });
      }
    }
    loadRecipient();
  }, [pageId]);

  async function handleShare() {
    setLoading(true);
    setError(null);

    try {
      // 1. Get page details
      const { data: page, error: pageError } = await supabase
        .from('landing_pages')
        .select(`
          *,
          organization:organizations(*)
        `)
        .eq('id', pageId)
        .single();

      if (pageError || !page) {
        throw new Error('Pagina niet gevonden');
      }

      // 2. Generate unique token
      const token = crypto.randomUUID();

      // 3. Create approval token
      const { error: tokenError } = await supabase
        .from('approval_tokens')
        .insert({
          page_id: pageId,
          token: token,
          client_email: page.contact_person_email,
          client_name: page.contact_person_name,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (tokenError) {
        throw new Error('Kon approval token niet aanmaken');
      }

      // 4. Send email
      const url = `${window.location.origin}/approve/${token}`;
      setApprovalUrl(url);

      const emailResult = await sendApprovalEmail({
        clientEmail: page.contact_person_email,
        clientName: page.contact_person_name || 'Client',
        jobTitle: page.page_title,
        companyName: page.organization?.name || 'Bedrijf',
        approvalUrl: url,
      });

      if (!emailResult.success) {
        throw new Error('Kon email niet versturen');
      }

      setShared(true);
      onShared?.();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  }

  if (shared) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">✅ Gedeeld met klant!</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Approval URL:</p>
          <p className="text-sm font-mono text-gray-700 break-all">{approvalUrl}</p>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(approvalUrl);
            alert('URL gekopieerd!');
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          📋 Kopieer URL
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Show recipient info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 mb-1">Email wordt verstuurd naar:</p>
            {recipientInfo ? (
              <>
                <p className="text-sm text-gray-900 font-medium">{recipientInfo.name}</p>
                <p className="text-xs text-gray-600 truncate">{recipientInfo.email}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">Laden...</p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleShare}
        disabled={loading || !recipientInfo?.email}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 transition-colors"
        title={!recipientInfo?.email ? 'Geen contact email beschikbaar' : ''}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Verzenden...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>📧 Deel met klant</span>
          </>
        )}
      </button>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
