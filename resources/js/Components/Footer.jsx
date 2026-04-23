import { ArrowRight, Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0d0d0a] text-slate-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(246,139,48,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(97,125,43,0.14),transparent_26%)]"></div>
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]"></div>

            <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F68B30_0%,#617D2B_100%)] text-sm font-black text-white shadow-[0_14px_30px_rgba(246,139,48,0.18)]">
                                D
                            </div>

                            <div>
                                <h2 className="text-2xl font-black tracking-[-0.05em] text-white">
                                    DripBloc
                                </h2>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                                    Premium Print Platform
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
                            Premium multi-category printing platform for modern businesses,
                            brands, and creators.
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 backdrop-blur-xl">
                            <Sparkles size={12} className="text-[#F68B30]" />
                            Print with confidence
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white">
                            Company
                        </h3>

                        <ul className="space-y-3 text-sm text-white/55">
                            {["About", "Services", "Contact"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="transition duration-300 hover:text-[#F68B30]"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white">
                            Categories
                        </h3>

                        <ul className="space-y-3 text-sm text-white/55">
                            {["Business Cards", "Flyers", "Posters", "Banners"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="transition duration-300 hover:text-[#F68B30]"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white">
                            Stay Updated
                        </h3>

                        <p className="mb-4 text-sm leading-7 text-white/55">
                            Get offers, print updates, and premium product launches.
                        </p>

                        <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none"
                            />
                            <button className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F68B30] text-white shadow-[0_12px_26px_rgba(246,139,48,0.20)] transition duration-300 hover:bg-[#ff9b43]">
                                <ArrowRight size={17} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row">
                    <p>© 2026 DripBloc. All rights reserved.</p>

                    <div className="flex items-center gap-4">
                        <a href="#" className="transition hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
