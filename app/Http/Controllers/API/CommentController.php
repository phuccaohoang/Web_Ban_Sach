<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    //
    public function getCommentsOfBook($id) {

        $cmtsBook = Comment::where('book_id','=', $id)->with('account','replies')->get();

        if (!count($cmtsBook)) {
            return response()->json([
                'success' => false,
                'msg' => 'that bai'
            ]);
        }

        return response()->json([
            'success' => true,
            'msg' => 'tat ca binh luan cua sach',
            'data' => $cmtsBook
        ]);
    } 

    // 
    public function addComment(Request $req) {

        try {

            $cmt = new Comment();
            $cmt->book_id = $req->book_id;
            $cmt->customer_id = $req->customer_id;
            $cmt->text = $req->text;
            $cmt->is_feedback = $req->is_feedback;
            $cmt->save();

            return response()->json([
                'success' => true,
                'msg' => 'binh luan thanh cong'
            ]);

        } catch (Exception $e) {

            return response()->json([
                'success' => false,
                'msg' => "binh luan that bai: $e"
            ]);
        }
        
    }
    //
}
