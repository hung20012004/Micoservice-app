import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

// Error Pages
import { Unauthorized, PageIsNotFound } from "./Collection/ErrorCollection";

// All Pages
import {
  SignIn,
  AdminOrderManager,
  AdminProductManager
} from "./Collection/PageCollection";

import AdminDashboard from "./Pages/AdminDashboard";

import {
  AuthProvider,
  RequireAuth,
  User,
  AdminNavbar,
  Sidebar,
} from "./Collection/OtherCollection";

const AppContent = () => {
  const { login, refreshToken, isLoading } = useAuth();
  const isLoggedIn = login && refreshToken;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen">
        <AdminNavbar />
        <main className="bg-gray-50 min-h-screen">
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/me" element={<User />} />
              <Route path="/orders" element={<AdminOrderManager />} />
              <Route path="/fruits" element={<AdminProductManager />} />
              <Route path="/" element={<AdminDashboard />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/page_missing" element={<PageIsNotFound />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;