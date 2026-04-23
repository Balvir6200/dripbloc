<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Product;
use App\Models\CategorySize;
use App\Models\CategoryDesignSpecItem;

class DashboardController extends Controller
{
    public function index()
    {
        $categoryIds = Category::pluck('id');

        $subcategoryCategoryIds = Subcategory::whereNotNull('category_id')
            ->pluck('category_id')
            ->unique();

        $productCategoryIds = Product::whereNotNull('category_id')
            ->pluck('category_id')
            ->unique();

        $sizeCategoryIds = CategorySize::whereNotNull('category_id')
            ->pluck('category_id')
            ->unique();

        $designSpecCategoryIds = CategoryDesignSpecItem::whereNotNull('category_id')
            ->pluck('category_id')
            ->unique();

        $insights = [
            'withoutSubcategories' => $categoryIds->diff($subcategoryCategoryIds)->count(),
            'withoutProducts' => $categoryIds->diff($productCategoryIds)->count(),
            'withoutSizes' => $categoryIds->diff($sizeCategoryIds)->count(),
            'withoutDesignSpecs' => $categoryIds->diff($designSpecCategoryIds)->count(),
        ];

        $insights['needsSetup'] =
            $insights['withoutSubcategories'] +
            $insights['withoutProducts'] +
            $insights['withoutSizes'] +
            $insights['withoutDesignSpecs'];

        return view('admin.app', [
            'title' => 'Admin Dashboard',
            'page' => 'admin-home',
            'props' => [
                'stats' => [
                    'categories' => Category::count(),
                    'subcategories' => Subcategory::count(),
                    'products' => Product::count(),
                    'designSpecs' => CategoryDesignSpecItem::count(),
                ],
                'insights' => $insights,
            ],
        ]);
    }
}