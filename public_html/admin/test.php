<?php

$locality = 'Dutch_Netherlands.1252'; // locality should be determined here
if (defined('LC_MESSAGES')) {
    setlocale(LC_MESSAGES, $locality); // Linux
} else {
    putenv("LC_ALL={$locality}"); // windows
}
bindtextdomain("messages", "./locale"); // 'D:\work\so\l10n\locale'
textdomain("messages"); // 'messages'

echo _("Home"); // 'Hallo wereld'