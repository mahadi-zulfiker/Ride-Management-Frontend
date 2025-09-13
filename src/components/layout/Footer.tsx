import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:text-primary/90"
        >
          RideShare Pro
        </Link>

        {/* Navigation links */}
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link to="/allrides" className="hover:text-primary transition">
            Rides
          </Link>
          <Link to="/login" className="hover:text-primary transition">
            Login
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} RideShare Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
