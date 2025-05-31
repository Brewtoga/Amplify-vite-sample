import React, { useState } from 'react';
import DiveBarBookClub from './DiveBarBookClub';
import EmployeeDashboard from './Employee';
import './App.css';

interface User {
  userName: string;
  role: 'owner' | 'employee' | 'manager' | 'customer';
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'signin' | 'bookclub' | 'owner' | 'manager' | 'employee'>('home');
  const [user, setUser] = useState<User | null>({ userName: 'Guest', role: 'customer' });

  const menuItems: MenuItem[] = [
    {
      name: "Wahoo Tomato Basil Butter Sauce",
      description: "Grilled wahoo with a tomato-basil butter sauce, served over penne with garlic bread.",
      price: 15
    },
    {
      name: "Cajun Wahoo",
      description: "Blackened wahoo with fettuccine, squash, zucchini, and onion, served with garlic bread.",
      price: 16
    },
    {
      name: "Bourbon Pork Loin",
      description: "Grilled pork loin with Cajun seasoning, served with mashed potatoes and corn.",
      price: 12
    },
    {
      name: "Prime Rib Pot Roast",
      description: "Prime rib with potatoes, carrots, and green beans in au jus, served with garlic bread.",
      price: 18
    },
    {
      name: "Steak Bites with Horseradish Sauce",
      description: "Steak bites with horseradish sauce on the side.",
      price: 8
    }
  ];

  const handleSignIn = (userName: string, role: 'owner' | 'employee' | 'manager' | 'customer') => {
    setUser({ userName, role });
    setCurrentView('home');
  };

  const handleSignOut = () => {
    setUser({ userName: 'Guest', role: 'customer' });
    setCurrentView('home');
  };

  const renderRoleButtons = () => {
    if (!user || user.role === 'customer') return null;

    const buttons = [];
    
    if (user.role === 'owner') {
      buttons.push(
        <button key="owner" className="nav-btn owner-btn" onClick={() => setCurrentView('owner')}>
          🏛️ Owner Dashboard
        </button>
      );
    }
    
    if (user.role === 'owner' || user.role === 'manager') {
      buttons.push(
        <button key="manager" className="nav-btn manager-btn" onClick={() => setCurrentView('manager')}>
          📊 Manager Portal
        </button>
      );
    }
    
    if (user.role === 'owner' || user.role === 'manager' || user.role === 'employee') {
      buttons.push(
        <button key="employee" className="nav-btn employee-btn" onClick={() => setCurrentView('employee')}>
          👥 Employee Area
        </button>
      );
    }

    return buttons;
  };

  const renderSignInButton = () => {
    if (user?.role === 'customer' && user?.userName === 'Guest') {
      return (
        <button className="nav-btn signin-btn" onClick={() => setCurrentView('signin')}>
          🔑 Employee Sign In
        </button>
      );
    }
    return null;
  };

  if (currentView === 'signin') {
    return (
      <div className="app-container">
        <div className="signin-container">
          <div className="pub-header">
            <div className="celtic-symbol">☘️</div>
            <h1>JUDY'S PUB</h1>
            <div className="celtic-symbol">🍀</div>
          </div>
          
          <div className="location-info">
            <p>📍 315 N Great Neck Rd, Virginia Beach, VA 23454</p>
            <p>📞 (757) 340-9611</p>
          </div>

          <div className="signin-form">
            <h2>Welcome to Judy's Pub</h2>
            <p>Please sign in to continue</p>
            
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select id="role">
                <option value="">Select your role</option>
                <option value="customer">Customer</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Coming soon..."
                disabled
                className="disabled-input"
              />
              <small className="note">Password authentication coming in future update</small>
            </div>
            
            <button 
              className="signin-btn"
              onClick={() => {
                const username = (document.getElementById('username') as HTMLInputElement).value;
                const role = (document.getElementById('role') as HTMLSelectElement).value as 'owner' | 'employee' | 'manager' | 'customer';
                
                if (username && role) {
                  handleSignIn(username, role);
                } else {
                  alert('Please enter username and select a role');
                }
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'bookclub') {
    return <DiveBarBookClub onBackToMenu={() => setCurrentView('home')} />;
  }

  if (currentView === 'employee') {
    return <EmployeeDashboard userName={user?.userName || ''} onBackToMenu={() => setCurrentView('home')} />;
  }

  if (currentView === 'owner') {
    return (
      <div className="app-container">
        <nav className="top-nav">
          <button className="back-btn" onClick={() => setCurrentView('home')}>← Back to Home</button>
          <span className="user-info">Welcome, {user?.userName} (Owner)</span>
          <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
        </nav>
        <div className="page-content">
          <h1>🏛️ Owner Dashboard</h1>
          <div className="under-construction">
            <h2>Under Construction</h2>
            <p>Owner portal features coming soon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'manager') {
    return (
      <div className="app-container">
        <nav className="top-nav">
          <button className="back-btn" onClick={() => setCurrentView('home')}>← Back to Home</button>
          <span className="user-info">Welcome, {user?.userName} (Manager)</span>
          <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
        </nav>
        <div className="page-content">
          <h1>📊 Manager Portal</h1>
          <div className="under-construction">
            <h2>Under Construction</h2>
            <p>Manager portal features coming soon...</p>
          </div>
        </div>
      </div>
    );
  }

  // Home view
  return (
    <div className="app-container">
      <nav className="top-nav">
        <span className="user-info">
          {user?.userName === 'Guest' ? 'Welcome to Judy\'s Pub!' : `Welcome, ${user?.userName} (${user?.role})`}
        </span>
        {user?.userName !== 'Guest' && (
          <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
        )}
      </nav>

      <div className="main-content">
        <header className="pub-header">
          <div className="celtic-symbol">☘️</div>
          <h1>JUDY'S PUB</h1>
          <div className="celtic-symbol">🍀</div>
        </header>

        <div className="location-info">
          <p>📍 315 N Great Neck Rd, Virginia Beach, VA 23454</p>
          <p>📞 (757) 340-9611</p>
        </div>

        <div className="navigation-section">
          <h2>What would you like to do?</h2>
          <div className="nav-buttons">
            <button className="nav-btn bookclub-btn" onClick={() => setCurrentView('bookclub')}>
              📚 Take Book Club Quiz
            </button>
            {renderSignInButton()}
            {renderRoleButtons()}
          </div>
        </div>

        <div className="menu-section">
          <h2>🍽️ Today's Menu</h2>
          <div className="menu-subtitle">Dive Bar Favorites - Virginia Beach</div>
          
          <div className="menu-category">
            <h3>Main Dishes</h3>
            <div className="menu-items">
              {menuItems.slice(0, 4).map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="item-header">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-category">
            <h3>Bites</h3>
            <div className="menu-items">
              {menuItems.slice(4).map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="item-header">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;