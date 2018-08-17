<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopCategories extends Model
{

    protected $fillable = [
        'name',
        'id_category',
        'status',
    ];

    public function categories() {
        return $this->hasMany(ShopCategories::class, 'id_category');
    }
}
