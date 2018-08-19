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

    public function getBigTreeToCategory() {
        $shopCategories = ShopCategories::all()->toArray();
        $shopCategoryById = [];
        $shopCategoryByParentId = [];
        foreach ($shopCategories as $shopCategory) {
            $shopCategoryById[$shopCategory['id']] = $shopCategory;
            $shopCategoryByParentId[$shopCategory['id_category']][] = $shopCategory;
        }
        $tree = [];
        $this->recursiveInverseTree($tree, $this->id, $shopCategoryByParentId, $shopCategoryById);
        return $tree;
    }

    public function recursiveInverseTree(&$tree, $id, $shopCategoryByParentId, $shopCategoryById) {
        $parentId = $shopCategoryById[$id]['id_category'];

        $category = [
            'category' => $shopCategoryById[$id],
            'parentBrothers' => $shopCategoryByParentId[$parentId]
        ];
        if ($parentId != 0) {
            $this->recursiveInverseTree($tree, $parentId, $shopCategoryByParentId, $shopCategoryById);
        }
        $tree[] = $category;
    }
}
