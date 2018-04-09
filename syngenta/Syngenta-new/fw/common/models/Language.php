<?php

namespace common\models;

use Yii;
use yii\base\Model;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "language".
 *
 * @property integer $id
 * @property string $slug
 * @property string $code
 * @property string $name
 * @property integer $sort
 * @property integer $default_lang
 * @property integer $enable
 *
 * @property ContenFiles[] $contenFiles
 * @property ContentLang[] $contentLangs
 * @property ContentLang[] $contentLangs0
 * @property Country[] $countries
 */
class Language extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */




    public static function tableName()
    {
        return 'language';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sort', 'default_lang', 'enable'], 'integer'],
            [['slug', 'code'], 'string', 'max' => 2],
            [['name'], 'string', 'max' => 100],
            [['name', 'slug'], 'filter', 'filter' => 'trim'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'URL',
            'code' => 'Код',
            'name' => 'Название',
            'sort' => 'Сортировка',
            'default_lang' => 'Язык сайта',
            'enable' => 'Включен',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getContenFiles()
    {
        return $this->hasMany(ContenFiles::className(), ['lang_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getContentLangs()
    {
        return $this->hasMany(ContentLang::className(), ['lang_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCountries()
    {
        return $this->hasMany(Country::className(), ['default_lang' => 'id']);
    }

    public function getLangList(){
        $lang = Language::find()->select('id, name')->all();
        return ArrayHelper::map($lang, 'id', 'name');
    }

    public function getLangListCl(){
        return Language::find()->where(['enable' => true])->orderBy('sort ASC')->all();
    }

    public function getDefaultLang(){
        return Language::find()->where('default_lang = :default_lang', ['default_lang'=>true])->one();
    }

    public function beforeSave($insert){
        if($this->default_lang === '1'){
            $defaultLang = Language::findOne(['default_lang' => '1']);
            $defaultLang->default_lang = '0';
            $defaultLang->update();
        }
        return true;
    }

}
