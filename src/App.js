import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);

      // Default values
      const full_name = "Grutika Oswal";
      const dob = "02022003";

      // Extract the "data" array from user input
      const { data } = parsedInput;

      // Separate numbers and alphabets from "data"
      const numbers = data.filter(item => typeof item === 'number');
      const alphabets = data.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));

      // Find the highest lowercase alphabet
      const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
      const highestLowercase = lowercaseAlphabets.sort().pop() || null;

      // Generate user_id using default values
      const user_id = `${full_name.toLowerCase().replace(' ', '_')}_${dob}`;

      // Mock response to simulate backend behavior
      const mockResponse = {
        user_id,
        numbers,
        alphabets,
        highest_lowercase: highestLowercase,
      };

      setApiResponse(mockResponse);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or server error.');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;
    return (
      <div className="response-container">
        {selectedOptions.includes('Alphabets') && <p>Alphabets: {apiResponse.alphabets.join(', ')}</p>}
        {selectedOptions.includes('Numbers') && <p>Numbers: {apiResponse.numbers.join(', ')}</p>}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <p>Highest Lowercase Alphabet: {apiResponse.highest_lowercase}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE11567</h1>
      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea value={jsonInput} onChange={handleJsonChange} placeholder='Enter JSON here...' />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {apiResponse && (
        <div>
          <label>
            Select Data to Display:
            <select multiple onChange={handleOptionChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
