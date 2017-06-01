<?php

namespace ChatApp\Server;

class ClientService
{
    /**
     * @param string $name
     * @param int    $length
     *
     * @return string
     */
    public function filterName($name, $length = 20)
    {
        $name = trim($name);
        $name = preg_replace('/\s\s+/u', ' ', $name);
        $name = preg_replace('/[^\w\s]+/u', '', $name);
        $name = mb_substr($name, 0, $length, 'UTF-8');

        return $name;
    }

    /**
     * @param string $text
     *
     * @return string
     */
    public function filterMessage($text)
    {
        return trim($text);
    }

    /**
     * @param int $length
     *
     * @return string
     */
    public function generateRandomString($length = 10)
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }
}
