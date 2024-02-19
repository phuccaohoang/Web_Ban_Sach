<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Customer;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;


class AccountController extends Controller
{
    public function login()
    {
        $account = request(['username', 'password', 'is_admin']);
        $account['status'] = 1;


        if (! $token = auth()->attempt($account)) {
            return response()->json([
                'success' => false,
                'msg' => 'Sai tài khoản hoặc mật khẩu'
            ]);
        }

        $user = null;
        $account_id = auth()->user()->id;
        if ($account['is_admin'] == 1) {
            $user = Admin::where('account_id', '=', $account_id)->with('account')->first();
        }
        else {
            $user = Customer::where('account_id', '=', $account_id)->with('account', 'carts')->first();
        }

        return response()->json([
            'success' => true,
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);    
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
        
    }

    public function chagePassword(Request $req) {
        $acc = Account::find($req->id);
        if(empty($acc)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
                
            ]); 
        }

        if(!Hash::check($req->password, $acc->password)) {
            return response()->json([
                'success' => false,
                'msg' => 'sai mật khẩu',
                
            ]);
        }

        if($acc->id == 1) {
            return response()->json([
                'success' => false,
                'msg' => 'tài khoản này không thể thay đổi mật khẩu',
                
            ]);
        }
        
        $acc->password = Hash::make($req->new_password);
        $acc->save();
        
        return response()->json([
            'success' => true,
            'msg' => 'thay đổi thành công',
            
        ]);   
    }

}
