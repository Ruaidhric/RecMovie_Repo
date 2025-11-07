import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  PreferencesFormData,
  PreferencesErrors,
  preferencesSchema,
} from "@/schemas/preferencesSchema";
import Navbar from "@/components/NavBar";

type MoodOptionMode = "choose" | "describe";

const genreOptions = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
] as const;

const moodOptions = [
  "Happy",
  "Sad",
  "Excited",
  "Relaxed",
  "Adventurous",
  "Romantic",
  "Scared",
  "Thoughtful",
  "Energetic",
  "Melancholic",
] as const;

export const Preferences: React.FC = () => {
  const navigate = useNavigate();

  const [moodOption, setMoodOption] = useState<MoodOptionMode>("choose");
  const [customMood, setCustomMood] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [freeTime, setFreeTime] = useState<string>("90");
  const [language, setLanguage] = useState<string>("any");
  const [country, setCountry] = useState<string>("any");
  const [era, setEra] = useState<string>("any");
  const [popularity, setPopularity] = useState<string>("any");
  const [genres, setGenres] = useState<string[]>([]);
  const [movieCount, setMovieCount] = useState<string>("5");
  const [errors, setErrors] = useState<PreferencesErrors>({});

  const toggleGenre = (genre: string) => {
    setGenres((prev) => {
      const next = prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre];

      if (next.length > 0 && errors.genres) {
        setErrors((prevErr) => ({...prevErr, genres: undefined}));
      }

      return next;
    });
  };

  const handleGetRecommendations = () => {
    setErrors({});

    const formData: PreferencesFormData = {
      moodOption,
      selectedMood,
      customMood,
      freeTime,
      language,
      country,
      era,
      popularity,
      genres,
      movieCount,
    } as unknown as PreferencesFormData;

    const result = preferencesSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: PreferencesErrors = {};

      result.error.issues.forEach((issue: any) => {
        const field = issue.path[0] as keyof PreferencesFormData | undefined;
        if (!field) return;
        // only set first message per field
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    const valid = result.data;

    // Navigate to /results with validated, normalized data
    navigate("/results", {
      state: {
        mood:
          valid.moodOption === "choose" ? valid.selectedMood : valid.customMood,
        freeTime: valid.freeTime,
        language: valid.language,
        country: valid.country,
        era: valid.era,
        popularity: valid.popularity,
        genres: valid.genres,
        movieCount: valid.movieCount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Tell Us What You're Looking For
            </h1>
            <p className="text-gray-600">
              Answer a few questions to get personalized movie recommendations
            </p>
          </div>

          <div className="space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                How are you feeling right now?
              </label>

              <div className="flex items-center space-x-4 mb-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={moodOption === "choose"}
                    onChange={() => {
                      setMoodOption("choose");
                      setErrors((prev) => ({
                        ...prev,
                        customMood: undefined,
                      }));
                    }}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">
                    Choose from options
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={moodOption === "describe"}
                    onChange={() => {
                      setMoodOption("describe");
                      setErrors((prev) => ({
                        ...prev,
                        selectedMood: undefined,
                      }));
                    }}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">
                    Describe it myself
                  </span>
                </label>
              </div>

              {moodOption === "choose" ? (
                <>
                  <select
                    value={selectedMood}
                    onChange={(e) => {
                      setSelectedMood(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        selectedMood: undefined,
                      }));
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select your mood</option>
                    {moodOptions.map((mood) => (
                      <option key={mood} value={mood}>
                        {mood}
                      </option>
                    ))}
                  </select>
                  {errors.selectedMood && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.selectedMood}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={customMood}
                    onChange={(e) => {
                      setCustomMood(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        customMood: undefined,
                      }));
                    }}
                    placeholder="Describe how you're feeling..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {errors.customMood && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.customMood}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Free Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                How much free time do you have?
              </label>
              <select
                value={freeTime}
                onChange={(e) => setFreeTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
                <option value="150">150 minutes</option>
                <option value="180">180+ minutes</option>
              </select>
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Language Preference
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="any">Any Language</option>
                <option value="en">English</option>
                <option value="br">Brazilian</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="pt">Portuguese</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
              </select>
            </div>

            {/* Country of Production */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Country of Production
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="any">Any Country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ir">Ireland</option>
                <option value="br">Brazil</option>
                <option value="fr">France</option>
                <option value="jp">Japan</option>
                <option value="kr">South Korea</option>
                <option value="in">India</option>
              </select>
            </div>

            {/* Movie Era */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Movie Era
              </label>
              <select
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="any">Any Era</option>
                <option value="new">New - 2020 up to now</option>
                <option value="recent">Recent - 2000 up to 2019 </option>
                <option value="old">Old - up to 1999</option>
              </select>
            </div>

            {/* Movie Popularity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Movie Popularity
              </label>
              <select
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="any">Any</option>
                <option value="mainstream">Mainstream</option>
                <option value="indie">Indie</option>
              </select>
            </div>

            {/* Genres */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Genres (select one or more)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {genreOptions.map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={genres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                      {genre}
                    </span>
                  </label>
                ))}
              </div>
              {errors.genres && (
                <p className="mt-1 text-xs text-red-500">{errors.genres}</p>
              )}
            </div>

            {/* Number of Movies */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                How many movies would you like recommended?
              </label>
              <input
                type="number"
                value={movieCount}
                onChange={(e) => {
                  setMovieCount(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    movieCount: undefined,
                  }));
                }}
                min={1}
                max={10}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.movieCount && (
                <p className="mt-1 text-xs text-red-500">{errors.movieCount}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleGetRecommendations}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Recommendations
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
