<?php
    class home_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_carousel() {
            return $this -> bll -> get_carousel_BLL();
        }

        public function get_categoria() {
            return $this -> bll -> get_categoria_BLL();
        }

        public function get_brands() {
            return $this -> bll -> get_brands_BLL();
        }

        public function get_load_more() {
            return $this -> bll -> get_load_more_BLL();
        }

    }
?>