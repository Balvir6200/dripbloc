import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activePath, setActivePath] = useState("/");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
        };

        setActivePath(window.location.pathname || "/");
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [mobileOpen]);

    return (
        <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`sticky top-0 z-50 border-b transition-all duration-500 ${
                scrolled
                    ? "border-white/40 bg-[rgba(250,246,239,0.78)] shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
                    : "border-transparent bg-transparent"
            }`}
        >
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                    scrolled ? "opacity-100" : "opacity-0"
                } bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0.18))]`}
            />
            <div
                className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
                    scrolled ? "opacity-100" : "opacity-0"
                } bg-[linear-gradient(90deg,transparent,rgba(246,139,48,0.35),rgba(97,125,43,0.35),transparent)]`}
            />

            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                <motion.a
                    href="/"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F68B30_0%,#617D2B_100%)] text-sm font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.14)]">
                        D
                    </div>

                    <div>
                        <h1 className="text-2xl font-black tracking-[-0.05em] text-slate-900">
                            DripBloc
                        </h1>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Premium Print Platform
                        </p>
                    </div>
                </motion.a>

                <nav className="hidden items-center gap-2 md:flex">
                    {navItems.map((item) => {
                        const isActive = activePath === item.href;

                        return (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                whileHover={{ y: -2 }}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                                    isActive
                                        ? "bg-white/80 text-[#F68B30] shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                                        : "text-slate-600 hover:bg-white/70 hover:text-[#F68B30]"
                                }`}
                            >
                                {item.label}
                            </motion.a>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="hidden items-center gap-2 rounded-2xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.16)] transition-all duration-300 hover:bg-[#182237] md:inline-flex"
                    >
                        Get Started
                        <ArrowRight size={16} />
                    </motion.button>

                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:bg-white md:hidden"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.28 }}
                        className="relative border-t border-white/40 bg-[rgba(250,246,239,0.94)] px-5 pb-5 pt-3 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = activePath === item.href;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                                            isActive
                                                ? "bg-white text-[#F68B30] shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                                                : "bg-white/60 text-slate-700"
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}

                            <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.16)]">
                                Get Started
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
