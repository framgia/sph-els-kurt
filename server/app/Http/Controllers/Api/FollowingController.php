<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FollowerResource;
use App\Models\User;
use Illuminate\Http\Request;

class FollowingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return FollowerResource
     */
    public function index()
    {
        $user = auth()->user();

        return new FollowerResource($user->following);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return FollowerResource
     */
    public function show(User $user)
    {
        return new FollowerResource($user->follows);
    }

}
