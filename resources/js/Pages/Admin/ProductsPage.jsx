import AdminLayout from "../../Layouts/AdminLayout";
import { useEffect, useMemo, useState } from "react";

const emptyForm = () => ({
    id: null,
    category_id: "",
    subcategory_id: "",
    name: "",
    slug: "",
    base_price: "",
    image: null,
    image_preview: "",
    is_active: true,
    display_order: 0,
});

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [form, setForm] = useState(emptyForm());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

    const csrfToken = useMemo(() => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute("content") : "";
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch("/admin/products-data", {
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();
            setProducts(Array.isArray(data.products) ? data.products : []);
            setCategories(Array.isArray(data.categories) ? data.categories : []);
            setSubcategories(Array.isArray(data.subcategories) ? data.subcategories : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setServerError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredSubcategories = useMemo(() => {
        return subcategories.filter(
            (item) => String(item.category_id) === String(form.category_id)
        );
    }, [subcategories, form.category_id]);

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const query = searchTerm.trim().toLowerCase();

            const matchesSearch =
                !query ||
                item.name?.toLowerCase().includes(query) ||
                item.slug?.toLowerCase().includes(query) ||
                item.category?.name?.toLowerCase().includes(query) ||
                item.subcategory?.name?.toLowerCase().includes(query);

            const matchesCategory =
                !selectedCategoryFilter ||
                String(item.category_id) === String(selectedCategoryFilter);

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategoryFilter]);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCategoryChange = (value) => {
        setForm((prev) => ({
            ...prev,
            category_id: value,
            subcategory_id: "",
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;

        setForm((prev) => ({
            ...prev,
            image: file,
            image_preview: file ? URL.createObjectURL(file) : prev.image_preview,
        }));
    };

    const resetForm = () => {
        setForm(emptyForm());
        setErrors({});
        setSuccessMessage("");
        setServerError("");
    };

    const handleEdit = (item) => {
        setErrors({});
        setSuccessMessage("");
        setServerError("");

        setForm({
            id: item.id,
            category_id: item.category_id ?? "",
            subcategory_id: item.subcategory_id ?? "",
            name: item.name ?? "",
            slug: item.slug ?? "",
            base_price: item.base_price ?? "",
            image: null,
            image_preview: item.image_url ?? (item.image ? `/storage/${item.image}` : ""),
            is_active: !!item.is_active,
            display_order: item.display_order ?? 0,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setErrors({});
        setSuccessMessage("");
        setServerError("");

        const url = form.id ? `/admin/products/${form.id}` : "/admin/products";

        try {
            const formData = new FormData();

            formData.append("category_id", form.category_id);
            formData.append("subcategory_id", form.subcategory_id);
            formData.append("name", form.name);
            formData.append("slug", form.slug);
            formData.append("base_price", form.base_price || 0);
            formData.append("display_order", form.display_order || 0);
            formData.append("is_active", form.is_active ? 1 : 0);

            if (form.image) {
                formData.append("image", form.image);
            }

            if (form.id) {
                formData.append("_method", "PUT");
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setServerError(data.message || "Failed to save product.");
                }
                return;
            }

            setSuccessMessage(data.message || "Saved successfully.");
            resetForm();
            await fetchData();
        } catch (error) {
            console.error("Save failed:", error);
            setServerError("Something went wrong while saving the product.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        setSuccessMessage("");
        setServerError("");

        try {
            const response = await fetch(`/admin/products/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setServerError(data.message || "Failed to delete product.");
                return;
            }

            setSuccessMessage(data.message || "Product deleted successfully.");
            await fetchData();

            if (form.id === id) {
                resetForm();
            }
        } catch (error) {
            console.error("Delete failed:", error);
            setServerError("Something went wrong while deleting the product.");
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#f8f7f2] via-[#fcfbf8] to-[#f3f1ea] px-6 py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 rounded-[28px] border border-white/60 bg-gradient-to-r from-[#0f172a] via-[#132238] to-[#1e293b] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <p className="text-[#F68B30] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                                    DripBloc Admin
                                </p>
                                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Products Management
                                </h1>
                                <p className="text-slate-300 mt-3 max-w-2xl">
                                    Create premium products, connect them with categories and
                                    subcategories, and manage storefront-ready visuals with ease.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 min-w-[260px]">
                                <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-slate-300 text-sm">Total Products</p>
                                    <p className="text-white text-2xl font-bold mt-1">{products.length}</p>
                                </div>
                                <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-slate-300 text-sm">Filtered Results</p>
                                    <p className="text-white text-2xl font-bold mt-1">{filteredProducts.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4">
                            <div className="rounded-[30px] bg-white border border-[#ece7dc] shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
                                <div className="bg-gradient-to-r from-[#617D2B] to-[#8fad52] px-6 py-5">
                                    <h2 className="text-xl font-bold text-white">
                                        {form.id ? "Edit Product" : "Add New Product"}
                                    </h2>
                                    <p className="text-white/90 text-sm mt-1">
                                        Add product details, image, category mapping, and pricing.
                                    </p>
                                </div>

                                <div className="p-6">
                                    {successMessage && (
                                        <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 text-green-700 px-4 py-3 text-sm font-medium">
                                            {successMessage}
                                        </div>
                                    )}

                                    {serverError && (
                                        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
                                            {serverError}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Category
                                            </label>
                                            <select
                                                value={form.category_id}
                                                onChange={(e) => handleCategoryChange(e.target.value)}
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && (
                                                <p className="text-red-500 text-sm mt-1">{errors.category_id[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Subcategory
                                            </label>
                                            <select
                                                value={form.subcategory_id}
                                                onChange={(e) => handleChange("subcategory_id", e.target.value)}
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            >
                                                <option value="">Select Subcategory</option>
                                                {filteredSubcategories.map((subcategory) => (
                                                    <option key={subcategory.id} value={subcategory.id}>
                                                        {subcategory.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.subcategory_id && (
                                                <p className="text-red-500 text-sm mt-1">{errors.subcategory_id[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                                placeholder="Enter product name"
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Slug
                                            </label>
                                            <input
                                                type="text"
                                                value={form.slug}
                                                onChange={(e) => handleChange("slug", e.target.value)}
                                                placeholder="optional-auto-generated"
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            />
                                            {errors.slug && (
                                                <p className="text-red-500 text-sm mt-1">{errors.slug[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Base Price
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={form.base_price}
                                                onChange={(e) => handleChange("base_price", e.target.value)}
                                                placeholder="Enter base price"
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            />
                                            {errors.base_price && (
                                                <p className="text-red-500 text-sm mt-1">{errors.base_price[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Product Image
                                            </label>

                                            <label className="flex items-center justify-center w-full min-h-[130px] rounded-2xl border-2 border-dashed border-[#d8cfbe] bg-[#fcfbf8] hover:border-[#617D2B] hover:bg-[#f8fbf2] transition cursor-pointer px-4 py-6 text-center">
                                                <div>
                                                    <p className="text-[#0f172a] font-semibold">
                                                        Click to upload image
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        JPG, PNG, WEBP up to 2MB
                                                    </p>
                                                </div>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>

                                            {form.image_preview && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                                        Preview
                                                    </p>
                                                    <div className="rounded-2xl overflow-hidden border border-[#e7dfd0] bg-white">
                                                        <img
                                                            src={form.image_preview}
                                                            alt="Preview"
                                                            className="w-full h-48 object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {errors.image && (
                                                <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Display Order
                                            </label>
                                            <input
                                                type="number"
                                                value={form.display_order}
                                                onChange={(e) => handleChange("display_order", e.target.value)}
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            />
                                            {errors.display_order && (
                                                <p className="text-red-500 text-sm mt-1">{errors.display_order[0]}</p>
                                            )}
                                        </div>

                                        <label className="flex items-center gap-3 rounded-2xl border border-[#e8e0d2] bg-[#fcfbf8] px-4 py-4 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.is_active}
                                                onChange={(e) => handleChange("is_active", e.target.checked)}
                                                className="h-4 w-4 accent-[#617D2B]"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-[#0f172a]">Active</p>
                                                <p className="text-xs text-gray-500">Visible in admin/storefront</p>
                                            </div>
                                        </label>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#617D2B] to-[#8bad52] text-white px-5 py-3 font-semibold shadow-lg shadow-lime-200/40 transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                                            >
                                                {saving
                                                    ? "Saving..."
                                                    : form.id
                                                    ? "Update Product"
                                                    : "Save Product"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="inline-flex items-center justify-center rounded-2xl bg-[#eef1f5] text-[#0f172a] px-5 py-3 font-semibold hover:bg-[#e4e8ee] transition"
                                            >
                                                {form.id ? "Cancel" : "Reset"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="rounded-[30px] bg-white border border-[#ece7dc] shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
                                <div className="flex flex-col gap-4 px-6 py-5 border-b border-[#f0eadf] bg-[#fffdfa]">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div>
                                            <h2 className="text-xl font-bold text-[#0f172a]">Products List</h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Search, filter, edit, and manage premium print products.
                                            </p>
                                        </div>

                                        <div className="inline-flex items-center rounded-full bg-[#eef7e2] px-4 py-2 text-sm font-semibold text-[#617D2B]">
                                            {filteredProducts.length} results
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search by product, slug, category, or subcategory..."
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-white px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            />
                                        </div>

                                        <div>
                                            <select
                                                value={selectedCategoryFilter}
                                                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-white px-4 py-3 outline-none focus:border-[#617D2B] focus:ring-4 focus:ring-[#617D2B]/10"
                                            >
                                                <option value="">All Categories</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {loading ? (
                                        <div className="rounded-2xl bg-[#fcfbf8] border border-[#ece7dc] px-5 py-10 text-center text-gray-500">
                                            Loading products...
                                        </div>
                                    ) : filteredProducts.length === 0 ? (
                                        <div className="rounded-2xl bg-[#fcfbf8] border border-dashed border-[#d9d4c7] px-5 py-12 text-center">
                                            <p className="text-lg font-semibold text-[#0f172a]">No products found</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Add your first product using the form on the left.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="overflow-hidden rounded-3xl border border-[#efe8da]">
                                            <div className="overflow-x-auto">
                                                <table className="w-full min-w-[1100px]">
                                                    <thead className="bg-[#fbf8f3]">
                                                        <tr className="text-left">
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Product
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Image
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Category
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Subcategory
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Price
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Order
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Status
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 text-right">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {filteredProducts.map((item) => (
                                                            <tr
                                                                key={item.id}
                                                                className="border-t border-[#f1ebdf] hover:bg-[#fffdfa] transition"
                                                            >
                                                                <td className="py-4 px-5">
                                                                    <div>
                                                                        <p className="font-semibold text-[#0f172a]">
                                                                            {item.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            {item.slug}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-[#f3efe8] border border-[#ebe3d6] flex items-center justify-center">
                                                                        {item.image_url || item.image ? (
                                                                            <img
                                                                                src={item.image_url || `/storage/${item.image}`}
                                                                                alt={item.name}
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <span className="text-xs font-bold text-gray-400">
                                                                                IMG
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>

                                                                <td className="py-4 px-5 text-gray-700">
                                                                    {item.category?.name || "-"}
                                                                </td>

                                                                <td className="py-4 px-5 text-gray-700">
                                                                    {item.subcategory?.name || "-"}
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <span className="font-semibold text-[#617D2B]">
                                                                        ${Number(item.base_price || 0).toFixed(2)}
                                                                    </span>
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <span className="inline-flex items-center justify-center min-w-[40px] rounded-full bg-[#f3f4f6] px-3 py-1 text-sm font-semibold text-gray-700">
                                                                        {item.display_order ?? 0}
                                                                    </span>
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <span
                                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                                            item.is_active
                                                                                ? "bg-green-100 text-green-700"
                                                                                : "bg-red-100 text-red-700"
                                                                        }`}
                                                                    >
                                                                        {item.is_active ? "Active" : "Inactive"}
                                                                    </span>
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <div className="flex justify-end gap-2">
                                                                        <button
                                                                            onClick={() => handleEdit(item)}
                                                                            className="rounded-xl bg-[#617D2B] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete(item.id)}
                                                                            className="rounded-xl bg-red-500 text-white px-4 py-2 text-sm font-semibold hover:bg-red-600 transition"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

