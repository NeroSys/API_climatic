<?php

namespace common\models;

use app\modules\cooperation\models\vacancy\VacancyPage;
use Yii;
use yii\base\Model;
use yii\web\UploadedFile;


class Resumes extends \yii\db\ActiveRecord
//class Resumes extends Model
{

    public $fileinfo;


    public static function tableName()
    {
        return 'resumes';
    }

    public function rules()
    {
        return [
            [['email','name','surname','phone'], 'required'],
            [['email'], 'email'],
            [['text_resume'],'string'],
           // [['text','fileinfo'], 'required1'],
            [['fileinfo'], 'file','extensions' => ['doc','docx','rtf', 'txt', 'odt', 'pdf']]



        ];
    }
    public function attributeLabels()
    {
        if (Yii::$app->language == 'uk'){
            Yii::$app->language = 'ua';
        }

        return [

            'name' => 'Имя',
            'surname' => 'Фамилия',
            'email' => 'E-Mail',
            'phone' => 'Телефон',

        ];
    }



  //  public function required1($attribute_name, $params)
  //  {
  //      if (empty($this->text)
  //          && empty($this->fileinfo)
  //      ) {
  //          $this->addError($attribute_name, \Yii::t('user', 'At least 1 of the field must be filled'));
//
   //         return false;
   //     }

   //     return true;
  //  }

    public function afterSave(){



       if ($this->file) {
           Yii::$app->mailer->compose('msg-resume-html', ['model' => $this])
               ->setFrom(['site@sproduccion.com' => 'site@sproduccion.com'])
               ->setTo([VacancyPage::getPagePart()->langData['send_to_email']->text => ''])
               ->setSubject('Сообщение соискателя')
               ->send();
       }

    }



    public function saveFILE($fileinstance)
    {
        if(!empty($fileinstance)){

            $fileinstance->saveAs(Yii::getAlias('@storage/'.'cooperation'.'/resumes/'. $this->id_resumes . '.' . $fileinstance->getExtension()));


            $urlResume = '/storage/'.'cooperation'.'/resumes/'. $this->id_resumes . '.' . $fileinstance->getExtension();
            return $urlResume;

        } else {
            return false;
        }
    }


}
