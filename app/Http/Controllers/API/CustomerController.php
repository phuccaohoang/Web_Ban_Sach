<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;


class CustomerController extends Controller
{
    //
    public function getCustomerById($id) {
        $customer = Customer::where('id','=',$id)->with('account','carts','favorites')->get();

        if(!count($customer)) {

            return response()->json([
                'success' => false,
                'msg' => 'khach hang khong ton tai'
            ]);
        }
        return response()->json([
            'success' => true,
            'msg' => 'thanh cong',
            'data' => $customer
        ]);
    }

    //khách hàng đăng ký
    public function signUp(Request $req) {
        $check = Customer::where('email',$req->email)->first();
        if(!empty($check)) {
            return response()->json([
                'success' => false,
                'msg' => 'Email đã tồn tại',
                
            ]);
        }
        $check = Account::where('username',$req->username)->first();
        if(!empty($check)) {
            return response()->json([
                'success' => false,
                'msg' => 'Tên đăng nhập đã tồn tại',
                
            ]);
        }
        $acc = new Account();
        $acc->username = $req->username;
        $acc->password = Hash::make($req->password);
        $acc->save();

        $customer = new Customer();
        $customer->name = $req->name;
        $customer->email = $req->email;
        $customer->address = $req->address;
        $customer->phone = $req->phone;
        $customer->account_id = $acc->id;

        $customer->save();

        return response()->json([
            'success' => true,
            'msg' => 'Đăng ký thành công',
            
        ]);
    }
}
