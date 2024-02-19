<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CouponInvoice extends Model
{
    use HasFactory;
    protected $table = "coupons_invoices";

    public function sales_invoice() {
        return $this->belongsTo(SalesInvoice::class);
    }
    public function coupon() {
        return $this->belongsTo(Coupon::class);
    }
}
