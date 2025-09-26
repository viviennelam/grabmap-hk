# GrabMap HK 🎮

A web app for finding Hong Kong claw machines and sharing wins!

## Features

- 🎯 Browse 18 demo claw machines across Hong Kong
- 🔍 Search and filter by prize categories (Kirby, Labubu, Sanrio, Pokemon, Disney)
- 🏆 View and share wins with photos and comments
- 📱 Mobile-first responsive design
- 🌈 Playful arcade-themed UI

## Tech Stack

- **Frontend**: React + Vite
- **Database**: Supabase (ready for integration)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (optional for demo):
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: http://localhost:5173

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MachineCard.jsx     # Machine display card
│   ├── SearchBar.jsx       # Search and filter
│   ├── WinsList.jsx        # Display user wins
│   └── ShareWinForm.jsx    # Form to share wins
├── pages/              # Main app pages
│   ├── Home.jsx           # Landing page with machine grid
│   └── MachineDetailPage.jsx # Individual machine details
├── data/               # Demo data
│   └── demoMachines.js    # 18 sample machines
├── lib/                # Utilities
│   └── supabase.js        # Database client setup
└── index.css           # Tailwind CSS imports
```

## Current Status

✅ **Phase 0 & 1**: Project setup with demo data  
✅ **Phase 2**: Core components with client-side filtering  
🔄 **Phase 3**: Supabase integration (ready for setup)  
🔄 **Phase 4**: Enhanced styling and animations  

## Demo Data

The app includes 18 sample claw machines with:
- English and Traditional Chinese names
- Various Hong Kong districts
- Popular prize categories
- Fairness ratings
- Placeholder images

## Supabase Setup

1. **Create your Supabase tables**:

   **machines table**:
   ```sql
   CREATE TABLE machines (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name_en TEXT NOT NULL,
     name_zh TEXT NOT NULL,
     district TEXT NOT NULL,
     address TEXT NOT NULL,
     prizes_array TEXT[] NOT NULL,
     photo_url TEXT,
     fairness_rating DECIMAL(2,1) DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **user_wins table**:
   ```sql
   CREATE TABLE user_wins (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     machine_id UUID REFERENCES machines(id) ON DELETE CASCADE,
     user_name TEXT,
     prize TEXT NOT NULL,
     photo_url TEXT,
     comment TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **Load demo data**:
   - Visit `/admin` in your app
   - Click "Initialize Everything" to set up storage and load 18 demo machines

3. **Configure storage** (optional, done automatically):
   - Storage bucket `win-photos` for user-uploaded photos
   - Public access enabled for photo viewing

## Database Integration Status

✅ **Real Supabase Integration**:
- Home page fetches machines from your database
- Machine details load from Supabase with fallback to demo data
- Win submission saves to `user_wins` table
- Photo upload to Supabase storage
- Error handling with demo data fallback

## Contributing

This is a hackathon MVP focused on core functionality. Future enhancements welcome!

---

Built with ❤️ for Hong Kong claw machine enthusiasts!