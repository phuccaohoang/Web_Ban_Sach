<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EbookSalesInvoice;

class EbookSalesInvoiceController extends Controller
{
    //
    public function getEbookSalesInvoices() {
        $invoices = EbookSalesInvoice::with('customer', 'book')->get();

        return response()->json([
            'success' => true,
            'msg' => 'Danh sách hóa đơn',
            'data' => $invoices
        ]);
    }
}
