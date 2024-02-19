<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseInvoice extends Model
{
    use HasFactory;
    protected $table = "purchase_invoices";

    public function purchase_invoice_details() {
        return $this->hasMany(PurchaseInvoiceDetail::class)->with('book');
    }

    public function supplier() {
        return $this->belongsTo(Supplier::class);
    }
    public function admin() {
        return $this->belongsTo(Admin::class);
    }
}
