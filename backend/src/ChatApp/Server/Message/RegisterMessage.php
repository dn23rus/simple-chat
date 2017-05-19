<?php

namespace ChatApp\Server\Message;

class RegisterMessage implements MessageInterface
{
    protected $data = [];

    /**
     * RegisterMessage constructor.
     *
     * @param string $id
     */
    public function __construct($id)
    {
        $this->data = [
            'type'     => self::TYPE_REGISTER,
            'id'       => $id,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
    }

    /**
     * @inheritdoc
     */
    function jsonSerialize()
    {
        return $this->data;
    }
}
