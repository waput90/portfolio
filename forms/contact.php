<?php
  $to = "tubianojames@gmail.com";
  $subject = "Contact form from site from name: " . $_POST['name'];
  $txt = $_POST['message'];
  $headers = "From: ".$_POST['email']."\r\n"

  mail($receiving_email_address,$subject,$txt,$headers);
?>
