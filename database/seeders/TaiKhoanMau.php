<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;

class TaiKhoanMau extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $account = new Account();
        $account->username = "admin";
        $account->password = Hash::make('123456');

        $account->save();
        echo "Tao thanh cong";
    }
}
