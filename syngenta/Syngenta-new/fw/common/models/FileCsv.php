<?php
namespace common\models;

use yii\base\Model;
use yii\web\UploadedFile;

class FileCsv extends Model
{

public $csvfile;

public function rules()
{
return [
[['csvfile'], 'file', 'skipOnEmpty' => false, 'extensions' => 'csv'],
];
}




}