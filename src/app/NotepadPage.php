<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotepadPage extends Model
{
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';

    protected $casts = [
        'line_order' => 'array',
    ];

    public function lines()
    {
        return $this->hasMany('App\NotepadLine', 'page_id');
    }
}
