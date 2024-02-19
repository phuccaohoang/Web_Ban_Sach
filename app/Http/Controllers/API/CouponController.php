<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    //
    public function getCoupons() {
        $cp = Coupon::where('status', 1)->with('type_coupon')->get();

        return response()->json([
            'success' => true,
            'data' => $cp
        ]);
    }
    //
    public function addCoupon(Request $req) {
        
        try {

            $coupon = new Coupon();
            $coupon->discount = $req->discount;
            $coupon->min = $req->min;
            $coupon->type_coupon_id = $req->type_coupon_id;
            $coupon->note = $req->note;
            $coupon->save();

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

    // Xoa

    public function delCoupon(Request $req) {
        $coupon = Coupon::find($req->coupon_id);
        if(empty($coupon)) {
            return response()->json([
                'success' => false,
                'msg' => "Không tồn tại"
            ]);
        }

        $coupon->status = 0;
        $coupon->save();
        return response()->json([
            'success' => true,
            'msg' => "Xóa thành công"
        ]);
    }
}
