<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategorySize;
use App\Models\CategoryDesignSpecItem;
use App\Models\Product;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->orderBy('display_order')
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$category) {
            return response()->json([
                'message' => 'Category not found.',
                'category' => null,
                'sizes' => [],
                'designSpecs' => [],
                'products' => [],
            ], 404);
        }

        $sizes = CategorySize::where('category_id', $category->id)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        $designSpecs = CategoryDesignSpecItem::where('category_id', $category->id)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        $products = Product::with(['subcategory'])
            ->where('category_id', $category->id)
            ->where('is_active', true)
            ->latest()
            ->get();

        return response()->json([
            'category' => $category,
            'sizes' => $sizes,
            'designSpecs' => $designSpecs,
            'products' => $products,
        ]);
    }
}