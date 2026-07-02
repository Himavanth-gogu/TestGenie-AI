import {
  LayoutDashboard,
  BarChart3,
  Camera,
  FileText,
  History,
  Settings,
  Activity,
  Server,
  HardDrive
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/"
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics"
    },
    {
      title: "Screenshots",
      icon: <Camera size={20} />,
      path: "/screenshots"
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      path: "/reports"
    },
    {
      title: "History",
      icon: <History size={20} />,
      path: "/history"
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings"
    }
  ];

  return (
    <div className="
      w-64
      min-h-screen
      bg-[#111827]
      border-r border-slate-700/50
      px-6
      py-8
      flex
      flex-col
      justify-between
    ">
      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="mb-12">
          <div className="
            flex
            items-center
            gap-3
          ">
            <div className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-cyan-500
              flex
              items-center
              justify-center
              text-2xl
            ">
              🚀
            </div>

            <div>
              <h1 className="
                text-2xl
                font-bold
                text-white
              ">
                TestGenie AI
              </h1>

              <p className="
                text-sm
                text-gray-400
              ">
                QA Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          {
            menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-4
                  px-4
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    location.pathname === item.path
                      ? `
                        bg-blue-600
                        text-white
                        shadow-lg
                        shadow-blue-500/20
                      `
                      : `
                        text-gray-400
                        hover:bg-slate-800
                        hover:text-white
                      `
                  }
                `}
              >
                {item.icon}

                <span className="
                  font-medium
                ">
                  {item.title}
                </span>
              </Link>
            ))
          }
        </div>
      </div>

      {/* Bottom Section */}
      <div>

        {/* System Status */}
        <div className="
          bg-slate-800/60
          rounded-3xl
          border border-slate-700/50
          p-5
        ">
          <div className="
            flex
            items-center
            gap-2
            mb-5
          ">
            <Activity
              size={18}
              className="text-green-400"
            />

            <h3 className="
              font-semibold
            ">
              System Status
            </h3>
          </div>

          <StatusRow
            icon={<Server size={16} />}
            label="Backend"
            status="Online"
            color="bg-green-500"
          />

          <StatusRow
            icon={<Activity size={16} />}
            label="Automation"
            status="Ready"
            color="bg-blue-500"
          />

          <StatusRow
            icon={<HardDrive size={16} />}
            label="Storage"
            status="Healthy"
            color="bg-cyan-500"
          />
        </div>

        {/* Health Card */}
        <div className="
          mt-6
          bg-gradient-to-r
          from-blue-500/20
          to-cyan-500/20
          rounded-3xl
          border border-blue-500/20
          p-5
        ">
          <p className="
            text-sm
            text-gray-400
          ">
            Average Health Score
          </p>

          <h2 className="
            text-4xl
            font-bold
            text-blue-400
            mt-2
          ">
            96%
          </h2>

          <p className="
            text-sm
            text-gray-400
            mt-2
          ">
            Excellent Stability
          </p>
        </div>

        {/* Footer */}
        <div className="
          mt-6
          text-center
          text-xs
          text-gray-600
        ">
          TestGenie AI v2.0
        </div>

      </div>
    </div>
  );
}

function StatusRow({
  icon,
  label,
  status,
  color
}) {
  return (
    <div className="
      flex
      justify-between
      items-center
      mb-4
    ">
      <div className="
        flex
        items-center
        gap-3
      ">
        {icon}

        <span className="
          text-gray-300
          text-sm
        ">
          {label}
        </span>
      </div>

      <div className="
        flex
        items-center
        gap-2
      ">
        <div className={`
          w-2
          h-2
          rounded-full
          ${color}
        `} />

        <span className="
          text-xs
          text-gray-400
        ">
          {status}
        </span>
      </div>
    </div>
  );
}