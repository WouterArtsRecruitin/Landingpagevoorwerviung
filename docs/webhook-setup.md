# Webhook Setup: Jotform / Typeform

## Overzicht

Er zijn twee manieren om vacaturepagina's aan te maken:
1. **Admin dashboard** (`/admin/nieuw`) - handmatig invullen
2. **Webhook** - automatisch via Jotform of Typeform

## Webhook URL

```
POST https://<jouw-supabase-url>/functions/v1/webhook-intake
```

Headers:
```
Content-Type: application/json
Authorization: Bearer <SUPABASE_ANON_KEY>
```

## Velden Mapping

### Verplicht (need-to-have)

| Veld | Jotform naam | Typeform ref | Beschrijving |
|------|-------------|-------------|-------------|
| `company_name` | `bedrijfsnaam` | `company_name` | Bedrijfsnaam |
| `job_title` | `functietitel` | `job_title` | Functietitel |
| `job_location` | `locatie` | `job_location` | Locatie/regio |
| `contact_name` | `contactpersoon` | `contact_name` | Naam contactpersoon |
| `contact_email` | `email` | `contact_email` | E-mail contactpersoon |

### Aanbevolen (nice-to-have)

| Veld | Jotform naam | Typeform ref | Beschrijving |
|------|-------------|-------------|-------------|
| `company_website` | `website` | `company_website` | Website URL |
| `company_sector` | `branche` | `company_sector` | Branche/sector |
| `primary_color` | `primary_color` | `primary_color` | Huisstijlkleur (#hex) |
| `salary_min` | `salaris_min` | `salary_min` | Minimum salaris |
| `salary_max` | `salaris_max` | `salary_max` | Maximum salaris |
| `employment_type` | `dienstverband` | `employment_type` | fulltime/parttime/flex |
| `job_description` | `beschrijving` | `job_description` | Korte beschrijving |
| `responsibilities` | `taken` | `responsibilities` | Taken (1 per regel) |
| `requirements_must` | `eisen` | `requirements_must` | Eisen (1 per regel) |
| `requirements_nice` | `pres` | `requirements_nice` | Pre's (1 per regel) |
| `benefits` | `arbeidsvoorwaarden` | `benefits` | Voordelen (1 per regel) |
| `contact_phone` | `telefoon` | `contact_phone` | Telefoonnummer |
| `contact_whatsapp` | `whatsapp` | `contact_whatsapp` | WhatsApp nummer |

## Jotform Setup

1. Maak een formulier aan in Jotform met de velden hierboven
2. Ga naar **Settings > Integrations > Webhooks**
3. Voeg de webhook URL toe
4. Jotform stuurt automatisch data bij elke inzending

### Jotform veldnamen
Gebruik exact de namen uit de "Jotform naam" kolom als **Field Name** in de form builder.
Bij lijsten (taken, eisen, etc): gebruik een **Long Text** veld waar de gebruiker 1 item per regel invult.

## Typeform Setup

1. Maak een formulier aan in Typeform
2. Geef elk veld een **ref** die overeenkomt met de "Typeform ref" kolom
3. Ga naar **Connect > Webhooks**
4. Voeg de webhook URL toe
5. Typeform stuurt `form_response.answers[]` bij elke inzending

### Typeform refs instellen
Bij elk veld: klik op het veld > **Logic** tab > scroll naar **Reference** > vul de ref in.

## Validatie

De webhook valideert automatisch:
- **Verplichte velden ontbreken** → Slack melding + e-mail naar team
- **Alles aanwezig** → Pagina wordt gegenereerd als concept

## Slack Notificaties

Stel de `SLACK_WEBHOOK_URL` environment variabele in bij de Supabase Edge Function:

```bash
supabase secrets set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T.../B.../xxx
```

Notificaties:
- **Onvolledige intake** → Waarschuwing met ontbrekende velden
- **Succesvolle generatie** → Bevestiging met URL en details

## E-mail Notificaties

Stel `NOTIFY_EMAIL` in voor extra notificaties:

```bash
supabase secrets set NOTIFY_EMAIL=team@recruitin.nl
```

## Flow

```
Jotform/Typeform
    ↓ webhook POST
webhook-intake Edge Function
    ↓ valideer velden
    ├── Onvolledig → Slack + e-mail melding
    └── Compleet ↓
        ↓ genereer secties + theme + form
        ↓ maak/vind organisatie
        ↓ insert landing_pages (status: draft)
        ↓ Slack succes melding
        ↓ return { slug, url }
```

De pagina wordt als **concept** aangemaakt. Publiceer via het admin dashboard (`/admin/paginas`).
