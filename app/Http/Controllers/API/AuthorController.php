<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    //

    public function getAuthors() {
        
        $authors = Author::all();

        return response()->json([
            'success' => true,
            'data' => $authors
        ]);
    }

    //
    public function addAuthor(Request $req) {
        try {
            $check = Author::where('name',$req->name)->first();
            if (!empty($check)) {
                return response()->json([
                    'success' => false,
                    'msg' => 'Đã tồn tại tác giả',
                ]);
            }

            $author = new Author();
            $author->name = $req->name;
            $author->summary = $req->summary;
            $author->save();
            return response()->json(['success' => true, 'msg' => 'Thêm thành công']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'msg' => 'Thêm thất bại']);
        }
    }

    //

    public function delAuthor(Request $req) {
        $author = Author::find($req->author_id);
        if(empty($author)) {
            return response()->json([
                'success' => false,
                'msg' => 'xóa thất bại',
            ]);
        }

        $author->status = 0;
        $author->save();

        return response()->json([
            'success' => true,
            'msg' => 'xóa thành công',
        ]);
    }
    //

    public function editAuthor(Request $req) {
        $author = Author::find($req->author_id);
        if(empty($author)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
            ]);
        }
        $check = Author::where('name',$req->name)->where('id','<>',$author->id)->get();
        if(count($check) > 1){
            return response()->json([
                'success' => false,
                'msg' => 'tên tồn tại',
            ]);
        }

        $author->name = $req->name;
        $author->summary = $req->summary;
        $author->save();

        return response()->json([
            'success' => true,
            'msg' => 'sửa thành công',
        ]);
    }
}
