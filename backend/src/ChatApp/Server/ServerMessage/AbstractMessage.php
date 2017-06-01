<?php

namespace ChatApp\Server\ServerMessage;

abstract class AbstractMessage implements MessageInterface
{
    protected $type;
    protected $data = [];

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'type'     => $this->type,
            'data'     => $this->data,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
    }

    /**
     * @inheritdoc
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @inheritdoc
     */
    function __toString()
    {
        return json_encode($this->jsonSerialize());
    }
}
