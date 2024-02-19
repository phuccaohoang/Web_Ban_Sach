<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseInvoiceDetail extends Model
{
    use HasFactory;
    protected $table = "purchase_invoice_details";

    public function book() {
        return $this->belongsTo(Book::class);
    }
}
