<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenreBook extends Model
{
    use HasFactory;
    protected $table = "genres_books";
    protected $hidden = [
        "book_id",
        "genre_id",
        "created_at",
        "updated_at",
    ];

    public function genre() {
        return $this->belongsTo(Genre::class);
    }
    public function book() {
        return $this->belongsTo(Book::class);
    }
}
