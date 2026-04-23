import { motion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Star,
    Layers3,
    ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function FeaturedCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories || []);
            })
            .catch(() => {
                setCategories([]);
            });
    }, []);

    const getImageUrl = (cat) => {
        if (cat.image_url) return cat.image_url;
        if (!cat.image) return null;
        if (cat.image.startsWith("http")) return cat.image;
        if (cat.image.startsWith("/")) return cat.image;
        if (cat.image.startsWith("images/")) return `/${cat.image}`;
        return `/storage/${cat.image}`;
    };

    const getBadge = (cat, index) => {
        if (cat.is_featured) return "Featured";
        const labels = ["Popular", "Premium", "Trending", "Top Pick"];
        return labels[index % labels.length];
    };

    const truncateText = (text, max = 110) => {
        if (!text) {
            return "Discover premium print solutions crafted for branding, marketing, packaging, and standout business presentation.";
        }

        const clean = text.replace(/\s+/g, " ").trim();
        return clean.length > max ? `${clean.slice(0, max)}...` : clean;
    };

    const getAccent = (index) => {
        const accents = [
            "from-[#F68B30] via-[#ffb15c] to-[#ffe0bd]",
            "from-[#617D2B] via-[#8aa645] to-[#dce7bc]",
            "from-[#111827] via-[#334155] to-[#cbd5e1]",
        ];

        return accents[index % accents.length];
    };

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(246,139,48,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(97,125,43,0.10),_transparent_28%),linear-gradient(to_bottom,_#fbfaf7,_#f5f3ed)] py-24 md:py-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-80px] top-16 h-72 w-72 rounded-full bg-[#F68B30]/10 blur-[120px]" />
                <div className="absolute right-[-80px] top-40 h-72 w-72 rounded-full bg-[#617D2B]/10 blur-[120px]" />
                <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0f172a]/5 blur-[140px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#f1dfcb] bg-white/90 px-5 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                        <Sparkles size={16} className="text-[#F68B30]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F68B30]">
                            Signature Print Ecosystem
                        </span>
                    </div>

                    <h2 className="mt-7 text-4xl font-bold leading-[1.02] text-[#0f172a] md:text-5xl xl:text-6xl">
                        Premium Categories
                        <span className="mt-3 block bg-gradient-to-r from-[#F68B30] via-[#dc9934] to-[#617D2B] bg-clip-text text-transparent">
                            Designed to Elevate Brands
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                        Explore a curated range of high-impact printing categories
                        crafted for businesses, events, packaging, promotions, and
                        premium brand presentation.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                            <Star size={15} className="text-[#F68B30]" />
                            Premium quality
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                            <Layers3 size={15} className="text-[#617D2B]" />
                            Multi-category system
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                            <ShieldCheck size={15} className="text-[#0f172a]" />
                            Professional finish
                        </div>
                    </div>
                </motion.div>

                <div className="mt-16 md:mt-20">
                    {categories.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-[34px] border border-[#e6dece] bg-white/85 px-6 py-16 text-center shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur"
                        >
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[#F68B30]/10 blur-3xl" />
                                <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-[#617D2B]/10 blur-3xl" />
                            </div>

                            <div className="relative">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#F68B30] to-[#617D2B] shadow-[0_20px_40px_rgba(246,139,48,0.22)]">
                                    <Sparkles size={28} className="text-white" />
                                </div>

                                <h3 className="mt-6 text-3xl font-bold text-[#0f172a]">
                                    No categories available right now
                                </h3>
                                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-500">
                                    Once categories are added from the admin panel, they
                                    will appear here in a premium showcase automatically.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {categories.map((cat, index) => {
                                const imageUrl = getImageUrl(cat);

                                return (
                                    <motion.a
                                        key={cat.id}
                                        href={`/categories/${cat.slug}`}
                                        initial={{ opacity: 0, y: 36 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.55,
                                            delay: index * 0.08,
                                        }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10 }}
                                        className="group block"
                                    >
                                        <div className="relative h-full overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 group-hover:shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
                                            <div className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-[#F68B30] via-[#e7a64c] to-[#617D2B]" />

                                            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                                                <div className="absolute -left-10 top-16 h-32 w-32 rounded-full bg-[#F68B30]/10 blur-3xl" />
                                                <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-[#617D2B]/10 blur-3xl" />
                                            </div>

                                            <div className="relative h-72 overflow-hidden bg-[#ece7dd]">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={cat.name}
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div
                                                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getAccent(
                                                            index
                                                        )} px-8 text-center`}
                                                    >
                                                        <span className="text-3xl font-bold leading-tight text-white drop-shadow-sm">
                                                            {cat.name}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-[#020617]/15 to-transparent" />
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.20),transparent_30%)]" />

                                                <div className="absolute left-5 top-5 flex items-center gap-2">
                                                    <span className="inline-flex items-center rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f172a] shadow-lg backdrop-blur">
                                                        {getBadge(cat, index)}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-5 left-5 right-5">
                                                    <div className="flex items-end justify-between gap-4">
                                                        <div>
                                                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/75">
                                                                DripBloc Category
                                                            </p>
                                                            <h3 className="mt-2 text-3xl font-bold leading-tight text-white">
                                                                {cat.name}
                                                            </h3>
                                                        </div>

                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition duration-300 group-hover:translate-x-1">
                                                            <ArrowRight size={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative p-6">
                                                <div className="mb-4 flex items-center justify-between gap-3">
                                                    <div className="inline-flex items-center gap-2">
                                                        <span className="h-2.5 w-2.5 rounded-full bg-[#F68B30]" />
                                                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                                                            Premium print solution
                                                        </span>
                                                    </div>

                                                    <div className="rounded-full border border-[#ece5d8] bg-[#faf8f3] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                                        Explore
                                                    </div>
                                                </div>

                                                <p className="min-h-[88px] text-[15px] leading-8 text-slate-600">
                                                    {truncateText(cat.description)}
                                                </p>

                                                <div className="mt-7 flex items-center justify-between border-t border-[#eee7da] pt-5">
                                                    <div>
                                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                                            Crafted for impact
                                                        </p>
                                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                                            Premium design, print, and presentation
                                                        </p>
                                                    </div>

                                                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F68B30] to-[#e49a3f] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(246,139,48,0.26)] transition-all duration-300 group-hover:gap-3 group-hover:shadow-[0_18px_34px_rgba(246,139,48,0.34)]">
                                                        View
                                                        <ArrowRight
                                                            size={17}
                                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}