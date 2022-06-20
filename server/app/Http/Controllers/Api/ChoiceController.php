<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChoiceRequest;
use App\Http\Requests\UpdateChoiceRequest;
use App\Http\Resources\ChoiceResource;
use App\Models\Choice;
use Illuminate\Http\Request;

class ChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ChoiceResource::collection(Choice::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreChoiceRequest $request)
    {
        $choice = Choice::create($request->validated());

        return new ChoiceResource($choice);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Choice $choice)
    {
        return new ChoiceResource($choice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateChoiceRequest $request, Choice $choice)
    {
        $choice->update($request->validated());

        return new ChoiceResource($choice);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Choice $choice)
    {
        if (auth()->user()->is_admin) {
            $choice->delete();

            return response()->json(['message' => 'Choice deleted successfully.']);
        } else {
            return response()->json(['message' => 'You are not authorized to delete this resource.']);
        }
    }
}
