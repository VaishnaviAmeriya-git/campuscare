import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white p-4 flex gap-3 flex-wrap">
        <Link to="/">Home</Link>
        <Link to="/mood">Mood</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/mitra">Mitra</Link>
        <Link to="/review">Review</Link>
        <Link to="/peers">Peer Circles</Link>
      </header>

      <main className="max-w-3xl mx-auto mt-6">{children}</main>
    </div>
  );
}
