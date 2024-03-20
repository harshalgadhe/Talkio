import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import Homepage from "./components/Homepage";
import { SocketContextProvider } from "./contexts/SocketContext";
import Signup from "./components/Signup";

function App() {

  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <SocketContextProvider>
          <Routes>
            <Route path="" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat/:id" element={<Main />} />
          </Routes>
        </SocketContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;