<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = "comments";

    public function book() {
        return $this->belongsTo(Book::class);
    }

    public function account() {
        return $this->belongsTo(Account::class);
    }

    public function replies() {
        return $this->hasMany(Reply::class);
    }
  
}
