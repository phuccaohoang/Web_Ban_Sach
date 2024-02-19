<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    //
    public function addFavorite(Request $req) {

        $check = Favorite::where('book_id','=',$req->book_id)->where('customer_id','=',$req->customer_id)->get();
        if(count($check)) {
            return response()->json([
                'success' => false,
                'msg' => "that bai"
            ]);
        }

        $favorite = new Favorite();
        $favorite->book_id = $req->book_id;
        $favorite->customer_id = $req->customer_id;
        $favorite->save();
        return response()->json([
            'success' => true,
            'msg' => 'thanh cong'
        ]);
    }

    public function delFavorite(Request $req) {

        $favorite = Favorite::where('book_id','=',$req->book_id)->where('customer_id','=',$req->customer_id)->first();
        
        if(empty($favorite)) {
            return response()->json([
                'success' => true,
                'msg' => 'that bai'
            ]);
        }
        $favorite->delete();


        return response()->json([
            'success' => true,
            'msg' => 'thanh cong'
        ]);
    }
}
