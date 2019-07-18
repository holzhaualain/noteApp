 Handlebars.registerHelper("status", function(options) {
 				  var check =  options.hash.icon == "true" ? ' | <i class="fa fa-check" aria-hidden="true"></i><span class="done">Erledigt</span>' : "";
 				  return new Handlebars.SafeString(check);
			  });