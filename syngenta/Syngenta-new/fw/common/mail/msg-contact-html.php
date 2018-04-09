<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>


<table>
    <tr>
        <td colspan="2"><h2>Сообщение с сайта</h2></td>
    </tr>
    <tr>
        <td>ФИО</td>
        <td><?=$model->fio?></td>
    </tr>

    <tr>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Контактный e-mail</td>
        <td><?=$model->email?></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2"><hr></td>
    </tr>
    <tr>
        <td>Сообщение</td>
        <td><?=$model->text?></td>
    </tr>
</table>

