<?php
ini_set("memory_limit","128M");
require_once('class.pessl_soap.php');
date_default_timezone_set("Europe/Kiev");

$url = 'http://www.fieldclimate.com/api/index.php?action=CIDIStationList_GetStations&user_name=&user_passw=';
$result = @file_get_contents($url);

if ($result) {
    $stations_custom_names = json_decode($result,true);


}


if (!empty($stations_custom_names['ReturnDataSet'])){

    $custom_names = $stations_custom_names['ReturnDataSet'];
}





$soap_stations =  new PesslsoapStationList();
$soap_stations ->username = '';
$soap_stations ->password = '';
$stations = & $soap_stations->PesslSoapStationListAll() or
die("error reading station list: ".$soap_stations->error);
if(!count($stations)){
    die("there are no stations available");

}
$dsn = 'mysql:host=localhost; dbname=';
//$user = 'root';
//$password = '';
$user = '';
$password = '';
try {

    $zdbh = new PDO($dsn, $user, $password);


} catch (PDOException $e) {

}


$zdbh->query("SET NAMES utf8");




//Обновление базы станций.
$stations_in_syngenta = [];
$stations_in_base = [];

foreach($stations as $station) {
$stations_in_syngenta[] = $station['f_name'];
}

$sth6 = $zdbh->prepare('select `name` from stations');
$sth6->execute();
$id3 = $sth6->fetchAll(PDO::FETCH_ASSOC);

foreach ($id3 as $value){

   $stations_in_base[] =  $value['name'];

    /*if (!in_array($value['name'], $stations_in_syngenta)){
        $sthz = $zdbh->prepare('UPDATE `stations` SET `is_available`= 0 where `name` = ? ');
        $sthz->execute([$value['name']]);
    }*/
}
/*echo "<pre>";
var_dump($stations_in_base);
die;*/
$jj=0;
foreach($stations as $station) {
    $jj++;
    if (!in_array($station['f_name'], $stations_in_base)) {
        $sthz = $zdbh->prepare('insert into  `stations` (`name`,`latitude`,`longitude`,`is_available`,`visible`,`user_station_name`) values (?,?,?,?,?,?);');

        $sthz->execute([$station['f_name'], $station['f_latitude'], $station['f_longitude'], 1, 1, !empty($custom_names[$station['f_name']]['custom_name']) ? $custom_names[$station['f_name']]['custom_name'] : 'Станція '.$jj ]);
    }



}







echo '<script> history.back();</script>';




?>
