<?php

    class controller_cart {

        function insert_cart() {
            echo json_encode(common::load_model('cart_model', 'get_insert_cart', [$_GET['user'], $_GET['id']]));
        }

        function load_cart() {
            echo json_encode(common::load_model('cart_model', 'get_load_cart', $_POST['token']));
        }

        function delete_cart() {
            echo json_encode(common::load_model('cart_model', 'get_delete_cart',[$_POST['user'], $_POST['codigo_producto']]));
        }

        function update_qty() {
            echo json_encode(common::load_model('cart_model', 'get_update_qty', [$_POST['user'], $_POST['id'],$_POST['qty']]));
        }

        function checkout() {
            echo json_encode(common::load_model('cart_model', 'get_checkout', $_POST['user']));
        }

    }
    
?>
