<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    protected $fillable = [
        'word_id',
        'name',
        'is_correct',
    ];

    public function word()
    {
        return $this->belongsTo(Word::class);
    }
}
