// app/components/TemperatureDisplay.tsx
'use client'; // This directive makes this a Client Component

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { transformLineChartData, ClimateDataInterface, ClimateYearlyDataInterface } from '@/app/utils/dataTransformer/transformChartData';
import SearchCountry from '../SearchCountry/SearchCountry';
import { getItem, setItem } from '@/app/utils/storage/storage';

import dynamic from 'next/dynamic';

// Define an interface for the shape of the data you expect from your API
// This makes your code more robust and provides better autocomplete/type checking
interface ClimateData {
  Country: string;
  Indicator: string;
  Unit: string;
  Source: string;
  CTS_Name: string;
  [key: string]: string; // If there are other properties you don't explicitly type
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_PATH  || 'http://localhost:3000'; // Your Express API URL

// Dynamically import the client component (ClimateLineChart) with SSR disabled
const ClimateLineChart = dynamic(
    () => import('../ClimateLineChart/ClimateLineChart'),
    { ssr: false, loading: () => <p>Loading chart...</p> }
  );

const DEFAULT_COUNTRY = 'India';

function TemperatureDisplay() {
  // Type useState hooks
  const [climateData, setClimateData] = useState<ClimateYearlyDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (countries: string[] = [DEFAULT_COUNTRY]) => {
    const apiUrl = `${API_BASE_URL}/data?country=${encodeURIComponent(countries.join('|'))}`;

    setIsLoading(true); // Set loading to true at the start of the fetch
    setError(null);     // Clear any previous errors

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        // If the response is not OK (e.g., 404, 500), throw an error
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data: ClimateData[] = await response.json();
      const transformedData: ClimateYearlyDataInterface[] = transformLineChartData(data);
      const newClimateData = transformedData;
      
      setItem('country', JSON.stringify(newClimateData));
      console.log('newClimateData >>> ', newClimateData);
      setClimateData(newClimateData); 
    } catch (err: any) {
      // Catch any errors during the fetch or JSON parsing
      console.error('Error fetching climate data:', err);
      setError(err.message || 'An unknown error occurred during data fetching.');
    } finally {
      setIsLoading(false); // Set loading to false once fetch is complete (success or error)
    }
  };

  useEffect(() => {
      fetchData();
  }, []);


  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  const fetchCountryData = (countries: string[]) => {
    console.log('fetchCountryData ', countries);
    fetchData(countries);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div>
            <SearchCountry defaultCountry={DEFAULT_COUNTRY} fetchCountryData={fetchCountryData} loading={isLoading}/>
        </div>
      <h2>Climate Data for India</h2>
      <div>
      <div className='w-7xl'>
        {climateData.length && <ClimateLineChart climateData={climateData}  /> }
      </div>  
      {/* <ClimateLineChart data={climateData} title="Surface Temperature Change" lineKey="temperatureChange" lineName="Temperature Change (°C)" xAxisDataKey="year" /> */}
      </div>
    </div>
  );
}

export default TemperatureDisplay;