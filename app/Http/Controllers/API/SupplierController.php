<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    //
    public function getSuppliers() {
        $suppliers = Supplier::all();

        return response()->json([
            'success' => true,
            'data' => $suppliers
        ]);
    }
    //
    public function addSupplier(Request $req) {
        try {
            $check = Supplier::where('name',$req->name)->first();
            if (!empty($check)) {
                return response()->json([
                    'success' => false,
                    'msg' => 'Đã tồn tại nhà cung cấp',
                ]);
            }

            $supplier = new Supplier();
            $supplier->name = $req->name;
            $supplier->summary = $req->summary;
            $supplier->address = $req->address;
            $supplier->email = $req->email;
            $supplier->phone = $req->phone;
            $supplier->save();

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

    public function editSupplier(Request $req) {

        $check = Supplier::where('name',$req->name)->where('id','<>',$req->supplier_id)->get();
        
        if(count($check) > 0) {
            return response()->json([
                'success' => false,
                'msg' => 'tên tồn tại',
            ]);
        }

        $supplier = Supplier::find($req->supplier_id);
        if(empty($supplier)) {
            return response()->json([
                'success' => false,
                'msg' => 'không tồn tại',
            ]);
        }

        $supplier->name = $req->name;
        $supplier->email = $req->email;
        $supplier->address = $req->address;
        $supplier->phone = $req->phone;
        $supplier->summary = $req->summary;
        $supplier->save();

        return response()->json([
            'success' => true,
            'msg' => 'Sửa thành công',
        ]);
    }
}
