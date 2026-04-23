<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SubcategoryController extends Controller
{
    public function index()
    {
        $subcategories = Subcategory::with('category')
            ->orderBy('display_order')
            ->orderByDesc('id')
            ->get()
            ->map(function ($subcategory) {
                $subcategory->image_url = $subcategory->image
                    ? asset('storage/' . $subcategory->image)
                    : null;

                return $subcategory;
            });

        $categories = Category::orderBy('name')->get();

        return response()->json([
            'subcategories' => $subcategories,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:subcategories,slug'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer'],
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('subcategories', 'public');
        }

        $subcategory = Subcategory::create([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => !empty($validated['slug'])
                ? Str::slug($validated['slug'])
                : Str::slug($validated['name']),
            'image' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'display_order' => $validated['display_order'] ?? 0,
        ]);

        $subcategory->load('category');
        $subcategory->image_url = $subcategory->image ? asset('storage/' . $subcategory->image) : null;

        return response()->json([
            'message' => 'Subcategory created successfully.',
            'subcategory' => $subcategory,
        ]);
    }

    public function update(Request $request, Subcategory $subcategory)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:subcategories,slug,' . $subcategory->id],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer'],
        ]);

        $imagePath = $subcategory->image;

        if ($request->hasFile('image')) {
            if (!empty($subcategory->image) && Storage::disk('public')->exists($subcategory->image)) {
                Storage::disk('public')->delete($subcategory->image);
            }

            $imagePath = $request->file('image')->store('subcategories', 'public');
        }

        $subcategory->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => !empty($validated['slug'])
                ? Str::slug($validated['slug'])
                : Str::slug($validated['name']),
            'image' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'display_order' => $validated['display_order'] ?? 0,
        ]);

        $subcategory->load('category');
        $subcategory->image_url = $subcategory->image ? asset('storage/' . $subcategory->image) : null;

        return response()->json([
            'message' => 'Subcategory updated successfully.',
            'subcategory' => $subcategory,
        ]);
    }

    public function destroy(Subcategory $subcategory)
    {
        if (!empty($subcategory->image) && Storage::disk('public')->exists($subcategory->image)) {
            Storage::disk('public')->delete($subcategory->image);
        }

        $subcategory->delete();

        return response()->json([
            'message' => 'Subcategory deleted successfully.',
        ]);
    }
}