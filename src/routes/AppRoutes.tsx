// React and react realted imports
import React from 'react'

// Third party Libraraies
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Custom Component
import Home from '@/pages/Home/index.tsx';
import ViewDetailsPage from '@/pages/view-details-page/index.tsx';
import YourCarts from '@/pages/Your-carts/index.tsx';
import BuyNow from '@/pages/BuyNow/index.tsx';
import BuySuccesfull from '@/pages/BuySuccesfull/index.tsx';

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-details" element={<ViewDetailsPage />} />
          <Route path="/your-carts" element={<YourCarts />} />
          <Route path="/buy-now" element={<BuyNow />} />
          <Route path="/buy-successful" element={<BuySuccesfull />} />
        </Routes>
      </BrowserRouter>
  )
}

export default AppRoutes