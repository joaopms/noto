<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FileUpload extends Model
{
    public const TYPE_PDF = 'PDF';
    public const TYPE_PDF_PAGE = 'PDF Page';
    public const TYPE_IMAGES = 'Images';

    protected $table = 'uploads';
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function pdf_pages()
    {
        return $this->hasManyThrough(
            'App\FileUpload',
            'App\PDFPage',
            'pdf_id', // Foreign key on pdf pages connection table...
            'id', // Foreign key on pdf pages table...
            'id', // Local key on pdfs table...
            'image_id' // Local key on pdf pages connection table table...
        )->orderBy('page_number');
    }
}
