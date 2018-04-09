<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>


<table>
    <tr>
        <td colspan="2"><h2>Сообщение соискателя</h2></td>
    </tr>
    <tr>
        <td>Фамилия</td>
        <td><?=$model->surname?></td>
    </tr>

    <tr>
        <td>Имя</td>
        <td><?=$model->name?></td>
    </tr>
    <tr>
        <td>Контактный e-mail</td>
        <td><?=$model->email?></td>
    </tr>
    <tr>
        <td>Контактный телефон</td>
        <td><?=$model->phone?></td>
    </tr>
<? if ($model->file){ ?>
    <tr>
        <td>Файл резюме</td>
        <td><a href="<?=\yii\helpers\Url::to('@public'.$model->file)?>" target="_blank" >Cсылка на файл</a></td>
    </tr>

    <?}?>

    <tr>
        <td colspan="2"><hr></td>
    </tr>
    <tr>
        <td>Сопроводительный текст</td>
        <td><?=$model->text_resume?></td>
    </tr>
</table>

