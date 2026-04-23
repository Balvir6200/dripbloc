<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryDesignSpecItem extends Model
{
    protected $fillable = [
        'category_id',
        'category_size_id',
        'option_name',
        'bleed_size',
        'trim_size',
        'safe_area',
        'template_jpg',
        'template_png',
        'template_pdf',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function categorySize()
    {
        return $this->belongsTo(CategorySize::class);
    }
}