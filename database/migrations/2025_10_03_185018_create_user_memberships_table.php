<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('plan_id');
            $table->string('plan_name');
            $table->decimal('amount_paid', 10, 2);
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->string('status')->default('active'); // active, expired, cancelled
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_memberships');
    }
};