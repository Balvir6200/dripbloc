import AdminLayout from "../../Layouts/AdminLayout";

const modules = [
    {
        title: "Categories",
        icon: "C",
        href: "/admin/categories-page",
        text: "Build your category foundation.",
        soft: "from-[#fff8ef] via-[#fff4e7] to-[#ffe7c8]",
        border: "border-[#f2dcc0]",
        iconBg: "from-[#F68B30] to-[#ffb86b]",
        textColor: "text-[#c96d13]",
        glow: "shadow-[0_18px_35px_rgba(246,139,48,0.20)]",
    },
    {
        title: "Subcategories",
        icon: "S",
        href: "/admin/subcategories-page",
        text: "Create clean hierarchy layers.",
        soft: "from-[#f7fbef] via-[#f1f8e5] to-[#e5f0c8]",
        border: "border-[#dbe8c5]",
        iconBg: "from-[#617D2B] to-[#93b14e]",
        textColor: "text-[#617D2B]",
        glow: "shadow-[0_18px_35px_rgba(97,125,43,0.18)]",
    },
    {
        title: "Products",
        icon: "P",
        href: "/admin/products-page",
        text: "Turn structure into products.",
        soft: "from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]",
        border: "border-slate-200",
        iconBg: "from-[#334155] to-[#64748b]",
        textColor: "text-slate-700",
        glow: "shadow-[0_18px_35px_rgba(51,65,85,0.16)]",
    },
    {
        title: "Sizes",
        icon: "Z",
        href: "/admin/sizes-page",
        text: "Manage flexible size options.",
        soft: "from-[#faf7ff] via-[#f6f0ff] to-[#ebddff]",
        border: "border-[#e7dbff]",
        iconBg: "from-[#7c3aed] to-[#a78bfa]",
        textColor: "text-[#7c3aed]",
        glow: "shadow-[0_18px_35px_rgba(124,58,237,0.18)]",
    },
    {
        title: "Pricing",
        icon: "$",
        href: "/admin/pricing-page",
        text: "Control pricing with clarity.",
        soft: "from-[#fffaf0] via-[#fff7dc] to-[#ffefad]",
        border: "border-[#f2e1ab]",
        iconBg: "from-[#ca8a04] to-[#facc15]",
        textColor: "text-[#a16207]",
        glow: "shadow-[0_18px_35px_rgba(202,138,4,0.18)]",
    },
    {
        title: "Website",
        icon: "W",
        href: "/",
        text: "Preview customer storefront.",
        soft: "from-[#f8fafc] via-[#edf2f7] to-[#dfe7f1]",
        border: "border-slate-200",
        iconBg: "from-[#0f172a] to-[#1e293b]",
        textColor: "text-slate-800",
        glow: "shadow-[0_18px_35px_rgba(15,23,42,0.16)]",
    },
];

export default function HomePage({ stats = {}, insights = {} }) {
    const statCards = [
        {
            title: "Categories",
            value: stats.categories ?? 0,
            sub: "Active structure",
            color: "from-[#F68B30] to-[#ffb86b]",
            glow: "shadow-[0_20px_40px_rgba(246,139,48,0.18)]",
            tone: "from-[#fff9f2] via-[#fff4e8] to-[#ffe9cf]",
        },
        {
            title: "Subcategories",
            value: stats.subcategories ?? 0,
            sub: "Organized groups",
            color: "from-[#617D2B] to-[#8faa45]",
            glow: "shadow-[0_20px_40px_rgba(97,125,43,0.18)]",
            tone: "from-[#f8fcef] via-[#f1f7e4] to-[#e5efc9]",
        },
        {
            title: "Products",
            value: stats.products ?? 0,
            sub: "Ready to sell",
            color: "from-[#334155] to-[#64748b]",
            glow: "shadow-[0_20px_40px_rgba(51,65,85,0.16)]",
            tone: "from-[#fbfcfd] via-[#f3f6f9] to-[#e6ebf2]",
        },
        {
            title: "Design Specs",
            value: stats.designSpecs ?? 0,
            sub: "Print rules",
            color: "from-[#0f766e] to-[#2dd4bf]",
            glow: "shadow-[0_20px_40px_rgba(15,118,110,0.18)]",
            tone: "from-[#f2fffd] via-[#ebfffb] to-[#d7faf2]",
        },
    ];

    const insightCards = [
        {
            title: "No Subcategories",
            value: insights.withoutSubcategories ?? 0,
            tone: "text-[#c96d13]",
            bg: "bg-[#fff4e8]",
            border: "border-[#f5dcc2]",
        },
        {
            title: "No Products",
            value: insights.withoutProducts ?? 0,
            tone: "text-slate-700",
            bg: "bg-[#f8fafc]",
            border: "border-slate-200",
        },
        {
            title: "No Sizes",
            value: insights.withoutSizes ?? 0,
            tone: "text-[#7c3aed]",
            bg: "bg-[#f7f2ff]",
            border: "border-[#e6dbff]",
        },
        {
            title: "No Design Specs",
            value: insights.withoutDesignSpecs ?? 0,
            tone: "text-[#0f766e]",
            bg: "bg-[#ecfeff]",
            border: "border-[#c7f3ef]",
        },
    ];

    return (
        <AdminLayout>
            <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7f2e9_0%,#f2ebe1_38%,#eee6db_100%)] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-10%] top-[-8%] h-[420px] w-[420px] rounded-full bg-[#F68B30]/12 blur-3xl"></div>
                    <div className="absolute right-[-6%] top-[2%] h-[360px] w-[360px] rounded-full bg-[#617D2B]/10 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[25%] h-[320px] w-[320px] rounded-full bg-[#0f766e]/8 blur-3xl"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30"></div>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((stat) => (
                            <div
                                key={stat.title}
                                className={`group relative overflow-hidden rounded-[30px] border border-white/75 bg-gradient-to-br ${stat.tone} p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_28px_60px_rgba(15,23,42,0.10)] sm:p-6`}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.30),transparent_45%)]"></div>
                                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/60 blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
                                <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/35 blur-2xl"></div>

                                <div className="relative z-10 flex items-start justify-between gap-4">
                                    <div className="space-y-2.5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-600">
                                            {stat.title}
                                        </p>

                                        <h3 className="text-[38px] font-black leading-none tracking-[-0.06em] text-slate-900 sm:text-[44px] lg:text-[48px]">
                                            {stat.value}
                                        </h3>

                                        <p className="text-sm font-medium text-slate-600">
                                            {stat.sub}
                                        </p>
                                    </div>

                                    <div
                                        className={`relative h-12 w-12 shrink-0 rounded-[18px] bg-gradient-to-br ${stat.color} ${stat.glow} ring-1 ring-white/70 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110`}
                                    >
                                        <div className="absolute inset-[1px] rounded-[17px] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)]"></div>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/45">
                                    <div
                                        className={`h-full w-2/3 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 group-hover:w-[88%]`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="mt-6 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
                        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,251,246,0.94),rgba(248,242,232,0.96),rgba(241,234,225,0.98))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:rounded-[40px] sm:p-8 lg:p-10">
                            <div className="absolute inset-0">
                                <div className="absolute -left-12 top-0 h-52 w-52 rounded-full bg-[#F68B30]/14 blur-3xl"></div>
                                <div className="absolute right-[-10px] top-[-20px] h-52 w-52 rounded-full bg-[#617D2B]/12 blur-3xl"></div>
                                <div className="absolute bottom-[-20px] left-1/3 h-40 w-40 rounded-full bg-[#0f766e]/10 blur-3xl"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.028)_1px,transparent_1px)] bg-[size:38px_38px] opacity-35"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.34),transparent_35%,rgba(255,255,255,0.1)_70%,transparent)]"></div>
                            </div>

                            <div className="relative z-10 max-w-3xl">
                                <div className="mb-6 flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center rounded-full border border-[#F68B30]/20 bg-[#fff1e3] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c96d13] shadow-sm backdrop-blur-sm">
                                        DripBloc Admin
                                    </span>

                                    <span className="inline-flex items-center gap-2 rounded-full border border-[#617D2B]/15 bg-[#f4f8ea] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#617D2B] shadow-sm backdrop-blur-sm">
                                        <span className="h-2 w-2 rounded-full bg-[#617D2B]"></span>
                                        Premium Workspace
                                    </span>
                                </div>

                                <div className="space-y-5 sm:space-y-6">
                                    <h1 className="max-w-3xl text-[30px] font-black leading-[0.96] tracking-[-0.07em] text-[#0f172a] sm:text-[44px] lg:text-[62px]">
                                        Control your print
                                        <br />
                                        ecosystem with
                                        <br />
                                        clarity, luxury,
                                        <br />
                                        and precision
                                    </h1>

                                    <p className="max-w-2xl text-[14px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        A premium command center for categories, products,
                                        sizes, pricing, and design workflows. Manage every
                                        layer of your printing system with a cleaner structure,
                                        stronger control, and a refined visual experience.
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <a
                                        href="/admin/categories-page"
                                        className="inline-flex items-center rounded-2xl bg-[#0f172a] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#111c32] hover:shadow-[0_24px_40px_rgba(15,23,42,0.20)]"
                                    >
                                        Open Categories
                                    </a>

                                    <a
                                        href="/admin/products-page"
                                        className="inline-flex items-center rounded-2xl border border-white/80 bg-white/85 px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_36px_rgba(15,23,42,0.10)]"
                                    >
                                        Open Products
                                    </a>
                                </div>

                                <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
                                    {insightCards.slice(0, 3).map((item) => (
                                        <div
                                            key={item.title}
                                            className={`group rounded-[22px] border ${item.border} ${item.bg} px-4 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.07)]`}
                                        >
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                {item.title}
                                            </p>
                                            <h3 className={`mt-2 text-[26px] font-black tracking-[-0.05em] sm:text-[28px] ${item.tone}`}>
                                                {item.value}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a
                            href="/admin/design-specs-page"
                            className="group relative overflow-hidden rounded-[36px] border border-[#bdece6] bg-[linear-gradient(165deg,#031f20_0%,#073a38_42%,#0f6c61_100%)] p-6 text-white shadow-[0_30px_90px_rgba(15,118,110,0.24)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_100px_rgba(15,118,110,0.30)] sm:rounded-[40px] sm:p-7"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(94,234,212,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_22%)]"></div>
                            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#2dd4bf]/20 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
                            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-white/10 blur-3xl"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.06),transparent_35%)]"></div>
                            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]"></div>

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
                                        Spotlight Module
                                    </span>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#14b8a6] to-[#5eead4] text-xl font-black text-white shadow-[0_16px_30px_rgba(45,212,191,0.25)] ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                                        D
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4 sm:mt-10">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#99f6e4]">
                                        Design Specs System
                                    </p>

                                    <h2 className="max-w-sm text-[28px] font-black leading-[1.08] tracking-[-0.05em] text-white sm:text-[36px]">
                                        The core logic behind premium print accuracy
                                    </h2>

                                    <p className="max-w-md text-sm leading-7 text-white/78 sm:leading-8">
                                        Manage artwork rules, file requirements, and print-ready
                                        guidance in one polished control layer that keeps every
                                        output professional, consistent, and production-ready.
                                    </p>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/[0.11]">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                                            Missing Specs
                                        </p>
                                        <h4 className="mt-2 text-2xl font-black text-white">
                                            {insights.withoutDesignSpecs ?? 0}
                                        </h4>
                                    </div>

                                    <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/[0.11]">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                                            Total Specs
                                        </p>
                                        <h4 className="mt-2 text-2xl font-black text-white">
                                            {stats.designSpecs ?? 0}
                                        </h4>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 inline-flex items-center text-sm font-semibold text-[#ccfbf1]">
                                    Open Design Specs
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">
                                        →
                                    </span>
                                </div>
                            </div>
                        </a>
                    </section>

                    <section className="mt-8">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                    Quick Access
                                </p>
                                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-900 sm:text-3xl">
                                    Core modules
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                                    Jump directly into the main parts of your premium print system.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {modules.map((module) => (
                                <a
                                    key={module.title}
                                    href={module.href}
                                    className={`group relative overflow-hidden rounded-[30px] border ${module.border} bg-gradient-to-br ${module.soft} p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_55px_rgba(15,23,42,0.10)] sm:rounded-[32px] sm:p-6`}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.38),transparent_42%)]"></div>
                                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/50 blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
                                    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/30 blur-2xl"></div>

                                    <div className="relative z-10 flex items-start justify-between">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br ${module.iconBg} text-lg font-black text-white ${module.glow} ring-1 ring-white/60 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110`}
                                        >
                                            {module.icon}
                                        </div>

                                        <span className="rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 shadow-sm backdrop-blur-sm">
                                            Module
                                        </span>
                                    </div>

                                    <div className="relative z-10 mt-5 space-y-2.5">
                                        <h3 className="text-[22px] font-black tracking-[-0.04em] text-slate-900 sm:text-[24px]">
                                            {module.title}
                                        </h3>

                                        <p className="text-sm leading-7 text-slate-600">
                                            {module.text}
                                        </p>
                                    </div>

                                    <div className="relative z-10 mt-6 flex items-center justify-between">
                                        <div className="h-[2px] w-16 rounded-full bg-white/70 transition-all duration-500 group-hover:w-24"></div>
                                        <div
                                            className={`inline-flex items-center text-sm font-semibold ${module.textColor}`}
                                        >
                                            Open
                                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
