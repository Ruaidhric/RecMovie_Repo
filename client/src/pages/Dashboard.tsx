import {useAuth} from "@/context/AuthContext";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useNavigate} from "react-router-dom";
import Navbar from "@/components/NavBar";

const Dashboard = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleQuestionnaire = () => {
    navigate("/questionnaire"); // adjust when that route exists
  };

  const handleGetRecommendations = () => {
    // later: call your AI backend / Firestore save, etc
    navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-slate-50">
      <Navbar />

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Your Recommendation History
            </h1>
            <p className="text-sm text-slate-500">
              View all your saved movie recommendations
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
            onClick={handleQuestionnaire}
          >
            ← Back to Questionnaire
          </Button>
        </div>

        {/* Empty State Card (replace later when you have data) */}
        <Card className="bg-white/80 shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="sr-only">Saved Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-6">
            <p className="text-sm text-slate-500">
              You haven&apos;t saved any recommendations yet.
            </p>
            <Button
              className="w-full max-w-xl bg-slate-900 hover:bg-slate-800 text-white py-5 text-sm font-medium rounded-md"
              onClick={handleGetRecommendations}
            >
              Get Your First Recommendations
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
