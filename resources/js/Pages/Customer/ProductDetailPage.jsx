import { useEffect, useMemo, useState } from "react";

export default function ProductDetailPage({ slug }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [sizes, setSizes] = useState([]);
    const [pricing, setPricing] = useState([]);
    const [designSpecs, setDesignSpecs] = useState([]);
    const [selectedSizeId, setSelectedSizeId] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState("");

    useEffect(() => {
        fetch(`/api/products/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
                setSizes(data.sizes || []);
                setPricing(data.pricing || []);
                setDesignSpecs(data.design_specs || []);

                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSizeId(String(data.sizes[0].id));
                }
            })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
    }, [slug]);

    const selectedDesignSpec = useMemo(() => {
        if (!selectedSizeId) return null;

        return (
            designSpecs.find(
                (item) => String(item.category_size_id) === String(selectedSizeId)
            ) || null
        );
    }, [designSpecs, selectedSizeId]);

    const filteredPricing = useMemo(() => {
        if (!selectedSizeId) return pricing;

        const matchedPricing = pricing.filter(
            (item) => String(item.category_size_id) === String(selectedSizeId)
        );

        return matchedPricing.length > 0 ? matchedPricing : pricing;
    }, [pricing, selectedSizeId]);

    const quantityOptions = useMemo(() => {
        return [...new Set(filteredPricing.map((item) => item.quantity))];
    }, [filteredPricing]);

    const selectedPrice = useMemo(() => {
        if (!selectedQuantity) return null;

        return (
            filteredPricing.find(
                (item) => String(item.quantity) === String(selectedQuantity)
            ) || null
        );
    }, [filteredPricing, selectedQuantity]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f7f2] px-6 py-10">
                <div className="mx-auto max-w-6xl animate-pulse">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div className="h-[420px] rounded-3xl bg-white shadow"></div>
                        <div className="space-y-4 rounded-3xl bg-white p-8 shadow">
                            <div className="h-10 w-2/3 rounded-xl bg-gray-200"></div>
                            <div className="h-6 w-1/3 rounded-xl bg-gray-200"></div>
                            <div className="h-24 rounded-xl bg-gray-200"></div>
                            <div className="h-14 w-40 rounded-xl bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center px-6">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow p-10 text-center">
                    <div className="text-5xl mb-4">📦</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Product not found
                    </h2>
                    <p className="text-gray-600">
                        The product you are trying to view is not available right now.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f7f2]">
            <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7ed] via-[#fffaf3] to-[#f5f3e8]">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-orange-200/30 blur-3xl"></div>
                    <div className="absolute right-10 top-20 h-52 w-52 rounded-full bg-amber-200/30 blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-lime-200/20 blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-6 py-12 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-[#F68B30] shadow-sm mb-6">
                                Premium Printing Product
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
                                {product.name}
                            </h1>

                            <p className="text-lg text-gray-600 leading-8 max-w-2xl mb-8">
                                {product.description ||
                                    "Premium custom printing solution designed for modern businesses, creators, and brands who want high-quality printed products with a polished finish."}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="bg-white rounded-2xl px-5 py-4 shadow border border-orange-100">
                                    <p className="text-sm text-gray-500">Starting Price</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ₹{selectedPrice ? selectedPrice.price : product.base_price}
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl px-5 py-4 shadow border border-orange-100">
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {product.category?.name || "Printing"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-[#F68B30] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition">
                                    Start Order
                                </button>

                                <button className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
                                    View Details
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white rounded-[32px] p-5 shadow-xl border border-white/70">
                                <div className="rounded-[28px] overflow-hidden bg-gradient-to-br from-[#fff8ef] to-[#f4f1e8] h-[420px] flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center px-6">
                                            <div className="w-24 h-24 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-4xl mb-4">
                                                🖨️
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                Premium Product Preview
                                            </h3>
                                            <p className="text-gray-500">
                                                Product image will appear here once added from admin panel.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 border border-orange-100">
                                <p className="text-sm font-semibold text-gray-900">
                                    Print Ready
                                </p>
                                <p className="text-xs text-gray-500">
                                    Professional quality
                                </p>
                            </div>

                            <div className="absolute -bottom-4 right-6 bg-white rounded-2xl shadow-lg px-4 py-3 border border-orange-100">
                                <p className="text-sm font-semibold text-gray-900">
                                    Fast Setup
                                </p>
                                <p className="text-xs text-gray-500">
                                    Easy ordering flow
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Configure Your Print
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Size
                                    </label>
                                    <select
                                        value={selectedSizeId}
                                        onChange={(e) => {
                                            setSelectedSizeId(e.target.value);
                                            setSelectedQuantity("");
                                        }}
                                        className="w-full rounded-2xl border border-gray-200 bg-[#f8f7f2] px-4 py-3 text-gray-800 outline-none focus:border-[#F68B30]"
                                    >
                                        <option value="">Choose size</option>
                                        {sizes.map((size) => (
                                            <option key={size.id} value={size.id}>
                                                {size.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Quantity
                                    </label>
                                    <select
                                        value={selectedQuantity}
                                        onChange={(e) => setSelectedQuantity(e.target.value)}
                                        className="w-full rounded-2xl border border-gray-200 bg-[#f8f7f2] px-4 py-3 text-gray-800 outline-none focus:border-[#F68B30]"
                                    >
                                        <option value="">Choose quantity</option>
                                        {quantityOptions.map((qty) => (
                                            <option key={qty} value={qty}>
                                                {qty}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="rounded-2xl bg-[#f8f7f2] p-5 border border-gray-100">
                                    <p className="text-sm text-gray-500">Bleed Size</p>
                                    <p className="text-lg font-bold text-gray-900 mt-2">
                                        {selectedDesignSpec?.bleed_size || "Not added yet"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#f8f7f2] p-5 border border-gray-100">
                                    <p className="text-sm text-gray-500">Trim Size</p>
                                    <p className="text-lg font-bold text-gray-900 mt-2">
                                        {selectedDesignSpec?.trim_size || "Not added yet"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#f8f7f2] p-5 border border-gray-100">
                                    <p className="text-sm text-gray-500">Safe Area</p>
                                    <p className="text-lg font-bold text-gray-900 mt-2">
                                        {selectedDesignSpec?.safe_area || "Not added yet"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Template Downloads
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <a
                                    href={selectedDesignSpec?.jpg_file || "#"}
                                    className={`rounded-2xl px-5 py-4 text-center font-semibold border transition ${
                                        selectedDesignSpec?.jpg_file
                                            ? "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                                            : "bg-gray-100 border-gray-200 text-gray-400 pointer-events-none"
                                    }`}
                                >
                                    Download JPG
                                </a>

                                <a
                                    href={selectedDesignSpec?.png_file || "#"}
                                    className={`rounded-2xl px-5 py-4 text-center font-semibold border transition ${
                                        selectedDesignSpec?.png_file
                                            ? "bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100"
                                            : "bg-gray-100 border-gray-200 text-gray-400 pointer-events-none"
                                    }`}
                                >
                                    Download PNG
                                </a>

                                <a
                                    href={selectedDesignSpec?.pdf_file || "#"}
                                    className={`rounded-2xl px-5 py-4 text-center font-semibold border transition ${
                                        selectedDesignSpec?.pdf_file
                                            ? "bg-lime-50 border-lime-200 text-lime-700 hover:bg-lime-100"
                                            : "bg-gray-100 border-gray-200 text-gray-400 pointer-events-none"
                                    }`}
                                >
                                    Download PDF
                                </a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Product Overview
                            </h2>
                            <p className="text-gray-600 leading-8">
                                {product.description ||
                                    "This product is part of the DripBloc premium printing system. It is designed to support real-world print use cases with scalable configuration, clean presentation, and a professional customer experience."}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white p-8 rounded-3xl shadow sticky top-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Quick Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="rounded-2xl bg-[#f8f7f2] p-4">
                                    <p className="text-sm text-gray-500">Product Name</p>
                                    <p className="font-bold text-gray-900 mt-1">
                                        {product.name}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#f8f7f2] p-4">
                                    <p className="text-sm text-gray-500">Selected Size</p>
                                    <p className="font-bold text-gray-900 mt-1">
                                        {sizes.find((size) => String(size.id) === String(selectedSizeId))?.name ||
                                            "Not selected"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#f8f7f2] p-4">
                                    <p className="text-sm text-gray-500">Selected Quantity</p>
                                    <p className="font-bold text-gray-900 mt-1">
                                        {selectedQuantity || "Not selected"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#fff7ed] p-5 border border-orange-100">
                                    <p className="text-sm text-gray-500">Estimated Price</p>
                                    <p className="font-bold text-gray-900 mt-1 text-2xl">
                                        ₹{selectedPrice ? selectedPrice.price : product.base_price}
                                    </p>
                                </div>

                                <button className="w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-[#F68B30] transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}