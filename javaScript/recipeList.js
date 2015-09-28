//Searching for the list of recipes
function searchBt() { 
	var cuis = "";
	var diett = "";
	var aller = "";
	var typee = "";
    var cuisine = document.forms[0];
    for (i = 0; i < cuisine.length; i++) {
        if (cuisine[i].checked) {
           cuis = cuis + cuisine[i].value+"," ;
        }
    }
	
	var types = document.forms[1];
    for (i = 0; i < types.length; i++) {
        if (types[i].checked) {
            typee = typee[i].value;
        }
    }
	
	var det = document.forms[2];
    for (i = 0; i < det.length; i++) {
        if (det[i].checked) {
            diett = det[i].value;
        }
    }
	
	var allergy = document.forms[3];
    for (i = 0; i < allergy.length; i++) {
        if (allergy[i].checked) {
            aller = aller +allergy[i].value + ",";
        }
	}
	var recipe = document.getElementById("searchItem").value;
	var noRecipe = document.getElementById("excItem").value;
	
	
	if (recipe != "Search for recipes..." ){
		if (noRecipe === "Exclude recipes" ){
			noRecipe = "";
		}
	    
	var output = $.ajax({
    url: 'https://webknox-recipes.p.mashape.com/recipes/search',
    type: 'GET',
    data: {query:recipe, excludeIngredients:noRecipe,cuisine:cuis ,diet:diett ,intolerances:aller ,type:typee ,number:28},
    datatype: 'json',
	success: calling,
    error: function(err) {  alert("Can not connect to server")},
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "oL6KFfSSfBmshzexG17zJoy4hiVjp1olYyvjsnfHP3zSWeXqGT");
    }
	});

	}
	else {
	alert("Will need to input an ingredient");
	}
	function calling(data) {
		for(i=0;i<33;i++){
			document.getElementById("thmbDiv"+i).innerHTML= "";
			var imgUrl = ('http://webknox.com/recipeImages/'+(data.results[i].image));
			var thumbContainer = document.getElementById("thmbDiv"+i);
		
			var thumbnail = document.createElement("img");
		    thumbnail.style.height = '250px';
			thumbnail.style.width = '265px';
		
			thumbContainer.appendChild(thumbnail);
			thumbnail.src = imgUrl;
			
			document.getElementById("content"+i).innerHTML = (data.results[i].title);
			document.getElementById("Id"+i).innerHTML = (data.results[i].id);

		}
	}
}
//stores data of recipe even when refreshed
function recipeSearch(data){
	var detail = document.getElementById("Id"+data).innerHTML ;
	window.localStorage.setItem("id", detail);
}

//function to search for the specified recipes detail
function recipeDetail(){
var detail = localStorage.getItem("id");

	var output = $.ajax({
    url: 'https://webknox-recipes.p.mashape.com/recipes/'+detail+'/information',
    type: 'GET',
    data: {id:detail},
    datatype: 'json',
	success: calling,
    error: function(err) {  alert("Can not connect to server") },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "oL6KFfSSfBmshzexG17zJoy4hiVjp1olYyvjsnfHP3zSWeXqGT");
    }
	});
	function calling(data) {
		var deet = data.sourceUrl;
		var output = $.ajax({
    url: 'https://webknox-recipes.p.mashape.com/recipes/'+detail+'/similar',
    type: 'GET',
    data: {id:detail},
    datatype: 'json',
	success: calling,
    error: function(err) {  alert("Can not connect to server") },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "oL6KFfSSfBmshzexG17zJoy4hiVjp1olYyvjsnfHP3zSWeXqGT");
    }
	});
	function calling(data) {
		window.localStorage.setItem("urlLink", deet);
		var output = $.ajax({
		url: 'https://webknox-recipes.p.mashape.com/recipes/extract',
		type: 'GET',
		data: {url:deet},
		datatype: 'json',
		success: Detail1,
		error: function(err) {  alert("Can not connect to server")},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Mashape-Authorization", "oL6KFfSSfBmshzexG17zJoy4hiVjp1olYyvjsnfHP3zSWeXqGT");
		}
		});
		function Detail1(detailed) {
			var imgUrl = ('http://webknox.com/recipeImages/'+(detailed.image));
			var thumbContainer = document.getElementById("imgRecip");
			var thumbnail = document.createElement("img");
			thumbContainer.appendChild(thumbnail);
			thumbnail.src = imgUrl;
				
			document.getElementById("title").innerHTML = detailed.title;
			document.getElementById("descript").innerHTML = "Serve for " + (detailed.servings) + " and will be ready in " + (detailed.readyInMinutes) + " minutes" ;

			document.getElementById("toMake").innerHTML = detailed.text;

		
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Gluten free: ' + detailed.glutenFree;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Vegetarian: ' + detailed.vegetarian;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Vegan: ' + detailed.vegan;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Very healthy: ' + detailed.veryHealthy;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Dairy free: ' + detailed.dairyFree;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Cheap: ' + detailed.cheap;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Very popular: ' + detailed.veryPopular;
				var div = document.getElementById('deta');
				div.innerHTML= div.innerHTML + '<br>' + 'Is sustainable: ' + detailed.sustainable;
				
	var output = $.ajax({
    url: 'https://webknox-recipes.p.mashape.com/recipes/'+detail+'/similar',
    type: 'GET',
    data: {id:detail},
    datatype: 'json',
	success: calling,
    error: function(err) {  alert("Can not connect to server") },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "oL6KFfSSfBmshzexG17zJoy4hiVjp1olYyvjsnfHP3zSWeXqGT");
    }
	});
	function calling(data) {
			for(i=0;i<11;i++){
			var imgUrl = ('http://webknox.com/recipeImages/'+(data[i].image));
			var thumbContainer = document.getElementById("thmbDiv"+i);
		
			var thumbnail = document.createElement("img");
		    thumbnail.style.height = '250px';
			thumbnail.style.width = '265px';
		
			thumbContainer.appendChild(thumbnail);
			thumbnail.src = imgUrl;
			
			document.getElementById("content"+i).innerHTML = (data[i].title);
			document.getElementById("Id"+i).innerHTML = (data[i].id);

		}
	}
	
	for (i=0;i<20;i++){
					var div = document.getElementById('ingr');
					div.innerHTML = div.innerHTML + '<br>' + (detailed.extendedIngredients[i].originalString);
				
			}	
		}
	}
	
	}
}
function linkToPage(){
	window.open(localStorage.getItem("urlLink"));
}
