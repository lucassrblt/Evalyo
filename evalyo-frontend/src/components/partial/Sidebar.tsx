import { LogOut, Wallet } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { House, Mails, CalendarCheck, Brain, Folders } from "lucide-react";
import clsx from "clsx";
import Avatar from "../../assets/images/avatar.svg";
import { useState } from "react";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const views = [
    { name: "Dashboard", path: "/dashboard", icon: House },
    { name: "Quizz", path: "/quizz", icon: Brain },
    { name: "Jobs", path: "/jobs", icon: Folders },
    { name: "Inbox", path: "/inbox", icon: Mails },
    { name: "Todo", path: "/todo", icon: CalendarCheck },
  ];

  return (
    <div className="h-full w-56 flex flex-col bg-white py-6 px-8 justify-between fixed">
      <div className="flex flex-col gap-4">
        <div className="w-full h-20 border-b border-slate-200"></div>
        <div className="flex flex-col gap-2">
          {views.map((view) => (
            <div
              key={view.name}
              className={clsx(
                "flex gap-3 hover:bg-purple-100/50 cursor-pointer rounded-md py-2 px-2.5 w-full",
                { "bg-purple-100/50": location.pathname.includes(view.path) }
              )}
              onClick={() => navigate(view.path)}
            >
              <view.icon
                size={20}
                className={clsx("stroke-gray-700", {
                  "stroke-purple-800": location.pathname.includes(view.path),
                })}
              />
              <p
                className={clsx(
                  "flex items-center font-poppins font-medium text-sm text-gray-700 cursor-pointer",
                  { "text-purple-800": location.pathname.includes(view.path) }
                )}
              >
                {view.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <User />
    </div>
  );
};

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/connect/login");
  };
  return (
    <div
      className="flex gap-3 hover:bg-gray-100 cursor-pointer rounded-md py-2 px-2.5 w-full"
      onClick={handleLogout}
    >
      <LogOut size={20} />
      <p className="flex items-center font-poppins font-medium text-sm text-slate-900 cursor-pointer">
        Déconnexion
      </p>
    </div>
  );
};

const User = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full h-fit border-t border-slate-200 justify-center items-center py-3.5 max-w-full relative">
      <div
        className="flex py-1 px-2 items-center gap-2  shadow-xs border-[1px] border-gray-200 transition-all cursor-pointer rounded-2xl hover:scale-105 z-10 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 rounded-lg">
          <img className="w-full h-full" src={Avatar} alt="user" />
        </div>
        <div className="flex flex-col">
          <p className="font-poppins font-semibold text-sm">{user?.email}</p>
          <p className="font-poppins font-medium text-xs">
            {user?.token + "token"}
          </p>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col shadow-md bg-white gap-2 rounded-lg py-1.5 px-2 absolute opacity-0 transition-all duration-400 top-[-50%] invisible",
          { "opacity-100 translate-x-[120%] visible": isOpen }
        )}
      >
        <Plan />
        <Logout />
      </div>
    </div>
  );
};

const Plan = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-3 hover:bg-gray-100 cursor-pointer rounded-md py-2 px-2.5 w-full"
      onClick={() => navigate("/dashboard/plan")}
    >
      <Wallet />
      <p className="flex items-center font-poppins font-medium text-sm text-slate-900 cursor-pointer">
        Gérer l'abonnement
      </p>
    </div>
  );
};
