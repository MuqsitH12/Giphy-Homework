$(document).ready(function() {

	var celebs = [
	"Keanu Reeves", "Jennifer Lopez", "Eminem", "Nicki Minaj", "Michael Jackson", 
	"Cristiano Ronaldo", "Tom Brady", "Emma Watson", "James Franco", 
	"Dwayne Johnson", "Will Ferrel", "Rihanna", "Kevin Hart", "Shia Lebouf",
	"Emma Stone", "Conor McGregor", "Ric Flair", "Terry Crews", "Beyonce"
	];

	//creates buttons that will be added to page
	function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
		$(areaToAddTo).empty();

		for(var i = 0; i < arrayToUse.length; i++) {
			var a = $("<button>");
			a.attr("data-type", arrayToUse[i]);
			a.text(arrayToUse[i]);
			$(areaToAddTo).append(a);
		}
	}

	$(document).on("click", ".celeb-button", function() {
		$("#celebs").empty();
		$(".celeb-button").removeClass("active");
		$(this).addClass("active");

		var type = $(this).attr("data-type");
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
		

		$.ajax({
			url: queryUrl,
			method: "GET"
		})
		.done(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var celebDiv = $("<div class=\"celeb-item\">");

				var rating = results[i].rating;


				var p = $("<p>").text("Rating: " + rating);

				var animated = results[i].images.fixed_height.url;
				var still = results[i].images.fixed_height_still.url;

				var celebImage = $("<img>");
				celebImage.attr("src", still);
				celebImage.attr("data-still", still);
				celebImage.attr("data-animate", animated);
				celebImage.attr("data-state", "still");
				celebImage.addClass("celeb-image");

				celebDiv.append(p);
				celebDiv.append(celebImage);

				$("#celebs").append(celebDiv);
			}
		});		
	});

	$(document).on("click", ".celeb-image", function() {
		
		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}
		else{
			$(this).attr("src", $(this).attr("date-still"));
			$(this).attr("data-state", "still");
		}
	});

	$("#add-celeb").on("click", function(event) {
		event.preventDefault();
		var newCeleb = $("input").eq(0).val();

		if (newCeleb.length > 2) {
			celebs.push(newCeleb);
		}

		populateButtons(celebs, "celeb-button", "#celeb-button");

	});

	populateButtons(celebs, "celeb-button", "#celeb-button");

});