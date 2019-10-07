<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotepadBlock extends Model
{
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';
}
