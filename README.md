# Dunamis Greenhouse 25 - Staff Check-In System 🇮🇹

A modern, mobile-first staff check-in system built for the Dunamis Greenhouse 25 Christian missionary school event in Sicily, Italy.

## ✨ Features

- **Mobile-First Design** - Optimized for tablets and smartphones
- **Italian Flag Theme** - Beautiful green, white, and red color scheme
- **Real-Time Search** - Search by name, email, country, church, area, or room
- **Two-Tab System** - Pending and Checked-In staff management
- **Staff Details** - Complete information display with check-in/uncheck functionality
- **Confirmation Modals** - Prevent accidental check-ins and mistakes
- **Local Storage** - Persistent data without server requirements
- **Static Export** - Ready for deployment on Vercel, Netlify, or any static host

## 🚀 Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React 18** with modern hooks
- **CSV Data Integration** for staff information

## 📱 Screenshots

The system features:
- Beautiful Italian flag-themed navigation
- Touch-friendly staff cards
- Detailed staff information views
- Confirmation dialogs for all actions
- Responsive design for all devices

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/guilhermelcassis/gh25-staff-checkin.git
   cd gh25-staff-checkin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy on Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js settings

2. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Deploy on Netlify

1. **Build the static export:**
   ```bash
   npm run build
   ```

2. **Deploy the `out` folder to Netlify**

## 📊 Staff Data Structure

The system works with CSV data containing:
- NAME
- E-MAIL
- CELLPHONE
- IGREJA (Church)
- COUNTRY
- NATIONALITY
- AREA
- KIT CAMA
- QUARTO (Room)
- HEALTHY FORM

## 🎨 Design Features

- **Italian Flag Colors** - Green (#228B22), White, Red (#DC143C)
- **Modern UI** - Glass-morphism effects and smooth animations
- **Accessibility** - Touch-friendly buttons and clear typography
- **Professional Branding** - Dunamis Greenhouse 25 branding throughout

## 🔧 Development

- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Start:** `npm start`
- **Lint:** `npm run lint`

## 📄 License

This project is created for Dunamis Greenhouse 25 Christian missionary school event in Sicily, Italy.

## 🤝 Contributing

This is a custom project for a specific event. For questions or modifications, please contact the development team.

---

**Built with ❤️ for Dunamis Greenhouse 25 - Sicily, Italy**
