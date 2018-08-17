<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopProductMedia extends Model
{
    protected $table = 'shop_product_medias';

    protected $fillable = [
        'id_product',
        'url',
        'status',
        'type',
    ];

    public $editableField = [
        'id_product',
        'url',
        'type',
    ];

    public function editableFieldsArray() {
        return array_filter($this->attributesToArray(), function($k) {
            return in_array($k, $this->editableField);
        }, ARRAY_FILTER_USE_KEY);
    }
}
