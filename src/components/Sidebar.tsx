import React from "react";

const Sidebar = () => {
  return (
    <div
      id="default-sidebar"
      className="fixed  z-40 w-[200px] h-screen transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-r from-[#41295a] to-[#2f0743]">
        <p className="text-center text-3xl text-white font-bold mb-3">
          BroCoder
        </p>
        <ul className="space-y-2 font-medium">
          <li>
            <div className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group">
              <svg
                className="w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </div>
          </li>
          <li>
            <div className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group">
              <svg
                className="w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
