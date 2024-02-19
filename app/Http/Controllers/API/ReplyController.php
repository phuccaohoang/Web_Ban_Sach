<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reply;

class ReplyController extends Controller
{
    //
    public function addReply(Request $req) {
        try {

            $reply = new Reply();
            $reply->comment_id = $req->comment_id;
            $reply->customer_id = $req->customer_id;
            $reply->text = $req->text;
            $reply->save();

            return response()->json([
                'success' => true,
                'msg' => 'tra loi thanh cong'
            ]);
        } catch (Exception $e) {

            return response()->json([
                'success' => false,
                'msg' => "tra loi that bai: $e"
            ]);
        }
    }
}
