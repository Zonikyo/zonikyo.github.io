import React, { useState, useCallback } from 'react';
import { Plus, Trash2, Copy, Download, AlertTriangle, CheckCircle, Info } from 'lucide-react';

// Helper function to safely parse input as JSON or JS Array Literal
const safeParseData = (str) => {
  // 1. Trim whitespace
  const trimmedStr = str.trim();

  // 2. Basic check: Must start with '[' and end with ']'
  if (!trimmedStr.startsWith('[') || !trimmedStr.endsWith(']')) {
    return { error: "Invalid format: Input must start with '[' and end with ']' to represent an array." };
  }

  // 3. Try standard JSON.parse first
  try {
    const parsedJson = JSON.parse(trimmedStr);
    if (Array.isArray(parsedJson)) {
      // Basic validation: check if array items look like game objects
      if (parsedJson.every(item => typeof item === 'object' && item !== null && 'id' in item && 'title' in item)) {
        return { data: parsedJson }; // Success with JSON
      } else {
         return { error: "Invalid structure: Parsed as JSON array, but items lack required 'id' or 'title' properties." };
      }
    } else {
       return { error: "Invalid format: Input was parsed as JSON, but it is not an array." };
    }
  } catch (jsonError) {
    // JSON.parse failed, now try evaluating as JS literal (use Function constructor for safety)
    try {
      // IMPORTANT: Using Function constructor is safer than eval, but still executes code.
      // Only suitable for trusted input in internal tools.
      const evaluatedData = new Function(`return ${trimmedStr}`)();

      if (Array.isArray(evaluatedData)) {
         // Basic validation: check if array items look like game objects
        if (evaluatedData.every(item => typeof item === 'object' && item !== null && 'id' in item && 'title' in item)) {
           return { data: evaluatedData }; // Success with JS evaluation
        } else {
           return { error: "Invalid structure: Parsed as JavaScript array, but items lack required 'id' or 'title' properties." };
        }
      } else {
        return { error: "Invalid format: Input was evaluated as JavaScript, but it did not result in an array." };
      }
    } catch (evalError) {
      // Both methods failed
      return {
          error: `Invalid format: Failed to parse as JSON (Error: ${jsonError.message}). Also failed to evaluate as JavaScript array literal (Error: ${evalError.message}). Please check syntax (e.g., quotes, commas, brackets).`
      };
    }
  }
};


// GameCard component for displaying and editing a single game
function GameCard({ game, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGame, setEditedGame] = useState(game);

  // Handle input changes for the game fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for tags array
    if (name === 'tags') {
      // Split by comma, trim whitespace, remove empty strings
      setEditedGame({ ...editedGame, [name]: value.split(',').map(tag => tag.trim()).filter(tag => tag) });
    } else {
      setEditedGame({ ...editedGame, [name]: value });
    }
  };

  // Save changes and exit editing mode
  const handleSave = () => {
    onUpdate(editedGame); // Pass the updated game data to the parent
    setIsEditing(false);
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setEditedGame(game); // Reset to original game data
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-4">
      {!isEditing ? (
        // Display mode
        <div>
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{game.title} <span className="text-sm font-mono text-gray-500 dark:text-gray-400">({game.id})</span></h3>
             <div className="flex space-x-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 rounded text-sm font-medium text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700"
                    aria-label={`Edit ${game.title}`}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(game.id)}
                    className="p-1 rounded text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700"
                    aria-label={`Delete ${game.title}`}
                >
                    <Trash2 size={18} />
                </button>
             </div>
          </div>
          {/* Display Thumbnail Preview */}
          {game.thumbnail && (
             <img
                src={game.thumbnail}
                alt={`${game.title} thumbnail`}
                className="w-32 h-auto object-cover rounded mb-2 border border-gray-200 dark:border-gray-600"
                // Add a placeholder fallback if the image fails to load
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                    e.target.src=`https://placehold.co/320x180/cccccc/ffffff?text=Image+Error`;
                    e.target.alt = 'Error loading image';
                 }}
             />
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 break-all"><span className="font-medium">Thumbnail URL:</span> <a href={game.thumbnail} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{game.thumbnail}</a></p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 break-all"><span className="font-medium">IFrame URL:</span> <a href={game.iframeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{game.iframeUrl}</a></p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2"><span className="font-medium">Description:</span> {game.description}</p>
          <div className="flex flex-wrap gap-1 items-center">
            <span className="font-medium text-sm text-gray-600 dark:text-gray-300 mr-1">Tags:</span>
            {game.tags && game.tags.length > 0 ? (
                game.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-0.5 rounded">
                    {tag}
                </span>
                ))
            ) : (
                <span className="text-xs text-gray-500 dark:text-gray-400 italic">No tags</span>
            )}
          </div>
        </div>
      ) : (
        // Editing mode
        <div className="space-y-3">
          <div>
            <label htmlFor={`title-${game.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              id={`title-${game.id}`}
              name="title"
              value={editedGame.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
           <div>
            <label htmlFor={`id-${game.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</label>
            <input
              type="text"
              id={`id-${game.id}`}
              name="id"
              value={editedGame.id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
              readOnly // ID should not be changed easily
              disabled // Visually indicate it's not editable
              aria-describedby={`id-help-${game.id}`}
            />
             <p id={`id-help-${game.id}`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">ID cannot be changed after creation. Delete and re-add if a different ID is needed.</p>
          </div>
          <div>
            <label htmlFor={`thumbnail-${game.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail URL</label>
            <input
              type="url"
              id={`thumbnail-${game.id}`}
              name="thumbnail"
              value={editedGame.thumbnail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
           <div>
            <label htmlFor={`iframeUrl-${game.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IFrame URL</label>
            <input
              type="url"
              id={`iframeUrl-${game.id}`}
              name="iframeUrl"
              value={editedGame.iframeUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor={`description-${game.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              id={`description-${game.id}`}
              name="description"
              value={editedGame.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor={`tags-${game.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              id={`tags-${game.id}`}
              name="tags"
              // Ensure tags is always an array before joining
              value={Array.isArray(editedGame.tags) ? editedGame.tags.join(', ') : ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App component
function App() {
  const [rawData, setRawData] = useState(''); // Input data from textarea
  const [games, setGames] = useState([]); // Parsed game data array
  const [error, setError] = useState(null); // Error message for parsing
  const [exportCode, setExportCode] = useState(''); // Generated export code
  const [filter, setFilter] = useState(''); // Filter text
  const [notification, setNotification] = useState({ message: '', type: '' }); // For copy/download feedback

  // Placeholder for initial data example - Use valid JSON for placeholder
  const placeholderData = `[
  {
    "id": "example-1",
    "title": "Example Game 1",
    "thumbnail": "https://placehold.co/320x180/aabbcc/ffffff?text=Example+1",
    "tags": ["Example", "Demo"],
    "description": "This is an example game description.",
    "iframeUrl": "https://example.com/game1"
  },
  {
    "id": "example-2",
    "title": "Example Game 2",
    "thumbnail": "https://placehold.co/320x180/ccbbaa/ffffff?text=Example+2",
    "tags": ["Demo", "Test"],
    "description": "Another example description here.",
    "iframeUrl": "https://example.com/game2"
  }
]`;

  // Handle pasting/typing data into the input textarea
  const handleRawDataChange = (e) => {
    setRawData(e.target.value);
    setError(null); // Clear error when user types
    // Don't clear games immediately, only on successful load or clear action
    // setGames([]);
    setExportCode(''); // Clear export code
  };

  // Load and parse the data from the textarea
  const loadData = useCallback(() => {
    setError(null); // Clear previous errors
    setNotification({ message: '', type: '' }); // Clear notification

    if (!rawData.trim()) {
      setError("Input data cannot be empty.");
      setGames([]); // Clear games if input is empty
      return;
    }

    // Try parsing the input string using the improved helper
    const result = safeParseData(rawData);

    if (result.error) {
      setError(result.error); // Display the specific error message
      setGames([]); // Clear games on error
    } else if (result.data) {
      // Ensure all required fields exist, provide defaults if necessary
      const validatedData = result.data.map((item, index) => ({
        id: item.id || `new-game-${Date.now()}-${index}`, // Ensure ID exists
        title: item.title || 'Untitled Game',
        thumbnail: item.thumbnail || 'https://placehold.co/320x180/cccccc/ffffff?text=No+Image',
        tags: Array.isArray(item.tags) ? item.tags : [], // Ensure tags is an array
        description: item.description || 'No description provided.',
        iframeUrl: item.iframeUrl || '',
      }));
      setGames(validatedData);
      setNotification({ message: 'Data loaded successfully!', type: 'success' });
    } else {
        // Fallback error if safeParseData returns unexpected result
        setError('An unexpected error occurred during data parsing.');
        setGames([]);
    }
  }, [rawData]);

  // Update a specific game in the state
  const updateGame = useCallback((updatedGame) => {
    setGames(prevGames =>
      prevGames.map(game => (game.id === updatedGame.id ? updatedGame : game))
    );
    setExportCode(''); // Clear export code as data changed
    setNotification({ message: `Game "${updatedGame.title}" updated.`, type: 'success' });
    // Auto-dismiss notification after a few seconds
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  }, []); // Removed 'games' dependency as it's implicitly handled by setGames

  // Delete a game from the state
  const deleteGame = useCallback((gameId) => {
     // Use confirm for simple confirmation
     if (window.confirm("Are you sure you want to delete this game? This action cannot be undone.")) {
        const gameToDelete = games.find(g => g.id === gameId); // Find game before filtering
        setGames(prevGames => prevGames.filter(game => game.id !== gameId));
        setExportCode(''); // Clear export code as data changed
        setNotification({ message: `Game "${gameToDelete?.title || gameId}" deleted.`, type: 'info' });
        // Auto-dismiss notification
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
     }
  }, [games]); // Add games dependency back, needed for find()

  // Add a new blank game entry
  const addNewGame = useCallback(() => {
    const newGame = {
      // Generate a more robust unique ID
      id: `game-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: 'New Game',
      thumbnail: 'https://placehold.co/320x180/cccccc/ffffff?text=New+Game',
      tags: [],
      description: 'Enter description here.',
      iframeUrl: '',
    };
    // Add to the beginning of the list for visibility
    setGames(prevGames => [newGame, ...prevGames]);
    setExportCode(''); // Clear export code
    setNotification({ message: 'New game template added. Scroll down or filter to find and edit it.', type: 'info' });
     // Auto-dismiss notification
    setTimeout(() => setNotification({ message: '', type: '' }), 4000);
  }, []); // No dependencies needed here

  // Generate the JavaScript code for export
  const generateExportCode = useCallback(() => {
    if (games.length === 0) {
        setNotification({ message: 'No data to export.', type: 'info' });
        setExportCode('');
        return;
    }
    // Stringify the array with indentation for readability
    // Use a replacer function to handle potential issues if needed, though likely not for this structure
    const gamesArrayString = JSON.stringify(games, null, 2);
    // Wrap it in the 'const games = ...;' structure
    const code = `const games = ${gamesArrayString};`;
    setExportCode(code);
    setNotification({ message: 'Export code generated below.', type: 'success' });
     // Auto-dismiss notification
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  }, [games]);

  // Copy the generated code to the clipboard
  const copyToClipboard = useCallback(() => {
    if (!exportCode) {
        setNotification({ message: 'Generate export code first.', type: 'info' });
        return;
    }
    navigator.clipboard.writeText(exportCode)
      .then(() => {
        setNotification({ message: 'Copied to clipboard!', type: 'success' });
        // Auto-dismiss notification
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setNotification({ message: 'Failed to copy. See browser console for details.', type: 'error' });
      });
  }, [exportCode]);

   // Download the generated code as a .js file
  const downloadFile = useCallback(() => {
    if (!exportCode) {
        setNotification({ message: 'Generate export code first.', type: 'info' });
        return;
    }
    const blob = new Blob([exportCode], { type: 'application/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games_data.js'; // Filename for the download
    document.body.appendChild(a); // Append anchor to body
    a.click(); // Simulate click to trigger download
    document.body.removeChild(a); // Clean up by removing anchor
    URL.revokeObjectURL(url); // Release the object URL
    setNotification({ message: 'File download initiated.', type: 'success' });
     // Auto-dismiss notification
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  }, [exportCode]);

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  // Filter games based on title, id, description or tags
  const filteredGames = games.filter(game => {
    const searchTerm = filter.trim();
    if (!searchTerm) return true; // Show all if filter is empty

    const searchableTags = Array.isArray(game.tags) ? game.tags.join(' ').toLowerCase() : '';

    return (
        (game.title && game.title.toLowerCase().includes(searchTerm)) ||
        (game.id && game.id.toLowerCase().includes(searchTerm)) ||
        (game.description && game.description.toLowerCase().includes(searchTerm)) ||
        searchableTags.includes(searchTerm)
    );
});


  // Function to dismiss notification manually
  const dismissNotification = () => {
      setNotification({ message: '', type: '' });
  };


  return (
    // Use Inter font family for better readability
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-['Inter',_sans-serif]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">JavaScript Data Editor</h1>

        {/* Notification Area */}
        {notification.message && (
          // Added role="alert" for accessibility
          <div role="alert" className={`p-4 mb-4 rounded-md flex justify-between items-center shadow-md ${
                notification.type === 'success' ? 'bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700' :
                notification.type === 'error' ? 'bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700' :
                'bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700' // Default to info style
             }`}>
            <div className="flex items-center">
              {notification.type === 'success' && <CheckCircle className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0" size={20} />}
              {notification.type === 'error' && <AlertTriangle className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0" size={20} />}
              {notification.type === 'info' && <Info className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />}
              <span className={`text-sm font-medium ${
                    notification.type === 'success' ? 'text-green-800 dark:text-green-200' :
                    notification.type === 'error' ? 'text-red-800 dark:text-red-200' :
                    'text-blue-800 dark:text-blue-200' // Default to info text color
                 }`}>
                {notification.message}
              </span>
            </div>
            {/* Explicit dismiss button */}
            <button onClick={dismissNotification} aria-label="Dismiss notification" className="ml-4 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
        )}

        {/* Section 1: Data Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">1. Load Data</h2>
           {/* ***** FIX: Replaced literal {} with HTML entities ***** */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Paste your JavaScript array data (e.g., `[&lbrace;...&rbrace;, &lbrace;...&rbrace;]`) or valid JSON array data below. The tool will attempt to parse it.
          </p>
          {/* Use a more descriptive aria-label */}
          <textarea
            value={rawData}
            onChange={handleRawDataChange}
            placeholder={placeholderData}
            rows={8}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            aria-label="Input for JavaScript or JSON array data"
            spellCheck="false" // Disable spellcheck for code-like input
          />
          {/* Improved Error Display */}
          {error && (
             <div className="mt-3 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md text-red-800 dark:text-red-200 text-sm flex items-start">
               <AlertTriangle className="mr-2 mt-0.5 flex-shrink-0" size={18}/>
               {/* Allow error message to wrap */}
               <span className="break-words">{error}</span>
            </div>
          )}
          <button
            onClick={loadData}
            disabled={!rawData.trim()} // Keep disabled logic
            className="mt-4 px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-150 ease-in-out"
          >
            Load & Validate Data
          </button>
        </div>

        {/* Section 2: Data Editor - Conditionally render only if data is loaded */}
        {games.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              {/* Display counts */}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                 2. Edit Data ({filter ? `${filteredGames.length} matching filter` : `${games.length} total items`})
              </h2>
               {/* Controls container */}
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                   {/* Filter Input */}
                   <input
                      type="search" // Use type="search" for semantics and potential browser features
                      placeholder="Filter by title, ID, tag, desc..."
                      value={filter}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                      aria-label="Filter game data"
                    />
                   {/* Add New Game Button */}
                  <button
                    onClick={addNewGame}
                    className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-green-500 flex items-center justify-center w-full sm:w-auto transition duration-150 ease-in-out"
                  >
                    <Plus size={18} className="mr-1" /> Add New Game
                  </button>
               </div>
            </div>

            {/* Game List or No Results Message */}
            {filteredGames.length > 0 ? (
                 <div className="space-y-4">
                    {/* Map over filtered games */}
                    {filteredGames.map(game => (
                        <GameCard
                            key={game.id} // React key MUST be stable and unique
                            game={game}
                            onUpdate={updateGame}
                            onDelete={deleteGame}
                        />
                    ))}
                 </div>
            ) : (
                 // Show different messages based on whether a filter is active
                 <p className="text-gray-500 dark:text-gray-400 text-center py-6 italic">
                    {filter ? "No games match your filter criteria." : "No games loaded or all games have been deleted."}
                 </p>
            )}
          </div>
        )}

        {/* Section 3: Export Data - Conditionally render only if data exists */}
        {games.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">3. Export Data</h2>
            <button
              onClick={generateExportCode}
              className="mb-4 px-5 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-purple-500 flex items-center justify-center transition duration-150 ease-in-out"
            >
              Generate Export Code
            </button>

            {/* Conditionally render export area only after generation */}
            {exportCode && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Generated `const games = [...];` code:
                </p>
                {/* Use aria-label for accessibility */}
                <textarea
                  value={exportCode}
                  readOnly
                  rows={10}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Generated export code"
                  spellCheck="false"
                />
                {/* Export Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-indigo-500 flex items-center justify-center transition duration-150 ease-in-out"
                  >
                    <Copy size={16} className="mr-2" /> Copy to Clipboard
                  </button>
                   <button
                    onClick={downloadFile}
                    className="px-4 py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-teal-500 flex items-center justify-center transition duration-150 ease-in-out"
                  >
                    <Download size={16} className="mr-2" /> Download .js File
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

         {/* Footer */}
         <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            Data Editor Tool | Built with React & Tailwind CSS
         </footer>
      </div>
       {/* Note: Lucide icons are imported via React, no separate script needed if using a build system */}
    </div>
  );
}

export default App;
