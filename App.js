import { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./scenes/dashboard/d1";
import Form from "./scenes/form";
import BAR from "./scenes/bar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode, tokens } from "./theme";


import Login from "./scenes/form/login";
import Topbar1 from "./scenes/global/Topbar1";
import Register from "./scenes/form/Register";
import Home from "./scenes/dashboard";
import AnalyticsTemplate from "./scenes/Analytics/Analytics";
import FleetHome from "./scenes/dashboard/FleetIndex";
import FleetTopbar from "./scenes/global/Topbar2";

function App() {
  const [theme, colorMode] = useMode();
  const [path, setPath] = useState();
  const [token, setToken] = useState();
  const [data1, setData1] = useState();
  const [mapAPI, setMapAPI] = useState([]);
  const colors = tokens(theme.palette.mode);

  function handleDataFromChild(newVariable, role, accessToken) {
    setData1(newVariable);
    setPath(role);
    setToken(accessToken);

  } 

  const [receivedVehiclesData, setReceivedVehiclesData] = useState([]);

  const handleVehiclesData = (data) => 
  {
    setReceivedVehiclesData(data);
    setData1(data.vehicleId);
  };

  useEffect(() => {
    if (path) {
      const fetchMapAPI = async () => {
        try {
          const response = await fetch(`${colors.palette[50]}/map-api/token`);
          if (response.ok) {
            const mapAPI = await response.json();
            setMapAPI(mapAPI.access_token);
            // console.log(mapAPI.access_token);
          } else {
            console.log('Failed to fetch initial switch value.');
          }
        } catch (error) {
          console.error('Error fetching initial switch value:', error);
        }
      };
      fetchMapAPI();
    }
  }, [path]);

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="app">
      <main className="content">
        {path === 'admin' && <Topbar1/>}
        {path === 'fleet' && <FleetTopbar/>}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Login onLogin={handleDataFromChild}/>} />
            {path === 'admin'? 
            <Route>
            <Route path="/admin/dashboard" element={<Home  onVehicleIdClick={handleVehiclesData} accessToken={token}/>} />
            <Route path="/admin/template" element={<Dashboard  vehicleData={receivedVehiclesData} user={data1} mapKey={mapAPI}/>} />
            <Route path="/admin/register" element={<Register />} />
            <Route path="/admin/form" element={<Form />} />
            <Route path="/admin/bar" element={<BAR user={data1} />} />
            <Route path="/admin/analytics/template" element={<AnalyticsTemplate user={data1} />} />
            </Route>
             : 
             path === 'fleet'? 
             <Route>
             <Route path="/fleet/dashboard" element={<FleetHome  onVehicleIdClick={handleVehiclesData} accessToken={token}/>} />
             <Route path="/fleet/template" element={<Dashboard  vehicleData={receivedVehiclesData} user={data1} mapKey={mapAPI}/>} />
             <Route path="/fleet/bar" element={<BAR user={data1} />} />
             <Route path="/fleet/analytics/template" element={<AnalyticsTemplate user={data1} />} />
             </Route>
              : 
             <Route></Route>} 
          </Routes>
        </div>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
