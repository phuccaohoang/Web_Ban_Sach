<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SlideShow;

class SlideshowController extends Controller
{
    //
    public function getSlideshows() {
        $slides = SlideShow::all();

        return response()->json([
            'success' => true,
            'data' => $slides
        ]);
    }

    //

    public function addSlideshow(Request $req) {
        if ($req->hasFile('slides')) {
            foreach($req->file('slides') as $file) {
                $slide = new SlideShow();
                $path = $file->store('slideshow');
                $slide->name = $path;
                $slide->save();
            }

            return response()->json([
                'success' => true,
                'msg' => "co anh"
            ]);
        }
        return response()->json([
            'success' => false,
            'msg' => "ko co anh"
        ]);
    }

    // Xoa

    public function delSlideshow(Request $req) {
        $slide = SlideShow::find($req->slide_id);
        if(empty($slide)) {
            return response()->json([
                'success' => false,
                'msg' => "Không tồn tại"
            ]);
        }

        $slide->delete();
        return response()->json([
            'success' => true,
            'msg' => "Xóa thành công"
        ]);
    }
}
