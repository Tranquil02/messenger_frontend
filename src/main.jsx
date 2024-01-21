import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from "react"

export const server="https://messeger-app-xbwl.onrender.com/api/v1";
// export const server = "http://localhost:4000/api/v1";
export const Context = createContext({ isAuthenticated: false, online: true });

const OfflineError = ({ online }) => {
  if (online) {
    return null;
  }

  return (
    <div className="offline-error">
      <p>You are currently offline. Please check your internet connection.</p>
    </div>
  );
}

const AppWrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
  }, []);

  return (
    <Context.Provider value={{ isAuthenticated, setisAuthenticated, loading, setLoading, user, setUser, online }}>
      <OfflineError online={online} />
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)