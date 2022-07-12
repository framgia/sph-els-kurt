<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerResource;
use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Models\Choice;
use App\Models\Word;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index()
    {
        return AnswerResource::collection(Answer::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'choice_id' => 'required|exists:choices,id',
        ]);

        $answer = Answer::create([
            'user_id' => auth()->user()->id,
            'choice_id' => $request->choice_id,
        ]);

        $wordsCount = Word::where('category_id', $answer->choice->word->category_id)
            ->count();

        $userAnswers = Answer::where('user_id', auth()->user()->id)
            ->leftJoin('choices', 'answers.choice_id', '=', 'choices.id')
            ->leftJoin('words', 'choices.word_id', '=', 'words.id')
            ->leftJoin('categories', 'words.category_id', '=', 'categories.id')
            ->where('categories.id', $answer->choice->word->category_id);

        if ($wordsCount == $userAnswers->count())
        {
            $correctAnswersCount = $userAnswers->where('choices.is_correct', true)->count();

            activity()
                ->by(auth()->user())
                ->event('learned')
                ->log(auth()->user()->name . ' has learned ' . $correctAnswersCount . ' of ' . $wordsCount . ' words in ' . $answer->choice->word->category->name);
        }

        return response()->json([
            'data' => new AnswerResource($answer),
            'message' => 'Answer created successfully'
        ]);
    }
}
