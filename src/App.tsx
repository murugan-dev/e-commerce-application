// React and react related import
import React from "react";

// Third party libraries
import { Provider } from "react-redux";

// Custom component
import store from "./redux/store.js";
import AppRoutes from "./routes/AppRoutes.js";

// styles
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
