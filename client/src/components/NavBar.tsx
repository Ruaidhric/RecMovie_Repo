import {useNavigate} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {Button} from "@/components/ui/button";
import {Film} from "lucide-react";

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="w-full border-b bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left side - Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="bg-linear-to-br from-purple-600 to-pink-600 rounded-full p-2">
            <Film className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-lg text-slate-900">RecMovie</span>
        </div>

        {/* Right side - User info and Logout */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-600 hidden sm:inline">
            Hello,{" "}
            <span className="font-medium text-slate-900">
              {user?.displayName || user?.email || "Movie Lover"}
            </span>
          </span>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
