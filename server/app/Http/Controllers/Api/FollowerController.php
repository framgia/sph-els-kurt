<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FollowerResource;
use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return FollowerResource
     */
    public function index(): FollowerResource
    {
        $user = auth()->user();

        return new FollowerResource($user->followers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return FollowerResource
     */
    public function store(Request $request, User $user)
    {
        if ($user->followers()->where('follower_id', auth()->id())->exists()) {
            return response()->json(['message' => 'You are already following this user.']);
        }
        
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot follow yourself.']);
        }

        $user->followers()->attach(auth()->id());

        return new FollowerResource($user->followers);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return FollowerResource
     */
    public function show(User $user)
    {
        return new FollowerResource($user->followers);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user)
    {
        $user->followers()->detach(auth()->id());

        return response()->json(['message' => 'You are no longer following this user.']);
    }
}
