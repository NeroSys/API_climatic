<?php

namespace common\models;

use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "content_lang".
 *
 * @property integer $id
 * @property string $slug
 * @property string $item_type
 * @property integer $item_id
 * @property integer $lang_id
 * @property string $text
 * @property integer $sort
 * @property Language $lang
 */
class ContentLang extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'content_lang';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['item_id', 'lang_id'], 'required'],
            [['item_id', 'lang_id', 'sort'], 'integer'],
            [['text'], 'string'],
            [['slug', 'item_type'], 'string', 'max' => 255],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::className(), 'targetAttribute' => ['lang_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'Тип контента',
            'item_type' => 'Сущность',
            'item_id' => 'Идентификатор контента',
            'lang_id' => 'Идентифокатор языка',
            'text' => 'Текстовое наполнение',
            'sort' => 'Порядок сортировки',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLang()
    {
        return $this->hasOne(Language::className(), ['id' => 'lang_id']);
    }

    public function getLangList(){
        $lang  = Language::find()->select('id, name')
            ->orderBy('sort ASC')
            ->where(['enable' => 1])
            ->all();
        return ArrayHelper::map($lang, 'id', 'name');
    }

    public function getLangName(){
        $lang = $this->lang;
        return $lang ? $lang->name : '';
    }
}
