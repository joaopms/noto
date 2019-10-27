<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function findByEmail($email)
    {
        return User::where('email', '=', $email)->firstOrFail();
    }

    public function notepads()
    {
        return $this->hasMany('App\Notepad');
    }

    public function pdf_files()
    {
        return $this->hasMany('App\FileUpload')->where('type', FileUpload::TYPE_PDF)->orderBy('created_at', 'desc')->with('pdf_pages');
    }

    public function images()
    {
        return $this->hasMany('App\FileUpload')->where('type', FileUpload::TYPE_IMAGE)->orderBy('created_at', 'desc');
    }
}
