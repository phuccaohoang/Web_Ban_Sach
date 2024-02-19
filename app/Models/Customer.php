<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = "customers";
    protected $hidden = [
        "created_at",
        "updated_at",
    ];

    public function carts() {
        return $this->hasMany(Cart::class)->with('book');
    }
    public function favorites() {
        return $this->hasMany(Favorite::class)->with('book');
    }
    public function account() {
        return $this->belongsTo(Account::class);
    }
}
