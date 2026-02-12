# 🚀 Lovable Setup Instructies

## ✅ Alle files zijn klaar!

Je hebt nu **11 bestanden** klaar in: `lovable-showcase/src/`

```
lovable-showcase/src/
├── App.tsx
├── components/
│   ├── Hero.tsx
│   ├── TemplateCard.tsx
│   └── TemplateGallery.tsx
└── templates/
    ├── engineering.ts
    ├── tech.ts
    ├── industrial.ts
    ├── service.ts
    ├── logistics.ts
    ├── premium.ts
    └── index.ts
```

---

## 📋 Stap-voor-Stap in Lovable

### STAP 1: Nieuw Project (30 sec)

1. Ga naar: https://lovable.dev/dashboard/projects
2. Klik **"New Project"**
3. Project naam: **"Landing Page Templates"**
4. Template: **"Blank"** (start from scratch)
5. Klik **"Create Project"**

---

### STAP 2: Maak Folders (1 min)

In Lovable's file explorer (links):

1. Klik op **"src"** folder
2. **Right-click** → **"New Folder"** → Type: `components`
3. **Right-click** → **"New Folder"** → Type: `templates`

Nu heb je:
```
src/
├── components/
└── templates/
```

---

### STAP 3: Kopieer Template Files (3 min)

**In je lokale terminal/Finder:**
```bash
open ~/Projects/landing-page-recruitment/lovable-showcase/src/templates/
```

Dit opent de templates folder met 7 files.

**Voor elk bestand:**

1. **engineering.ts**
   - Open het bestand lokaal
   - Kopieer ALLE inhoud (Cmd+A, Cmd+C)
   - In Lovable: klik op `src/templates` folder
   - Klik **"New File"** → Naam: `engineering.ts`
   - Plak de inhoud (Cmd+V)
   - **Save** (Cmd+S)

2. Herhaal voor:
   - tech.ts
   - industrial.ts
   - service.ts
   - logistics.ts
   - premium.ts
   - index.ts

---

### STAP 4: Kopieer Component Files (3 min)

```bash
open ~/Projects/landing-page-recruitment/lovable-showcase/src/components/
```

**Voor elk bestand:**

1. **Hero.tsx**
   - Open lokaal
   - Kopieer inhoud
   - In Lovable: klik `src/components` folder
   - New File → `Hero.tsx`
   - Plak & Save

2. Herhaal voor:
   - TemplateCard.tsx
   - TemplateGallery.tsx

---

### STAP 5: Update App.tsx (1 min)

```bash
open ~/Projects/landing-page-recruitment/lovable-showcase/src/App.tsx
```

1. Open je lokale `App.tsx`
2. Kopieer ALLE inhoud
3. In Lovable: klik op bestaande `src/App.tsx`
4. **Selecteer alles** (Cmd+A)
5. **Plak** nieuwe code (Cmd+V)
6. **Save** (Cmd+S)

---

### STAP 6: Preview & Deploy (1 min)

1. Klik **"Preview"** (rechtsboven in Lovable)
2. Check of alles werkt:
   - Hero section zichtbaar?
   - 6 template cards zichtbaar?
   - Hover effects werken?

3. Als alles goed is:
   - Klik **"Deploy"**
   - Wacht 30 seconden
   - Krijg je live URL: `your-project.lovable.app`

**🎉 KLAAR!**

---

## 🐛 Als er errors zijn:

### Error: "Cannot find module '../templates'"
- Check of alle 7 template files in `src/templates/` staan
- Check of `index.ts` er is

### Error: "Cannot find module './Hero'"
- Check of alle 3 component files in `src/components/` staan
- Check spelling: `Hero.tsx`, `TemplateCard.tsx`, `TemplateGallery.tsx`

### Error: "Unexpected token"
- Je hebt niet alle code gekopieerd
- Open het lokale bestand opnieuw en kopieer **ALLES**

---

## ⚡ Snelle Checklist

- [ ] Project aangemaakt in Lovable
- [ ] `src/components/` folder gemaakt
- [ ] `src/templates/` folder gemaakt
- [ ] 7 template bestanden gekopieerd
- [ ] 3 component bestanden gekopieerd
- [ ] App.tsx vervangen
- [ ] Preview checked
- [ ] Deploy geklikt
- [ ] Live URL werkt

---

## 📸 Screenshots Toevoegen (Later)

Als je screenshots wilt toevoegen:

1. In Lovable: klik **"Assets"** menu
2. Upload je 6 JPG files uit:
   ```
   ~/Projects/landing-page-recruitment/public/thumbnails/
   ```
3. Lovable genereert URLs zoals: `/assets/tech-abc123.jpg`
4. Update de `thumbnailUrl` in elk template bestand

---

**Tijd totaal: ~10 minuten**
**Resultaat: Live showcase site op `yourname.lovable.app`** 🎨✨
