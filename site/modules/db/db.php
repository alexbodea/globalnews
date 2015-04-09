<?php

class Db {

        protected static $connection;

        public function connect() {    

            if(!isset($connection)) {

            	global $utils;

                $connection = mysqli_connect($utils['db_host'], $utils['db_user'], $utils['db_pass'], $utils['db_database']);
                mysqli_set_charset($connection, "utf8");
            }

            if($connection === false) {
                return false;
            }

            return $connection;
        }

        public function query($query) {
            $connection = $this -> connect();
            $result = $connection -> query($query);

            return $result;
        }

        public function value_select($query) {
            $rows = array();
            $result = $this -> query($query);

            if($result === false) {
                return false;
            }
            $rows = mysqli_fetch_array($result);
            mysqli_free_result($result);
            return $rows[0];
        }


        public function array_select($query) {

            $rows = array();
            $result = $this -> query($query);

            if($result === false) {
                return false;
            }
            while($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            mysqli_free_result($result);

            return $rows;

        }

        public function num_rows($query) {
            $connection = $this -> connect();
            $result = $this -> query($query);
            $num_rows = mysqli_num_rows($result);

            return $num_rows;

        }

        public function execute($query) {
            
            $connection = $this -> connect();
            $result = $this -> query($query);
            if($result)
                return true;
            else
                return false;
        }


        public function escape_string($query) {

            $connection = $this -> connect();
            return mysqli_real_escape_string($connection,$query);
        }

    }
?>

