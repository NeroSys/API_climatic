<?php

namespace common\models\translationtables;

use common\models\TranslationTable;
use Yii;

class Threats extends TranslationTable
{
    protected $tableStructure = [
        'standard' => [
            'name' => 'Название',
            'description' => 'Описание'


        ],
    ];

    public function rules()
    {
        $rules = [
            [['name'], 'required','message' => 'Для корректной обработки нужно заполнить поле.'],
            [['name','transform_array'], 'string', 'max' => 255],
            [['transform_array'], 'validateArray'],
          //  [['name'], 'unique'],
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
               // $rules[] = [['max_value'], 'required'];

            }

            else if ('ch' == $columnName) {
                $rules[] = [['ch'], 'integer'];
                $rules[] = [['ch'], 'required'];
               // $rules[] = [['ch'], 'unique'];
            }else {
                $rules[] = [[$columnName], 'safe'];
            }
        }

        return $rules;



    }


    public function validateArray($attribute, $params)
    {
        $flag = false;

        $basearr =  $this->transform_array;
        $basearr =trim($basearr, ',');



        $prearr = explode(',',$basearr);


        $arr=[];
        foreach ($prearr as $prestr){


            $strarr = explode('-',$prestr);

            if (empty($strarr)){
                $flag = true;
            }
            if (array_key_exists($strarr[0], $arr)) {
             $flag = true;
            }

            $arr[$strarr[0]] = $strarr[1];


        }

        $oldkey =0;
        $oldvalue =0;


        foreach ($arr as $curkey=>$curvalue){
           // echo $oldkey.'trert'.$curkey;


            if ((int)$oldkey >= (int)$curkey){

                $flag = true;
            }
            if ($oldvalue >= $curvalue){

                $flag = true;
            }
            if (!ctype_digit(strval($curvalue))){

                $flag = true;
            }

            if (!ctype_digit(strval($curkey))){

                $flag = true;
            }

            $oldkey =$curkey;
            $oldvalue =$curvalue;


        }


        if ($flag) {
            $this->addError($attribute, 'Неправильный формат');
        }


    }

}




















