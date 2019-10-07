<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotepadPage extends Model
{
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';

    public function lines()
    {
        return $this->hasMany('App\NotepadLines');
    }
}
