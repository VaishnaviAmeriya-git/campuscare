import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Mood from "./pages/Mood";
import Journal from "./pages/Journal";
import Mitra from "./pages/Mitra";
import Home from "./pages/Home";
import Review from "./pages/Review";
import PeerCircles from "./pages/PeerCircles";




function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
        <h1 className="text-2xl font-bold">CampusCare</h1>

        <Link
          to="/mood"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Mood Tracker
        </Link>

        <Link
          to="/journal"
          className="inline-block mt-2 bg-purple-600 text-white px-4 py-2 rounded ml-2"
        >
          Journal
        </Link>
        <Link className="bg-teal-600 text-white px-4 py-2 rounded" to="/peers">
  Peer Circles
</Link>

        <Link
  to="/mitra"
  className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded ml-2"
>
  Mitra AI
</Link>

      </div>

      <Routes>
        <Route path="/mood" element={<Mood />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/mitra" element={<Mitra />} />
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/peers" element={<PeerCircles />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
