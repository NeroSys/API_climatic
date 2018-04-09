<?php

namespace common\models\translationtables;


use common\models\TranslationTable;
use Yii;


class Regions extends TranslationTable
{
    protected $tableStructure = [
        'standard' => [
            'name' => 'Название',

        ],
    ];


    public function rules()
    {
        $rules = [
            [['name'], 'required', 'message' => 'Для корректной обработки нужно заполнить поле.'],
            [['name'], 'string', 'max' => 255],

            [['langData'], 'safe']
        ];

        return $rules;

    }



}




















