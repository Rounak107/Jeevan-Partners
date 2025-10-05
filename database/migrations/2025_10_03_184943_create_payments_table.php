<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('plan_id');
            $table->string('plan_name');
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('INR');
            $table->string('payment_status')->default('pending'); // pending, completed, failed
            $table->string('payment_gateway')->default('payu');
            $table->string('transaction_id')->nullable();
            $table->text('payment_response')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
};