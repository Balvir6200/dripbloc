<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategoryDesignSpecItem;
use App\Models\CategorySize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryDesignSpecController extends Controller
{
    public function index()
    {
        $designSpecs = CategoryDesignSpecItem::with(['category', 'categorySize'])
            ->latest()
            ->get();

        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get();

        $sizes = CategorySize::with('category')
            ->orderBy('id')
            ->get();

        return response()->json([
            'designSpecs' => $designSpecs,
            'categories' => $categories,
            'sizes' => $sizes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'category_size_id' => ['nullable', 'exists:category_sizes,id'],
            'option_name' => ['required', 'string', 'max:255'],
            'bleed_size' => ['nullable', 'string', 'max:255'],
            'trim_size' => ['nullable', 'string', 'max:255'],
            'safe_area' => ['nullable', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
            'template_jpg' => ['nullable', 'file', 'mimes:jpg,jpeg', 'max:5120'],
            'template_png' => ['nullable', 'file', 'mimes:png', 'max:5120'],
            'template_pdf' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        $jpgPath = $request->hasFile('template_jpg')
            ? $request->file('template_jpg')->store('design-specs/templates', 'public')
            : null;

        $pngPath = $request->hasFile('template_png')
            ? $request->file('template_png')->store('design-specs/templates', 'public')
            : null;

        $pdfPath = $request->hasFile('template_pdf')
            ? $request->file('template_pdf')->store('design-specs/templates', 'public')
            : null;

        $designSpec = CategoryDesignSpecItem::create([
            'category_id' => $validated['category_id'],
            'category_size_id' => $validated['category_size_id'] ?? null,
            'option_name' => $validated['option_name'],
            'bleed_size' => $validated['bleed_size'] ?? null,
            'trim_size' => $validated['trim_size'] ?? null,
            'safe_area' => $validated['safe_area'] ?? null,
            'template_jpg' => $jpgPath,
            'template_png' => $pngPath,
            'template_pdf' => $pdfPath,
            'display_order' => $validated['display_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Design spec created successfully.',
            'designSpec' => $designSpec->load(['category', 'categorySize']),
        ]);
    }

    public function update(Request $request, CategoryDesignSpecItem $categoryDesignSpec)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'category_size_id' => ['nullable', 'exists:category_sizes,id'],
            'option_name' => ['required', 'string', 'max:255'],
            'bleed_size' => ['nullable', 'string', 'max:255'],
            'trim_size' => ['nullable', 'string', 'max:255'],
            'safe_area' => ['nullable', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
            'template_jpg' => ['nullable', 'file', 'mimes:jpg,jpeg', 'max:5120'],
            'template_png' => ['nullable', 'file', 'mimes:png', 'max:5120'],
            'template_pdf' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
        ]);

        $data = [
            'category_id' => $validated['category_id'],
            'category_size_id' => $validated['category_size_id'] ?? null,
            'option_name' => $validated['option_name'],
            'bleed_size' => $validated['bleed_size'] ?? null,
            'trim_size' => $validated['trim_size'] ?? null,
            'safe_area' => $validated['safe_area'] ?? null,
            'display_order' => $validated['display_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ];

        if ($request->hasFile('template_jpg')) {
            if ($categoryDesignSpec->template_jpg) {
                Storage::disk('public')->delete($categoryDesignSpec->template_jpg);
            }

            $data['template_jpg'] = $request->file('template_jpg')->store('design-specs/templates', 'public');
        }

        if ($request->hasFile('template_png')) {
            if ($categoryDesignSpec->template_png) {
                Storage::disk('public')->delete($categoryDesignSpec->template_png);
            }

            $data['template_png'] = $request->file('template_png')->store('design-specs/templates', 'public');
        }

        if ($request->hasFile('template_pdf')) {
            if ($categoryDesignSpec->template_pdf) {
                Storage::disk('public')->delete($categoryDesignSpec->template_pdf);
            }

            $data['template_pdf'] = $request->file('template_pdf')->store('design-specs/templates', 'public');
        }

        $categoryDesignSpec->update($data);

        return response()->json([
            'message' => 'Design spec updated successfully.',
            'designSpec' => $categoryDesignSpec->load(['category', 'categorySize']),
        ]);
    }

    public function destroy(CategoryDesignSpecItem $categoryDesignSpec)
    {
        if ($categoryDesignSpec->template_jpg) {
            Storage::disk('public')->delete($categoryDesignSpec->template_jpg);
        }

        if ($categoryDesignSpec->template_png) {
            Storage::disk('public')->delete($categoryDesignSpec->template_png);
        }

        if ($categoryDesignSpec->template_pdf) {
            Storage::disk('public')->delete($categoryDesignSpec->template_pdf);
        }

        $categoryDesignSpec->delete();

        return response()->json([
            'message' => 'Design spec deleted successfully.',
        ]);
    }
}