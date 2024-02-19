<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;
    protected $table = "replies";

    public function comment() {
        return $this->belongsTo(Comment::class);
    }
    public function customer() {
        return $this->belongsTo(Customer::class);
    }
}
