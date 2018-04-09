<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',

    'bootstrap' => ['log','isadmin'],

    'modules' => [
        'actives' => [
            'class' => 'app\modules\actives\Modules',
        ],
        'team' => [
            'class' => 'app\modules\team\Modules',
        ],
        'pressroom' => [
            'class' => 'app\modules\pressroom\Modules',
        ],
        'holding' => [
                'class' => 'app\modules\holding\Modules',
        ],
        'cooperation' => [
            'class' => 'app\modules\cooperation\Modules',
        ],
        'contacts' => [
            'class' => 'app\modules\contacts\Modules',
        ],
        'main' => [
            'class' => 'app\modules\main\Modules',
        ],
        'menu' => [
            'class' => 'app\modules\menu\Modules',
        ],

        'tables' => [
            'class' => 'app\modules\tables\Modules',
        ],
        'resu' => [
            'class' => 'app\modules\resu\Modules',
        ],
        'resuadmin' => [
            'class' => 'app\modules\resuadmin\Modules',
        ],
        'texts' => [
            'class' => 'app\modules\texts\Modules',
        ],
        'mail' => [
            'class' => 'app\modules\mail\Modules',
        ],
        'cabinet' => [
            'class' => 'app\modules\cabinet\Modules',
        ],

        'i18n' => Zelenin\yii\modules\I18n\Module::className(),
    ],
    'components' => [
        'urlManager' => [
            'class' => 'yii\web\UrlManager',
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
            'suffix' => false,
            'rules' => [
            ]
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
        ],
        'isadmin'=>[
            'class'=>'backend\components\Admin'
        ],
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
            'defaultRoles'=>['head','director','manager','expert']
        ],
        'request' => [
            'csrfParam' => '_backendCSRF',
            'csrfCookie' => [
                'httpOnly' => true,
                'path' => '/admin',
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
    ],
    'params' => $params,
];
