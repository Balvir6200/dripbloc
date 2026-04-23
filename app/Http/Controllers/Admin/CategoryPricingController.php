<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategoryPricing;
use App\Models\CategorySize;
use Illuminate\Http\Request;

class CategoryPricingController extends Controller
{
    public function index()
    {
        $pricings = CategoryPricing::with(['category', 'size'])
            ->latest()
            ->get();

        $categories = Category::orderBy('name')->get();
        $sizes = CategorySize::with('category')
            ->orderBy('name')
            ->get();

        return response()->json([
            'pricings' => $pricings,
            'categories' => $categories,
            'sizes' => $sizes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'category_size_id' => ['required', 'exists:category_sizes,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['display_order'] = $validated['display_order'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active', true);

        $pricing = CategoryPricing::create($validated);

        return response()->json([
            'message' => 'Pricing created successfully.',
            'pricing' => $pricing->load(['category', 'size']),
        ]);
    }

    public function update(Request $request, CategoryPricing $pricing)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'category_size_id' => ['required', 'exists:category_sizes,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['display_order'] = $validated['display_order'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active', true);

        $pricing->update($validated);

        return response()->json([
            'message' => 'Pricing updated successfully.',
            'pricing' => $pricing->load(['category', 'size']),
        ]);
    }

    public function destroy(CategoryPricing $pricing)
    {
        $pricing->delete();

        return response()->json([
            'message' => 'Pricing deleted successfully.',
        ]);
    }
}