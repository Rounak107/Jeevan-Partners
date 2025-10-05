<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Add only the missing fields
            $table->integer('weight')->nullable()->after('height'); // in kg
            $table->text('partner_expectations')->nullable()->after('about');
            $table->enum('gon_type', ['Dev', 'Manushya', 'Rakshas'])->nullable()->after('partner_expectations');
            $table->string('rashi')->nullable()->after('gon_type');
            $table->string('gotra')->nullable()->after('rashi');
            $table->enum('manglik', ['Yes', 'No', 'Anshik'])->nullable()->after('gotra');
            $table->text('mangal_dosha_details')->nullable()->after('manglik');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'weight',
                'partner_expectations',
                'gon_type',
                'rashi',
                'gotra',
                'manglik',
                'mangal_dosha_details'
            ]);
        });
    }
};