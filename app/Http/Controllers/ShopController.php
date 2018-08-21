<?php

namespace App\Http\Controllers;

use App\ShopCategories;
use App\ShopProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Item;

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

        $count = isset($searchCount) ? $searchCount : Item::where('status', 1)->count();

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
}