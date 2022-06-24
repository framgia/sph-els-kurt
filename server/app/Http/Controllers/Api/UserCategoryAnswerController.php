<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerResource;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class UserCategoryAnswerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, User $user, Category $category)
    {
        return AnswerResource::collection($user->answers->where('choice.word.category_id', $category->id));
    }
}
