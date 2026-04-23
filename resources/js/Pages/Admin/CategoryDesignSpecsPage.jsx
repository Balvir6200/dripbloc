import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";

const initialForm = {
    id: null,
    category_id: "",
    category_size_id: "",
    option_name: "",
    bleed_size: "",
    trim_size: "",
    safe_area: "",
    display_order: 0,
    is_active: true,
    template_jpg: null,
    template_png: null,
    template_pdf: null,
};

export default function CategoryDesignSpecsPage() {
    const [designSpecs, setDesignSpecs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/admin/design-specs-data", {
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            setDesignSpecs(data.designSpecs || []);
            setCategories(data.categories || []);
            setSizes(data.sizes || []);
        } catch (err) {
            setError("Failed to load design specs data.");
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setForm(initialForm);
        setEditingId(null);

        const fileInputs = document.querySelectorAll(".design-spec-file-input");
        fileInputs.forEach((input) => {
            input.value = "";
        });
    }

    function handleChange(e) {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [name]: checked,
            }));
            return;
        }

        if (type === "file") {
            setForm((prev) => ({
                ...prev,
                [name]: files && files[0] ? files[0] : null,
            }));
            return;
        }

       setForm((prev) => ({
    ...prev,
    [name]: value,
    ...(name === "category_id" ? { category_size_id: "" } : {}),
}));
    }

    function handleEdit(spec) {
        setEditingId(spec.id);
        setMessage("");
        setError("");

        setForm({
            id: spec.id,
            category_id: spec.category_id || "",
            category_size_id: spec.category_size_id || "",
            option_name: spec.option_name || "",
            bleed_size: spec.bleed_size || "",
            trim_size: spec.trim_size || "",
            safe_area: spec.safe_area || "",
            display_order: spec.display_order ?? 0,
            is_active: Boolean(spec.is_active),
            template_jpg: null,
            template_png: null,
            template_pdf: null,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const formData = new FormData();

            formData.append("category_id", form.category_id);
            formData.append("category_size_id", form.category_size_id || "");
            formData.append("option_name", form.option_name);
            formData.append("bleed_size", form.bleed_size || "");
            formData.append("trim_size", form.trim_size || "");
            formData.append("safe_area", form.safe_area || "");
            formData.append("display_order", form.display_order || 0);
            formData.append("is_active", form.is_active ? 1 : 0);

            if (form.template_jpg) {
                formData.append("template_jpg", form.template_jpg);
            }

            if (form.template_png) {
                formData.append("template_png", form.template_png);
            }

            if (form.template_pdf) {
                formData.append("template_pdf", form.template_pdf);
            }

            let url = "/admin/design-specs";
            let method = "POST";

            if (editingId) {
                url = `/admin/design-specs/${editingId}`;
                formData.append("_method", "PUT");
                method = "POST";
            }

            const response = await fetch(url, {
                method,
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0];
                    setError(Array.isArray(firstError) ? firstError[0] : "Validation failed.");
                } else {
                    setError(data.message || "Something went wrong.");
                }
                return;
            }

            setMessage(data.message || "Saved successfully.");
            resetForm();
            await fetchData();
        } catch (err) {
            setError("Failed to save design spec.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this design spec?");
        if (!confirmed) return;

        try {
            setMessage("");
            setError("");

            const response = await fetch(`/admin/design-specs/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to delete design spec.");
                return;
            }

            setMessage(data.message || "Deleted successfully.");

          if (editingId === id) {
    resetForm();
}

await fetchData();
        } catch (err) {
            setError("Failed to delete design spec.");
        }
    }

    const filteredSizes = useMemo(() => {
        if (!form.category_id) return sizes;

        return sizes.filter(
            (size) => String(size.category_id) === String(form.category_id)
        );
    }, [sizes, form.category_id]);

    const filteredDesignSpecs = useMemo(() => {
        return designSpecs.filter((spec) => {
            const matchesCategory = selectedCategory
                ? String(spec.category_id) === String(selectedCategory)
                : true;

            const keyword = search.trim().toLowerCase();

            const matchesSearch = keyword
                ? [
                      spec.option_name,
                      spec.bleed_size,
                      spec.trim_size,
                      spec.safe_area,
                      spec.category?.name,
                      spec.category_size?.name,
                  ]
                      .filter(Boolean)
                      .some((value) => String(value).toLowerCase().includes(keyword))
                : true;

            return matchesCategory && matchesSearch;
        });
    }, [designSpecs, selectedCategory, search]);

    function fileUrl(path) {
        if (!path) return null;
        return `/storage/${path}`;
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="rounded-3xl border border-orange-100 bg-gradient-to-r from-white via-orange-50 to-olive-50 p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#617D2B]">
                                DripBloc Admin
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900">
                                Design Specs Management
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                Manage print-ready design specs by category and size,
                                upload artwork templates, and keep production details
                                organized in one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-sm">
                                <p className="text-xs text-slate-500">Total Specs</p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {designSpecs.length}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-sm">
                                <p className="text-xs text-slate-500">Active</p>
                                <p className="mt-1 text-2xl font-bold text-[#617D2B]">
                                    {designSpecs.filter((item) => item.is_active).length}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm col-span-2 sm:col-span-1">
                                <p className="text-xs text-slate-500">Categories</p>
                                <p className="mt-1 text-2xl font-bold text-[#F68B30]">
                                    {categories.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {message ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {message}
                    </div>
                ) : null}

                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                    <div className="xl:col-span-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {editingId ? "Edit Design Spec" : "Add Design Spec"}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create production-ready spec records with optional
                                        JPG, PNG, and PDF templates.
                                    </p>
                                </div>

                                {editingId ? (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                ) : null}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Category
                                    </label>
                                    <select
                                        name="category_id"
                                        value={form.category_id}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Category Size
                                    </label>
                                    <select
                                        name="category_size_id"
                                        value={form.category_size_id}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                    >
                                        <option value="">All / Not size-specific</option>
                                        {filteredSizes.map((size) => (
                                            <option key={size.id} value={size.id}>
                                                {size.name}
                                                {size.category ? ` — ${size.category.name}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Option Name
                                    </label>
                                    <input
                                        type="text"
                                        name="option_name"
                                        value={form.option_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Front Print, Back Print, Sleeve Artwork"
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Bleed Size
                                        </label>
                                        <input
                                            type="text"
                                            name="bleed_size"
                                            value={form.bleed_size}
                                            onChange={handleChange}
                                            placeholder="e.g. 3 mm"
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Trim Size
                                        </label>
                                        <input
                                            type="text"
                                            name="trim_size"
                                            value={form.trim_size}
                                            onChange={handleChange}
                                            placeholder="e.g. 90 x 54 mm"
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Safe Area
                                        </label>
                                        <input
                                            type="text"
                                            name="safe_area"
                                            value={form.safe_area}
                                            onChange={handleChange}
                                            placeholder="e.g. 2 mm"
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Display Order
                                        </label>
                                        <input
                                            type="number"
                                            name="display_order"
                                            value={form.display_order}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                checked={form.is_active}
                                                onChange={handleChange}
                                                className="h-4 w-4 rounded border-slate-300 text-[#F68B30] focus:ring-[#F68B30]"
                                            />
                                            Active Spec
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Template JPG
                                        </label>
                                        <input
                                            type="file"
                                            name="template_jpg"
                                            accept=".jpg,.jpeg"
                                            onChange={handleChange}
                                            className="design-spec-file-input w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-orange-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#C96A14]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Template PNG
                                        </label>
                                        <input
                                            type="file"
                                            name="template_png"
                                            accept=".png"
                                            onChange={handleChange}
                                            className="design-spec-file-input w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-orange-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#C96A14]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Template PDF
                                        </label>
                                        <input
                                            type="file"
                                            name="template_pdf"
                                            accept=".pdf"
                                            onChange={handleChange}
                                            className="design-spec-file-input w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-orange-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#C96A14]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center rounded-2xl bg-[#F68B30] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : editingId
                                            ? "Update Design Spec"
                                            : "Create Design Spec"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="xl:col-span-3">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Design Specs List
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Search, filter, and manage all design spec records.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search specs..."
                                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                    />

                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F68B30]"
                                    >
                                        <option value="">All categories</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                                    Loading design specs...
                                </div>
                            ) : filteredDesignSpecs.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                                    No design specs found.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredDesignSpecs.map((spec) => (
                                        <div
                                            key={spec.id}
                                            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                        >
                                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="text-lg font-bold text-slate-900">
                                                            {spec.option_name}
                                                        </h3>

                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                spec.is_active
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-slate-100 text-slate-600"
                                                            }`}
                                                        >
                                                            {spec.is_active ? "Active" : "Inactive"}
                                                        </span>

                                                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-[#C96A14]">
                                                            Order: {spec.display_order ?? 0}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-3 text-sm text-slate-600 md:grid-cols-2">
                                                        <p>
                                                            <span className="font-semibold text-slate-800">
                                                                Category:
                                                            </span>{" "}
                                                            {spec.category?.name || "-"}
                                                        </p>

                                                        <p>
                                                            <span className="font-semibold text-slate-800">
                                                                Size:
                                                            </span>{" "}
                                                            {spec.category_size?.name || "All / General"}
                                                        </p>

                                                        <p>
                                                            <span className="font-semibold text-slate-800">
                                                                Bleed:
                                                            </span>{" "}
                                                            {spec.bleed_size || "-"}
                                                        </p>

                                                        <p>
                                                            <span className="font-semibold text-slate-800">
                                                                Trim:
                                                            </span>{" "}
                                                            {spec.trim_size || "-"}
                                                        </p>

                                                        <p>
                                                            <span className="font-semibold text-slate-800">
                                                                Safe Area:
                                                            </span>{" "}
                                                            {spec.safe_area || "-"}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        {spec.template_jpg ? (
                                                            <a
                                                                href={fileUrl(spec.template_jpg)}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                                                            >
                                                                JPG Template
                                                            </a>
                                                        ) : null}

                                                        {spec.template_png ? (
                                                            <a
                                                                href={fileUrl(spec.template_png)}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                                                            >
                                                                PNG Template
                                                            </a>
                                                        ) : null}

                                                        {spec.template_pdf ? (
                                                            <a
                                                                href={fileUrl(spec.template_pdf)}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                                                            >
                                                                PDF Template
                                                            </a>
                                                        ) : null}

                                                        {!spec.template_jpg &&
                                                        !spec.template_png &&
                                                        !spec.template_pdf ? (
                                                            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                                                                No Templates Uploaded
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(spec)}
                                                        className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(spec.id)}
                                                        className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}