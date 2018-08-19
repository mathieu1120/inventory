<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopProduct extends Model
{

    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'weight',
        'length',
        'width',
        'height',
        'id_category',
        'status',
    ];

    public $editableField = [
        'id',
        'name',
        'description',
        'price',
        'quantity',
        'weight',
        'length',
        'width',
        'height',
        'id_category',
    ];

    public function editableFieldsArray() {
        return array_filter($this->attributesToArray(), function($k) {
            return in_array($k, $this->editableField);
        }, ARRAY_FILTER_USE_KEY);
    }

    public function shopProductMedia() {
        return $this->hasMany(ShopProductMedia::class, 'id_product');
    }

    public function shopCategory() {
        return $this->hasOne(ShopCategories::class);
    }
}
