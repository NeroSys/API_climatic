<?php
$station_name = $_GET['station_name'];
$model = $_GET['model'];

$public_key = "956f159c74c0930780e98bf681ee5e6b31b4a817";
$private_key = "22a1eecc2a9edffa2b343cbd2b17f3022a6a5e63";
$method = "POST";
$request = "/disease/".$station_name."/last/2h";
$timestamp = gmdate('D, d M Y H:i:s T'); // Date as per RFC2616 - Wed, 25 Nov 2014 12:45:26 GMT
$content_to_sign = $method.$request.$timestamp.$public_key;
$signature = hash_hmac("sha256", $content_to_sign, $private_key);
$headers = [
    "Accept: application/json",
    "Authorization: hmac {$public_key}:{$signature}",
    "Date: {$timestamp}",
];
$data =['data'=>['model'=>$model]];
$data_string = json_encode($data);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://stage.fieldclimate.com" . $request);
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
$output = curl_exec($ch);
curl_close($ch);
echo 'Ответ сервера метос:';
?>
<table style="border:1px solid black; padding:30px;">
    <tr>
        <td>
            <?=$output?>
        </td>

    </tr>
</table>
