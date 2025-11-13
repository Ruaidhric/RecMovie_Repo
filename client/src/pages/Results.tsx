import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "@/components/NavBar";
import {Button} from "@/components/ui/button";
import {
  LayoutGrid,
  Table as TableIcon,
  Save,
  RefreshCw,
  Star,
  Clock,
} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import {db} from "@/lib/firebase";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {toast} from "sonner";

// Mock movie data - replace with actual API call
const mockMovies = [
  {
    id: 1,
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    genres: ["Comedy", "Drama"],
    rating: 8.1,
    duration: 99,
    language: "English",
    country: "USA",
    description:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Before Sunrise",
    year: 1995,
    director: "Richard Linklater",
    genres: ["Romance", "Drama"],
    rating: 8.1,
    duration: 101,
    language: "English",
    country: "USA",
    description:
      "A young man and woman meet on a train in Europe and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
  },
];

type ViewMode = "cards" | "table";

interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genres: string[];
  rating: number;
  duration: number;
  language: string;
  country: string;
  description: string;
  poster: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [isSaving, setIsSaving] = useState(false);
  console.log(user?.uid);
  // Get preferences from location state
  const preferences = location.state as {
    mood?: string;
    freeTime?: string;
    language?: string;
    country?: string;
    era?: string;
    popularity?: string;
    genres?: string[];
    movieCount?: string;
  } | null;

  // In production, fetch movies based on preferences
  const movies: Movie[] = mockMovies;

  const handleSaveToHistory = async () => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please log in to save recommendations.",
      });
      return;
    }

    if (!preferences) {
      toast.error("No preferences found", {
        description: "Unable to save recommendations without preferences.",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Create a reference to the user's recommendations collection
      const recommendationsRef = collection(
        db,
        "users",
        user.uid,
        "recommendations"
      );

      // Prepare the data to save
      const recommendationData = {
        userId: user.uid,
        preferences: {
          mood: preferences.mood || "",
          freeTime: preferences.freeTime || "",
          language: preferences.language || "",
          country: preferences.country || "",
          era: preferences.era || "",
          popularity: preferences.popularity || "",
          genres: preferences.genres || [],
          movieCount: preferences.movieCount || "",
        },
        movies: movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          director: movie.director,
          genres: movie.genres,
          rating: movie.rating,
          duration: movie.duration,
          language: movie.language,
          country: movie.country,
          description: movie.description,
          poster: movie.poster,
        })),
        createdAt: serverTimestamp(),
      };

      // Save to Firestore
      await addDoc(recommendationsRef, recommendationData);

      toast.success("Saved to history!", {
        description: "Your recommendations have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving to history:", error);
      toast.error("Failed to save", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while saving recommendations.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGetNewRecommendations = () => {
    navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Personalized Recommendations
          </h1>
          {preferences && (
            <p className="text-gray-600">
              Based on your mood:{" "}
              <span className="font-semibold text-purple-600">
                {preferences.mood}
              </span>{" "}
              • Up to {preferences.freeTime} minutes
            </p>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              onClick={handleSaveToHistory}
              disabled={isSaving}
              className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save to History"}
            </Button>
            <Button
              onClick={handleGetNewRecommendations}
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              disabled={isSaving}
            >
              <RefreshCw className="w-4 h-4" />
              Get New Recommendations
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border">
            <Button
              onClick={() => setViewMode("cards")}
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              className={
                viewMode === "cards"
                  ? "bg-slate-900 text-white cursor-pointer"
                  : "text-gray-600 hover:text-gray-900 cursor-pointer"
              }
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Cards
            </Button>
            <Button
              onClick={() => setViewMode("table")}
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className={
                viewMode === "table"
                  ? "bg-slate-900 text-white cursor-pointer"
                  : "text-gray-600 hover:text-gray-900 cursor-pointer"
              }
            >
              <TableIcon className="w-4 h-4 mr-2" />
              Table
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "cards" ? (
          <CardsView movies={movies} />
        ) : (
          <TableView movies={movies} />
        )}
      </main>
    </div>
  );
};

// Cards View Component
const CardsView = ({movies}: {movies: Movie[]}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {movie.year} • {movie.director}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-600">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{movie.duration} min</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {movie.description}
            </p>

            <div className="text-xs text-gray-500">
              {movie.language} • {movie.country}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Table View Component
const TableView = ({movies}: {movies: Movie[]}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Year
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Director
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Genre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Language
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movies.map((movie) => (
              <tr
                key={movie.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{movie.title}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{movie.year}</td>
                <td className="px-6 py-4 text-gray-600">{movie.director}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{movie.rating}/10</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {movie.duration} min
                </td>
                <td className="px-6 py-4 text-gray-600">{movie.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
