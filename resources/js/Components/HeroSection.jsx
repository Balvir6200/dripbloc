import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">

            {/* 🌈 Animated Gradient Background */}
            <motion.div
                animate={{ 
                    background: [
                        "radial-gradient(circle at 20% 20%, #F68B30 0%, transparent 40%)",
                        "radial-gradient(circle at 80% 30%, #617D2B 0%, transparent 40%)",
                        "radial-gradient(circle at 50% 80%, #F68B30 0%, transparent 40%)",
                        "radial-gradient(circle at 20% 20%, #F68B30 0%, transparent 40%)"
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0 opacity-20"
            />

            {/* Base Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E9E4AD] via-white to-[#F68B30]/20"></div>

            {/* 🧊 Floating Cards */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-10 top-32 hidden md:block"
            >
                <div className="bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow-xl w-48">
                    <p className="font-semibold">Business Cards</p>
                    <p className="text-sm text-gray-500">Premium Matte</p>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute right-10 bottom-32 hidden md:block"
            >
                <div className="bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow-xl w-48">
                    <p className="font-semibold">Poster Printing</p>
                    <p className="text-sm text-gray-500">HD Quality</p>
                </div>
            </motion.div>

            {/* 🧠 Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

                {/* Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-md mb-6"
                >
                    <Sparkles size={16} className="text-[#F68B30]" />
                    <span className="text-sm font-medium text-gray-700">
                        Premium Multi-Category Printing Platform
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                >
                    Print Your Ideas <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F68B30] to-[#617D2B]">
                        Into Reality
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
                >
                    Business cards, posters, banners & packaging —
                    everything you need to build your brand.
                </motion.p>

                {/* CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="btn-primary flex items-center justify-center gap-2 text-lg">
                        Start Printing
                        <ArrowRight size={18} />
                    </button>

                    <button className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:shadow-md transition text-lg">
                        Explore Categories
                    </button>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-gray-500 mt-2 rounded-full animate-bounce"></div>
                </div>
            </div>

        </section>
    );
}