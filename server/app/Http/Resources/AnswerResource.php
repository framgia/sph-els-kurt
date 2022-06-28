<?php

namespace App\Http\Resources;

use App\Models\Choice;
use App\Models\Word;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'user_id' => $this->user_id,
            'choice_id' => $this->choice_id,
            'choice' => $this->choice->name,
            'word_id' => $this->choice->word->name,
            'category_id' => $this->choice->word->category->name,
            'correct' => $this->choice->is_correct
        ];
    }
}
