import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// BrowserRouter is placed here, at the very root, so that every
// component in the tree (Header, Home, ShowDetail, etc.) has access
// to routing features like <Link>, useParams(), and useNavigate().
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)