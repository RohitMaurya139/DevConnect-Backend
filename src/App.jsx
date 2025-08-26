import React, { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
function App() {
  return (
    <>
      <div >
       
          <Header />

          <Body />
       
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default App;
