import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const StaffSideBar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    storyForest: true,
    notification: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <NavLink to="/">
          <h1 className="text-xl font-bold text-gray-800">StoryForest</h1>
        </NavLink>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* StoryForest Section */}
        <div className="space-y-1">
          <button
            onClick={() => toggleMenu('storyForest')}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors ${openMenus.storyForest ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <span className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-3 ${openMenus.storyForest ? 'bg-teal-500' : 'bg-gray-300'
                }`}></span>
              <span className="font-medium">StoryForest</span>
            </span>
            {openMenus.storyForest ? (
              <FiChevronDown className="text-gray-500" />
            ) : (
              <FiChevronRight className="text-gray-500" />
            )}
          </button>

          {openMenus.storyForest && (
            <div className="ml-5 space-y-1">
              <NavLink
                to="/staff/story-management"
                className={({ isActive }) => `block px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-teal-100 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Story management
              </NavLink>

              <NavLink
                to="/staff/VIP-management"
                className={({ isActive }) => `block px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-teal-100 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                VIP Registration Management
              </NavLink>
            </div>
          )}
        </div>



      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} StoryForest</p>
      </div>
    </div>
  );
};

export default StaffSideBar;