# MedKey Interactive Demo

A world-class interactive demo page for MedKey.tech showcasing the patient journey through 5 key steps.

## Features

- **Interactive Step-by-Step Demo**: Navigate through 5 key steps of the MedKey patient journey
- **Smooth Animations**: Powered by Framer Motion for professional, 60fps animations
- **Modern Design**: Tech startup aesthetic with vibrant gradients and modern UI
- **Responsive**: Works beautifully on mobile, tablet, and desktop

## Tech Stack

- React 18
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The demo will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Steps

1. **Identity Login** - Patient logs in using identity verification (OAuth, MyChart login, email/phone verification)
2. **FHIR Connection** - MedKey connects to major FHIR endpoints like Epic, Cerner, Allscripts, Azure API for FHIR
3. **Fetch & Unify Records** - Complete medical history is fetched: allergies, medications, diagnoses, lab results, imaging, and more
4. **Patient Views History** - MedKey organizes everything into a timeline, summary dashboard, and easy-to-understand categories
5. **Share With Doctor** - During a visit, patient taps "Share My Records" → signs consent → doctor instantly sees everything

## Project Structure

```
src/
  components/
    DemoContainer.tsx      # Main demo orchestrator
    steps/
      Step1Identity.tsx    # Identity login step
      Step2FHIR.tsx        # FHIR connection step
      Step3Fetch.tsx       # Fetch records step
      Step4View.tsx        # View history step
      Step5Share.tsx       # Share with doctor step
  styles/
    index.css             # Global styles and Tailwind imports
  App.tsx                 # Main app component
  main.tsx                # Entry point
```

## License

MIT

