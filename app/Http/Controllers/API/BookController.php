<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Image;
use App\Models\GenreBook;

class BookController extends Controller
{
    //Lấy tất cả sách
    public function getAllBooks($status) {

        $books = Book::where('status',$status)->with('genres_books','images','author')->get();

        return response()->json([
            'success' => true,
            'msg' => 'danh sach sach',
            'data' => $books,
        ]);
    }
    //Lấy sách in
    public function getBooks($status) {

        $books = Book::where('status',$status)->where('is_ebook', 0)->with('genres_books','images','author')->get();

        return response()->json([
            'success' => true,
            'msg' => 'danh sach sach',
            'data' => $books,
        ]);
    }
    //Lấy sách e-book
    public function getEBooks($status) {

        $books = Book::where('status',$status)->where('is_ebook', 1)->with('genres_books','images','author')->get();

        return response()->json([
            'success' => true,
            'msg' => 'danh sach sach',
            'data' => $books,
        ]);
    }
    // chi tiet sach
    public function getBookById($id){

        $book = Book::where('id', '=', $id)->with('genres_books','images','author')->first();
        if(empty($book)) {
            return response()->json([
                "success" => false,
                "msg" => "Khong ton tai sach",
            ]);
        }
        return response()->json([
            "success" => true,
            "msg" => "Chi tiet sach",
            "data" => $book,
        ]);
    }


    //
    public function addBook(Request $req) {

        $check = Book::where('name', $req->name)->first();
        if(!empty($check)) {
            return response()->json([
                "success" => false,
                "msg" => "Đã tồn tại",
            ]);
        }
        
        if ($req->hasFile('images') and $req->hasFile('image_theme')){
            
            $img_theme = $req->file('image_theme')->store('images/theme_books');

            $book = new Book();
            $book->author_id = $req->author_id;
            $book->name = $req->name;
            $book->is_ebook = $req->is_ebook;
            $book->summary = $req->summary;
            $book->image_theme = $image_theme;
            $book->save();
            $book_id = $book->id;
            foreach($req->genres as $genre_id) {
                $genreBook = new GenreBook();
                $genreBook->genre_id = $genre_id;
                $genreBook->book_id = $book_id;
                $genreBook->save();
            }



            foreach($req->file('images') as $file) {
                $path = $file->store("images/books/$book->id");
                $img = new Image();
                $img->book_id = $book->id;
                $img->name = $path;
                $img->save();
            }

            return response()->json([
                "success" => true,
                "msg" => "thêm thành công",
            ]);
        }
        return response()->json([
            "success" => false,
            "msg" => "ko file",
        ]);
    }

    // xoa
    public function delBook(Request $req) {
        $book = Book::find($req->id);
        if(empty($book)){
            return response()->json([
                "success" => false,
                "msg" => "xóa thất bại",
            ]);
        }

        $book->status = 0;
        $book->save();
        return response()->json([
            "success" => true,
            "msg" => "xóa thành công",
        ]);
    }
    public function recoveryBook(Request $req) {
        $book = Book::find($req->id);
        if(empty($book)){
            return response()->json([
                "success" => false,
                "msg" => "xóa thất bại",
            ]);
        }

        $book->status = 1;
        $book->save();
        return response()->json([
            "success" => true,
            "msg" => "xóa thành công",
        ]);
    }
    //chinh sua
    public function editBook(Request $req) {
        
        $check = Book::where('name', $req->name)->where('id','<>', $req->book_id)->get();
        if(count($check) > 0) {
            return response()->json([
                "success" => false,
                "msg" => "Tên tồn tại",
            ]);
        }
        
        $book = Book::find($req->book_id);
        if(!empty($book)) {
            if($req->hasFile('image_theme')) {
                $book->image_theme = $req->file('image_theme')->store('images/books/image_themes');
            }
            if($req->hasFile('images')) {

                $img_old = Image::where('book_id', $book->id)->get();
                foreach($img_old as $item) {
                    $item->delete();
                }


                foreach($req->file('images') as $file) {
                    $path = $file->store("images/books/$book->id");
                    $img = new Image();
                    $img->book_id = $book->id;
                    $img->name = $path;
                    $img->save();
                }
            }

            

            $book->author_id = $req->author_id;
            $book->name = $req->name;
            $book->discount = $req->discount;
            $book->price = $req->price;
            $book->summary = $req->summary;

            $genre_old = GenreBook::where('book_id',$book->id)->get();
            foreach($genre_old as $item) {
                $item->delete();
            }
            foreach($req->genres as $genre_id) {
                $genreBook = new GenreBook();
                $genreBook->genre_id = $genre_id;
                $genreBook->book_id = $book->id;
                $genreBook->save();
            }

            $book->save();

            return response()->json([
                "success" => true,
                "msg" => "Chỉnh sửa thành công",
            ]);
        }

        return response()->json([
            "success" => false,
            "msg" => "chỉnh sửa thất bại",
        ]);
    }
}
