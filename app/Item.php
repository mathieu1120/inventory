<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{

    protected $fillable = [
        'name',
        'cost',
        'price',
        'image_url',
        'sold',
        'sold_at',
        'sold_price',
        'shipping_cost',
        'shipping_price',
        'shipping_at',
        'status'
    ];

    public $editableField = [
        'id',
        'name',
        'cost',
        'price',
        'image_url',
        'sold',
        'sold_at',
        'sold_price',
        'shipping_cost',
        'shipping_price',
        'shipping_at'
    ];

    public function editableFieldsArray() {
        return array_filter($this->attributesToArray(), function($k) {
            return in_array($k, $this->editableField);
        }, ARRAY_FILTER_USE_KEY);
    }
}
