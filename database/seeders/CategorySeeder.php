<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Flyers',
                'description' => 'Flyer printing services',
                'is_featured' => true,
            ],
            [
                'name' => 'Business Cards',
                'description' => 'Professional business cards',
                'is_featured' => true,
            ],
            [
                'name' => 'Posters',
                'description' => 'Poster printing',
                'is_featured' => false,
            ],
        ];

        foreach ($categories as $index => $category) {
            Category::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'slug' => Str::slug($category['name']),
                    'description' => $category['description'],
                    'image' => null,
                    'is_active' => true,
                    'is_featured' => $category['is_featured'],
                    'display_order' => $index + 1,
                ]
            );
        }
    }
}