<?php
use yii\helpers\Html;
use yii\helpers\Url;
?>


<table>
    <tr>
        <td colspan="2"><h2>Сообщение с сайта</h2></td>
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
    <tr>
        <td colspan="2"><hr></td>
    </tr>
    <tr>
        <td>Сообщение</td>
        <td><?=$model->msg?></td>
    </tr>
</table>

