import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";

export default function CategoryPricingPage() {
    const [pricings, setPricings] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingPricing, setEditingPricing] = useState(null);

    const [form, setForm] = useState({
        category_id: "",
        category_size_id: "",
        quantity: "",
        price: "",
        display_order: 0,
        is_active: true,
    });

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const fetchPricingData = async () => {
        try {
            setLoading(true);

            const response = await fetch("/admin/pricing-data");
            const data = await response.json();

            setPricings(data.pricings || []);
            setCategories(data.categories || []);
            setSizes(data.sizes || []);
        } catch (error) {
            console.error("Failed to load pricing data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPricingData();
    }, []);

    const resetForm = () => {
        setForm({
            category_id: "",
            category_size_id: "",
            quantity: "",
            price: "",
            display_order: 0,
            is_active: true,
        });
        setEditingPricing(null);
    };

    const filteredSizes = useMemo(() => {
        if (!form.category_id) return sizes;

        return sizes.filter(
            (size) => String(size.category_id) === String(form.category_id)
        );
    }, [sizes, form.category_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const url = editingPricing
                ? `/admin/pricing/${editingPricing.id}`
                : "/admin/pricing";

            const method = editingPricing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData);
                alert("Failed to save pricing.");
                return;
            }

            await fetchPricingData();
            resetForm();
        } catch (error) {
            console.error("Save error:", error);
            alert("Something went wrong while saving.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (pricing) => {
        setEditingPricing(pricing);
        setForm({
            category_id: pricing.category_id ?? "",
            category_size_id: pricing.category_size_id ?? "",
            quantity: pricing.quantity ?? "",
            price: pricing.price ?? "",
            display_order: pricing.display_order ?? 0,
            is_active: Boolean(pricing.is_active),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (pricingId) => {
        const confirmed = window.confirm("Are you sure you want to delete this pricing?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/admin/pricing/${pricingId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (!response.ok) {
                alert("Failed to delete pricing.");
                return;
            }

            await fetchPricingData();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Pricing Management
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Create and manage quantity-based pricing for each size.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                    <div className="xl:col-span-1">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {editingPricing ? "Edit Pricing" : "Add New Pricing"}
                                </h2>

                                {editingPricing && (
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
                                                category_size_id: "",
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
                                        Size
                                    </label>
                                    <select
                                        value={form.category_size_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                category_size_id: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                        required
                                    >
                                        <option value="">Select size</option>
                                        {filteredSizes.map((size) => (
                                            <option key={size.id} value={size.id}>
                                                {size.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.quantity}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                quantity: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. 100"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                price: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. 299"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white"
                                        required
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
                                        Active Pricing
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-lg font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingPricing
                                        ? "Update Pricing"
                                        : "Create Pricing"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="xl:col-span-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        All Pricing Rows
                                    </h2>
                                    <p className="mt-1 text-slate-500">
                                        Manage size-wise quantity pricing.
                                    </p>
                                </div>

                                <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                                    Total: {pricings.length}
                                </div>
                            </div>

                            {loading ? (
                                <div className="py-16 text-center text-slate-500">
                                    Loading pricing...
                                </div>
                            ) : pricings.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                                    <p className="text-lg font-semibold text-slate-700">
                                        No pricing added yet
                                    </p>
                                    <p className="mt-2 text-slate-500">
                                        Create your first pricing row from the form.
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
                                                    Size
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Quantity
                                                </th>
                                                <th className="px-4 py-4 text-sm font-bold text-slate-700">
                                                    Price
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
                                            {pricings.map((pricing) => (
                                                <tr
                                                    key={pricing.id}
                                                    className="border-b border-slate-100"
                                                >
                                                    <td className="px-4 py-4 text-slate-700">
                                                        {pricing.category?.name || "-"}
                                                    </td>
                                                    <td className="px-4 py-4 font-semibold text-slate-900">
                                                        {pricing.size?.name || "-"}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600">
                                                        {pricing.quantity}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600">
                                                        ₹{Number(pricing.price).toFixed(2)}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600">
                                                        {pricing.display_order}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                                pricing.is_active
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {pricing.is_active ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEdit(pricing)}
                                                                className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(pricing.id)}
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