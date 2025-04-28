import React, { useState } from "react";
import MessageContainer from "../components/MessageContainer.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setSelectedUser(null);
    setIsSidebarVisible(true);
  };
  return (
    <div className="flex justify-between min-w-full md:min-w-[550px] md:max-w-[65%] px-2 h-[95%] md:h-full rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div
        className={`w-full py-2 md:flex ${isSidebarVisible ? "" : "hidden"}`}
      >
        <Sidebar onSelectUser={handleUserSelect} />
      </div>
      <div
        className={`divider divieder-horizontal px-3 md:flex ${
          isSidebarVisible ? "" : "hidden"
        } ${selectedUser ? "block" : "hidden"}`}
      ></div>
      <div
        className={`flex-auto bg-gray-200 ${
          selectedUser ? "" : "hidden md:flex"
        }`}
      >
        <MessageContainer onBackUser={handleShowSidebar} />
      </div>
    </div>
  );
}

export default Home;
