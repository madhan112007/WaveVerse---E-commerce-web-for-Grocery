import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DynamicBanner from './components/DynamicBanner';
import DynamicBackground from './components/DynamicBackground';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Recipes from './pages/Recipes';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import HelpCenter from './pages/HelpCenter';
import TrackOrder from './pages/TrackOrder';
import Returns from './pages/Returns';
import ShippingInfo from './pages/ShippingInfo';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AddRecipe from './pages/admin/AddRecipe';
import ManageRecipes from './pages/admin/ManageRecipes';
import EditRecipe from './pages/admin/EditRecipe';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <DynamicBackground />
            <DynamicBanner />
            <Navbar />
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-product" element={
              <ProtectedRoute adminOnly>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-products" element={
              <ProtectedRoute adminOnly>
                <ManageProducts />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-recipe" element={
              <ProtectedRoute adminOnly>
                <AddRecipe />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-recipes" element={
              <ProtectedRoute adminOnly>
                <ManageRecipes />
              </ProtectedRoute>
            } />
            <Route path="/admin/edit-recipe/:id" element={
              <ProtectedRoute adminOnly>
                <EditRecipe />
              </ProtectedRoute>
            } />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;