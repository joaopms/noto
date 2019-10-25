<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['guest']], function () {
    Route::post('login', 'Api\AuthController@login')->name('login');
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('sync', 'Api\NotepadController@sync')->name('sync');
    Route::get('getNotepads', 'Api\NotepadController@getNotepads')->name('getNotepads');
    Route::post('getPages', 'Api\NotepadController@getPages')->name('getPages');
    Route::post('getPageContent', 'Api\NotepadController@getPageContent')->name('getPageContent');
    Route::post('uploadFiles', 'Api\NotepadController@uploadFiles')->name('uploadFiles');

    Route::get('user', function (Request $request) {
        return $request->user();
    });
});
