import React from "react";
import Sidebar from "../widgets/layouts/Sidebar";
import PrimarySearchAppBar from "../widgets/layouts/NavBar";
import "../App.css";
import { useLocation } from "react-router-dom";

const Dashboard = ({ routes }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  let currentRoute = null;
  routes.forEach((route) => {
    const match = route.pages.find(
      (page) => `/${route.layout}${page.path}` === currentPath
    );
    if (match) {
      currentRoute = match;
    }
  });
  const CurrentElement = currentRoute ? (
    currentRoute.element
  ) : (
    <div>Page Non Trouvée</div>
  );

  return (
    <div className="dashboard">
      {!(currentPath.includes("home") || currentPath.includes("CreateNewMarket")|| currentPath.includes("settings") || currentPath.includes("UpdateMarket")) && (
        <>
          <aside className="sidebar">
            <Sidebar routes={routes} />
          </aside>
        </>
      )}
      <div className={` ${!(currentPath.includes("home") || currentPath.includes("CreateNewMarket")|| currentPath.includes("settings") || currentPath.includes("UpdateMarket")) ? "main-content" : "main-content-without-sidebar"}`}>
        <header className="nav">
          <PrimarySearchAppBar />
        </header>
        <main className={` ${!(currentPath.includes("home") || currentPath.includes("CreateNewMarket")|| currentPath.includes("settings") || currentPath.includes("UpdateMarket")) ? "main" : "main-without-sidebar"}`}>{CurrentElement}</main>
      </div>
    </div>
  );
};
export default Dashboard;
