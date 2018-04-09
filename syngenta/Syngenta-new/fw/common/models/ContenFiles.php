<?php

namespace common\models;

use Yii;

use yii\helpers\FileHelper;
use yii\imagine\Image;
use yii\helpers\Json;
use Imagine\Image\Box;
use Imagine\Image\Point;

/**
 * This is the model class for table "conten_files".
 *
 * @property integer $id
 * @property string $slug
 * @property string $item_type
 * @property integer $item_id
 * @property integer $lang_id
 * @property string $file
 *
 * @property Language $lang
 */
class ContenFiles extends \yii\db\ActiveRecord
{

    public $image;
    public $crop_info;
    public $pdfFile;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'conten_files';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['item_id'], 'required'],
            [['item_id', 'lang_id'], 'integer'],
            [['slug', 'item_type', 'file'], 'string', 'max' => 255],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::className(), 'targetAttribute' => ['lang_id' => 'id']],
            [
                'image',
                'image',
                'extensions' => ['jpg', 'jpeg', 'png', 'gif'],
                'mimeTypes' => ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
            ],
            [['pdfFile'], 'file', 'extensions' => 'pdf'],
            [['crop_info','file'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'Slug',
            'item_type' => 'Item Type',
            'item_id' => 'Item ID',
            'lang_id' => 'Lang ID',
            'file' => 'File',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLang()
    {
        return $this->hasOne(Language::className(), ['id' => 'lang_id']);
    }

    public function updateFile($item_id=null, $slug=null, $item_type=null, $file_name=null){
        if(!empty($item_id) && !empty($slug) && !empty($item_type) && !empty($file_name)){
            $imgModel = new ContenFiles();

            $query_z = $imgModel->find()
                ->where('item_id = :item_id', ['item_id' => $item_id])
                ->andWhere('slug = :slug', ['slug' => $slug])
                ->andWhere('item_type = :item_type', ['item_type' => $item_type])->one();


            if($query_z){
                $setItem = ContenFiles::findOne($query_z->id);
                $setItem->file = $file_name;
                $setItem->save();
            } else {
                $imgModel->slug = $slug;
                $imgModel->item_type = $item_type;
                $imgModel->item_id = $item_id;
                $imgModel->file = $file_name;
                $imgModel->save();
            }
        }
    }


    public function saveIMG($img, $path, $width, $height)
    {
        // open image
        if(!empty($img)){

            $image = Image::getImagine()->open($img->tempName);


            $cropInfo = Json::decode($this->crop_info)[0];

            if((int)$cropInfo['dw'] > 0 && (int)$cropInfo['dh'] > 0) {

                $cropInfo['dw'] = (int)$cropInfo['dw']; //new width image
                $cropInfo['dh'] = (int)$cropInfo['dh']; //new height image
                $cropInfo['x'] = abs($cropInfo['x']); //begin position of frame crop by X
                $cropInfo['y'] = abs($cropInfo['y']); //begin position of frame crop by Y
                //$cropInfo['ratio'] = $cropInfo['ratio'] == 0 ? 1.0 : (float)$cropInfo['ratio']; //ratio image. We don't use in this example


                //delete old images
                $oldImages = FileHelper::findFiles(Yii::getAlias('@storage/'.$path), [
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
                $cropSizeThumb = new Box($width, $height); //frame size of crop
                $cropPointThumb = new Point($cropInfo['x'], $cropInfo['y']);
                $pathThumbImage = Yii::getAlias('@storage/'.$path) .'/thumb_/' . 'thumb_' . $this->id . '.' . $img->getExtension();

                $image->resize($newSizeThumb)
                    ->crop($cropPointThumb, $cropSizeThumb)
                    ->save($pathThumbImage, ['quality' => 80]);

                //saving original
                $img->saveAs(Yii::getAlias('@storage/'.$path).'/upload/' . $this->id . '.' . $img->getExtension());

//                Image::watermark($pathThumbImage, Yii::getAlias('@storage/watermark.png'), [700,644])->save($pathThumbImage);
                $urlImg = Yii::getAlias('@'.$path).'/thumb_/' . 'thumb_' . $this->id . '.' . $img->getExtension();
                return $urlImg;
            } else {
                return null;
            }
        } else {
            return false;
        }
    }


    public function beforeDelete(){

        if (parent::beforeDelete()) {
            $path = realpath(dirname(__FILE__).'/../../../').$this->file;
            $path_hi = str_replace('thumb_', '', str_replace( '/thumb_/', '/upload/', $path));
            unlink($path);
            unlink($path_hi);
            return true;
        } else {
            return false;
        }

    }


    public function insertLangRecords($slug=null, $item_type=null, $item_id=null, $file=null){

        if(!empty($slug) && !empty($item_type) && !empty($item_id)){
            $langList = Language::find()->all();
            foreach($langList as $lang){
                $cout = ContenFiles::find()
                    ->where('slug = :slug', ['slug' => $slug])
                    ->andWhere('item_type = :item_type', ['item_type' => $item_type])
                    ->andWhere('lang_id = :lang_id', ['lang_id' => $lang->id])
                    ->andWhere('item_id = :item_id', ['item_id' => $item_id])
                    ->count();

                if($cout == 0){
                    $langData = new ContenFiles();
                    $langData->slug = $slug;
                    $langData->item_type = $item_type;
                    $langData->lang_id = $lang->id;
                    $langData->item_id = $item_id;
                    $langData->file = $file;
                    $langData->save();
                }
            }
        }
    }

    public function deleteLangData($slug=null, $item_id=null){
        if(!empty($slug) && !empty($item_id)){
            $langData = new ContenFiles();
            $langData->slug = $slug;
            $langData->item_id = $item_id;
            $res = $langData->find()
                ->where('slug = :slug', ['slug' => $slug])
                ->andWhere('item_id = :item_id', ['item_id' => $item_id])
                ->all();


//            var_dump($slug=null, $item_id=null);

            foreach($res as $item){
                $item->delete();
            }
        }
    }



}
