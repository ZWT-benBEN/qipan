<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>棋盘</title>
   <style>
   .info{
    width:900px;height:400px;
    background:rgba(33,33,33,0.8);
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    color:#fff;
    font-size:24px;
    text-align:center;
    line-height:50px;
   }

   </style>
</head>
<body>
  <div class="info">
  <?php
     echo date("Y-m-d i:s");
  ?>

  <?php
     $mysqli = new mysqli('localhost','root','','test');
     $result = $mysqli->query("select * from news");
     $array = $result->fetch_all(MYSQLI_ASSOC);
     print_r($array);
      echo "<ul>";
          foreach ($array as $k=>$v){
             echo "<li><span>{$v['title']}</span><i>{$v['info']}</i></li>";
          };
          echo "</ul>";
   ?>

  </div>
</body>
</html>