<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategorySize extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'type',
        'width',
        'height',
        'unit',
        'price_modifier',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'width' => 'decimal:2',
        'height' => 'decimal:2',
        'price_modifier' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getDisplayNameAttribute()
    {
        if ($this->type === 'dimension' && $this->width && $this->height && $this->unit) {
            return rtrim(rtrim($this->width, '0'), '.') . ' × ' .
                   rtrim(rtrim($this->height, '0'), '.') . ' ' . $this->unit;
        }

        return $this->name;
    }
}