export interface ClimateDataInterface {
    Country: string;
    Indicator: string;
    Unit: string;
    Source: string;
    CTS_Name: string;
    [key: string]: string;
};

export interface ClimateChartDataInterface {
    year: string,
    temperatureChange: string
};

export interface ClimateYearlyDataInterface {
    country: string,
    climateYearlyData: ClimateChartDataInterface[],
};

export function transformLineChartData(data: ClimateDataInterface[]): ClimateYearlyDataInterface[] {
    if(data.length === 0)
        return [];

    const countryWiseClimateData: ClimateYearlyDataInterface[] = [];
    const keys = Object.keys(data[0]);
    const years = keys.filter((k:string) => k.includes('F19') || k.includes('F20'));

    data.map(d => {
        var chartData: Array<{year: string, temperatureChange: string}> = [];
        years.forEach(year => {
            const value = d[year];
            chartData.push({year, temperatureChange: value});
        });
        countryWiseClimateData.push({country: d.Country, climateYearlyData: chartData});
    });
    
    return countryWiseClimateData; 
}