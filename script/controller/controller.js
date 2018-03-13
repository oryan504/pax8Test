angular.module("myApp")
	.controller("myCtrl", ['$scope', 'MyApis', 'Helper', function($scope, MyApis, Helper) {

	$scope.cData = {			
		products: [],
		partners: [],			
		selectedProduct: null
	}


	$scope.buyProduct = function buyProduct(product) {
		$location.path('/buyProduct').search({id: product.id});
	};

	
	$scope.displayProductDetails = function displayProductDetails(product) {
		$scope.cData.selectedProduct = product;
		$scope.cData.searchInput ='';
		//out of time setting this up with the UI
		$scope.myRequirements = [];
		for (i = 0; i < $scope.cData.products.length; i++){
			if($scope.cData.products[i] == product.requiresProductId){
				$scope.myRequirements.push($scope.cData.products[i]);
			}
		}
	};	

	$scope.getProducts = function getProducts() {		
		MyApis.getProducts().then(function(products) {
			$scope.cData.products = products;
			$scope.dataLoading = false;
	    }, function(errorMessage) {});
	};

	$scope.getPartners = function getPartners() {		
		MyApis.getPartners().then(function(partners) {
			$scope.cData.partners = partners;
	    }, function(errorMessage) {});
	};

	$scope.choosePartner = function choosePartner(partner){
		$scope.currentProducts = [];
	    var partner = JSON.parse(partner);
	    var products =  $scope.cData.products;
		var partnerProducts = partner.products;
		var dataLength = products.length;
		for (i = 0; i < dataLength; i++){
			for (ii = 0; ii < partnerProducts.length; ii++){
				if(products[i].id == partnerProducts[ii]){
					$scope.currentProducts.push(products[i]);
				}
			}
		}

	};



	$scope.newSearch = function(){
		$scope.cData.selectedProduct = '';
		$scope.cData.searchInput ='';
		$scope.currentProducts = [];
	}
    

	$scope.init = function init() {
		$scope.getProducts();
		$scope.getPartners();
		$scope.dataLoading = true;
	};

	$scope.init();

}]);
