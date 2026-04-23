import { motion } from "framer-motion";
import { PackageSearch, Upload, Truck, ArrowRight } from "lucide-react";

const steps = [
    {
        title: "Select Product",
        desc: "Choose from premium print categories designed for business, branding, and packaging needs.",
        icon: PackageSearch,
        tone: "from-[#fff8ef] via-[#ffedd8] to-[#ffdcb8]",
        glow: "bg-[#F68B30]/14",
        iconBg: "from-[#F68B30] to-[#ffb86b]",
        line: "from-[#F68B30]/45 to-[#ffd2a3]/40",
        chip: "Browse Premium Range",
    },
    {
        title: "Upload Design",
        desc: "Send your artwork, customize details, and prepare your order with a clean guided flow.",
        icon: Upload,
        tone: "from-[#fffaf4] via-[#fff1df] to-[#ffe6c9]",
        glow: "bg-[#f3a24f]/12",
        iconBg: "from-[#e27a22] to-[#f6b46a]",
        line: "from-[#e27a22]/40 to-[#ffd8aa]/40",
        chip: "Artwork & Customization",
    },
    {
        title: "Get Delivered",
        desc: "We print, finish, and deliver your order with speed, care, and production-ready quality.",
        icon: Truck,
        tone: "from-[#fff9f2] via-[#ffefd9] to-[#ffe3c1]",
        glow: "bg-[#617D2B]/10",
        iconBg: "from-[#617D2B] to-[#8faa45]",
        line: "from-[#617D2B]/35 to-[#dbe8bf]/40",
        chip: "Fast Reliable Dispatch",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.14,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function ProcessSection() {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#fdf4e9_32%,#f8ecde_68%,#f5eee4_100%)] px-6 py-24 sm:py-28">
            <div className="absolute inset-0">
                <div className="absolute left-[-120px] top-[-90px] h-[320px] w-[320px] rounded-full bg-[#F68B30]/14 blur-[130px]"></div>
                <div className="absolute right-[-120px] bottom-[-80px] h-[320px] w-[320px] rounded-full bg-[#ffd9b3]/24 blur-[130px]"></div>
                <div className="absolute left-[40%] top-[18%] h-[220px] w-[220px] rounded-full bg-[#fff1dd]/60 blur-[120px]"></div>
                <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:42px_42px]"></div>
            </div>

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto mb-16 max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full border border-[#f1d7bb] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c96d13] shadow-[0_12px_28px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                        Simple Process
                    </span>

                    <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-5xl">
                        How It Works
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                        A smooth premium workflow from product selection to final delivery,
                        built to keep ordering fast, clear, and professional.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="pointer-events-none absolute left-[17%] right-[17%] top-[84px] z-0 hidden h-[2px] lg:block">
                        <div className="relative h-full w-full overflow-hidden rounded-full bg-[linear-gradient(90deg,rgba(246,139,48,0.14),rgba(255,214,169,0.5),rgba(97,125,43,0.16))]">
                            <motion.div
                                animate={{ x: ["-10%", "110%"] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 h-3 w-20 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(246,139,48,0.55),rgba(255,255,255,0.9),rgba(97,125,43,0.4),transparent)] blur-[2px]"
                            />
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 top-14 z-0 hidden justify-center lg:flex">
                        <div className="relative h-[280px] w-[820px]">
                            <div className="absolute left-[70px] top-[88px] h-[120px] w-[170px] rotate-[-8deg] rounded-[24px] border border-white/80 bg-[linear-gradient(135deg,#fff7ed_0%,#ffd8ae_100%)] p-4 shadow-[0_24px_45px_rgba(15,23,42,0.12)]">
                                <div className="h-full rounded-[16px] border border-white/75 bg-white/75 p-3">
                                    <div className="h-3 w-20 rounded-full bg-[#F68B30]/80"></div>
                                    <div className="mt-3 h-2 w-12 rounded-full bg-slate-200"></div>
                                    <div className="mt-2 h-2 w-16 rounded-full bg-slate-200"></div>
                                    <div className="mt-2 h-2 w-10 rounded-full bg-slate-200"></div>
                                </div>
                            </div>

                            <div className="absolute left-1/2 top-[54px] h-[150px] w-[110px] -translate-x-1/2 rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#fffaf3_0%,#ffe5bf_100%)] p-3 shadow-[0_24px_45px_rgba(15,23,42,0.12)]">
                                <div className="h-full rounded-[16px] bg-white/75 p-3">
                                    <div className="h-14 rounded-[12px] bg-[linear-gradient(135deg,#e27a22_0%,#f6b46a_100%)]"></div>
                                    <div className="mt-3 h-2 w-14 rounded-full bg-slate-200"></div>
                                    <div className="mt-2 h-2 w-16 rounded-full bg-slate-200"></div>
                                    <div className="mt-2 h-2 w-10 rounded-full bg-slate-200"></div>
                                </div>
                            </div>

                            <div className="absolute right-[74px] top-[90px] h-[84px] w-[230px] rounded-[24px] border border-white/80 bg-[linear-gradient(135deg,#f6faef_0%,#dce9bc_100%)] p-3 shadow-[0_24px_45px_rgba(15,23,42,0.12)]">
                                <div className="flex h-full items-center rounded-[16px] bg-[linear-gradient(90deg,#617D2B_0%,#8faa45_100%)] px-5">
                                    <div className="h-6 w-6 rounded-full bg-white/25"></div>
                                    <div className="ml-4 h-2.5 w-24 rounded-full bg-white/35"></div>
                                </div>
                            </div>

                            <motion.div
                                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.04, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-[175px] top-[132px] h-[2px] w-[190px] rounded-full bg-[linear-gradient(90deg,rgba(246,139,48,0.3),rgba(255,221,191,0.9))]"
                            />
                            <motion.div
                                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.04, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                className="absolute right-[195px] top-[132px] h-[2px] w-[190px] rounded-full bg-[linear-gradient(90deg,rgba(255,221,191,0.9),rgba(97,125,43,0.35))]"
                            />

                            <div className="absolute left-[336px] top-[119px] flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/80 text-[10px] font-bold text-[#c96d13] shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
                                1
                            </div>
                            <div className="absolute right-[336px] top-[119px] flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/80 text-[10px] font-bold text-[#617D2B] shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
                                2
                            </div>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative z-10 grid gap-8 md:grid-cols-3"
                    >
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.title}
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    className={`group relative overflow-hidden rounded-[34px] border border-white/80 bg-gradient-to-br ${step.tone} p-8 shadow-[0_22px_55px_rgba(15,23,42,0.08)] transition-all duration-500 hover:shadow-[0_30px_75px_rgba(246,139,48,0.14)]`}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.42),transparent_42%)]"></div>
                                    <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${step.glow} blur-3xl transition-transform duration-700 group-hover:scale-125`}></div>
                                    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/25 blur-2xl"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between gap-4">
                                            <div
                                                className={`flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br ${step.iconBg} text-white shadow-[0_18px_36px_rgba(246,139,48,0.22)] ring-1 ring-white/60 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                            >
                                                <Icon size={28} />
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                    Step
                                                </p>
                                                <p className="text-[34px] font-black leading-none tracking-[-0.06em] text-slate-900/80">
                                                    0{index + 1}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 inline-flex rounded-full border border-white/75 bg-white/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-xl">
                                            {step.chip}
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-[28px] font-black tracking-[-0.045em] text-slate-900">
                                                {step.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                                {step.desc}
                                            </p>
                                        </div>

                                        <div className="mt-8 flex items-center gap-3">
                                            <div className={`h-[2px] flex-1 rounded-full bg-gradient-to-r ${step.line}`}></div>
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/75 bg-white/70 text-slate-500 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                                                <ArrowRight size={15} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
