<?php
namespace console\models;

use Yii;
use yii\rbac\Rule;

/**
 * Checks if user group matches
 */
class Baserbacrule extends Rule
{
    public $name = 'userGroup';

    public function execute($user, $item, $params)
    {
        if (!Yii::$app->user->isGuest) {
            $group = Yii::$app->user->identity->role;
            if ($item->name === 'director') {
                return $group == 1 || $group == 10 || Yii::$app->user->id == 1;
            } elseif ($item->name === 'manager') {
                return $group == 2 || $group == 10 || $group == 1 || Yii::$app->user->id == 1;
            } elseif ($item->name === 'expert') {
                return $group == 3 || $group == 10 || $group == 1 || Yii::$app->user->id == 1;
            } elseif ($item->name === 'head') {
                return $group == 10 || Yii::$app->user->id == 1;
            }
        }
        return false;
    }
}