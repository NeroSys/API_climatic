<?php

namespace common\models;


use Yii;

use yii\helpers\ArrayHelper;
use yii\helpers\FileHelper;
use yii\helpers\Url;
use yii\imagine\Image;
use yii\helpers\Json;
use Imagine\Image\Box;
use Imagine\Image\Point;
//use common\models\ContenFiles;
//use common\models\ContentLang;

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
 * @property string $langData langData
 */
class Pages extends \yii\db\ActiveRecord
{
    const MODEL_SLUG = 'page';

    public $image;
    public $file;
    public $gallery;
    public $crop_info;
    public $main;

    protected $langData;

    protected $pagesStructure = [
        'page-item' => ['name' => 'Название', 'text' => 'Текст', 'seo-title' => 'SEO Title', 'seo-keywords' => 'SEO Keywords', 'seo-descriptions' => 'SEO Descriptions'],
    ];
    protected $mainImg = [];
    protected $mainHiImg = [];
    protected $imgType = 'main-img';


//    protected $imgHiType = 'main-hi-img';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'pages';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required','message' => 'Для корректной обработки нужно заполнить поле.'],
            [['type', 'module_slug'], 'string'],
            [['visible', 'sort','main'], 'integer'],
            [['create_date'], 'safe'],
            [['parent_id'], 'integer'],
            [['slug', 'name'], 'string', 'max' => 255],
            [['slug','name'], 'unique'],
            [
                ['image'],
                'image',
                'extensions' => ['jpg', 'jpeg', 'png', 'gif'],
                'mimeTypes' => ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
            ],
            [
                ['file'],
                'file',
                'extensions' => [$this->mainFile[key($this->mainFile)][extensions]]

            ],
            [
                ['gallery'],
                'image',
                'extensions' => ['jpg', 'jpeg', 'png', 'gif'],
                'mimeTypes' => ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
            ],
            [['crop_info','langData'], 'safe'],
        ];
    }

    public function getModuleSlug(){
        return self::MODEL_SLUG;
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'ЧПУ',
            'name' => 'Название для админ модуля',
            'type' => 'Тип страницы',
            'module_slug' => 'Модуль страницы',
            'visible' => 'Отображение страницы',
            'sort' => 'Индекс сортировки',
            'create_date' => 'Дата создания',
            'pageImg.file' => 'Изображение страницы',
            'pageHiImg.file' => 'Большое изображение страницы'
        ];
    }
    public function findActiveMenu($path_string)
    {
        $elements = new Pages();

         $element = $elements->find()
            ->where(
                [
                    'module_slug' => 'menu',
                    'visible' => true,
                    'controller' => $path_string
                ]
            )
            ->orderBy('sort ASC')
             ->limit(1)
            ->one();
       if($element){
        return $element->parent_id;
       }else return false;

    }
    public function findController()
    {
        if ($this->controller){
        return $this->controller;
        }else{
            $mainelements = new Pages();

            $first = $mainelements->find()
                ->where(
                    [
                        'module_slug' => 'menu',
                        'parent_id' => $this->id,
                        'visible' => true
                    ]
                )
                ->orderBy('sort ASC')
                ->limit(1)
                ->one();

            return $first->controller;


        }


    }



    public static function findMainMenu()
    {
        $mainelements = new Pages();

        return $mainelements->find()
            ->where(
                [
                    'module_slug' => 'menu',
                    'parent_id' => null,
                    'visible' => true
                ]
            )
            ->orderBy('sort ASC')
            ->limit(6)
            ->all();

    }


    public function findSubMenu($path,$parentid)
    {
        $elements = new Pages();

       $submenuitems =  $elements->find()
            ->where(
                [
                    'module_slug' => 'menu',
                    'parent_id' => $parentid,
                    'visible' => true
                ]
            )
            ->orderBy('sort ASC')
            ->all();

        if (count($submenuitems) > 1 ) {
            foreach ($submenuitems as $item) {

                $result[] = ['name' => $item->menuLangData['name']->text, 'link' => $item->findController(), 'active' => $path == $item->controller ? true : ''];
            }
            return $result;
        }else {
            return null;
        }


    }

    public function getMenuLangData(){
        $ret = $this->hasMany(ContentLang::className(), ['item_id' => 'id'])
            ->where(['lang_id' => Yii::$app->params['language']->id])->all();
        return ArrayHelper::index($ret, 'item_type');
    }

    public function getMenuRuLangData(){
        $ret = $this->hasMany(ContentLang::className(), ['item_id' => 'id'])
            ->where(['lang_id' =>'1'])->all();
        return ArrayHelper::index($ret, 'item_type');
    }

    public function getLangDataFields(){
        $ctLang = new ContentLang();
        $ret = array();
        foreach($ctLang->langList as $key=>$value){

            $data = $ctLang->find()
                    ->where(['lang_id' => $key])
                    ->andWhere(['item_id' => $this->id])
                    ->andWhere(['slug' => key($this->pagesStructure)])
                    ->andWhere(['item_type' => array_keys($this->pagesStructure[key($this->pagesStructure)]) ])
                    ->orderBy('sort ASC')
                    ->all();

            $ret[$key] = [
                'name' => $value,
                'langData' => $data
            ];
        }
        return $ret;
    }

    public function obtainPagesStructure()
    {
        if(array_key_exists($this->type, $this->pagesStructure)){

            return $this->pagesStructure[$this->type];
        } else {

            return $this->pagesStructure;
        }
    }

    public function obtainPagesStructure1()
    {


            return $this->pagesStructure;

    }

    public function getPageImg(){
        return ArrayHelper::index(ContenFiles::find()
                    ->where(['slug'=> key($this->pagesStructure)])
                    ->andWhere(['item_id' => $this->id])
                    ->all(), 'item_type');
    }

    public function getPageFile(){
        return ArrayHelper::index(ContenFiles::find()
            ->where(['slug'=> key($this->pagesStructure)])
            ->andWhere(['item_id' => $this->id])
            ->all(), 'item_type');
    }

    public function getMainImg()
    {
        if(array_key_exists($this->type, $this->mainImg)){
            return $this->mainImg[$this->type];
        } else {
            return $this->mainImg;
        }
    }

    public function getMainFile()
    {
        if(array_key_exists($this->type, $this->mainFile)){
            return $this->mainFile[$this->type];
        } else {
            return $this->mainFile;
        }
    }

    public function saveGalleryIMG($img, $item_type){
        if(!empty($img)){

            $fc = new ContenFiles();

            $fc->item_id = $this->id;
            $fc->item_type = $item_type;
            $fc->slug = $this::MODEL_SLUG.'-gallery';
            $fc->save();

            $image = Image::getImagine()->open($img->tempName);

            $pathThumbImage = Yii::getAlias('@storage/gallery/thumb_/' . 'thumb_' . $fc->id . '.' . $img->getExtension());
            $urlImg = '/storage/gallery/thumb_/' . 'thumb_' . $fc->id . '.' . $img->getExtension();

            $imgSize = $image->getSize();
            $image->resize($imgSize->heighten(640))
                ->save($pathThumbImage, ['quality' => 75]);

            $fc->file = $urlImg;
            $fc->save();

            $ret = new \stdClass();
            $imgage = new \stdClass();

            $imgage->name = $urlImg;
            $imgage->url = $urlImg;
            $imgage->thumbnailUrl = $urlImg;
            $imgage->deleteUrl = Url::to(['gallery-delete', 'id' => $fc->id]);
            $imgage->deleteType = 'DELETE';

            $ret->files[] = $imgage;

            return $ret;

        } else {
            return false;
        }
    }


    public function saveIMG($img, $img_key=null)
    {
        $imgParam = $this->mainImg[$img_key];

        // open image
        if(!empty($img)){

            $image = Image::getImagine()->open($img->tempName);
            $cropInfo = Json::decode($this->crop_info[$img_key])[0];

            if((int)$cropInfo['dw'] > 0 && (int)$cropInfo['dh'] > 0) {

                $cropInfo['dw'] = (int)$cropInfo['dw']; //new width image
                $cropInfo['dh'] = (int)$cropInfo['dh']; //new height image
                $cropInfo['x'] = abs($cropInfo['x']); //begin position of frame crop by X
                $cropInfo['y'] = abs($cropInfo['y']); //begin position of frame crop by Y
                //$cropInfo['ratio'] = $cropInfo['ratio'] == 0 ? 1.0 : (float)$cropInfo['ratio']; //ratio image. We don't use in this example

                //delete old images
                $oldImages = FileHelper::findFiles(Yii::getAlias('@storage/'.$imgParam['path'].'/'), [
                    'only' => [
                        $this->id . '.*',
                        'thumb_' . $this->id . '.*',
                    ],
                ]);

                for ($i = 0; $i != count($oldImages); $i++) {
                    @unlink($oldImages[$i]);
                }

                //saving thumbnail
                $newSizeThumb = new Box($cropInfo['dw'], $cropInfo['dh']);
                $cropSizeThumb = new Box($imgParam['width'], $imgParam['height']); //frame size of crop
                $cropPointThumb = new Point($cropInfo['x'], $cropInfo['y']);

                $pathThumbImage = Yii::getAlias('@storage/'.$imgParam['path']) .'/thumb_/' . 'thumb_' . $this->id . '.' . $img->getExtension();

                $image->resize($newSizeThumb)
                    ->crop($cropPointThumb, $cropSizeThumb)
                    ->save($pathThumbImage, ['quality' => 80]);

                //saving original
                $img->saveAs(Yii::getAlias('@storage/'.$imgParam['path']).'/upload/' . $this->id . '.' . $img->getExtension());

//                Image::watermark($pathThumbImage, Yii::getAlias('@storage/watermark.png'), [700,644])->save($pathThumbImage);
                $urlImg = '/storage/'.$imgParam['path'].'/thumb_/' . 'thumb_' . $this->id . '.' . $img->getExtension();
                return $urlImg;
            } else {
                return null;
            }
        } else {
            return false;
        }
    }

    public function saveFILE($img, $img_key=null)
    {
        $imgParam = $this->mainFile[$img_key];

        // open image
        if(!empty($img)){

                //delete old images
                $oldImages = FileHelper::findFiles(Yii::getAlias('@storage/'.$imgParam['path'].'/files/'), [
                    'only' => [
                        $this->id . '.*',

                    ],
                ]);

                for ($i = 0; $i != count($oldImages); $i++) {
                    @unlink($oldImages[$i]);
                }


                $img->saveAs(Yii::getAlias('@storage/'.$imgParam['path']).'/files/'. $this->id . '.' . $img->getExtension());

//                Image::watermark($pathThumbImage, Yii::getAlias('@storage/watermark.png'), [700,644])->save($pathThumbImage);
                $urlImg = '/storage/'.$imgParam['path'].'/files/'. $this->id . '.' . $img->getExtension();
                return $urlImg;

        } else {
            return false;
        }
    }

    public function beforeSave($insert)
    {
        if(empty($this->type)) $this->type = key($this->pagesStructure);

        if(empty($this->module_slug)) $this->module_slug = $this::MODEL_SLUG;
        return parent::beforeSave($insert); // TODO: Change the autogenerated stub
    }

    public function afterSave($insert, $changedAttributes)
    {
        if(!empty($this->langData)){

            foreach($this->langData as $lang_id => $lang_data){
                $i=0;
                foreach($this->pagesStructure[key($this->pagesStructure)] as $item_type=>$tplItem){
                    $i++;
                    $lang = new ContentLang();
                    $item = $lang->find()
                        ->where(['lang_id' => $lang_id])
                        ->andWhere(['item_id' => $this->id])
                        ->andWhere(['item_type' => $item_type])
                        ->andWhere(['slug' => $this->type])->one();
                    if(!empty($item)){
                        $item->text = $lang_data[$item_type];
                        $item->sort = $i;
                        $item->save();
                    } else {
                        $lang->lang_id = $lang_id;
                        $lang->item_id = $this->id;
                        $lang->item_type = $item_type;
                        $lang->slug = $this->type;
                        $lang->text = $lang_data[$item_type];
                        $lang->sort = $i;
                        $lang->save();
                    }

                }

//                foreach($lang_data as $item_type=>$value){
//
//                    $lang = new ContentLang();
//                    $item = $lang->find()
//                        ->where(['lang_id' => $lang_id])
//                        ->andWhere(['item_id' => $this->id])
//                        ->andWhere(['item_type' => $item_type])
//                        ->andWhere(['slug' => $this->type])->one();
//
//                    if(!empty($item)){
//                        $item->text = $value;
//                        $item->save();
//                    } else {
//                        $lang->lang_id = $lang_id;
//                        $lang->item_id = $this->id;
//                        $lang->item_type = $item_type;
//                        $lang->slug = $this->type;
//                        $lang->text = $value;
//                        $lang->save();
//                    }
//
//                }
            }
        }
        parent::afterSave($insert, $changedAttributes); // TODO: Change the autogenerated stub
    }

    public function beforeDelete()
    {
        ContentLang::deleteAll(['item_id' => $this->id, 'slug' => $this->type]);
        ContenFiles::deleteLangData($this->type, $this->id);
        ContenFiles::deleteLangData($this::MODEL_SLUG.'-gallery', $this->id);

        return parent::beforeDelete(); // TODO: Change the autogenerated stub
    }

    public function getLangData(){
        return $this->langData;
    }

}
