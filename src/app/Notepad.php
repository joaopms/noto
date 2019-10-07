<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notepad extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    public function pages()
    {
        return $this->hasMany('App\NotepadPage');
    }
}
