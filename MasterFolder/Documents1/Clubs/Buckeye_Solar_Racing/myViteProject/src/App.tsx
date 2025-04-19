import { useEffect, useState } from 'react';
import './App.css';


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



interface TelemetryData {
  timestamp: string;
  relay_state: number | null;
  failsafe_status: number | null;
  fan_speed: number | null;
  faults_1: number | null;
  faults_2: number | null;
  pack_ccl: number | null;
  pack_dcl: number | null;
  pack_current: number | null;
  avg_pack_current: number | null;
  pack_voltage: number | null;
  pack_summed_voltage: number | null;
  pack_soc: number | null;
  pack_amphours: number | null;
  pack_health: number | null;
  adaptive_soc: number | null;
  adaptive_amphours: number | null;
  high_temperature: number | null;
  low_temperature: number | null;
  avg_temperature: number | null;
  high_cell_voltage: number | null;
  low_cell_voltage: number | null;
  avg_cell_voltage: number | null;
  pack_resistance: number | null;
  avg_cell_resistance: number | null;
  pack_kw_power: number | null;
  [key: string]: string | number | null;
}

function nullData() {

  return {
    timestamp: "No data",
    relay_state: null,
    failsafe_status: null,
    fan_speed: null,
    faults_1: null,
    faults_2: null,
    pack_ccl: null,
    pack_dcl: null,
    pack_current: null,
    avg_pack_current: null,
    pack_voltage: null,
    pack_summed_voltage: null,
    pack_soc: null,
    pack_amphours: null,
    pack_health: null,
    adaptive_soc: null,
    adaptive_amphours: null,
    high_temperature: null,
    low_temperature: null,
    avg_temperature: null,
    high_cell_voltage: null,
    low_cell_voltage: null,
    avg_cell_voltage: null,
    pack_resistance: null,
    avg_cell_resistance: null,
    pack_kw_power: null,
 };
}

interface AVGCURRChartData {
  name: string;
  avg_pack_current: number;
  pv: number;
  amt: number;
}

interface AVGVOLTChartData {
  name: string;
  avg_pack_volt: number;
  pv: number;
  amt: number;
}

interface AVGTEMPChartData {
  name: string;
  avg_pack_temp: number;
  pv: number;
  amt: number;
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<TelemetryData[]>([]);
  const [activeTab, setActiveTab] = useState('data');

  const tabs = [
    { id: 'data', label: 'Telemtry Data', content: 'Telemetry Data' },
    { id: 'chart', label: 'Analytics Charts', content: 'Charts' },
    { id: 'status', label: 'System Status', content: 'Status' },
  ]

  const [avgCurrChartData, setAvgCurrChartData] = useState<AVGCURRChartData[]>([{
    name: 'Page A',
    avg_pack_current: 4000,
    pv: 2400,
    amt: 2400,
  }, 
  {
    name: 'Page B',
    avg_pack_current: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    avg_pack_current: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    avg_pack_current: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    avg_pack_current: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    avg_pack_current: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page H',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page I',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page J',
    avg_pack_current: 3490,
    pv: 4300,
    amt: 2100,
  }
  
]);

  const [avgVoltChartData, setAvgVoltChartData] = useState<AVGVOLTChartData[]>([{
  name: 'Page A',
  avg_pack_volt: 4000,
  pv: 2400,
  amt: 2400,
}, 
{
  name: 'Page B',
  avg_pack_volt: 3000,
  pv: 1398,
  amt: 2210,
},
{
  name: 'Page C',
  avg_pack_volt: 2000,
  pv: 9800,
  amt: 2290,
},
{
  name: 'Page D',
  avg_pack_volt: 2780,
  pv: 3908,
  amt: 2000,
},
{
  name: 'Page E',
  avg_pack_volt: 1890,
  pv: 4800,
  amt: 2181,
},
{
  name: 'Page F',
  avg_pack_volt: 2390,
  pv: 3800,
  amt: 2500,
},
{
  name: 'Page G',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page H',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page I',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_volt: 3490,
  pv: 4300,
  amt: 2100,
}

]);

const [avgTempChartData, setAvgTempChartData] = useState<AVGTEMPChartData[]>([{
  name: 'Page A',
  avg_pack_temp: 4000,
  pv: 2400,
  amt: 2400,
}, 
{
  name: 'Page B',
  avg_pack_temp: 3000,
  pv: 1398,
  amt: 2210,
},
{
  name: 'Page C',
  avg_pack_temp: 2000,
  pv: 9800,
  amt: 2290,
},
{
  name: 'Page D',
  avg_pack_temp: 2780,
  pv: 3908,
  amt: 2000,
},
{
  name: 'Page E',
  avg_pack_temp: 1890,
  pv: 4800,
  amt: 2181,
},
{
  name: 'Page F',
  avg_pack_temp: 2390,
  pv: 3800,
  amt: 2500,
},
{
  name: 'Page G',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page H',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page I',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
},
{
  name: 'Page J',
  avg_pack_temp: 3490,
  pv: 4300,
  amt: 2100,
}

]);



  
  const [displayData, setDisplayData] = useState<TelemetryData>(nullData());

  useEffect(() => {


  
    setDisplayData(nullData());
    const fetchData = async () => { 
      console.log('Fetching data from backend...');
      fetch('http://localhost:5000/api/latest')
        .then((response) => {
          console.log('Response from backend:', response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: TelemetryData) => { 
          console.log('Data received from backend:', data);
          
          //checks to see if data isn no null and sets those nonnul lvalues

          
          let newDisplayData: TelemetryData = nullData();
          
          newDisplayData = Object.assign(newDisplayData, displayData);

          
          const dataKeys = Object.keys(data);


          console.log(newDisplayData);
          for (var i = 0; i < dataKeys.length; i++) {
            const key = dataKeys[i] as keyof TelemetryData;
            
            if (data[key] != null) {
              newDisplayData[key] = data[key];
            }
            
          }

          console.log(newDisplayData);
          setDisplayData(newDisplayData);

          setData(Array.isArray(data) ? data : [data]);


          setAvgCurrChartData((avgCurrChartData) => {
            avgCurrChartData.shift();
            avgCurrChartData.push({
              name: newDisplayData.timestamp,
              avg_pack_current: newDisplayData.pack_voltage ? newDisplayData.pack_voltage : 0,
              pv: 2400,
              amt: 2400,
            });
            return avgCurrChartData;
          });

          setAvgVoltChartData((avgVoltChartData) => {
            avgVoltChartData.shift();
            avgVoltChartData.push({
              name: newDisplayData.timestamp,
              avg_pack_volt: newDisplayData.pack_voltage ? newDisplayData.pack_voltage : 0,
              pv: 2400,
              amt: 2400,
            });
            return avgVoltChartData;
          });

          setAvgTempChartData((avgTempChartData) => {
            avgTempChartData.shift();
            avgTempChartData.push({
              name: newDisplayData.timestamp,
              avg_pack_temp: newDisplayData.pack_voltage ? newDisplayData.pack_voltage : 0,
              pv: 2400,
              amt: 2400,
            });
            return avgTempChartData;
          });
          // chartData.pop();
          // chartData.push(
          //   {
          //     name: newDisplayData.timestamp,
          //     avg_pack_current: newDisplayData.pack_voltage ? newDisplayData.pack_voltage : 0,
          //     pv: 2400,
          //     amt: 2400,
          //   }
          // );

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    setInterval(fetchData, 200);
  }, []);

  return (
    <div className="container">
      <div className="header-card">
        
        <h1>Buckeye Solar Racing</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {data ? (
        <div className="data-card">
        <h2>Telemetry Data</h2>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Relay State</th>
              <th>Failsafe Status</th>
              <th>Fan Speed</th>
              <th>Faults 1</th>
              <th>Faults 2</th>
              <th>Pack CCL</th>
              <th>Pack DCL</th>
              <th>Pack Current</th>
              <th>Avg Pack Current</th>
              <th>Pack Voltage</th>
              <th>Pack Summed Voltage</th>
              <th>Pack SOC</th>
              <th>Pack Amphours</th>
              <th>Pack Health</th>
              <th>Adaptive SOC</th>
              <th>Adaptive Amphours</th>
              <th>High Temperature</th>
              <th>Low Temperature</th>
              <th>Avg Temperature</th>
              <th>High Cell Voltage</th>
              <th>Low Cell Voltage</th>
              <th>Avg Cell Voltage</th>
              <th>Pack Resistance</th>
              <th>Avg Cell Resistance</th>
              <th>Pack KW Power</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{displayData.timestamp}</td>
                <td>{displayData.relay_state}</td>
                <td>{displayData.failsafe_status}</td>
                <td>{displayData.fan_speed}</td>
                <td>{displayData.faults_1}</td>
                <td>{displayData.faults_2}</td>
                <td>{displayData.pack_ccl}</td>
                <td>{displayData.pack_dcl}</td>
                <td>{displayData.pack_current}</td>
                <td>{displayData.avg_pack_current}</td>
                <td>{displayData.pack_voltage}</td>
                <td>{displayData.pack_summed_voltage}</td>
                <td>{displayData.pack_soc}</td>
                <td>{displayData.pack_amphours}</td>
                <td>{displayData.pack_health}</td>
                <td>{displayData.adaptive_soc}</td>
                <td>{displayData.adaptive_amphours}</td>
                <td>{displayData.high_temperature}</td>
                <td>{displayData.low_temperature}</td>
                <td>{displayData.avg_temperature}</td>
                <td>{displayData.high_cell_voltage}</td>
                <td>{displayData.low_cell_voltage}</td>
                <td>{displayData.avg_cell_voltage}</td>
                <td>{displayData.pack_resistance}</td>
                <td>{displayData.avg_cell_resistance}</td>
                <td>{displayData.pack_kw_power}</td>
              </tr>
        
          </tbody>
        </table>
        
        </div>
      ) : (
        <div className="data-card">

          <p>"Loading data"</p>
        </div>
      )}

      <div className="chart-container">
        <h2>Average Pack Current</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data = {avgCurrChartData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avg_pack_current" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        </div>
      
      <div className="chart-container">
        <h2>Average Cell Voltage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data = {avgVoltChartData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avg_pack_current" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        </div>

      <div className="chart-container">
        <h2>Average Temperature</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data = {avgTempChartData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avg_pack_current" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        </div>
  

    </div>
  );
}

export default App;





/*




 return (
    <div className="container">
      <div className="header-card">
        <DesktopMenu
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <h1>Buckeye Solar Racing</h1>
      </div>

      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );

*/