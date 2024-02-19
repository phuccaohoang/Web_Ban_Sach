<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SalesInvoice;
use App\Models\SalesInvoiceDetail;
use App\Models\CouponInvoice;
use App\Models\Cart;

class SalesInvoiceController extends Controller
{
    //
    public function getSalesInvoices() {
        $salesInvoices = SalesInvoice::with('customer', 'admin', 'delivery_status', 'sales_invoice_details', 'coupon_invoices')->get();

        return response()->json([
            'success' => true,
            'msg' => 'Danh sách hóa đơn',
            'data' => $salesInvoices
        ]);
    }

    //thêm hóa đơn bán

    public function addSalesInvoice(Request $req) {

        $salesInvoice = new SalesInvoice();
        $salesInvoice->customer_id = $req->customer_id;
        $salesInvoice->phone = $req->phone;
        $salesInvoice->address = $req->address;
        $salesInvoice->shipping_cost = $req->shippingCost;
        $salesInvoice->save();

        

        if($req->discount_invoice != 0) {
            $couponInvoice = new CouponInvoice();
            $couponInvoice->coupon_id = $req->discount_invoice;
            $couponInvoice->sales_invoice_id = $salesInvoice->id;
            $couponInvoice->save();
        }
        if($req->discount_shipping != 0) {
            $couponInvoice = new CouponInvoice();
            $couponInvoice->coupon_id = $req->discount_shipping;
            $couponInvoice->sales_invoice_id = $salesInvoice->id;
            $couponInvoice->save();

        }
        

        foreach($req->carts as $item) {
            $invoiceDetail = new SalesInvoiceDetail();
            $invoiceDetail->sales_invoice_id = $salesInvoice->id;
            $invoiceDetail->book_id = $item['book_id'];
            $invoiceDetail->quantity = $item["quantity"];
            $invoiceDetail->price = $item['book']['price'];
            $invoiceDetail->discount = $item['book']['discount'];
            $invoiceDetail->save();
        }

        $carts = Cart::where('customer_id', $req->customer_id)->get();
        foreach($carts as $cart) {
            $cart->delete();
        }

        return response()->json([
            'success' => true,
            'msg' => 'Thêm hóa đơn thành công'
        ]);
    }
}
