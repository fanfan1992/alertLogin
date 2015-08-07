<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class mysql {

    function __construct() {
        mysql_connect('localhost', 'root', '');
        mysql_select_db('blog');
        mysql_query('set names utf8');
    }

    function username($data, $tb, $name, $need) {
        $this->data = $data;
        $this->tb = $tb;
        $this->name = $name;
        $this->need = $need;
        $sql = "select $this->data from $this->tb where $this->name = '$this->need' ";
        $query = mysql_query($sql);
        $arr = array();
        while ($num = mysql_fetch_array($query)) {
            $arr[] = $num[$data];
        }
        return count($arr);
    }

    function passforname($data, $tb, $name, $need, $pass, $need2) {
        $this->data = $data;
        $this->tb = $tb;
        $this->name = $name;
        $this->need = $need;
        $this->pass = $pass;
        $this->need2 = $need2;
        $sql = "select $this->data from $this->tb where $this->name = '$this->need' and $this->pass ='$this->need2'";
        $query = mysql_query($sql);
        $arr = array();
        while ($num = mysql_fetch_array($query)) {
            $arr[] = $num[$data];
        }
        return count($arr);
    }

}

$res = new mysql;
$mes = $res->passforname('*', blog_user, username, fan,password,'20920');

