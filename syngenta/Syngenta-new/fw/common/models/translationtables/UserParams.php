<?php

namespace common\models\translationtables;


use common\models\TranslationTable;
use Yii;

use yii\db\Query;
use yii\helpers\ArrayHelper;
use yii\helpers\FileHelper;
use yii\helpers\Url;
use yii\imagine\Image;
use yii\helpers\Json;
use Imagine\Image\Box;
use Imagine\Image\Point;



class UserParams extends TranslationTable
{

    protected $tableStructure = [
        'standard' => [
            'name' => 'Название',

        ],
    ];

    public function behaviors()
    {
        return [
            'slug' => [
                'class' => 'common\behaviors\SlugParams',
                'in_attribute' => 'name',
                'out_attribute' => 'name',
                'translit' => true
            ]
        ];
    }


    public function rules()
    {
        $rules = [
            [['name'], 'required','message' => 'Для корректной обработки нужно заполнить поле.'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
            [['name'], 'IsGood'],
            [['langData'], 'safe']
        ];




        $columnNames = $this->getTableSchema()->getColumnNames();

        foreach ($columnNames as $columnName) {
            if ('visible' == $columnName) {
                $rules[] = [['visible'], 'boolean'];
            } else if ('sort' == $columnName) {
                $rules[] = [['sort'], 'integer'];
            }else if ('place_id' == $columnName) {
                $rules[] = [['place_id'], 'string'];
            }
            else if ('max_value' == $columnName) {
                $rules[] = [['max_value'], 'integer'];
                $rules[] = [['max_value'], 'required'];

            }

            else if ('ch' == $columnName) {
                $rules[] = [['ch'], 'integer'];
                $rules[] = [['ch'], 'required'];
                $rules[] = [['ch'], 'unique'];
            }else {
                $rules[] = [[$columnName], 'safe'];
            }
        }

        return $rules;



    }

    public function IsGood($attribute, $params)
    {

        if(!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*/',$this->name)){

            $this->addError($attribute, 'Недопустимые символы в названии, название было изменено, попробуйте так.');
        }




    }


}




















