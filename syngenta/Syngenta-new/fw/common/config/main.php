<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
    ],
    'aliases' => [
        '@public' => 'http://syngenta-new.sproduccion.com',
        '@admin' => 'http://syngenta-new.sproduccion.com/admin',
        '@storage' => realpath(dirname(__FILE__).'/../../../storage/'),
    ],
    'params' => [
        'icon-framework' => 'fa',  // Font Awesome Icon framework
    ]
];
