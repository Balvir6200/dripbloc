<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategorySize;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategorySizeController extends Controller
{
    public function index()
    {
        $sizes = CategorySize::with('category')
            ->orderBy('display_order')
            ->orderByDesc('id')
            ->get();

        $categories = Category::orderBy('name')->get();

        return response()->json([
            'sizes' => $sizes,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:category_sizes,slug'],
            'type' => ['required', Rule::in(['standard', 'dimension'])],
            'width' => ['nullable', 'numeric', 'min:0'],
            'height' => ['nullable', 'numeric', 'min:0'],
            'unit' => ['nullable', 'string', 'max:20'],
            'price_modifier' => ['nullable', 'numeric'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);
        $validated['display_order'] = $validated['display_order'] ?? 0;
        $validated['price_modifier'] = $validated['price_modifier'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($validated['type'] === 'standard') {
            $validated['width'] = null;
            $validated['height'] = null;
            $validated['unit'] = null;
        }

        $size = CategorySize::create($validated);

        return response()->json([
            'message' => 'Size created successfully.',
            'size' => $size->load('category'),
        ]);
    }

    public function update(Request $request, CategorySize $size)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:category_sizes,slug,' . $size->id],
            'type' => ['required', Rule::in(['standard', 'dimension'])],
            'width' => ['nullable', 'numeric', 'min:0'],
            'height' => ['nullable', 'numeric', 'min:0'],
            'unit' => ['nullable', 'string', 'max:20'],
            'price_modifier' => ['nullable', 'numeric'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);
        $validated['display_order'] = $validated['display_order'] ?? 0;
        $validated['price_modifier'] = $validated['price_modifier'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($validated['type'] === 'standard') {
            $validated['width'] = null;
            $validated['height'] = null;
            $validated['unit'] = null;
        }

        $size->update($validated);

        return response()->json([
            'message' => 'Size updated successfully.',
            'size' => $size->load('category'),
        ]);
    }

    public function destroy(CategorySize $size)
    {
        $size->delete();

        return response()->json([
            'message' => 'Size deleted successfully.',
        ]);
    }
}