<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class FileUpload extends Model
{
    public const TYPE_PDF = 'PDF';
    public const TYPE_PDF_PAGE = 'PDF Page';
    public const TYPE_IMAGE = 'Image';

    public const MIMETYPE_PDF = 'application/pdf';
    public const MIMETYPE_JPG = 'image/jpg';
    public const MIMETYPE_PNG = 'image/png';

    protected $table = 'uploads';
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';

    protected $hidden = ['user_id', 'notepad_id', 'page_id', 'type', 'mimetype', 'laravel_through_key'];

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

    public function getExtensionAttribute()
    {
        switch ($this->mimetype) {
            case self::MIMETYPE_PDF:
                return 'pdf';
            case self::MIMETYPE_JPG:
                return 'jpg';
            case self::MIMETYPE_PNG:
                return 'png';
            default:
                return null;
        }
    }

    public function getFileNameAttribute()
    {
        return $this->id . '.' . $this->extension;
    }

    public function getFilePathAttribute()
    {
        return Storage::disk('public')->path('uploads/' . $this->file_name);
    }
}
