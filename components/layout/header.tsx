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

const menuVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { when: "beforeChildren", staggerChildren: 0.1 },
	},
	exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

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
						className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={menuVariants}
					>
						<button
							className="absolute top-6 right-8 text-white text-sm uppercase tracking-wider hover:opacity-60 transition"
							onClick={() => setIsMenuOpen(false)}
						>
							close
						</button>
						{navItems.map((item) => (
							<motion.a
								key={item.label}
								href={item.href}
								className="text-4xl font-light uppercase tracking-widest hover:opacity-60 transition mb-6"
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.label}
							</motion.a>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}