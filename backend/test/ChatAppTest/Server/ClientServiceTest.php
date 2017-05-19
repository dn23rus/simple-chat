<?php

namespace ChatAppTest\Server;

use ChatApp\Server\ClientService;

class ClientServiceTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @dataProvider namesDataProvider
     */
    public function testFilterName($name, $filteredName)
    {
        $clientService = new ClientService();

        $this->assertEquals($filteredName, $clientService->filterName($name, 10));
    }

    public function namesDataProvider()
    {
        return [
            [' name ', 'name'], // trim
            ["name\r\n1  2", 'name 1 2'], // remove redundant spacing and line endings
            ['name()[]{}~!@#$%^&*-', 'name'], // non word characters
            ['имя', 'имя'], // non latin characters
            ['щ ёёёёёёёzёёёёёё', 'щ ёёёёёёёz'], // limited length
        ];
    }
}
