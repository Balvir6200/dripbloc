import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowUpRight } from "lucide-react";

const products = [
    {
        name: "Business Cards",
        price: "$199",
        tag: "Best Seller",
        gradient: "from-[#F68B30] via-[#f7a354] to-[#ffca8b]",
    },
    {
        name: "Flyer Printing",
        price: "$299",
        tag: "Popular",
        gradient: "from-[#617D2B] via-[#7f9a3c] to-[#b2cc73]",
    },
    {
        name: "Poster Printing",
        price: "$399",
        tag: "High Quality",
        gradient: "from-[#F68B30] via-[#ff9a4d] to-[#ffd29f]",
    },
    {
        name: "Banner Printing",
        price: "$499",
        tag: "Outdoor",
        gradient: "from-[#617D2B] via-[#789439] to-[#a7c468]",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function PremiumShowcase() {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf8f2_0%,#f6f1e7_48%,#f0eadf_100%)] py-24 sm:py-28">
            <div className="absolute inset-0">
                <div className="absolute left-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-[#F68B30]/10 blur-[140px]"></div>
                <div className="absolute bottom-[-120px] right-[-120px] h-[400px] w-[400px] rounded-full bg-[#617D2B]/10 blur-[140px]"></div>
                <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
                >
                    <span className="inline-flex rounded-full border border-[#f3dcc1] bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c96d13] shadow-[0_10px_26px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                        Premium Showcase
                    </span>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl">
                        Premium Printing Products
                    </h2>

                    <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                        Designed for brands that want to stand out with refined finishes,
                        professional quality, and a polished visual presence.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className="group relative overflow-hidden rounded-[32px] border border-white/75 bg-white/72 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.42),transparent_42%)]"></div>
                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/40 blur-3xl transition-transform duration-700 group-hover:scale-125"></div>

                            <div className="relative h-56 overflow-hidden p-5">
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-[0.14] transition-opacity duration-500 group-hover:opacity-[0.2]`}
                                ></div>

                                <div className="absolute left-4 top-4 rounded-full bg-[rgba(15,23,42,0.78)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg">
                                    {product.tag}
                                </div>

                                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] backdrop-blur-md">
                                    <ArrowUpRight size={16} />
                                </div>

                                <div className="relative mx-auto mt-10 h-[150px] w-[86%]">
                                    <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0.2)_65%,transparent_100%)] blur-xl"></div>

                                    {index === 0 && (
                                        <>
                                            <div className="absolute left-5 top-6 h-[84px] w-[124px] rotate-[-10deg] rounded-[18px] border border-white/80 bg-[linear-gradient(135deg,#fff7ef_0%,#ffe0bd_100%)] p-3 shadow-[0_18px_30px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6">
                                                <div className="h-full rounded-[12px] border border-white/70 bg-white/80 p-2">
                                                    <div className="h-2 w-14 rounded-full bg-[#F68B30]/80"></div>
                                                    <div className="mt-2 h-1.5 w-10 rounded-full bg-slate-200"></div>
                                                    <div className="mt-1.5 h-1.5 w-16 rounded-full bg-slate-200"></div>
                                                </div>
                                            </div>
                                            <div className="absolute right-4 top-10 h-[84px] w-[124px] rotate-[8deg] rounded-[18px] border border-white/80 bg-[linear-gradient(135deg,#fff8f2_0%,#ffd5a2_100%)] p-3 shadow-[0_18px_30px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:translate-y-1 group-hover:rotate-[12deg]">
                                                <div className="flex h-full items-end rounded-[12px] bg-[linear-gradient(135deg,#F68B30_0%,#ffb869_100%)] p-3">
                                                    <div className="h-5 w-5 rounded-full border border-white/40 bg-white/20"></div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {index === 1 && (
                                        <>
                                            <div className="absolute left-1/2 top-3 h-[120px] w-[92px] -translate-x-1/2 rotate-[-6deg] rounded-[16px] border border-white/80 bg-[linear-gradient(180deg,#f8fbf0_0%,#e6f0cd_100%)] p-2 shadow-[0_18px_30px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-3deg]">
                                                <div className="h-full rounded-[12px] bg-white/80 p-2">
                                                    <div className="h-10 rounded-[10px] bg-[linear-gradient(135deg,#617D2B_0%,#98b955_100%)]"></div>
                                                    <div className="mt-2 h-1.5 w-12 rounded-full bg-slate-200"></div>
                                                    <div className="mt-1.5 h-1.5 w-14 rounded-full bg-slate-200"></div>
                                                    <div className="mt-1.5 h-1.5 w-10 rounded-full bg-slate-200"></div>
                                                </div>
                                            </div>
                                            <div className="absolute left-8 top-12 h-[96px] w-[74px] rotate-[-14deg] rounded-[16px] border border-white/70 bg-white/70 shadow-[0_18px_28px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:-translate-x-1"></div>
                                            <div className="absolute right-8 top-12 h-[96px] w-[74px] rotate-[14deg] rounded-[16px] border border-white/70 bg-white/70 shadow-[0_18px_28px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:translate-x-1"></div>
                                        </>
                                    )}

                                    {index === 2 && (
                                        <>
                                            <div className="absolute left-1/2 top-2 h-[128px] w-[96px] -translate-x-1/2 rounded-[16px] border border-white/80 bg-[linear-gradient(180deg,#fff8ef_0%,#ffd6ae_100%)] p-2 shadow-[0_20px_34px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:-translate-y-1">
                                                <div className="h-full rounded-[12px] bg-[linear-gradient(180deg,#F68B30_0%,#ffb86b_45%,#fff3de_100%)] p-3">
                                                    <div className="h-full rounded-[10px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),transparent)]"></div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 left-1/2 h-4 w-[130px] -translate-x-1/2 rounded-full bg-[rgba(15,23,42,0.14)] blur-md"></div>
                                        </>
                                    )}

                                    {index === 3 && (
                                        <>
                                            <div className="absolute left-1/2 top-7 h-[70px] w-[190px] -translate-x-1/2 rounded-[20px] border border-white/80 bg-[linear-gradient(135deg,#eef6de_0%,#dbeab6_100%)] p-2 shadow-[0_18px_32px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:-translate-y-1">
                                                <div className="flex h-full items-center rounded-[14px] bg-[linear-gradient(90deg,#617D2B_0%,#8eae4d_100%)] px-4">
                                                    <div className="h-5 w-5 rounded-full bg-white/25"></div>
                                                    <div className="ml-3 h-2 w-20 rounded-full bg-white/35"></div>
                                                </div>
                                            </div>
                                            <div className="absolute left-1/2 top-[98px] h-[18px] w-[150px] -translate-x-1/2 rounded-full bg-[rgba(15,23,42,0.14)] blur-md"></div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="relative p-6 pt-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={15}
                                                className="fill-[#f59e0b] text-[#f59e0b]"
                                            />
                                        ))}
                                    </div>

                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Premium
                                    </span>
                                </div>

                                <h3 className="mt-4 text-[24px] font-black tracking-[-0.04em] text-slate-900">
                                    {product.name}
                                </h3>

                                <p className="mt-2 text-sm leading-7 text-slate-500">
                                    Luxury-grade print output with elegant finish, cleaner color,
                                    and professional presentation.
                                </p>

                                <div className="mt-6 flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                            Starting At
                                        </p>
                                        <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#F68B30]">
                                            {product.price}
                                        </p>
                                    </div>

                                    <div className="h-[2px] flex-1 rounded-full bg-[linear-gradient(90deg,rgba(246,139,48,0.18),rgba(97,125,43,0.18))]"></div>
                                </div>

                                <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F68B30] hover:shadow-[0_18px_36px_rgba(246,139,48,0.22)]">
                                    Add to Cart
                                    <ShoppingCart size={18} />
                                </button>
                            </div>

                            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,139,48,0.08),transparent_45%,rgba(97,125,43,0.08))]"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
