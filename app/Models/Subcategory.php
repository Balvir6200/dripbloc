<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'image',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationship with Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // 🔥 IMPORTANT: Products inside subcategory
    public function products()
    {
        return $this->hasMany(Product::class)
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderByDesc('id');
    }
}