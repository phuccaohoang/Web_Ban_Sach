<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\AuthorController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\GenreController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\FavoriteController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\SupplierController;
use App\Http\Controllers\API\CouponController;
use App\Http\Controllers\API\PurchaseInvoiceController;
use App\Http\Controllers\API\SlideshowController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\EbookSalesInvoiceController;
use App\Http\Controllers\API\SalesInvoiceController;
use App\Http\Controllers\API\DeliveryStatusController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/dang-nhap', [AccountController::class, 'login']);

Route::post('/dang-ky', [CustomerController::class, 'signUp']);


Route::get('/danh-sach-sach/{status}', [BookController::class, 'getAllBooks']);
Route::get('/danh-sach-sach-in/{status}', [BookController::class, 'getBooks']);
Route::get('/danh-sach-ebook/{status}', [BookController::class, 'getEBooks']);
Route::get('/chi-tiet-sach/{id}', [BookController::class, 'getBookById']);

Route::get('/binh-luan-cua-sach/{id}', [CommentController::class, 'getCommentsOfBook']);


Route::get('/danh-sach-slideshow', [SlideshowController::class, 'getSlideshows']);




Route::middleware('auth:api')->group(function () {

    
    //admin -->
    Route::get('/admin/danh-sach-quan-tri-vien/{status}', [AdminController::class, 'getAdmins']);
    Route::get('/admin/quan-tri-vien/{id}', [AdminController::class, 'getAdminById']);
    Route::post('/admin/them-quan-tri-vien', [AdminController::class, 'addAdmin']);
    Route::put('/admin/sua-quan-tri-vien', [AdminController::class, 'editAdmin']);
    Route::delete('/admin/xoa-quan-tri-vien', [AdminController::class, 'delAdmin']);
    Route::patch('/admin/khoi-phuc-quan-tri-vien', [AdminController::class, 'recoveryAdmin']);

    Route::get('/admin/danh-sach-the-loai', [GenreController::class, 'getGenres']);
    Route::post('/admin/them-the-loai', [GenreController::class, 'addGenre']);
    Route::put('/admin/sua-the-loai', [GenreController::class, 'editGenre']);

    Route::get('/admin/danh-sach-sach/{status}', [BookController::class, 'getAllBooks']);
    Route::get('/admin/danh-sach-sach-in/{status}', [BookController::class, 'getBooks']);
    Route::get('/admin/danh-sach-ebook/{status}', [BookController::class, 'getEBooks']);
    Route::post('/admin/them-sach', [BookController::class, 'addBook']);
    Route::delete('/admin/xoa-sach', [BookController::class, 'delBook']);
    Route::patch('/admin/khoi-phuc-sach', [BookController::class, 'recoveryBook']);
    Route::post('/admin/sua-sach', [BookController::class, 'editBook']);

    Route::get('/admin/danh-sach-tac-gia', [AuthorController::class, 'getAuthors']);
    Route::post('/admin/them-tac-gia', [AuthorController::class, 'addAuthor']);
    Route::delete('/admin/xoa-tac-gia', [AuthorController::class, 'delAuthor']);
    Route::put('/admin/sua-tac-gia', [AuthorController::class, 'editAuthor']);


    Route::get('/admin/danh-sach-nha-cung-cap', [SupplierController::class, 'getSuppliers']);
    Route::post('/admin/them-nha-cung-cap', [SupplierController::class, 'addSupplier']);
    Route::put('/admin/sua-nha-cung-cap', [SupplierController::class, 'editSupplier']);


    Route::get('/admin/danh-sach-phieu-giam-gia', [CouponController::class, 'getCoupons']);
    Route::post('/admin/them-phieu-giam-gia', [CouponController::class, 'addCoupon']);
    Route::delete('/admin/xoa-phieu-giam-gia', [CouponController::class, 'delCoupon']);

    Route::get('/admin/danh-sach-slideshow', [SlideshowController::class, 'getSlideshows']);
    Route::post('/admin/them-slideshow', [SlideshowController::class, 'addSlideshow']);
    Route::delete('/admin/xoa-slideshow', [SlideshowController::class, 'delSlideshow']);

    Route::get('/admin/danh-sach-phieu-nhap', [PurchaseInvoiceController::class, 'getPurchaseInvoices']);
    Route::post('/admin/them-hoa-don-nhap', [PurchaseInvoiceController::class, 'addPurchaseInvoice']);


    Route::get('/admin/danh-sach-hoa-don-ban-sach-in', [SalesInvoiceController::class, 'getSalesInvoices']);

    Route::get('/admin/danh-sach-hoa-don-ban-ebook', [EbookSalesInvoiceController::class, 'getEbookSalesInvoices']);
    Route::get('/trang-thai-hoa-don', [DeliveryStatusController::class, 'getDeliveryStatus']);

    // <--
    
    //khách hàng -->
    Route::post('/them-yeu-thich', [FavoriteController::class, 'addFavorite']);
    Route::delete('/xoa-yeu-thich', [FavoriteController::class, 'delFavorite']);
    
    Route::get('/gio-hang/{id}', [CartController::class, 'getCartByIdCustomer']);
    Route::post('/them-gio-hang', [CartController::class, 'addCart']);
    Route::patch('/sua-gio-hang', [CartController::class, 'editCartItem']);
    Route::delete('/xoa-gio-hang', [CartController::class, 'delCart']);

    Route::get('/thong-tin-khach-hang/{id}', [CustomerController::class, 'getCustomerById']);

    Route::post('/them-hoa-don-ban', [SalesInvoiceController::class, 'addSalesInvoice']);

    //<--


    //Dùng chung -->
    Route::post('/cap-nhat-avatar', [ImageController::class, 'updateAvatar']);

    Route::patch('/doi-mat-khau', [AccountController::class, 'chagePassword']);
    
    Route::post('/dang-xuat', [AccountController::class, 'logout']);
    //<--
});

