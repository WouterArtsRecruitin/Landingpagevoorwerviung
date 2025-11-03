import { ImageWithFallback } from "./figma/ImageWithFallback";
import veegmachineWinter from "figma:asset/850154234cd67e1eaca7a5469c5dc0f6652fabd5.png";
import airportWinterdienst from "figma:asset/0de650390a91751f48bffed06a4ce553306e041e.png";
import splitViewMachines from "figma:asset/f1b0e94c289ef4f5ea6b28b90b6ec5c39f3a2bc6.png";

export function WorkGallery() {
  const images = [
    {
      src: splitViewMachines,
      alt: "Aebi Schmidt veegmachine en winterdienstvoertuig",
      caption: "Veegmachines voor straatreiniging & winterdienst",
      isImport: true,
    },
    {
      src: airportWinterdienst,
      alt: "Schmidt luchthaven winterdienst bij zonsopkomst",
      caption: "Luchthaven winterdienst - 24/7 operationeel",
      isImport: true,
    },
    {
      src: veegmachineWinter,
      alt: "Aebi Schmidt sneeuwschuif in winterse woonwijk",
      caption: "Winterdienst in stedelijke omgeving",
      isImport: true,
    },
    {
      src: "https://images.unsplash.com/photo-1624280341680-5dee2199bce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHdvcmtpbmclMjB0cnVjayUyMGVuZ2luZXxlbnwxfHx8fDE3NjE4MTc3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Monteur werkt aan motor en technische systemen",
      caption: "Motor en mechanische systemen",
      isImport: false,
    },
    {
      src: "https://images.unsplash.com/photo-1642552666722-0e4398bc577a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VlcGVyJTIwdHJ1Y2slMjBtYWludGVuYW5jZSUyMGNpdHl8ZW58MXx8fHwxNzYxODE3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Monteur aan veegwagen in stadsdienst",
      caption: "Service aan veegmachines",
      isImport: false,
    },
    {
      src: "https://images.unsplash.com/photo-1702146713870-8cdd7ab983fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwcmVwYWlyaW5nJTIwdmVoaWNsZSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MTgxNzgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Technicus in werkplaats met voertuig",
      caption: "Werkplaats reparaties",
      isImport: false,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">Waarmee werk je?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Een kijkje in het werk van onze servicemonteurs. Van veegmachines en winterdienstvoertuigen 
            tot onderhoud en reparaties - afwisselend en technisch uitdagend.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                {image.isImport ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              
              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-slate-50 px-8 py-6 rounded-xl">
            <p className="text-slate-700 mb-2">
              <span className="text-[#E30613]">Werk met topkwaliteit machines</span>
            </p>
            <p className="text-slate-600">
              Van straatreiniging tot winterdienst - je werkt met de meest geavanceerde apparatuur in de branche
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
