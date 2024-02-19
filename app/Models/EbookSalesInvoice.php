<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbookSalesInvoice extends Model
{
    use HasFactory;
    protected $table = "ebook_sales_invoices";

    public function customer() {
        return $this->belongsTo(Customer::class);
    }
    public function book() {
        return $this->belongsTo(Book::class);
    }
  
}
