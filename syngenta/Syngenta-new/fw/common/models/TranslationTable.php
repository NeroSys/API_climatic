<?php

namespace common\models;


use backend\components\ValidateMax;
use Yii;

use yii\db\Query;
use yii\helpers\ArrayHelper;
use yii\helpers\FileHelper;
use yii\helpers\Url;
use yii\imagine\Image;
use yii\helpers\Json;
use Imagine\Image\Box;
use Imagine\Image\Point;



class TranslationTable extends \yii\db\ActiveRecord
{
    const SUFFIX = '_lang';



    protected $langData;




    /**
     * Gets table name from class name
     *
     * @return string
     */
    public static function tableName()
{
    $class_name =   explode('\\',get_called_class());
   $name = array_pop($class_name);

        $name1 = preg_replace(['/^search/i'], '', $name);


    return TranslationTable::from_camel_case($name1);
}

    public function rules()
    {
        $rules = [
            [['name'], 'required','message' => 'Для корректной обработки нужно заполнить поле.'],
            [['name'], 'string', 'max' => 255],
            [['name'], 'unique'],
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







    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название для админ модуля',
            'visible' => 'Отображение элемента',
            'sort' => 'Индекс сортировки',

        ];
    }






    public function getLangData(){

        $query = new Query();
        $query_lang = $query->from($this::tableName().$this::SUFFIX);
        $command = $query_lang->where([ substr($this::tableName(), 0, -1).'_id' => $this->id]);
        $command_current_leng = $command->andWhere(['lang_id' => Yii::$app->params['language']->id]);
        $result = $command_current_leng->one();

        return $result;
    }

    public function getRuLangData(){

        $query = new Query();
        $query_lang = $query->from($this::tableName().$this::SUFFIX);
        $command = $query_lang->where([ substr($this::tableName(), 0, -1).'_id' => $this->id]);
        $command_current_leng = $command->andWhere(['lang_id' => 1]);
        $result = $command_current_leng->one();

        return $result;
    }



    public static function getAllList(){
       $class = get_called_class();
        $item = new  $class;


        $find = $item->find();


            $find1 = $find;


        if($item->hasAttribute('sort')){
            $find2 = $find1 ->orderBy('sort ASC');
        }else {
            $find2 = $find1;
        }



            $find3 = $find2->all();

       return $find3;
    }

    public static function getAllListByCulture(){
        $class = get_called_class();
        $item = new  $class;


        $find = $item->find();


        $find1 = $find;


        if($item->hasAttribute('culture_id')){

            $find2 = $find1 ->orderBy('culture_id ASC');
        }else {
            $find2 = $find1;
        }



        $find3 = $find2->all();

        return $find3;
    }

    public static function getList(){
        $class = get_called_class();
        $item = new  $class;


        $find = $item->find();


        if($item->hasAttribute('visible')){
            $find1 = $find ->where(
                [
                    'visible' => true
                ]
            );
        }else {
            $find1 = $find;
        }

        if($item->hasAttribute('sort')){
            $find2 = $find1 ->orderBy('sort ASC');
        }else {
            $find2 = $find1;
        }



        $find3 = $find2->all();

        return $find3;
    }



   protected static function from_camel_case($input)
   {
        preg_match_all('!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!', $input, $matches);
        $ret = $matches[0];
        foreach ($ret as &$match) {
            $match = $match == strtoupper($match) ? strtolower($match) : lcfirst($match);
        }
        return implode('_', $ret);
    }



    public function getLangDataFields(){




        $ctLang = new ContentLang();
        $ret = array();


        foreach($ctLang->langList as $key=>$value){
            $data=[];
            $query = new Query();
            $query_lang = $query->from($this::tableName().$this::SUFFIX);
            $command = $query_lang->where([ substr($this::tableName(), 0, -1).'_id' => $this->id]);
            $command_current_leng = $command->andWhere(['lang_id' => $key]);
            $result = $command_current_leng->one();


           $keys = array_keys($this->obtainPagesStructure1()[key($this->obtainPagesStructure1())]);
            foreach ($keys as $key1) {

                $qq = new \stdClass();

                $qq->id = $result['id'];
                $qq->lang_id = $key;
                $qq->item_id = $this->id;
                $qq->slug = 'standard';
                $qq->item_type = $key1;
                $qq->text = $result[$key1];
                     $data[] = $qq;

            }
            $ret[$key] = [
                'name' => $value,
                'langData' => $data
            ];
        }
       // var_dump($ret);
       // die;
        return $ret;
    }











    public function afterSave($insert, $changedAttributes)
    {
        if(!empty($this->langData)){



            foreach($this->langData as $lang_id => $lang_data){

                foreach($this->tableStructure[key($this->tableStructure)] as $item_type=>$tplItem){

                    $query = new Query();
                    $query_lang = $query->from($this::tableName().$this::SUFFIX);
                    $command = $query_lang->where([ substr($this::tableName(), 0, -1).'_id' => $this->id]);
                    $command_current_leng = $command->andWhere(['lang_id' => $lang_id]);
                    $item = $command_current_leng->one();

                    if(!empty($item)){

                        $query=new Query();
                        $query->createCommand()->update($this::tableName().$this::SUFFIX,[$item_type =>$lang_data[$item_type]],substr($this::tableName(), 0, -1).'_id=:id and lang_id=:langid')
                            ->bindValues([':id' => $this->id,':langid' => (string)$lang_id])
                            ->execute();


                    } else {

                       $query=new Query();

                        $query->createCommand()->insert($this::tableName().$this::SUFFIX,[substr($this::tableName(), 0, -1).'_id' =>$this->id,'lang_id' => (string)$lang_id ,$item_type =>$lang_data[$item_type]])
                                ->execute();

                    }

                }


            }
        }
        parent::afterSave($insert, $changedAttributes);
    }

    public function beforeDelete()
    {
        $query=new Query();

        $query->createCommand()->delete($this::tableName().$this::SUFFIX,substr($this::tableName(), 0, -1).'_id = :typeparam ', [':typeparam' => $this->id] )->execute();



        return parent::beforeDelete();
    }

    public function obtainPagesStructure()
    {

            return $this->tableStructure[key($this->tableStructure)];

    }

    public function obtainPagesStructure1()
    {


        return $this->tableStructure;

    }


}
