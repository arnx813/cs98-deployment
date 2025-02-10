import { Link } from "react-router-dom";
import nexusLogo from "../assets/nexus_temp_logo.jpeg";

// import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer bg-white text-black py-6 px-4">
      <div className="border-t border-gray-300 mb-6"></div>

      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo and Description */}
        <div className="footer-logo mb-4 md:mb-0">
          {/* <img src="../assets/nexus_temp_logo.jpeg" alt="Nexus Logo" className="h-10 mb-2" /> */}
          <img src={nexusLogo} alt="Nexus Logo" className="h-8 mr-2" />

          <p className="text-sm">
            Empowering data sharing and collaboration. Explore datasets, share insights, and grow your knowledge.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:underline text-sm">
            Home
          </Link>
          <Link to="/about" className="hover:underline text-sm">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline text-sm">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline text-sm">
            Privacy Policy
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.77-1.64 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 17 22 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.89-2.37c-.83.49-1.75.84-2.72 1.03a4.29 4.29 0 00-7.29 3.91 12.18 12.18 0 01-8.83-4.47 4.29 4.29 0 001.33 5.72 4.27 4.27 0 01-1.94-.54v.06a4.29 4.29 0 003.44 4.2c-.8.22-1.66.25-2.52.1a4.29 4.29 0 004 2.97A8.59 8.59 0 012 19.34a12.14 12.14 0 006.56 1.92c7.88 0 12.19-6.52 12.19-12.18 0-.18 0-.36-.01-.54A8.65 8.65 0 0024 4.56a8.54 8.54 0 01-2.46.67 4.29 4.29 0 001.89-2.37" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 text-sm">
        &copy; {new Date().getFullYear()} Nexus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
