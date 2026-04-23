<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('category_sizes', function (Blueprint $table) {
            $table->string('type')->default('standard')->after('slug');
            $table->decimal('width', 10, 2)->nullable()->after('type');
            $table->decimal('height', 10, 2)->nullable()->after('width');
            $table->string('unit', 20)->nullable()->after('height');
            $table->decimal('price_modifier', 10, 2)->default(0)->after('unit');
        });
    }

    public function down(): void
    {
        Schema::table('category_sizes', function (Blueprint $table) {
            $table->dropColumn([
                'type',
                'width',
                'height',
                'unit',
                'price_modifier',
            ]);
        });
    }
};