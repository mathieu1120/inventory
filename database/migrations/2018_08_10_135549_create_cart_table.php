<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_carts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uuid');
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        Schema::create('shop_cart_products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_cart');
            $table->boolean('id_product');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_carts');
        Schema::dropIfExists('shop_cart_products');
    }
}
