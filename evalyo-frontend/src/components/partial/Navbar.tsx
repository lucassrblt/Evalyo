import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../assets/images/avatar.svg";

const Navbar = () => {
  return (
    <nav className="bg-white px-5 h-16 flex justify-between items-center border-b-[1px] border-gray-200">
      <Menu size={24} />
      <User />
    </nav>
  );
};

const User = () => {
  const { user } = useAuth();

  return (
    <div className="flex py-1 px-2 items-center gap-2  shadow-xs border-[1px] border-gray-200 rounded-2xl">
      <div className="w-6 h-6 rounded-lg">
        <img className="w-full h-full" src={Avatar} alt="user" />
      </div>
      <div className="flex flex-col">
        <p className="font-poppins font-semibold text-sm">{user.email}</p>
        <p className="font-poppins font-medium text-xs">
          {user.token + "token"}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
