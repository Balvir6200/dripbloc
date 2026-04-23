<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\SubcategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategorySizeController;
use App\Http\Controllers\Admin\CategoryPricingController;
use App\Http\Controllers\Admin\CategoryDesignSpecController;
use App\Http\Controllers\Admin\DashboardController;

use App\Http\Controllers\Api\CategoryController as ApiCategoryController;
use App\Http\Controllers\Api\ProductController as ApiProductController;
use App\Http\Controllers\Api\CategoryPageController;

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Customer Pages
|--------------------------------------------------------------------------
*/
Route::get('/categories', [CategoryPageController::class, 'index']);
Route::get('/categories/{slug}', [CategoryPageController::class, 'show']);

Route::get('/products/{slug}', function ($slug) {
    return view('customer.product', [
        'slug' => $slug,
    ]);
});

/*
|--------------------------------------------------------------------------
| Frontend API
|--------------------------------------------------------------------------
*/
Route::get('/api/categories', [ApiCategoryController::class, 'index']);
Route::get('/api/categories/{slug}', [ApiCategoryController::class, 'show']);
Route::get('/api/products/{slug}', [ApiProductController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Admin Panel
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard (FIXED - now uses controller)
    |--------------------------------------------------------------------------
    */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    /*
    |--------------------------------------------------------------------------
    | Admin Pages
    |--------------------------------------------------------------------------
    */
    Route::get('/categories-page', function () {
        return view('admin.app', [
            'title' => 'Categories Management',
            'page' => 'admin-categories',
            'props' => [],
        ]);
    });

    Route::get('/subcategories-page', function () {
        return view('admin.app', [
            'title' => 'Subcategories Management',
            'page' => 'admin-subcategories',
            'props' => [],
        ]);
    });

    Route::get('/products-page', function () {
        return view('admin.app', [
            'title' => 'Products Management',
            'page' => 'admin-products',
            'props' => [],
        ]);
    });

    Route::get('/sizes-page', function () {
        return view('admin.app', [
            'title' => 'Sizes Management',
            'page' => 'admin-sizes',
            'props' => [],
        ]);
    });

    Route::get('/design-specs-page', function () {
        return view('admin.app', [
            'title' => 'Design Specs Management',
            'page' => 'admin-design-specs',
            'props' => [],
        ]);
    });

    Route::get('/pricing-page', function () {
        return view('admin.app', [
            'title' => 'Pricing Management',
            'page' => 'admin-pricing',
            'props' => [],
        ]);
    });

    /*
    |--------------------------------------------------------------------------
    | Categories CRUD
    |--------------------------------------------------------------------------
    */
    Route::get('/categories-data', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Subcategories CRUD
    |--------------------------------------------------------------------------
    */
    Route::get('/subcategories-data', [SubcategoryController::class, 'index']);
    Route::post('/subcategories', [SubcategoryController::class, 'store']);
    Route::put('/subcategories/{subcategory}', [SubcategoryController::class, 'update']);
    Route::delete('/subcategories/{subcategory}', [SubcategoryController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Products CRUD
    |--------------------------------------------------------------------------
    */
    Route::get('/products-data', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Sizes CRUD
    |--------------------------------------------------------------------------
    */
    Route::get('/sizes-data', [CategorySizeController::class, 'index']);
    Route::post('/sizes', [CategorySizeController::class, 'store']);
    Route::put('/sizes/{size}', [CategorySizeController::class, 'update']);
    Route::delete('/sizes/{size}', [CategorySizeController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Design Specs CRUD
    |--------------------------------------------------------------------------
    */
    Route::get('/design-specs-data', [CategoryDesignSpecController::class, 'index']);
    Route::post('/design-specs', [CategoryDesignSpecController::class, 'store']);
    Route::put('/design-specs/{categoryDesignSpec}', [CategoryDesignSpecController::class, 'update']);
    Route::delete('/design-specs/{categoryDesignSpec}', [CategoryDesignSpecController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Pricing CRUD
    |--------------------------------------------------------------------------
    */
    Route::get('/pricing-data', [CategoryPricingController::class, 'index']);
    Route::post('/pricing', [CategoryPricingController::class, 'store']);
    Route::put('/pricing/{pricing}', [CategoryPricingController::class, 'update']);
    Route::delete('/pricing/{pricing}', [CategoryPricingController::class, 'destroy']);
});