import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="relative overflow-hidden px-6 py-7 sm:py-8">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#d96f18_0%,#c86f24_42%,#8f7430_72%,#617D2B_100%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,230,205,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_22%)]"></div>
            <div className="absolute left-[-60px] top-[-40px] h-[150px] w-[150px] rounded-full bg-black/12 blur-[80px]"></div>
            <div className="absolute right-[-60px] bottom-[-40px] h-[150px] w-[150px] rounded-full bg-black/10 blur-[80px]"></div>

            <div className="relative z-10 mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-[24px] border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl sm:px-7 sm:py-6 lg:px-8">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_38%,rgba(255,255,255,0.04)_72%,transparent)]"></div>

                    <div className="relative z-10 text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-black/10 px-3 py-1 shadow-[0_8px_20px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                        >
                            <Sparkles size={12} className="text-[#ffe5c7]" />
                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/82">
                                Premium Printing
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mx-auto mt-3 max-w-3xl text-[24px] font-black leading-[1] tracking-[-0.045em] text-white sm:text-[30px] lg:text-[36px]"
                        >
                            Bring Your Ideas
                            <span className="text-[#ffe8cc]"> Into Premium Print</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.45 }}
                            viewport={{ once: true }}
                            className="mx-auto mt-2 max-w-xl text-xs leading-6 text-white/84 sm:text-sm"
                        >
                            Premium quality, fast delivery, and a smooth ordering experience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.45 }}
                            viewport={{ once: true }}
                            className="mt-4 flex flex-wrap items-center justify-center gap-2"
                        >
                            <span className="rounded-full border border-white/16 bg-black/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/76 backdrop-blur-xl">
                                500+ Businesses
                            </span>
                            <span className="rounded-full border border-white/16 bg-black/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/76 backdrop-blur-xl">
                                Fast Delivery
                            </span>
                            <span className="rounded-full border border-white/16 bg-black/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/76 backdrop-blur-xl">
                                Premium Finish
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-4 flex flex-col justify-center gap-2.5 sm:flex-row"
                        >
                            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-slate-900 shadow-[0_12px_28px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff7ec] sm:text-sm">
                                Start Printing
                                <ArrowRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </button>

                            <button className="rounded-xl border border-white/24 bg-black/10 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 sm:text-sm">
                                Browse Categories
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
