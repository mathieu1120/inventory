<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DestinationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'destination' => 'required|array',
            'destination.first_name' => 'required|string',
            'destination.last_name' => 'required|string',
            'destination.address' => 'required|string',
            'destination.city' => 'required|string',
            'destination.zip_code' => 'required|string',
            'destination.state' => 'required|string',
        ];
    }
}
