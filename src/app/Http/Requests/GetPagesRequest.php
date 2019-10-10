<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetPagesRequest extends FormRequest
{
    public function rules()
    {
        return [
            'notepad_id' => 'required'
        ];
    }
}
