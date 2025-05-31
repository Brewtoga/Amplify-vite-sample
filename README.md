# 🍀 Judy's Pub - Virginia Beach

A React/TypeScript application for Judy's Pub featuring employee management, book club quiz, and menu display.

## 🏗️ Project Structure

```
src/
├── App.tsx                 # Main app with routing/navigation
├── App.css                 # Judy's Pub Celtic theme (login, menu, roles)
├── DiveBarBookClub.tsx     # Book club quiz component
├── DiveBarBookClub.css     # Book club brown/gold theme
├── Employee.tsx            # Employee dashboard component
└── Employee.css            # Employee Celtic green theme
```

## 🏛️ Pub Information

**Address:** 315 N Great Neck Rd, Virginia Beach, VA 23454  
**Phone:** (757) 340-9611  
**Theme:** Celtic (Green/Black/White)  
**Hours:** 9 AM - 12 AM Daily

## 👥 Staff Roster

### Spanish Bartenders (Sassy Names)
- Esperanza "Espi" Rodriguez
- Catalina "Cat" Fuego
- Isabella "Izzy" Caliente
- Valentina "Val" Picante
- Camila "Cami" Soleado

### French Cooks
- Pierre Dubois
- Jacques Moreau
- Antoine Lefebvre
- Émile Rousseau
- Claude Beaumont

## 🍽️ Menu Items

| Item | Description | Price |
|------|-------------|-------|
| Wahoo Tomato Basil Butter Sauce | Grilled wahoo with tomato-basil butter sauce, served over penne with garlic bread | $15 |
| Cajun Wahoo | Blackened wahoo with fettuccine, squash, zucchini, and onion, served with garlic bread | $16 |
| Bourbon Pork Loin | Grilled pork loin with Cajun seasoning, served with mashed potatoes and corn | $12 |
| Prime Rib Pot Roast | Prime rib with potatoes, carrots, and green beans in au jus, served with garlic bread | $18 |
| Steak Bites with Horseradish Sauce | Steak bites with horseradish sauce on the side | $8 |

## 🔐 User Roles & Access

### Customer (Default)
- ✅ View menu
- ✅ Take book club quiz
- ✅ Optional employee sign-in

### Employee
- ✅ View weekly schedule (current + next week)
- ✅ Submit PTO requests
- ✅ Request shift coverage
- ✅ All customer features

### Manager
- ✅ All employee features
- ✅ Manager portal (under construction)

### Owner
- ✅ All manager features
- ✅ Owner dashboard (under construction)

## 📚 Book Club Features

### Current Book: Iron Flame
- 20 questions divided into 4 sets of 5
- Must get 3/5 correct to advance to next set
- Celebration screen with fireworks on completion
- Martini glass theme (🍸)

### Next Book: Onyx Storm
- Demo questions available
- Countdown timer to release

## 👥 Employee Dashboard Features

### Schedule Management
- **Weekly View:** Current week + next week
- **Shift Times:** 
  - Morning: 9:00 AM - 5:00 PM
  - Evening: 5:00 PM - 12:00 AM
- **Schedule Release:** Every Friday

### PTO System
- Submit date range requests
- Reason required
- Status tracking (Pending/Approved/Denied)

### Shift Coverage
- Request coverage for specific shifts
- Reason required
- Status tracking (Open/Covered)

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# AWS Amplify Sandbox (if using)
npx ampx sandbox
```

## 📱 Git Workflow

```bash
# Standard workflow
git add .
git commit -m "Descriptive message"
git push origin main

# AWS Amplify auto-deploys on push
```

## 🎨 Theme Colors

### Celtic Theme (Main App)
- **Primary Green:** #4caf50
- **Accent Green:** #66bb6a
- **Background:** Linear gradient (#1a4a32, #2d5a3d)
- **Text:** #f4f1e8

### Book Club Theme
- **Primary Gold:** #d4af37
- **Accent Gold:** #ffd700
- **Background:** Linear gradient (#2c1810, #8b4513)
- **Text:** #f4f1e8

## 🔧 Tech Stack

- **Frontend:** React 18, TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 (component-scoped)
- **Deployment:** AWS Amplify
- **State Management:** React useState hooks
- **Responsive:** Mobile-first design

## 📋 Component Features

### App.tsx
- Role-based navigation
- Optional sign-in system
- Menu display
- User authentication

### Employee.tsx
- Schedule grid view
- Modal forms for requests
- Status tracking
- Mobile responsive tabs

### DiveBarBookClub.tsx
- Progressive quiz system
- Timer functionality
- Celebration animations
- Book transition system

## 🚧 Under Construction

- Manager Portal
- Owner Dashboard
- Leaderboard
- Discussion Board
- Swag Shop
- Notes Page

## 📞 Support

For development questions or feature requests, reference this README and project structure.

---

**Built with ❤️ for Judy's Pub Virginia Beach** 🍀🍺