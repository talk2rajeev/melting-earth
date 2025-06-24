import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';


const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_PATH  || 'http://localhost:3000'; 

const SearchCountry: React.FC<{defaultCountry: string, loading: boolean, fetchCountryData: (country: string[]) => void}> = React.memo(({defaultCountry, fetchCountryData, loading}) => {
    
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<Array<{label: string, value: string}>>([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            setError(null);   // Clear previous errors
    
            const response: Response = await fetch(`${API_BASE_URL}/countries`);
    
            if (!response.ok) {
              // Handle HTTP errors
              const errorText = await response.text();
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
    
            // Type the parsed JSON data
            const result: string[] = await response.json();
            const countryOption = result.map(country => ({label: country, value: country}));
            setCountries(countryOption);
    
          } catch (err: unknown) { // Explicitly type 'err' as 'any' or 'unknown' and then narrow
            console.error('Error fetching data:', err);
            // Type narrowing for error message
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
          } finally {
            // 
          }
        };
    
        fetchData();
      }, [defaultCountry]); // Empty dependency array means this effect runs once after the initial render
    
      if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
      }  
    
      
      
    return <Select
        mode="multiple"
        loading={loading}
        style={{ width: '100%' }}
        placeholder="select one country"
        defaultValue={[defaultCountry]}
        onChange={fetchCountryData}
        options={countries}
        optionRender={(option) => (
            <Space>
                {option.data.value}
            </Space>
        )}
    />
  
});

export default SearchCountry;