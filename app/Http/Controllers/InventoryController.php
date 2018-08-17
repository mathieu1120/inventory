<?php

namespace App\Http\Controllers;

use App\Http\Requests\InventoryItemEditRequest;
use App\Http\Requests\InventoryShopProductEditRequest;
use App\Item;
use App\ShopCategories;
use App\ShopProduct;
use App\ShopProductMedia;
use Etsy\EtsyApi;
use Etsy\EtsyClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InstagramAPI\Instagram;

class InventoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('inventory');
    }

    public function items(Request $request, JsonResponse $response) {
        $offset = (int)$request->query('offset', 0);
        $search = explode(' ', $request->query('search', ''));
        $orderBy = $request->query('orderby', 'name');
        $orderType = $request->query('ordertype', 'asc');

        $query = Item::where('status', 1);

        if ($search) {
            $searchQuery = $query->where(function ($q) use ($search) {
                foreach ($search as $value) {
                    $q->orWhere('name', 'like', "%{$value}%");
                }
            });
            $searchCount = $searchQuery->count();
        }

        $items = $query
            ->select(['id',
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
                'etsy_listing_id',
                'shop_product_id',])
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

    public function uploadImage(Request $request, JsonResponse $response) {
        if ($request->hasFile('file_item') && $request->file('file_item')->isValid()) {
            return $response->setData([
                'url' => '/storage/'.$request->file_item->store('inventory_image_items', 'public'),
            ]);
        }
        return $response->setData([
            'error' => 'error in file'
        ]);
    }

    public function createItem(InventoryItemEditRequest $request, JsonResponse $response) {
        /**
         * @var Item $item
         */
        $item = Item::create($request->all());
        $item = Item::find($item->id);
        $response->headers->set('X-ITEMS-TOTAL', Item::where('status', 1)->count());
        return $response->setData([
            'item' => $item->editableFieldsArray()
        ]);
    }

    public function editItem(InventoryItemEditRequest $request, JsonResponse $response, $id) {
        Item::where('id', $id)
            ->update($request->all());

        /**
         * @var Item $item
         */
        $item = Item::find($id);
        return $response->setData([
            'item' => $item->editableFieldsArray()
        ]);
    }

    public function deleteItem(Request $request, JsonResponse $response, $id) {
        Item::where('id', $id)
            ->update(['status' => false]);

        $response->headers->set('X-ITEMS-TOTAL', Item::where('status', 1)->count());
        return $response->setData([
            'deletedItemId' => $id
        ]);
    }

    public function soldItem(Request $request, JsonResponse $response, $id) {
        $newAttributes = $request->all();
        $newAttributes['status'] = false;
        $newAttributes['sold'] = true;

        Item::where('id', $id)
            ->update($newAttributes);

        $response->headers->set('X-ITEMS-TOTAL', Item::where('status', 1)->count());
        return $response->setData([
            'soldItemId' => $id
        ]);
    }

    public function getEtsyItems(Request $request, JsonResponse $response) {
        $consumerKey = config('auth_etsy.consumer_key');
        $consumerSecret = config('auth_etsy.consumer_secret');
        $accessToken = config('auth_etsy.access_token');
        $accessTokenSecret = config('auth_etsy.access_token_secret');

        $client = new EtsyClient($consumerKey, $consumerSecret);
        $client->authorize($accessToken, $accessTokenSecret);

        $api = new EtsyApi($client);

        $keyword = $request->query('keyword', '');
        $minPrice = $request->query('min_price', 0.00);
        $maxPrice = $request->query('max_price', 1000.00);

        return $response->setData([
            'searchResults' => $api->findAllShopListingsActive([
                'params' => [
                    'shop_id' => 5605001,
                ],
                'data' => [
                    'limit' => 1000,
                    'keywords' => $keyword,
                    'min_price' => $minPrice,
                    'max_price' => $maxPrice,
                    'include_private' => true
                ]
            ])
        ]);
    }

    public function getEtsyItem(Request $request, JsonResponse $response, $listingId) {
        $consumerKey = config('auth_etsy.consumer_key');
        $consumerSecret = config('auth_etsy.consumer_secret');
        $accessToken = config('auth_etsy.access_token');
        $accessTokenSecret = config('auth_etsy.access_token_secret');

        $client = new EtsyClient($consumerKey, $consumerSecret);
        $client->authorize($accessToken, $accessTokenSecret);

        $api = new EtsyApi($client);

        return $response->setData([
            'item' => $api->getListing([
                'params' => [
                    'listing_id' => $listingId,
                ]
            ]),
            'images' => $api->findAllListingImages([
                'params' => [
                    'listing_id' => $listingId,
                ]
            ])
        ]);
    }

    public function getEtsyItemShippingTemplates(Request $request, JsonResponse $response) {
        $consumerKey = config('auth_etsy.consumer_key');
        $consumerSecret = config('auth_etsy.consumer_secret');
        $accessToken = config('auth_etsy.access_token');
        $accessTokenSecret = config('auth_etsy.access_token_secret');

        $userId = 7738069;

        $client = new EtsyClient($consumerKey, $consumerSecret);
        $client->authorize($accessToken, $accessTokenSecret);

        $api = new EtsyApi($client);

        return $response->setData($api->findAllUserShippingProfiles([
            'params' => [
                'user_id' => $userId,
            ]
        ]));
    }

    public function getEtsyItemCategories(Request $request, JsonResponse $response) {
        $consumerKey = config('auth_etsy.consumer_key');
        $consumerSecret = config('auth_etsy.consumer_secret');
        $accessToken = config('auth_etsy.access_token');
        $accessTokenSecret = config('auth_etsy.access_token_secret');

        $client = new EtsyClient($consumerKey, $consumerSecret);
        $client->authorize($accessToken, $accessTokenSecret);

        $api = new EtsyApi($client);

        return $response->setData($api->getSellerTaxonomy());
    }

    public function getRachaelsCategories(Request $request, JsonResponse $response, $parentCategoryId) {
        /**
         * @var ShopProduct $shopProduct
         */
        $shopCategories = ShopCategories::with('categories')
            ->where('status', 1)
            ->where('id_category', $parentCategoryId)
            ->get()->toArray();
        return $response->setData([
            'categories' => $shopCategories
        ]);
    }

    public function getRachaelsProduct(Request $request, JsonResponse $response, $productId) {
        /**
         * @var ShopProduct $shopProduct
         */
        $shopProduct = ShopProduct::with('shopProductMedia')->find($productId);
        return $response->setData([
            'product' => !empty($shopProduct) ? $shopProduct->toArray() : null
        ]);
    }

    public function createRachaelsProduct(InventoryShopProductEditRequest $request, JsonResponse $response) {
        $data = $request->all();
        $images = $request->post('shop_product_media');
        unset($data['shop_product_media']);
        unset($data['item_id']);

        $item = Item::find($request->post('item_id'));

        $shopProduct = ShopProduct::create($data);
        $item->update(['shop_product_id' => $shopProduct->id]);

        if (!empty($images) && !empty($images[0])) {
            $shopProduct->shopProductMedia()->createMany($images);
        }
        $shopProduct = ShopProduct::with('shopProductMedia')->find($shopProduct->id);

        return $response->setData([
            'product' => $shopProduct->toArray()
        ]);
    }

    public function editRachaelsProduct(InventoryShopProductEditRequest $request, JsonResponse $response, $productId) {
        $data = $request->all();
        $images = $request->post('shop_product_media');
        unset($data['shop_product_media']);
        unset($data['item_id']);

        $newImages = [];
        foreach ($images as $image) {
            if (!empty($image['id'])) {
                ShopProductMedia::where('id', $image['id'])->update($image);
            } else if (!empty($image)){
                $newImages[] = $image;
            }
        }

        ShopProduct::where('id', $productId)
            ->update($data);

        $shopProduct = ShopProduct::with('shopProductMedia')->find($productId);
        if ($newImages) {
            $shopProduct->shopProductMedia()->createMany($newImages);
            $shopProduct = ShopProduct::with('shopProductMedia')->find($productId);
        }
        return $response->setData([
            'product' => $shopProduct->toArray()
        ]);
    }

    public function addRachaelsCategory(Request $request, JsonResponse $response, $parentCategoryId) {
        $name = $request->post('newCategory');

        ShopCategories::create([
            'id_category' => (int)$parentCategoryId,
            'name'        => $name
        ]);

        $shopCategories = ShopCategories::with('categories')
            ->where('status', 1)
            ->where('id_category', $parentCategoryId)
            ->get()->toArray();
        return $response->setData([
            'categories' => $shopCategories
        ]);
    }
}