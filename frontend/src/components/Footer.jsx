import React from "react";
import { FaPenAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	// Simulating authentication check (Replace with actual auth logic)
	const isAuthenticated = localStorage.getItem("token") !== null;

	return (
		<footer className="w-full bg-slate-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center shadow-inner">
			<div className="flex items-center gap-2 text-lg font-bold">
				<span>Chat Application</span>
				<FaPenAlt fontSize={18} />
			</div>

			<div className="flex flex-wrap justify-center sm:justify-between w-full sm:w-auto text-base mt-3 sm:mt-0">
				<Link
					className="mx-3 font-semibold transition-colors duration-300 hover:text-blue-400 hover:scale-105"
					to={"/"}
				>
					Home
				</Link>

				{!isAuthenticated ? (
					// Show Sign In & Sign Up when NOT logged in
					<>
						<Link
							className="mx-3 font-semibold transition-colors duration-300 hover:text-green-400 hover:scale-105"
							to={"/signin"}
						>
							Sign In
						</Link>
						<Link
							className="mx-3 font-semibold transition-colors duration-300 hover:text-yellow-400 hover:scale-105"
							to={"/signup"}
						>
							Sign Up
						</Link>
					</>
				) : (
					// Show LinkedIn & Instagram when logged in
					<>
						<a
							className="mx-3 font-semibold transition-colors duration-300 hover:text-blue-500 hover:scale-105"
							href="https://www.linkedin.com/in/sandip-singh-parmar-b29034251"
							target="_blank"
							rel="noreferrer"
						>
							LinkedIn
						</a>
						<a
							className="mx-3 font-semibold transition-colors duration-300 hover:text-pink-400 hover:scale-105"
							href="https://instagram.com/sandip_.visuals/"
							target="_blank"
							rel="noreferrer"
						>
							Instagram
						</a>
					</>
				)}

				<a
					className="mx-3 font-semibold transition-colors duration-300 hover:text-purple-400 hover:scale-105"
					href="https://github.com/sandipsinghparmar18/"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
					className="mx-3 font-semibold transition-colors duration-300 hover:text-red-400 hover:scale-105"
					href="mailto:sandipsinghparmar18@gmail.com"
				>
					E-Mail
				</a>
			</div>

			<p className="text-sm text-gray-400 mt-3 sm:mt-0">
				&copy; 2024 ChatApp. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;