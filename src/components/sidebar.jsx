import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
          />
        </svg>
      </>
    ),
  },
  {
    name: "Departments",
    href: "/departments",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </>
    ),
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </>
    ),
  },
  {
    name: "Logout",
    href: "/logout",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </>
    ),
  },
];
const Sidebar = () => {
  const [dropdown, setdropdown] = useState(false);
  return (
    <div className="sidebar-content">
      <button className="bg-purple-100 p-2 flex items-center rounded-md text-left">
        <div className="font-semibold text-gray-600">
          <p className="leading-5 text-sm">Create</p>
          <p className="leading-5 text-sm">New Task</p>
        </div>
        <p className="text-white bg-purple rounded-full p-1 ml-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </p>
      </button>

      <div className="links">
        {navigation.map((item, i) => (
          <div
            key={i}
            className="link-item"
            data-aos="fade-right"
            data-aos-delay={i * 100}
          >
            <NavLink
              to={item.href}
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-purple-800 font-bold hover:text-purple-800"
                  : "text-gray-500 hover:text-purple-800 font-bold"
              }
            >
              <div className="flex items-center ">
                <div className="pr-6 ">{item.icon}</div>
                {item.name}
              </div>
            </NavLink>
          </div>
        ))}
        <div className="link-item" data-aos="fade-right" data-aos-delay={navigation.length*100}>
          <div
            // to={"#"}
            // className={({ isActive, isPending }) =>
            //   isActive
            //     ? "text-purple-800 font-bold hover:text-purple-800"
            //     : "text-gray-500 hover:text-purple-800 font-bold"
            // }
            onClick={()=> setdropdown(!dropdown)}
            className="text-gray-500 hover:text-purple-800 font-bold cursor-pointer"
          >
            <div className="flex items-center ">
              <div className="pr-6 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              Dropdown
              <div className="pl-6 ">
                {!dropdown ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
            </div>

          </div>
          {dropdown? <div className="dropdown ">
          {navigation.map((item, i) => (
          <div
            key={i}
            className="link-item " 
            data-aos="fade-right"
            data-aos-delay={i * 100}
          >
            <NavLink
              to={item.href}
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-purple-800 font-bold hover:text-purple-800"
                  : "text-gray-500 hover:text-purple-800 font-bold"
              }
            >
              <div className="flex items-center ">
                <div className="pr-6 ">{item.icon}</div>
                {item.name}
              </div>
            </NavLink>
          </div>
        ))}
          </div>: null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
