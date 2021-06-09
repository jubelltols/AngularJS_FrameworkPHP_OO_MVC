app.controller('controller_shop', function($scope, $rootScope, $route, filters, list_products, services_shop) {

    let talla = [];
    let color = [];
    let categoria = [];    

/* var selected;
    
    var filter = function(start_data,value_filter,key_filter){
        var final_data = [];   
        selected = false;
        for (var j in start_data) {
            var p = start_data[j];
            for (var i in value_filter) {
                if (value_filter[i]) {
                    selected = true;
                    if (value_filter[i] == p[key_filter]) {
                        final_data.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            final_data = start_data;
        }
        return final_data;
    } */

    $scope.filter_products = function(value, key) {
        var fliter_type = [];

        if(key == "talla"){
            if(!talla.includes(value)){
                talla.push(value);
            }else{
                i = talla.indexOf(value);
                talla.splice( i, 1 );
            }
        }else if(key == "color"){
            if(!color.includes(value)){
                color.push(value);
            }else{
                i = color.indexOf(value);
                color.splice( i, 1 );
            }
        }else if(key == "categoria"){
            if(!categoria.includes(value)){
                categoria.push(value);
            }else{
                i = categoria.indexOf(value);
                categoria.splice( i, 1 );
            }
        }

        if(talla.length != 0){
            fliter_type.push({key : 'talla', value : talla});
        }
        if(color.length != 0){
            fliter_type.push({key : 'color', value : color});
        }
        if(categoria.length != 0){
            fliter_type.push({key : 'categoria', value : categoria});
        }

        if(fliter_type.length == 0){
            $scope.pagination(list_products);
        }else{
            services_shop.filter_search(fliter_type);
        }

        /* var fliter_type = [{value : talla, key : 'talla'},{value : color, key : 'color'},{value : categoria, key : 'categoria'}];
        var start_data = list_products;

         for(var i in fliter_type){
            var start_data = filter(start_data,fliter_type[i].value,fliter_type[i].key);
        } 

        $scope.final_data = start_data;
        $scope.pagination($scope.final_data); */
    }

    $scope.pagination = function(products) {
        services_shop.pagination(products);
    }

    $scope.change_page = function(page) {
        services_shop.change_page(page); 
    }

    $scope.load_details = function(codigo_producto) {
        location.href = "#/product/" + codigo_producto;
    };

    $scope.add_cart = function(codigo_producto) {
        if(localStorage.token){
            services_shop.add_cart(codigo_producto, localStorage.token);
        }else{
            location.href = "#/login";
        }
    }

    $scope.add_favs = function() {
        if(localStorage.token){
            services_shop.add_favs(this.product.codigo_producto, localStorage.token);
            if(this.product.favs_class == "bxs-heart"){
                this.product.favs_class = "bx-heart";
            }else{
                this.product.favs_class = "bxs-heart";
            }
        }else{
            location.href = "#/login";
        }
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'shop'){
        $scope.filters = filters;
        $scope.show_list_product = true;
        $scope.show_details = false;
        if(localStorage.filters){
            var local = JSON.parse(localStorage.filters);
            localStorage.removeItem('filters');
            services_shop.filter_search(local);
        }else{
            $scope.pagination(list_products);
        }
    }else if(path[1] === 'product'){
        $scope.show_list_product = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.token);
    }
});

