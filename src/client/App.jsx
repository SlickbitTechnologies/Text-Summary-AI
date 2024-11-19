import "./App.css";
import { Provider } from "react-redux";
import { persister, store } from "./context/store";
import { ThemeProvider } from "@mui/material";
import theme from "./MuiTheme";
import { PersistGate } from "redux-persist/integration/react";
import MenuGenerator from "./MenuGenerator";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {

  return (
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persister}>
        <ThemeProvider theme={theme}>
          <DashboardLayout />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
