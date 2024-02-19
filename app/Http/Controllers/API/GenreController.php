<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Genre;

class GenreController extends Controller
{
    //
    public function getGenres(){
        $genres = Genre::with('genres_books')->get();

        return response()->json([
            'success' => true,
            'data' => $genres,
        ]);
        
    }
    // danh sach cua mot loai
    public function getGenreById() {
        $id = request(['genre_id']);

        $genre = Genre::where('id','=',$id)->with('genres_books')->first();
        if(empty($genre)){
            return response()->json([
                'success' => false,
                'msg' => 'Khong ton tai',
            ]);
        }
        return response()->json([
            'success' => true,
            'data' => $genre,
        ]);
    }
    //
    public function addGenre(Request $req) {
        
        try {
            $check = Genre::where('name',$req->name)->first();
            if (!empty($check)) {
                return response()->json([
                    'success' => false,
                    'msg' => 'Đã tồn tại thể loại',
                ]);
            }

            $genre = new Genre();
            $genre->name = $req->name;
            $genre->description = $req->description;
            $genre->save();

            return response()->json([
                'success' => true,
                'msg' => 'Thêm thành công',
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'msg' => 'Thêm thất bại',
            ]);
        }
    }

    //

    public function editGenre(Request $req) {
        $genre = Genre::find($req->genre_id);
        if(empty($genre)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
            ]);
        }
        $check = Genre::where('name',$req->name)->where('id','<>',$genre->id)->get();
        if(count($check) > 1) {
            return response()->json([
                'success' => false,
                'msg' => 'tên tồn tại',
            ]);
        }

        $genre->name = $req->name;
        $genre->description = $req->description;
        $genre->save();

        return response()->json([
            'success' => true,
            'msg' => 'sửa thành công',
        ]);
    }
}
