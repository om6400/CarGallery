"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
	{ label: "home", href: "/" },
	{ label: "explore", href: "/explore" },
	{ label: "wallpapers", href: "/wallpapers" },
	{ label: "garage", href: "/garage" },
	{ label: "categories", href: "/categories" },
	{ label: "about", href: "/about" },
	{ label: "contact", href: "/contact" },
];

export async function generateStaticParams() {
	// Replace this with your real data source
	const images = [
		{ id: "1" },
		{ id: "2" },
		// ...all image IDs you want to pre-render
	];
	return images.map((img) => ({ id: img.id }));
}

export default function Header() {
	const [mounted, setMounted] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch
	if (!mounted) {
		return (
			<header className="fixed top-0 w-full z-50 py-6 px-6">
				<div className="max-w-[1800px] mx-auto flex items-center justify-between">
					<Link href="/" className="text-lg font-light">
						automuse
					</Link>
				</div>
			</header>
		);
	}

	return (
		<div>
			<header className="fixed top-0 w-full z-50 mix-blend-difference py-6 px-6">
				<div className="max-w-[1800px] mx-auto flex items-center justify-between">
					<Link
						href="/"
						className="text-lg font-light tracking-tight hover:opacity-70 transition-all duration-300"
					>
						automuse
					</Link>

					<button
						onClick={() => setIsMenuOpen(true)}
						className="text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300"
					>
						menu
					</button>
				</div>
			</header>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
						className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
					>
						<div className="absolute top-6 right-6">
							<button
								onClick={() => setIsMenuOpen(false)}
								className="text-white text-sm font-light tracking-wide hover:opacity-70 transition-all duration-300"
							>
								close
							</button>
						</div>

						<nav className="h-full flex flex-col items-center justify-center">
							{navItems.map((item, i) => (
								<motion.div
									key={item.href}
									initial={{ opacity: 0, y: 20 }}
									animate={{
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.4,
											delay: i * 0.1 + 0.2,
											ease: [0.22, 1, 0.36, 1],
										},
									}}
									exit={{
										opacity: 0,
										y: 10,
										transition: {
											duration: 0.2,
											delay: (navItems.length - i - 1) * 0.05,
										},
									}}
									className="mb-6 overflow-hidden"
								>
									<Link
										href={item.href}
										onClick={() => setIsMenuOpen(false)}
										className="text-white text-4xl font-extralight tracking-wide hover:opacity-70 transition-all duration-300"
									>
										{item.label}
									</Link>
								</motion.div>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}