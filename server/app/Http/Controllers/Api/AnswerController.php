<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerResource;
use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Models\Choice;
use App\Models\Word;

class AnswerController extends Controller
{
    public function index()
    {
        return AnswerResource::collection(Answer::all());
    }

    public function store(StoreAnswerRequest $request)
    {
        $answer = Answer::create([
            'user_id' => auth()->user()->id,
            'choice_id' => $request->choice_id,
        ]);

        return response()->json([
            'data' => new AnswerResource($answer),
            'message' => 'Answer created successfully'
        ]);
    }
}