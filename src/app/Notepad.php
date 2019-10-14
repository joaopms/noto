<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notepad extends Model
{
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';

    protected $hidden = ['user_id'];

    protected $casts = [
        'page_order' => 'array',
    ];

    public function pages()
    {
        return $this->hasMany('App\NotepadPage');
    }
}
