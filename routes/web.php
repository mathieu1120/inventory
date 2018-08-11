<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::domain('www.shoprachaels.com')->group(function () {
    Route::get('/', function () {
        return redirect('list');
    });
});

Route::domain('shoprachaels.com')->group(function () {
    Route::get('/', function () {
        return redirect('list');
    });
});


Route::domain('shop.shoprachaels.com')->group(function () {
    Route::get('/', 'ShopController@index');
    Route::get('/items/{id}', 'ShopController@index');
    Route::get('/cart', 'ShopController@index');

    Route::get('api/shop/items', 'ShopController@items');
    Route::get('api/shop/items/{id}', 'ShopController@item');
});

Route::domain('inventory.shoprachaels.com')->group(function () {

    Route::get('/', 'InventoryController@index');
    Route::get('/inventory', 'InventoryController@index');

    Route::get('api/inventory/etsy-items', 'InventoryController@getEtsyItems');
    Route::get('api/inventory/etsy-item/{listingId}', 'InventoryController@getEtsyItem');
    Route::get('api/inventory/etsy-shipping_templates', 'InventoryController@getEtsyItemShippingTemplates');
    Route::get('api/inventory/etsy-categories', 'InventoryController@getEtsyItemCategories');

    Route::get('api/inventory/rachaels-item/{productId}', 'InventoryController@getRachaelsProduct');

    Route::get('api/inventory/items', 'InventoryController@items');

    Route::post('api/inventory/uploadImage', 'InventoryController@uploadImage');

    Route::post('api/inventory/items/{id}/edit', 'InventoryController@editItem');

    Route::post('api/inventory/items/{id}/sold', 'InventoryController@soldItem');

    Route::post('api/inventory/items/create', 'InventoryController@createItem');

    Route::delete('api/inventory/items/{id}', 'InventoryController@deleteItem');

});