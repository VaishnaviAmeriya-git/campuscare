import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Resources from "./pages/Resources";

import Home from "./pages/Home";
import Mood from "./pages/Mood";
import Journal from "./pages/Journal";
import Mitra from "./pages/Mitra";
import Review from "./pages/Review";
import PeerCircles from "./pages/PeerCircles";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
  path="/journal"
  element={
    <ProtectedRoute>
      <Journal />
    </ProtectedRoute>
  }
/>

<Route
  path="/mood"
  element={
    <ProtectedRoute>
      <Mood />
    </ProtectedRoute>
  }
/>

<Route
  path="/peer"
  element={
    <ProtectedRoute>
      <PeerCircles />
    </ProtectedRoute>
  }
/>

<Route
  path="/review"
  element={
    <ProtectedRoute>
      <Review />
    </ProtectedRoute>
  }
/>

          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/mitra" element={<Mitra />} />
          <Route path="/review" element={<Review />} />
          <Route path="/peers" element={<PeerCircles />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/resources" element={<Resources />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
