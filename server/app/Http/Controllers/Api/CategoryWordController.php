<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryWordController extends Controller
{
    public function show(Category $category)
    {
        return response()->json([
            'data' => $category->words
        ]);
    }
}
