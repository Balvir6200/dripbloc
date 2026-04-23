import { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";

export default function CategorySizesPage() {
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingSize, setEditingSize] = useState(null);

    const [form, setForm] = useState({
        category_id: "",
        name: "",
        slug: "",
        type: "standard",
        width: "",
        height: "",
        unit: "",
        price_modifier: 0,
        display_order: 0,
        is_active: true,
    });

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const fetchSizesData = async () => {
        try {
            setLoading(true);

            const response = await fetch("/admin/sizes-data");
            const data = await response.json();

            setSizes(data.sizes || []);
            setCategories(data.categories || []);
        } catch (error) {
            console.error("Failed to load sizes data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSizesData();
    }, []);

    const resetForm = () => {
        setForm({
            category_id: "",
            name: "",
            slug: "",
            type: "standard",
            width: "",
            height: "",
            unit: "",
            price_modifier: 0,
            display_order: 0,
            is_active: true,
        });
        setEditingSize(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const url = editingSize
                ? `/admin/sizes/${editingSize.id}`
                : "/admin/sizes";

            const method = editingSize ? "PUT" : "POST";

            const payload = {
                ...form,
                width: form.type === "dimension" && form.width !== "" ? Number(form.width) : null,
                height: form.type === "dimension" && form.height !== "" ? Number(form.height) : null,
                unit: form.type === "dimension" ? form.unit : null,
                price_modifier: form.price_modifier !== "" ? Number(form.price_modifier) : 0,
                display_order: form.display_order !== "" ? Number(form.display_order) : 0,
            };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData);
                alert("Failed to save size.");
                return;
            }

            await fetchSizesData();
            resetForm();
        } catch (error) {
            console.error("Save error:", error);
            alert("Something went wrong while saving.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (size) => {
        setEditingSize(size);
        setForm({
            category_id: size.category_id ?? "",
            name: size.name ?? "",
            slug: size.slug ?? "",
            type: size.type ?? "standard",
            width: size.width ?? "",
            height: size.height ?? "",
            unit: size.unit ?? "",
            price_modifier: size.price_modifier ?? 0,
            display_order: size.display_order ?? 0,
            is_active: Boolean(size.is_active),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (sizeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this size?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/admin/sizes/${sizeId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (!response.ok) {
                alert("Failed to delete size.");
                return;
            }

            await fetchSizesData();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
        }
    };

    const renderSizePreview = (size) => {
        if (
            size.type === "dimension" &&
            size.width !== null &&
            size.height !== null &&
            size.unit
        ) {
            return `${size.width} × ${size.height} ${size.unit}`;
        }

        return size.name;
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Sizes Management
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Create flexible size options like inches, cm, ft, or standard labels such as S, M, L, XL.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                    <div className="xl:col-span-1">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {editingSize ? "Edit Size" : "Add New Size"}
                                </h2>

                                {editingSize && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Category
                                    </label>
                                    <select
                                        value={form.category_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                category_id: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
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
                                        Size Label
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. XL or 24 x 36 in"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                slug: e.target.value,
                                            })
                                        }
                                        placeholder="optional-auto-generated"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Size Type
                                    </label>
                                    <select
                                        value={form.type}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                type: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                    >
                                        <option value="standard">Standard (S, M, L, XL)</option>
                                        <option value="dimension">Dimension (width × height)</option>
                                    </select>
                                </div>

                                {form.type === "dimension" && (
                                    <>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                    Width
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={form.width}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            width: e.target.value,
                                                        })
                                                    }
                                                    placeholder="e.g. 24"
                                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                    Height
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={form.height}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            height: e.target.value,
                                                        })
                                                    }
                                                    placeholder="e.g. 36"
                                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Unit
                                            </label>
                                            <select
                                                value={form.unit}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        unit: e.target.value,
                                                    })
                                                }
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                            >
                                                <option value="">Select unit</option>
                                                <option value="in">Inches (in)</option>
                                                <option value="cm">Centimeters (cm)</option>
                                                <option value="ft">Feet (ft)</option>
                                                <option value="mm">Millimeters (mm)</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Price Modifier
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.price_modifier}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                price_modifier: e.target.value,
                                            })
                                        }
                                        placeholder="0.00"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={form.display_order}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                display_order: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                    />
                                </div>

                                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={form.is_active}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm font-semibold text-slate-700">
                                        Active Size
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-lg font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingSize
                                        ? "Update Size"
                                        : "Create Size"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="xl:col-span-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        All Sizes
                                    </h2>
                                    <p className="mt-1 text-slate-500">
                                        Manage category-linked flexible size options.
                                    </p>
                                </div>

                                <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                                    Total: {sizes.length}
                                </div>
                            </div>

                            {loading ? (
                                <div className="py-16 text-center text-slate-500">
                                    Loading sizes...
                                </div>
                            ) : sizes.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                                    <p className="text-lg font-semibold text-slate-700">
                                        No sizes added yet
                                    </p>
                                    <p className="mt-2 text-slate-500">
                                        Create your first flexible size from the form.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="border-b border-slate-200 text-left">
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Category
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Label
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Type
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Preview
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Modifier
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Order
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Status
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sizes.map((size) => (
                                                <tr
                                                    key={size.id}
                                                    className="border-b border-slate-100"
                                                >
                                                    <td className="px-4 py-4 text-slate-700">
                                                        {size.category?.name || "-"}
                                                    </td>
                                                    <td className="px-4 py-4 font-semibold text-slate-900">
                                                        {size.name}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600 capitalize">
                                                        {size.type || "standard"}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-700">
                                                        {renderSizePreview(size)}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600">
                                                        ₹{Number(size.price_modifier || 0).toFixed(2)}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600">
                                                        {size.display_order}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                                size.is_active
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {size.is_active ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEdit(size)}
                                                                className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(size.id)}
                                                                className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}