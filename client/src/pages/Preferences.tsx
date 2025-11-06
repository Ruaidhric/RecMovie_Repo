import React, { useState } from 'react';
import { Film, Clock, LogOut, History } from 'lucide-react';

export const Preferences = () => {
  const [moodOption, setMoodOption] = useState('choose');
  const [customMood, setCustomMood] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [freeTime, setFreeTime] = useState('90');
  const [language, setLanguage] = useState('any');
  const [country, setCountry] = useState('any');
  const [era, setEra] = useState('any');
  const [popularity, setPopularity] = useState('any');
  const [genres, setGenres] = useState([]);
  const [movieCount, setMovieCount] = useState('5');

  const genreOptions = [
    'Action', 'Adventure', 'Animation',
    'Comedy', 'Crime', 'Drama',
    'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller',
    'Western'
  ];

  const moodOptions = [
    'Happy', 'Sad', 'Excited', 'Relaxed', 'Adventurous',
    'Romantic', 'Scared', 'Thoughtful', 'Energetic', 'Melancholic'
  ];

//   const toggleGenre = (genre) => {
//     setGenres(prev =>
//       prev.includes(genre)
//         ? prev.filter(g => g !== genre)
//         : [...prev, genre]
//     );
//   };

  const handleGetRecommendations = () => {
    const finalMood = moodOption === 'choose' ? selectedMood : customMood;
    alert(`Getting recommendations for:\nMood: ${finalMood}\nTime: ${freeTime} min\nGenres: ${genres.join(', ') || 'Any'}\nCount: ${movieCount}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RecMovie</span>
            </div>
           
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-600">Hello, Luis Henrique</span>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <History className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

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
                    checked={moodOption === 'choose'}
                    onChange={() => setMoodOption('choose')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">Choose from options</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={moodOption === 'describe'}
                    onChange={() => setMoodOption('describe')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">Describe it myself</span>
                </label>
              </div>

              {moodOption === 'choose' ? (
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select your mood</option>
                  {moodOptions.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={customMood}
                  onChange={(e) => setCustomMood(e.target.value)}
                  placeholder="Describe how you're feeling..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
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
                <option value="es">Spanish</option>
                <option value="fr">French</option>
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
                <option value="2020s">2020s</option>
                <option value="2010s">2010s</option>
                <option value="2000s">2000s</option>
                <option value="1990s">1990s</option>
                <option value="1980s">1980s</option>
                <option value="classic">Classic (before 1980)</option>
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
                <option value="mainstream">Mainstream Hits</option>
                <option value="hidden">Hidden Gems</option>
                <option value="cult">Cult Classics</option>
              </select>
            </div>

            {/* Genres */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Genres (select one or more)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {genreOptions.map(genre => (
                  <label
                    key={genre}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                    //   checked={genres.includes(genre)}
                    //   onChange={() => toggleGenre(genre)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                      {genre}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Movies */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                How many movies would you like recommended?
              </label>
              <input
                type="number"
                value={movieCount}
                onChange={(e) => setMovieCount(e.target.value)}
                min="1"
                max="20"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
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
}