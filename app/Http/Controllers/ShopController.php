<?php

namespace App\Http\Controllers;

use App\ShopCartProducts;
use App\ShopCarts;
use App\ShopCategories;
use App\ShopProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Item;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('shop');
    }

    public function items(Request $request, JsonResponse $response) {
        $offset = (int)$request->query('offset', 0);
        $search = explode(' ', $request->query('search', ''));
        $orderBy = $request->query('orderby', 'name');
        $orderType = $request->query('ordertype', 'asc');

        $query = ShopProduct::with('shopProductMedia')->where('status', 1);

        if ($search) {
            $searchQuery = $query->where(function ($q) use ($search) {
                foreach ($search as $value) {
                    $q->orWhere('name', 'like', "%{$value}%");
                }
            });
            $searchCount = $searchQuery->count();
        }

        $items = $query
            ->orderBy($orderBy, $orderType)
            ->skip($offset)
            ->take(50)
            ->get()
            ->toArray();

        $count = isset($searchCount) ? $searchCount : ShopProduct::where('status', 1)->count();

        $response->headers->set('X-ITEMS-TOTAL', $count);
        $response->headers->set('X-ITEMS-NEXT-OFFSET', $offset + 50 < $count ? $offset + 50 : -1);

        return $response->setData($items);
    }

    public function item(Request $request, JsonResponse $response, $id) {
        $item = ShopProduct::with('shopProductMedia')
            ->where('id' , $id)
            ->where('status', true)
            ->first()
            ->toArray();

        return $response->setData(
            $item
        );
    }

    public function cart(Request $request, JsonResponse $response) {
        $uuidCart = $request->cookie('uuid_cart');
        if (!$uuidCart) {
            return $response->setData([
                'products' => []
            ]);
        }

        $products = ShopProduct
            ::with('shopProductMedia')
            ->join('shop_cart_products', 'shop_products.id', '=', 'shop_cart_products.id_product')
            ->join('shop_carts', 'shop_carts.id', 'shop_cart_products.id_cart')
            ->where('shop_carts.uuid', $uuidCart)
            ->select('shop_products.*')
            ->get()
            ->toArray();

        return $response->setData([
            'products' => $products
        ]);
    }

    public function addProductToCart(Request $request, JsonResponse $response) {
        $uuidCart = $request->cookie('uuid_cart');
        $productId = $request->post('id_product');
        $quantity = $request->post('quantity', 1);
        $cart = null;
        if (!$uuidCart) {
            $uuidCart = uniqid();
            $cart = ShopCarts::create([
                'uuid' => $uuidCart
            ]);
        } else {
            $cart = ShopCarts::where('status', 1)->where('uuid', $uuidCart)->first();
        }
        $cart->products()->create([
            'id_product' => $productId,
            'quantity'   => $quantity
        ]);

        $products = ShopProduct
            ::with('shopProductMedia')
            ->join('shop_cart_products', 'shop_products.id', '=', 'shop_cart_products.id_product')
            ->join('shop_carts', 'shop_carts.id', 'shop_cart_products.id_cart')
            ->where('shop_carts.uuid', $uuidCart)
            ->select('shop_products.*')
            ->get()
            ->toArray();

        return $response->setData([
            'products' => $products
        ])->cookie('uuid_cart', $uuidCart, 15);
    }
}