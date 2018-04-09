<?php
namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;

use yii\filters\VerbFilter;

/**
 * Site controller
 */
class AuthController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
           'access' => [
               'class' => AccessControl::className(),
               'rules' => [
                    [
                       'actions' => ['login', 'error','rlist', 'galleryUpload', 'galleryDelete'],
                        'allow' => true,
                   ],


                   [
                        'actions' => ['create','delete', 'lists', 'update','logout', 'index','view','edit'],
                       'allow' => true,
                       'roles' => ['@'],
                    ],
                   [
                       'allow' => true,
                       'actions' => ['deleteadmin',  'createadmin', 'updateadmin','add'],
                       'roles' => ['admin'],
                   ]
                ],
           ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST']
                ],
            ],
        ];
    }



}
