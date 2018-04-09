<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "site".
 *
 * @property integer $id
 * @property string $domain
 * @property string $name
 * @property integer $sort
 * @property integer $default_lang
 * @property integer $default_domain
 * @property integer $enable
 *
 * @property Pages[] $pages
 * @property Language $defaultLang
 */
class Site extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'site';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sort', 'default_lang', 'default_domain', 'enable'], 'integer'],
            [['domain'], 'string', 'max' => 255],
            [['name'], 'string', 'max' => 100],
            [['default_lang'], 'exist', 'skipOnError' => true, 'targetClass' => Language::className(), 'targetAttribute' => ['default_lang' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'domain' => 'URL',
            'name' => 'Название',
            'sort' => 'Сортировка',
            'default_lang' => 'Домен по умолчанию',
            'default_domain' => 'Язык по умолчанию',
            'enable' => 'Включен',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPages()
    {
        return $this->hasMany(Pages::className(), ['site_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDefaultLang()
    {
        return $this->hasOne(Language::className(), ['id' => 'default_lang']);
    }
}
