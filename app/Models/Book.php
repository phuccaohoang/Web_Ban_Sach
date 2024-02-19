<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table = "books";
    protected $hidden = [
        "created_at",
        "updated_at",
    ];

    public function author() {
        return $this->belongsTo(Author::class);
    }
    public function images() {
        return $this->hasMany(Image::class);
    }
    public function genres_books() {
        return $this->hasMany(GenreBook::class)->with('genre');
    }
    public function comments() {
        return $this->hasMany(Comment::class)->with('replies');
    }
}
