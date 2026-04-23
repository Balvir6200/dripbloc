export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-[#f6f4ee]">
            <aside className="relative w-72 hidden md:block overflow-hidden border-r border-white/10 bg-[#07142b] text-white">
                <div className="absolute inset-0">
                    <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-[#F68B30]/20 blur-3xl"></div>
                    <div className="absolute top-1/3 -right-16 h-56 w-56 rounded-full bg-[#617D2B]/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="relative z-10 flex h-full flex-col p-6">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F68B30] to-[#ffb15c] text-lg font-black text-[#07142b] shadow-lg">
                                D
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-white">
                                    DripBloc
                                </h2>
                                <p className="text-xs font-medium tracking-[0.18em] text-white/55 uppercase">
                                    Premium Print Admin
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                                Control Center
                            </p>
                            <span className="rounded-full border border-[#F68B30]/30 bg-[#F68B30]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffd2a3]">
                                Live
                            </span>
                        </div>

                        <p className="text-sm leading-6 text-white/70">
                            Manage categories, subcategories, products, sizes, and design specs from one premium workspace.
                        </p>
                    </div>

                    <nav className="space-y-3">
                        <a
                            href="/admin/dashboard"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Dashboard</span>
                                <span className="h-2.5 w-2.5 rounded-full bg-[#F68B30] opacity-70 transition group-hover:scale-125"></span>
                            </span>
                        </a>

                        <a
                            href="/admin/categories-page"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Categories</span>
                                <span className="text-xs text-white/35 transition group-hover:text-[#F68B30]">01</span>
                            </span>
                        </a>

                        <a
                            href="/admin/subcategories-page"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Subcategories</span>
                                <span className="text-xs text-white/35 transition group-hover:text-[#F68B30]">02</span>
                            </span>
                        </a>

                        <a
                            href="/admin/products-page"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Products</span>
                                <span className="text-xs text-white/35 transition group-hover:text-[#F68B30]">03</span>
                            </span>
                        </a>

                        <a
                            href="/admin/sizes-page"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Sizes</span>
                                <span className="text-xs text-white/35 transition group-hover:text-[#F68B30]">04</span>
                            </span>
                        </a>

                        <a
                            href="/admin/design-specs-page"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Design Specs</span>
                                <span className="text-xs text-white/35 transition group-hover:text-[#F68B30]">05</span>
                            </span>
                        </a>

                        <a
                            href="/admin/pricing-page"
                            className="group block rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-[15px] font-medium text-white/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#F68B30]/35 hover:bg-white/12 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)]"
                        >
                            <span className="flex items-center justify-between">
                                <span>Pricing</span>
                                <span className="text-xs text-white/35 transition group-hover:text-[#F68B30]">06</span>
                            </span>
                        </a>
                    </nav>

                    <div className="mt-auto pt-8">
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#617D2B]"></span>
                                <p className="text-sm font-semibold text-white">
                                    System Status
                                </p>
                            </div>
                            <p className="text-sm leading-6 text-white/65">
                                Premium category-driven printing workspace with clean control and scalable management flow.
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="relative flex-1 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute left-10 top-8 h-52 w-52 rounded-full bg-[#F68B30]/10 blur-3xl"></div>
                    <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[#617D2B]/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-white/50 blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}