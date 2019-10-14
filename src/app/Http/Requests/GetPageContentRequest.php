<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetPageContentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'page_id' => 'required'
        ];
    }
}
