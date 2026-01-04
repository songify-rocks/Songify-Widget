import React from "react";
import Root from "./App/Root";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/:id?" element={<Root />} />
      </Routes>
    </Router>
  );
}

export default App;
