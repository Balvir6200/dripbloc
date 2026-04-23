<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_design_spec_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('category_size_id')
                ->nullable()
                ->constrained('category_sizes')
                ->nullOnDelete();

            $table->string('option_name');
            $table->string('bleed_size')->nullable();
            $table->string('trim_size')->nullable();
            $table->string('safe_area')->nullable();

            $table->string('template_jpg')->nullable();
            $table->string('template_png')->nullable();
            $table->string('template_pdf')->nullable();

            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_design_spec_items');
    }
};