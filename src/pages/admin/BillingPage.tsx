import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "maand",
    features: [
      "3 vacaturepagina's",
      "Basis templates",
      "E-mail notificaties",
      "7 dagen data retentie",
    ],
    limit: 3,
  },
  {
    id: "starter",
    name: "Starter",
    price: 49,
    interval: "maand",
    features: [
      "15 vacaturepagina's",
      "Alle templates",
      "E-mail notificaties",
      "Klant goedkeuring workflow",
      "30 dagen data retentie",
      "CSV export",
    ],
    limit: 15,
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    interval: "maand",
    features: [
      "Onbeperkt pagina's",
      "Alle templates + editor",
      "E-mail notificaties",
      "Klant goedkeuring workflow",
      "Google Analytics integratie",
      "ATS integratie",
      "Onbeperkte data retentie",
      "Prioriteit support",
    ],
    limit: -1,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    interval: "maand",
    features: [
      "Alles in Professional",
      "Custom branding",
      "API toegang",
      "Custom domein",
      "Dedicated account manager",
      "SLA garantie",
      "SSO / SAML",
    ],
    limit: -1,
  },
];

export default function BillingPage() {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const currentPlan = profile?.subscription_plan || "free";

  async function handleSelectPlan(planId: string) {
    if (planId === currentPlan) return;
    if (planId === "enterprise") {
      window.open("mailto:sales@werving.nl?subject=Enterprise%20plan%20aanvraag", "_blank");
      return;
    }

    setLoading(planId);

    try {
      // Call edge function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan: planId },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        // Fallback: update profile directly (for demo/development)
        const plan = PLANS.find((p) => p.id === planId);
        await supabase
          .from("user_profiles")
          .update({
            subscription_plan: planId,
            page_limit: plan?.limit ?? 3,
            updated_at: new Date().toISOString(),
          })
          .eq("id", profile?.id);

        await refreshProfile();
      }
    } catch {
      // If edge function not available, update directly for demo
      const plan = PLANS.find((p) => p.id === planId);
      await supabase
        .from("user_profiles")
        .update({
          subscription_plan: planId,
          page_limit: plan?.limit ?? 3,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile?.id);

      await refreshProfile();
    } finally {
      setLoading(null);
    }
  }

  async function handleManageBilling() {
    try {
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        body: {},
      });

      if (!error && data?.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // Portal not available
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Abonnement</h2>
        <p className="text-gray-600 mt-1">
          Kies het plan dat bij je past. Upgrade of downgrade op elk moment.
        </p>
      </div>

      {/* Current plan info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">
              Huidig plan: <span className="capitalize">{currentPlan}</span>
            </p>
            <p className="text-xs text-blue-700 mt-0.5">
              {profile?.page_limit === -1
                ? "Onbeperkt pagina's"
                : `${profile?.page_limit || 3} pagina's beschikbaar`}
            </p>
          </div>
          {currentPlan !== "free" && (
            <button
              onClick={handleManageBilling}
              className="text-sm text-blue-600 hover:underline"
            >
              Beheer factuurgegevens
            </button>
          )}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border-2 p-6 flex flex-col ${
                plan.popular
                  ? "border-blue-600 ring-1 ring-blue-600"
                  : isCurrentPlan
                    ? "border-green-500"
                    : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full mb-3 self-start">
                  Populair
                </span>
              )}

              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>

              <div className="mt-3 mb-6">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      &euro;{plan.price}
                    </span>
                    <span className="text-sm text-gray-500">/{plan.interval}</span>
                  </div>
                ) : (
                  <p className="text-lg font-medium text-gray-900">Op aanvraag</p>
                )}
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrentPlan || loading === plan.id}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrentPlan
                    ? "bg-green-100 text-green-700 cursor-default"
                    : plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading === plan.id
                  ? "Verwerken..."
                  : isCurrentPlan
                    ? "Huidig plan"
                    : plan.price === null
                      ? "Contact opnemen"
                      : plan.price === 0
                        ? "Downgraden"
                        : "Upgraden"}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Veelgestelde vragen</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Kan ik op elk moment opzeggen?</p>
            <p className="text-sm text-gray-600 mt-1">
              Ja, je kunt je abonnement op elk moment opzeggen. Je houdt toegang tot het einde van je factuurperiode.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Wat gebeurt er als ik downgrade?</p>
            <p className="text-sm text-gray-600 mt-1">
              Je bestaande pagina's blijven bewaard, maar je kunt geen nieuwe aanmaken boven de limiet van je nieuwe plan.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Is er een proefperiode?</p>
            <p className="text-sm text-gray-600 mt-1">
              Het Free plan is altijd gratis. Je kunt het platform uitproberen voordat je upgrade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
