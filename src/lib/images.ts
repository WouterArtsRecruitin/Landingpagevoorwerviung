/**
 * Dynamische image generatie utilities
 * Gebruikt Unsplash Source API voor sector-specifieke achtergrond afbeeldingen
 */

export type TemplateType = 'modern' | 'dynamic' | 'corporate';

// Sector keywords voor Unsplash queries
const SECTOR_KEYWORDS: Record<string, string> = {
  'Techniek & Industrie': 'factory,engineering,industrial,manufacturing',
  'ICT & Telecom': 'technology,office,workspace,software',
  'Bouw & Vastgoed': 'construction,architecture,building,skyline',
  'Zorg & Welzijn': 'healthcare,medical,hospital,care',
  'Transport & Logistiek': 'logistics,warehouse,distribution,transport',
  'Horeca & Toerisme': 'hospitality,restaurant,hotel,tourism',
  'Onderwijs & Training': 'education,training,classroom,learning',
  'Financiële Diensten': 'finance,business,office,corporate',
  'Retail & E-commerce': 'retail,shopping,ecommerce,store',
  'Marketing & Communicatie': 'marketing,creative,design,media',
  'Overheid & Non-profit': 'government,public,organization,teamwork',
  'Productie & Metaal': 'production,metal,machinery,workshop',
};

// Template-specifieke styling keywords
const TEMPLATE_KEYWORDS: Record<TemplateType, string> = {
  modern: 'dark,modern,tech,futuristic',
  dynamic: 'team,collaboration,creative,energy',
  corporate: 'professional,office,business,formal',
};

// Fallback keywords als sector niet gevonden
const DEFAULT_KEYWORDS = 'office,workplace,professional,team';

export interface UnsplashUrlParams {
  sector?: string;
  template: TemplateType;
  width?: number;
  height?: number;
}

/**
 * Genereer een dynamische Unsplash Source API URL
 * 
 * @param params - Configuratie voor image generatie
 * @returns Unsplash Source API URL met keywords
 * 
 * @example
 * generateUnsplashUrl({ sector: 'ICT & Telecom', template: 'modern' })
 * // => "https://source.unsplash.com/2000x1200/?technology,office,workspace,dark,modern,tech"
 */
export function generateUnsplashUrl(params: UnsplashUrlParams): string {
  const {
    sector,
    template,
    width = 2000,
    height = 1200,
  } = params;

  // Combineer sector keywords met template keywords
  const sectorKeys = SECTOR_KEYWORDS[sector || ''] || DEFAULT_KEYWORDS;
  const templateKeys = TEMPLATE_KEYWORDS[template];
  
  const keywords = `${sectorKeys},${templateKeys}`;

  // Unsplash Source API URL
  // Opmerking: Source API is deprecated maar werkt nog steeds voor random images
  // Alternatief: gebruik Unsplash API met collections
  return `https://source.unsplash.com/${width}x${height}/?${keywords}`;
}

/**
 * Genereer een Unsplash URL met specifieke photo ID
 * Gebruik voor consistent images per template
 */
export function getUnsplashPhotoUrl(photoId: string, width: number = 2000): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

/**
 * Curated Unsplash collectie IDs per template
 * Gebruik deze voor consistente, hand-picked images
 */
export const UNSPLASH_COLLECTIONS: Record<TemplateType, string> = {
  modern: '1065976',  // Tech & Office collectie
  dynamic: '3330445', // Team & Collaboration collectie  
  corporate: '1065396', // Business & Corporate collectie
};

/**
 * Genereer URL van curated collectie
 * Meer consistent dan random keywords
 */
export function getCollectionImageUrl(template: TemplateType, width: number = 2000): string {
  const collectionId = UNSPLASH_COLLECTIONS[template];
  return `https://source.unsplash.com/collection/${collectionId}/${width}x1200`;
}
