<?php

namespace ChatApp\Server;

class ClientService
{
    protected $salt;

    /**
     * ClientService constructor.
     *
     * @param null $salt
     */
    public function __construct($salt = null)
    {
        $this->salt = $salt ?: $this->generateRandomString(32);
    }

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
     * @param $resourceId
     *
     * @return string
     */
    public function generateClientId($resourceId)
    {
        return uniqid(md5($resourceId . $this->salt), true);
    }

    /**
     * @param $id
     * @param $resourceId
     *
     * @return bool
     */
    public function verifyClientId($id, $resourceId)
    {
        return hash_equals(
            substr($id, 0, 32),
            md5($resourceId . $this->salt)
        );
    }

    /**
     * @param int $length
     *
     * @return string
     */
    protected function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }
}
