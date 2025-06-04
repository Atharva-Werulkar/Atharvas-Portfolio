# Modern Portfolio Website 🚀

![Tech Stack](https://skillicons.dev/icons?i=react,ts,tailwind,vite)

A sleek, responsive portfolio website built with modern web technologies. Features a clean design, smooth animations, and an excellent user experience.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and minimalist design with subtle animations
- 📱 **Fully Responsive** - Looks great on all devices
- 🌙 **Dark Mode** - Elegant dark theme by default
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times
- 🔄 **Dynamic Projects** - Automatically pulls and displays GitHub repositories
- 💼 **Professional Sections**:
  - Hero Introduction
  - About Me
  - Skills & Technologies
  - Project Showcase
  - Experience Timeline
  - Contact Form

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**
   ```powershell
   git clone <repository-url>
   cd react-site-design
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Start the development server**
   ```powershell
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Hero.tsx       # Hero section
│   ├── About.tsx      # About section
│   ├── Skills.tsx     # Skills showcase
│   ├── Projects.tsx   # Projects display
│   ├── Experience.tsx # Experience timeline
│   └── Contact.tsx    # Contact form
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
└── pages/            # Page components
```

## ✨ Customization

1. **Personal Information**: Update your personal details in `src/components/Hero.tsx` and `src/components/About.tsx`

2. **Projects**: Your GitHub projects are automatically fetched. Configure the username in `src/components/Projects.tsx`

3. **Skills**: Modify the skills list in `src/components/Skills.tsx`

4. **Experience**: Update your work experience in `src/components/Experience.tsx`

5. **Styling**: Customize colors and themes in `tailwind.config.ts`

## 📧 Contact Form

The contact form is fully functional and integrated with a serverless API. To configure:

1. Set up your environment variables
2. Update the email configuration in `api/send-email.ts`

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Deploy!

## 📄 License

This project is licensed under the MIT License. Feel free to use it for your personal portfolio!

---

<p align="center">
Made with ❤️ using React and TypeScript
</p>
