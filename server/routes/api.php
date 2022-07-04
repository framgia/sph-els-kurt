<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/users', Api\UserController::class);

    Route::get('/followers', [Api\FollowerController::class, 'index']);
    Route::get('/followers/{user}', [Api\FollowerController::class, 'show']);
    Route::post('/followers/{user}', [Api\FollowerController::class, 'store']);
    Route::delete('/followers/{user}', [Api\FollowerController::class, 'destroy']);

    Route::get('/following', [Api\FollowingController::class, 'index']);
    Route::get('/following/{user}', [Api\FollowingController::class, 'show']);

    Route::apiResource('/categories', Api\CategoryController::class);
    Route::get('/categories/{category}/words', [Api\CategoryWordController::class, 'show']);
    Route::apiResource('/words', Api\WordController::class);
    Route::apiResource('/choices', Api\ChoiceController::class);
    Route::apiResource('/answers', Api\AnswerController::class)->only([
        'index', 'store'
    ]);

    Route::get('/users/{user}/answers', Api\UserAnswerController::class);
    Route::get('/users/{user}/categories/{category}/answers', Api\UserCategoryAnswerController::class);

    Route::get('/users/{user}/activities', [Api\ActivityLogController::class, 'index']);
});