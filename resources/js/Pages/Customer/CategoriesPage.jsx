import { useEffect, useMemo, useState } from "react";

export default function CategoryPage({ slug }) {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);

        fetch(`/api/categories/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                const categoryData = data.category ?? data;
                setCategory(categoryData);
            })
            .catch((error) => {
                console.error("Error fetching category:", error);
                setCategory(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    const subcategories = category?.subcategories ?? [];

    const allProducts = useMemo(() => {
        if (!category) return [];

        const productsFromSubcategories = subcategories.flatMap((sub) =>
            Array.isArray(sub.products)
                ? sub.products.map((product) => ({
                      ...product,
                      subcategory_name: sub.name,
                  }))
                : []
        );

        if (productsFromSubcategories.length > 0) {
            return productsFromSubcategories;
        }

        if (Array.isArray(category.products)) {
            return category.products.map((product) => ({
                ...product,
                subcategory_name: product.subcategory?.name ?? "General",
            }));
        }

        return [];
    }, [category, subcategories]);

    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            const matchesSubcategory =
                selectedSubcategory === "all" ||
                String(product.subcategory_id) === String(selectedSubcategory);

            const matchesSearch =
                product.name?.toLowerCase().includes(search.toLowerCase()) ||
                product.slug?.toLowerCase().includes(search.toLowerCase()) ||
                product.subcategory_name?.toLowerCase().includes(search.toLowerCase());

            return matchesSubcategory && matchesSearch;
        });
    }, [allProducts, selectedSubcategory, search]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center">
                <div className="rounded-2xl bg-white px-8 py-6 shadow-lg border border-[#ebe7dc] text-[#1f2937] text-lg font-medium">
                    Loading category...
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center px-6">
                <div className="max-w-xl w-full bg-white border border-[#ebe7dc] rounded-[28px] p-10 shadow-lg text-center">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#fff3e8] flex items-center justify-center text-[#F68B30] text-2xl font-bold">
                        !
                    </div>
                    <h2 className="text-3xl font-bold text-[#111827] mb-3">
                        Category not found
                    </h2>
                    <p className="text-[#6b7280] text-base">
                        We could not load this category right now. Please check the URL
                        or try again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f7f2] text-[#111827]">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff4e8] via-[#f8f7f2] to-[#fffdf8]"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#F68B30]/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0f172a]/5 blur-3xl rounded-full"></div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#f3dcc2] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#F68B30] shadow-sm">
                                Premium Print Category
                            </div>

                            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0f172a]">
                                {category.name}
                            </h1>

                            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-[#475569]">
                                {category.description ||
                                    "Explore premium print products, subcategories, pricing-friendly options, and modern custom solutions built for bold brands."}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="rounded-2xl bg-white border border-[#ebe7dc] px-5 py-4 shadow-sm min-w-[150px]">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8] font-semibold">
                                        Subcategories
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-[#0f172a]">
                                        {subcategories.length}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white border border-[#ebe7dc] px-5 py-4 shadow-sm min-w-[150px]">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8] font-semibold">
                                        Products
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-[#0f172a]">
                                        {allProducts.length}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white border border-[#ebe7dc] px-5 py-4 shadow-sm min-w-[150px]">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8] font-semibold">
                                        Brand Style
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-[#F68B30]">
                                        Premium
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="rounded-[32px] border border-[#ebe7dc] bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)] p-5 md:p-6">
                                <div className="aspect-[4/3] rounded-[24px] overflow-hidden bg-gradient-to-br from-[#fff3e8] to-[#f3f4f6]">
                                    {category.image ? (
                                        <img
                                            src={
                                                category.image.startsWith("http")
                                                    ? category.image
                                                    : `/storage/${category.image}`
                                            }
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-center p-8">
                                            <div>
                                                <div className="text-[#F68B30] text-sm font-semibold uppercase tracking-[0.25em]">
                                                    DripBloc
                                                </div>
                                                <h3 className="mt-3 text-3xl font-bold text-[#0f172a]">
                                                    {category.name}
                                                </h3>
                                                <p className="mt-3 text-[#64748b]">
                                                    Premium print display category showcase
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-5">
                                    <div className="rounded-2xl bg-[#f8fafc] border border-[#e5e7eb] px-4 py-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">
                                            Custom Ready
                                        </p>
                                        <p className="mt-2 text-lg font-bold text-[#0f172a]">
                                            Fast Setup
                                        </p>
                                    </div>
                                    <div className="rounded-2xl bg-[#fff7ed] border border-[#fed7aa] px-4 py-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb923c]">
                                            Print Quality
                                        </p>
                                        <p className="mt-2 text-lg font-bold text-[#9a3412]">
                                            High Impact
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="rounded-[30px] border border-[#ebe7dc] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden">
                    <div className="border-b border-[#f1ede4] px-6 py-6 md:px-8">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F68B30]">
                                    Explore Collection
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-[#0f172a]">
                                    Subcategories & Products
                                </h2>
                                <p className="mt-2 text-[#64748b]">
                                    Browse by subcategory, search quickly, and open any
                                    product detail page.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search product, slug, subcategory..."
                                    className="w-full sm:w-80 rounded-2xl border border-[#e5e7eb] bg-[#fcfcfb] px-4 py-3 outline-none focus:border-[#F68B30] focus:ring-2 focus:ring-[#F68B30]/20"
                                />

                                <select
                                    value={selectedSubcategory}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    className="w-full sm:w-64 rounded-2xl border border-[#e5e7eb] bg-[#fcfcfb] px-4 py-3 outline-none focus:border-[#F68B30] focus:ring-2 focus:ring-[#F68B30]/20"
                                >
                                    <option value="all">All Subcategories</option>
                                    {subcategories.map((sub) => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {subcategories.length > 0 && (
                        <div className="px-6 md:px-8 pt-6">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedSubcategory("all")}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                                        selectedSubcategory === "all"
                                            ? "bg-[#F68B30] text-white shadow-md"
                                            : "bg-[#f8fafc] text-[#475569] border border-[#e5e7eb]"
                                    }`}
                                >
                                    All
                                </button>

                                {subcategories.map((sub) => (
                                    <button
                                        key={sub.id}
                                        type="button"
                                        onClick={() => setSelectedSubcategory(String(sub.id))}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                                            String(selectedSubcategory) === String(sub.id)
                                                ? "bg-[#0f172a] text-white shadow-md"
                                                : "bg-[#f8fafc] text-[#475569] border border-[#e5e7eb] hover:border-[#F68B30] hover:text-[#F68B30]"
                                        }`}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-6 md:p-8">
                        {filteredProducts.length > 0 ? (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group rounded-[28px] border border-[#ebe7dc] bg-white overflow-hidden shadow-sm hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#fff7ed] to-[#f8fafc]">
                                            {product.image ? (
                                                <img
                                                    src={
                                                        product.image.startsWith("http")
                                                            ? product.image
                                                            : `/storage/${product.image}`
                                                    }
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-center p-6">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-[0.25em] text-[#F68B30] font-semibold">
                                                            Premium Product
                                                        </p>
                                                        <h3 className="mt-2 text-2xl font-bold text-[#0f172a]">
                                                            {product.name}
                                                        </h3>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-[#F68B30] shadow-sm">
                                                    {product.subcategory_name || "General"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#111827] line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-[#64748b] line-clamp-1">
                                                        {product.slug}
                                                    </p>
                                                </div>

                                                <div className="shrink-0 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] px-3 py-2">
                                                    <p className="text-sm font-bold text-[#F68B30]">
                                                        ₹{Number(product.base_price || 0).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5 flex items-center justify-between">
                                                <div className="text-sm text-[#94a3b8] font-medium">
                                                    Premium print solution
                                                </div>

                                                <a
                                                    href={`/products/${product.slug}`}
                                                    className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#F68B30]"
                                                >
                                                    View Product
                                                    <span>→</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[28px] border border-dashed border-[#d6d3d1] bg-[#fcfcfb] px-8 py-16 text-center">
                                <div className="w-20 h-20 mx-auto rounded-full bg-[#fff3e8] flex items-center justify-center text-[#F68B30] text-2xl font-bold">
                                    0
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-[#111827]">
                                    No products found
                                </h3>
                                <p className="mt-3 text-[#64748b] max-w-xl mx-auto">
                                    Try changing the subcategory filter or search keyword.
                                    If products still do not appear, then the API response may
                                    not be returning subcategory products yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}