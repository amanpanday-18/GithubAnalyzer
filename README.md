# GitAnalyze

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-API-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

**GitAnalyze** is a premium, state-of-the-art GitHub profile analyzer. It provides detailed developer metrics, visualizes language distribution, computes developer scores, identifies coding personas, and offers AI-powered profile reviews and fun savage roasts. It also features a fully interactive **Battle Mode** to compare two GitHub profiles in an elegant head-to-head dashboard.

---

## 🌟 Key Features

| Feature | Description |
| :--- | :--- |
| **Standard Dashboard** | Detailed breakdown of a developer's followers, public repositories, total stars, and calculated developer score. |
| **Developer Persona** | Identifies unique developer personalities (e.g. Cowboy Coder, Ninja Coder) based on repository metrics. |
| **AI Roast Mode** | Savage yet lighthearted AI-generated feedback poking fun at your repository stats and commit habits. |
| **AI Review Mode** | Professional, constructive, career-oriented AI review of your public profile with actionable improvements. |
| **Language Visualization** | Interactive Recharts showcasing language usage across all public repositories. |
| **Battle Mode** | Compare two GitHub profiles side-by-side to see who has the higher score, more stars, and overall developer superiority. |

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (using vanilla CSS custom tokens)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **AI Integration**: Custom Gemini API client integration for profile roasting & reviews.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/amanpanday-18/GithubAnalyzer.git
   cd GithubAnalyzer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your AI API key:
   ```env
   VITE_AI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the URL outputted in your console).

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.svg      # Styled green-theme GitAnalyze logo
│   └── icons.svg        # UI icons
├── src/
│   ├── components/      # UI components (BattleMode, ProfileCard, AiFeedback, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions (GitHub API, Gemini AI integration)
│   ├── App.jsx          # Main application wrapper
│   ├── main.jsx         # App entrypoint
│   └── index.css        # Core design system tokens and Tailwind configuration
├── package.json         # Scripts and project dependencies
└── vite.config.js       # Vite configuration
```

---

## 📄 License

This project is licensed under the MIT License.
