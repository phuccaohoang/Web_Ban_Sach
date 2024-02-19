<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\Admin;
use App\Models\Account;

class AdminController extends Controller
{
    //
    public function getAdmins($status) {
        $admins = Admin::where('status',$status)->with('account')->get();

        return response()->json([
            'success' => true,
            'data' => $admins,
        ]);
    }
    //
    public function getAdminById($id) {
        $admin = Admin::with('account')->where('id',$id)->first();

        return response()->json([
            'success' => true,
            'data' => $admin,
        ]);
    }
    //

    public function addAdmin(Request $req) {
        try {

            $check = Account::where('username',$req->username)->first();
            if(!empty($check)) {
                return response()->json([
                    'success' => false,
                    'msg' => 'Đã tồn tại username',
                ]);
            }
            $check = Admin::where('email',$req->email)->first();
            if(!empty($check)) {
                return response()->json([
                    'success' => false,
                    'msg' => 'Đã tồn tại email',
                ]);
            }

            $acc = new Account();
            $acc->username = $req->username;
            $acc->password = Hash::make($req->password);
            $acc->is_admin = 1;
            $acc->save();

            $admin = new Admin();
            $admin->name = $req->name;
            $admin->phone = $req->phone;
            $admin->address = $req->address;
            $admin->email = $req->email;
            $admin->account_id = $acc->id;
            $admin->save();

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
    // xoa

    public function delAdmin(Request $req) {

        $admin = Admin::find($req->id);
        if(empty($admin)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
            ]);
        }

        if($admin->account_id == 1){
            return response()->json([
                'success' => false,
                'msg' => 'không thể xóa tài khoản này',
            ]);
        }

        $admin->status = 0;
        $admin->save();

        $acc = Account::find($admin->account_id);
        $acc->status = 0;

        return response()->json([
            'success' => true,
            'msg' => 'Xóa thành công',
        ]);
    }

    public function recoveryAdmin(Request $req) {
        $admin = Admin::find($req->id);
        if(empty($admin)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
            ]);
        }

        $admin->status = 1;
        $admin->save();

        $acc = Account::find($admin->account_id);
        $acc->status = 1;

        return response()->json([
            'success' => true,
            'msg' => 'Khôi phục thành công',
        ]);
    }

    //chinh sua
    public function editAdmin(Request $req) {
        $admin = Admin::find($req->admin_id);
        if(empty($admin)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
            ]);
        }

        $admin->name = $req->name;
        $admin->address = $req->address;
        $admin->phone = $req->phone;
        $admin->email = $req->email;

        $admin->save();

        return response()->json([
            'success' => true,
            'msg' => 'Cập nhật thành công',
        ]);
    }
}
