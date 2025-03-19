# TalentIQ 360 - AI-Powered Career Development Platform

TalentIQ 360 is an innovative AI-powered career development platform that helps professionals analyze their skills, discover opportunities, and get personalized recommendations for career growth.

![TalentIQ 360](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200&h=400)

## 🚀 Launch Phase Status

TalentIQ 360 is currently in its beta launch phase, accepting waitlist registrations for early access. The platform offers:

- AI-powered skill analysis and recommendations
- Real-time job market insights
- Personalized career path planning
- Smart project recommendations
- Industry trend analysis

Visit [talentiq360.com](https://talentiq360.com) to join the waitlist!

## 🛠 Tech Stack

- **Frontend:**
  - React 18.3.1
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion (animations)
  - Lucide React (icons)
  - React Router DOM
  - React Hook Form
  - Recharts (data visualization)
  - Zustand (state management)

- **Backend & Database:**
  - Supabase (Backend as a Service)
  - PostgreSQL (via Supabase)
  - Row Level Security (RLS)

- **Authentication:**
  - Supabase Auth

- **Deployment:**
  - GitHub Pages (frontend)
  - Supabase (backend/database)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd talentiq-360
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     VITE_GOOGLE_SCRIPT_URL=your_google_script_url
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   ```

## 📦 Deployment

### GitHub Pages Deployment

The project is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch.

#### Initial Setup

1. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Set source to "GitHub Actions"

2. Configure GitHub Secrets:
   - Go to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_GOOGLE_SCRIPT_URL`

3. Push to main branch:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

#### Manual Deployment

You can also deploy manually:
```bash
npm run deploy
```

### Redeployment

For any future changes:

1. Push your changes to the main branch:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

2. GitHub Actions will automatically build and deploy

## 🔄 Database Migrations

The project uses Supabase migrations for database schema management. Migrations are located in `supabase/migrations/`.

To apply migrations:

1. Install Supabase CLI
2. Link your project
3. Run migrations:
   ```bash
   supabase migration up
   ```

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 📚 Documentation

Additional documentation:

- [API Documentation](docs/api.md)
- [Component Documentation](docs/components.md)
- [Database Schema](docs/schema.md)

## 🔒 Security

- All database access is protected by Row Level Security (RLS)
- Authentication is handled by Supabase Auth
- Environment variables are properly secured
- Regular security audits are performed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@talentiq360.com or join our [Discord community](https://discord.gg/talentiq360).

## 🔄 Future Updates

When making future updates:

1. Update dependencies:
   ```bash
   npm update
   ```

2. Run tests:
   ```bash
   npm run test
   ```

3. Build and verify locally:
   ```bash
   npm run build
   npm run preview
   ```

4. Deploy:
   ```bash
   git push origin main
   ```

Remember to:
- Update documentation for any new features
- Add migration files for database changes
- Test thoroughly before deployment
- Update environment variables if needed