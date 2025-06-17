// app/components/TemperatureDisplay.tsx
'use client'; // This directive makes this a Client Component

import React, { useState, useEffect } from 'react';

// Define an interface for the shape of the data you expect from your API
// This makes your code more robust and provides better autocomplete/type checking
interface ClimateData {
  Country: string;
  Indicator: string;
  Unit: string;
  Source: string;
  CTS_Name: string;
  [key: string]: any; // If there are other properties you don't explicitly type
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_PATH  || 'http://localhost:3000'; // Your Express API URL

function TemperatureDisplay() {
  // Type useState hooks
  const [indicatorData, setIndicatorData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors

        const response: Response = await fetch(`${API_BASE_URL}/data?country=India`);

        if (!response.ok) {
          // Handle HTTP errors
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        // Type the parsed JSON data
        const data: ClimateData = await response.json();

        // Access the "Indicator" key based on the defined interface
        setIndicatorData(data.Indicator);

      } catch (err: any) { // Explicitly type 'err' as 'any' or 'unknown' and then narrow
        console.error('Error fetching data:', err);
        // Type narrowing for error message
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <p>Loading climate data for India...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!indicatorData) {
    // This case would hit if data.Indicator was undefined or null after loading,
    // or if the initial state null persisted due to a data issue.
    return <p>No indicator data found for India.</p>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Climate Data for India</h2>
      <p>
        <strong>Indicator:</strong> {indicatorData}
      </p>
      {/* You can add more elements to display other parts of the data if needed */}
    </div>
  );
}

export default TemperatureDisplay;