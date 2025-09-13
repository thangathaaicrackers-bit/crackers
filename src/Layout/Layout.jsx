import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/NavBar/Footer/Footer";
import { Outlet } from "react-router-dom";
import StickySidebar from "../components/StickySidebar/SitckySidebar";


export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container py-4">
          <Outlet />
        </div>
      <StickySidebar />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
