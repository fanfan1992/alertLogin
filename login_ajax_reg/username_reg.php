<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once './sqlcon.php';
$name = $_POST['username'];
$res = new mysql;
$mes = $res->username('*', blog_user, username,$name);
echo $mes;