import AdminLayout from "../../Layouts/AdminLayout";
import { useEffect, useMemo, useState } from "react";

const emptyForm = () => ({
    id: null,
    name: "",
    slug: "",
    description: "",
    image: null,
    image_preview: "",
    is_active: true,
    is_featured: false,
    display_order: 0,
});

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState(emptyForm());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");

    const csrfToken = useMemo(() => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute("content") : "";
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch("/admin/categories-data", {
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();
            setCategories(Array.isArray(data.categories) ? data.categories : []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
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

    const handleEdit = (item) => {
        setErrors({});
        setServerError("");
        setSuccessMessage("");

        setForm({
            id: item.id,
            name: item.name ?? "",
            slug: item.slug ?? "",
            description: item.description ?? "",
            image: null,
            image_preview: item.image_url ?? (item.image ? `/storage/${item.image}` : ""),
            is_active: !!item.is_active,
            is_featured: !!item.is_featured,
            display_order: item.display_order ?? 0,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setForm(emptyForm());
        setErrors({});
        setServerError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        setServerError("");
        setSuccessMessage("");

        const url = form.id ? `/admin/categories/${form.id}` : "/admin/categories";

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("slug", form.slug);
            formData.append("description", form.description);
            formData.append("display_order", form.display_order);
            formData.append("is_active", form.is_active ? 1 : 0);
            formData.append("is_featured", form.is_featured ? 1 : 0);

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
                    setServerError(data.message || "Failed to save category.");
                }
                return;
            }

            setSuccessMessage(data.message || "Saved successfully.");
            resetForm();
            await fetchData();
        } catch (error) {
            console.error("Save failed:", error);
            setServerError("Something went wrong while saving the category.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/admin/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                setServerError("Failed to delete category.");
                return;
            }

            await fetchData();
        } catch (error) {
            console.error("Delete failed:", error);
            setServerError("Something went wrong while deleting the category.");
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
                                    Categories Management
                                </h1>
                                <p className="text-slate-300 mt-3 max-w-2xl">
                                    Create premium product categories, upload category visuals,
                                    highlight featured items, and control storefront ordering from one place.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 min-w-[260px]">
                                <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-slate-300 text-sm">Total Categories</p>
                                    <p className="text-white text-2xl font-bold mt-1">{categories.length}</p>
                                </div>
                                <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-slate-300 text-sm">Featured</p>
                                    <p className="text-white text-2xl font-bold mt-1">
                                        {categories.filter((item) => item.is_featured).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4">
                            <div className="rounded-[30px] bg-white border border-[#ece7dc] shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
                                <div className="bg-gradient-to-r from-[#F68B30] to-[#ffb15c] px-6 py-5">
                                    <h2 className="text-xl font-bold text-white">
                                        {form.id ? "Edit Category" : "Add New Category"}
                                    </h2>
                                    <p className="text-white/90 text-sm mt-1">
                                        Fill the details below to manage category content professionally.
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
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#F68B30] focus:ring-4 focus:ring-[#F68B30]/10"
                                                placeholder="Enter category name"
                                                required
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
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#F68B30] focus:ring-4 focus:ring-[#F68B30]/10"
                                                placeholder="optional-auto-generated"
                                            />
                                            {errors.slug && (
                                                <p className="text-red-500 text-sm mt-1">{errors.slug[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={form.description}
                                                onChange={(e) => handleChange("description", e.target.value)}
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#F68B30] focus:ring-4 focus:ring-[#F68B30]/10"
                                                rows="5"
                                                placeholder="Enter category description"
                                            />
                                            {errors.description && (
                                                <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                                                Category Image
                                            </label>

                                            <label className="flex items-center justify-center w-full min-h-[130px] rounded-2xl border-2 border-dashed border-[#d8cfbe] bg-[#fcfbf8] hover:border-[#F68B30] hover:bg-[#fff8f1] transition cursor-pointer px-4 py-6 text-center">
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
                                                className="w-full rounded-2xl border border-[#d9d4c7] bg-[#fcfbf8] px-4 py-3 outline-none focus:border-[#F68B30] focus:ring-4 focus:ring-[#F68B30]/10"
                                            />
                                            {errors.display_order && (
                                                <p className="text-red-500 text-sm mt-1">{errors.display_order[0]}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <label className="flex items-center gap-3 rounded-2xl border border-[#e8e0d2] bg-[#fcfbf8] px-4 py-4 cursor-pointer">
                                                <input
                                                    id="category_is_active"
                                                    type="checkbox"
                                                    checked={form.is_active}
                                                    onChange={(e) => handleChange("is_active", e.target.checked)}
                                                    className="h-4 w-4 accent-[#F68B30]"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-[#0f172a]">Active</p>
                                                    <p className="text-xs text-gray-500">Visible in admin/storefront</p>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-3 rounded-2xl border border-[#e8e0d2] bg-[#fcfbf8] px-4 py-4 cursor-pointer">
                                                <input
                                                    id="category_is_featured"
                                                    type="checkbox"
                                                    checked={form.is_featured}
                                                    onChange={(e) => handleChange("is_featured", e.target.checked)}
                                                    className="h-4 w-4 accent-[#F68B30]"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-[#0f172a]">Featured</p>
                                                    <p className="text-xs text-gray-500">Highlight on homepage</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#F68B30] to-[#ff9f43] text-white px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                                            >
                                                {saving ? "Saving..." : form.id ? "Update Category" : "Save Category"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="inline-flex items-center justify-center rounded-2xl bg-[#eef1f5] text-[#0f172a] px-5 py-3 font-semibold hover:bg-[#e4e8ee] transition"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="rounded-[30px] bg-white border border-[#ece7dc] shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-5 border-b border-[#f0eadf] bg-[#fffdfa]">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#0f172a]">Categories List</h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Manage category visuals, ordering, status, and homepage highlighting.
                                        </p>
                                    </div>

                                    <div className="inline-flex items-center rounded-full bg-[#fff4e8] px-4 py-2 text-sm font-semibold text-[#d97706]">
                                        {categories.length} records
                                    </div>
                                </div>

                                <div className="p-6">
                                    {loading ? (
                                        <div className="rounded-2xl bg-[#fcfbf8] border border-[#ece7dc] px-5 py-10 text-center text-gray-500">
                                            Loading categories...
                                        </div>
                                    ) : categories.length === 0 ? (
                                        <div className="rounded-2xl bg-[#fcfbf8] border border-dashed border-[#d9d4c7] px-5 py-12 text-center">
                                            <p className="text-lg font-semibold text-[#0f172a]">No categories found</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Add your first category using the form on the left.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="overflow-hidden rounded-3xl border border-[#efe8da]">
                                            <div className="overflow-x-auto">
                                                <table className="w-full min-w-[900px]">
                                                    <thead className="bg-[#fbf8f3]">
                                                        <tr className="text-left">
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Category
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Slug
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Order
                                                            </th>
                                                            <th className="py-4 px-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                                                Featured
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
                                                        {categories.map((item) => (
                                                            <tr
                                                                key={item.id}
                                                                className="border-t border-[#f1ebdf] hover:bg-[#fffdfa] transition"
                                                            >
                                                                <td className="py-4 px-5">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="h-14 w-14 rounded-2xl overflow-hidden bg-[#f3efe8] border border-[#ebe3d6] flex items-center justify-center shrink-0">
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

                                                                        <div>
                                                                            <p className="font-semibold text-[#0f172a]">
                                                                                {item.name}
                                                                            </p>
                                                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                                                {item.description || "No description added"}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="py-4 px-5 text-gray-700">
                                                                    {item.slug}
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <span className="inline-flex items-center justify-center min-w-[40px] rounded-full bg-[#f3f4f6] px-3 py-1 text-sm font-semibold text-gray-700">
                                                                        {item.display_order ?? 0}
                                                                    </span>
                                                                </td>

                                                                <td className="py-4 px-5">
                                                                    <span
                                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                                            item.is_featured
                                                                                ? "bg-amber-100 text-amber-700"
                                                                                : "bg-gray-100 text-gray-600"
                                                                        }`}
                                                                    >
                                                                        {item.is_featured ? "Featured" : "Normal"}
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