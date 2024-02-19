<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;

class ImageController extends Controller
{
    //

    public function updateAvatar(Request $req) {
        if ($req->hasFile('avatar')) {
            $file = $req->file('avatar');

            $path = $file->store('images/avatar');

            $acc = Account::find($req->account_id);
            $acc->avatar = $path;
            $acc->save();

            return response()->json([
                'success' => true,
                'msg' => 'Cập nhật thành công'
             ]);
        }
        
        return response()->json([
            'success' => false,
            'msg' => 'ko co file'
         ]);
    }
}
