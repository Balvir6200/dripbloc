<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Only add column if it does NOT exist
        if (!Schema::hasColumn('products', 'display_order')) {
            Schema::table('products', function (Blueprint $table) {
                $table->integer('display_order')->default(0)->after('image');
            });
        }
    }

    public function down(): void
    {
        // Only drop if it exists
        if (Schema::hasColumn('products', 'display_order')) {
            Schema::table('products', function (Blueprint $table) {
                $table->dropColumn('display_order');
            });
        }
    }
};