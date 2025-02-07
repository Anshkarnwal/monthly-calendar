import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerLicense } from '@syncfusion/ej2-base';


//Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjW39dcXVUQmRYV0xwWg==
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX1edHVWRWhdUkZyVkI=');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
