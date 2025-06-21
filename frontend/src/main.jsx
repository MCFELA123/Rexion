import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import './styles/components.css'
import './styles/fonts.fetch.css'
import './styles/colors.css'
import './styles/media-queries.min.css'
import App from './App.jsx'
import Background from './components/Background.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Background/>
    <App />
  </BrowserRouter>
  </StrictMode>,
)
