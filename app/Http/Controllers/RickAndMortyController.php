<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RickAndMortyController extends Controller
{
    private $api_url = 'https://rickandmortyapi.com/api/character/';

    public function getCharacters($page = 1)
    {
        $response = Http::get($this->api_url, ['page' => $page]);

        if($response->failed()) {
            return response()->json(['error' => 'Failed to fetch characters'], 500);
        }

        return $response->json();
    }

    public function getCharacter($id)
    {
        $response = Http::get("{$this->api_url}{$id}");

        if($response->failed()) {
            return response()->json(['error' => 'Failed to fetch character'], 500);
        }

        return $response->json();
    }
}
