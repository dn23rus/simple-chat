<?php

namespace ChatApp\Server\ClientMessage;

class MessageWrapper
{
    protected $type;
    protected $data;

    /**
     * MessageWrapper constructor.
     *
     * @param string $type
     * @param array  $data
     */
    public function __construct($type = null, array $data = null)
    {
        $this->type = $type;
        $this->data = $data;
    }

    /**
     * @return bool
     */
    public function isValid()
    {
        return null !== $this->type
            && null !== $this->data;
    }

    /**
     * @return null|string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @inheritdoc
     */
    function __get($name)
    {
        return isset($this->data[$name]) ? $this->data[$name] : null;
    }

    public function __toString()
    {
        return $this->type . ' ' . print_r($this->data, true);
    }
}
