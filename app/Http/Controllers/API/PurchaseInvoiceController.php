<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PurchaseInvoice;
use App\Models\PurchaseInvoiceDetail;
use App\Models\Book;

class PurchaseInvoiceController extends Controller
{
    //
    public function getPurchaseInvoices() {
        $purchaseInvoices = PurchaseInvoice::with('supplier','admin','purchase_invoice_details')->get();
        
        return response()->json([
            'success' => true,
            'data' => $purchaseInvoices
        ]);
    }

    // 
    public function addPurchaseInvoice(Request $req) {
        try {

            $purchaseInvoice = new PurchaseInvoice();
            $purchaseInvoice->admin_id = $req->admin_id;
            $purchaseInvoice->supplier_id = $req->supplier_id;
            $purchaseInvoice->save();
    

            foreach($req->purchase_invoice_details as $item) {

                $purchaseInvoiceDetail = new PurchaseInvoiceDetail();
                $purchaseInvoiceDetail->purchase_invoice_id = $purchaseInvoice->id;
                $purchaseInvoiceDetail->book_id = $item['book_id'];
                $purchaseInvoiceDetail->quantity = $item['quantity'];
                $purchaseInvoiceDetail->cost = $item['cost'];
                $purchaseInvoiceDetail->price = $item['price'];
                $purchaseInvoiceDetail->save();

                $book = Book::find($item['book_id']);
                $book->quantity += $item['quantity'];
                $book->price += $item['price'];
                $book->save();
            }
    
    
            return response()->json([
                'success' => true,
                'msg' => "Nhập sản phẩm thành công",
                
            ]);
        } catch (Exception $e) {

            return response()->json([
                'success' => false,
                'msg' => "Nhập sản phẩm thất bại"
            ]);
        }
    }
}
