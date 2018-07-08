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

Route::get('/', function () {
    return redirect('list');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/inventory', 'InventoryController@index');

Route::get('api/inventory/items', 'InventoryController@items');

Route::post('api/inventory/uploadImage', 'InventoryController@uploadImage');

Route::post('api/inventory/items/{id}/edit', 'InventoryController@editItem');

Route::post('api/inventory/items/{id}/sold', 'InventoryController@soldItem');

Route::post('api/inventory/items/create', 'InventoryController@createItem');

Route::delete('api/inventory/items/{id}', 'InventoryController@deleteItem');