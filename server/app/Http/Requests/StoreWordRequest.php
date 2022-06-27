<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:words',
            'category_id' => 'required|exists:categories,id',
            'choices' => 'required|array',
            'choices.*.name' => 'required|string|max:255',
            'choices.*.is_correct' => 'required|boolean',
        ];
    }
}
