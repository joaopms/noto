<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{
    public function rules()
    {
        return [
            'notepadId' => 'required|exists:notepads,id',
            'pageId' => 'required|exists:notepad_pages,id',
            'file' => 'required|array|min:1',
            'file.*' => 'mimes:pdf,jpeg,png'
        ];
    }
}
