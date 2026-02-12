import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./features/app/App.jsx"
import { store } from "./features/app/store"

import { Provider } from "react-redux"

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
