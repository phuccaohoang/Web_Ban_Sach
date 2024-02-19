<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesInvoiceDetail extends Model
{
    use HasFactory;
    protected $table = "sales_invoice_details";
    protected $hidden = [
        "created_at",
        "updated_at",
    ];

    public function book() {
        return $this->belongsTo(Book::class);
    }
}
