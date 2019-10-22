<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PDFPage extends Pivot
{
    protected $table = 'pdf_pages';
    public $timestamps = false;
    protected $primaryKey = ['pdf_id', 'image_id'];
    protected $keyType = 'string';
}
