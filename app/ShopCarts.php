<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopCarts extends Model {

    protected $fillable = [
        'uuid',
        'status',
    ];

    public function products() {
        return $this->hasMany(ShopCartProducts::class, 'id_cart');
    }
}
