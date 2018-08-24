<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopCartProducts extends Model {

    protected $fillable = [
        'id_cart',
        'id_product',
        'quantity',
    ];

    public function product() {
        return $this->belongsTo(ShopProduct::class);
    }

    public function cart() {
        return $this->belongsTo(ShopCarts::class);
    }
}
