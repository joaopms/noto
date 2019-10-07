<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotepadLine extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    public function blocks()
    {
        return $this->hasMany('App\NotepadBlock');
    }
}