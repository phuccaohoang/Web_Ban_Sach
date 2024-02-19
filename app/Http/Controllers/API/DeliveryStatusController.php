<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DeliveryStatus;

class DeliveryStatusController extends Controller
{
    //
    public function getDeliveryStatus() {
        $list = DeliveryStatus::all();

        return response()->json([
            'success' => true,
            'data' => $list
        ]);
    }
}
