<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = Product::with(['category', 'subcategory'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$product) {
            return response()->json([
                'message' => 'Product not found.',
                'product' => null,
            ], 404);
        }

        $sizes = [];
        $pricing = [];
        $designSpecs = [];

        if ($product->category) {
            $sizes = $product->category->sizes()->get();
            $pricing = $product->category->pricings()->get();
            $designSpecs = $product->category->designSpecs()->get();
        }

        return response()->json([
            'product' => $product,
            'sizes' => $sizes,
            'pricing' => $pricing,
            'design_specs' => $designSpecs,
        ]);
    }
}