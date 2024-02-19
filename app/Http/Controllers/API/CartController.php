<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    //
    public function getCartByIdCustomer($id) {
        $cart = Cart::where('customer_id','=',$id)->with('book')->get();

        return response()->json([
            'success' => true,
            'data' => $cart
        ]);
    }

    //
    public function addCart(Request $req) {

        $check = Cart::where('book_id','=',$req->book_id)->where('customer_id','=',$req->customer_id)->first();
        if(!empty($check)) {
            return response()->json([
                'success' => false,
                'msg' => 'da ton tai'
            ]); 
        }

        $cart = new Cart();
        $cart->customer_id = $req->customer_id;
        $cart->book_id = $req->book_id;
        $cart->quantity = $req->quantity;
        $cart->save();

        return response()->json([
            'success' => true,
            'msg' => 'them thanh cong'
        ]); 
    }

    public function delCart(Request $req) {

        $cart = Cart::find($req->id);
        if(empty($cart)) {
            return response()->json([
                'success' => false,
                'msg' => 'khong ton tai'
            ]); 
        }

        $cart->delete();

        return response()->json([
            'success' => true,
            'msg' => 'xoa thanh cong'
        ]); 
    }

    //chinh sua số lượng
    public function editCartItem(Request $req) {
        $cartItem = Cart::find($req->id);
        if(empty($cartItem)) {
            return response()->json([
                'success' => false,
                'msg' => 'Không tồn tại'
            ]); 
        }

        $cartItem->quantity = $req->quantity;
        $cartItem->save();
        return response()->json([
            'success' => true,
            'msg' => 'Chỉnh sửa thành công'
        ]); 
    }
}
