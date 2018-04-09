<?php

namespace common\models;

use common\models\ContenFiles;
use common\models\ContentLang;
use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "pages".
 *
 * @property integer $id
 * @property string $slug
 * @property string $name
 * @property string $type
 * @property string $module_slug
 * @property integer $visible
 * @property integer $sort
 * @property string $create_date
 */
class Mail extends \common\models\Pages
{
    const MODEL_SLUG = 'mail';

    protected $pagesStructure = [
            self::MODEL_SLUG.'-item' => [

                'text-sms' => 'Текст SMS',
                'text-mail-from' => 'От кого (E-mail отправителя)',
                'text-mail-title' => 'Тема сообщения E-mail',
                'text-mail' => 'Текст E-mail',



            ],
    ];

   // protected $mainImg = [
     //   self::MODEL_SLUG.'-img' => [
        //    'path' => 'mail',
       //   'width' => 1680,
        //    'height' => 500,
          //  'title' => 'Изображение (1680x500px)'
     //   ],
  //  ];

    public function behaviors()
    {
        return [
            'slug' => [
                'class' => 'common\behaviors\Slug',
                'in_attribute' => 'name',
                'out_attribute' => 'slug',
                'translit' => true
            ]
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'ЧПУ',
            'name' => 'Название для админ модуля',
            'type' => 'Тип страницы',
            'module_slug' => 'Модуль страницы',
            'visible' => 'Отображение линейки',
            'sort' => 'Индекс сортировки',
            'create_date' => 'Дата добавления',
            'pageImg.file' => 'Изображение страницы',
            'pageHiImg.file' => 'Большое изображение страницы'
        ];
    }

    public function getList(){
        $item = new Mail();
        return ArrayHelper::map($item->find()
            ->where(['module_slug' => $item::MODEL_SLUG, 'type' => key($item->pagesStructure)])
            ->orderBy('name ASC')
            ->all(), 'id', 'name');
    }

    public function getGalleryItems(){
        return ContenFiles::find()
            ->where(['slug' => self::MODEL_SLUG.'-gallery'])
            ->andWhere(['item_type' => self::MODEL_SLUG.'-gallery-item'])
            ->andWhere(['item_id' => $this->id])
            ->all();
    }

    public static function getText(){
        $item = new Mail();
        return $item->find()
            ->where(
                [
                    'module_slug' => $item::MODEL_SLUG,
                    'type' => key($item->pagesStructure),
                    //'visible' => true,
                ]
            )
            ->orderBy('sort ASC')
            ->one();
    }

    public function getLangData(){
        $ret = $this->hasMany(ContentLang::className(), ['item_id' => 'id'])
            ->where(['lang_id' => Yii::$app->params['language']->id])->all();
        return ArrayHelper::index($ret, 'item_type');
    }
}