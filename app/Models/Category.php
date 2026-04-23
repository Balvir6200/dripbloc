<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'is_active',
        'is_featured',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('name');
    }

    public function products()
    {
        return $this->hasMany(Product::class)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->latest('id');
    }

    public function sizes()
    {
        return $this->hasMany(CategorySize::class)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id');
    }

    public function pricings()
    {
        return $this->hasMany(CategoryPricing::class)
            ->where('is_active', true)
            ->orderBy('display_order');
    }

    public function designSpecItems()
    {
        return $this->hasMany(CategoryDesignSpecItem::class)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id');
    }
}