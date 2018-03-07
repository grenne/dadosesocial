/**
 * 
 */




$('html').toggleClass("hidden-menu-mobile-lock");
$.root_.toggleClass("hidden-menu");
$.root_.removeClass("minified");


if (sessionStorage.user){
	if (sessionStorage.user == "rh"){
		$(window.document.location).attr('href','lista-funcionarios.html');
	}else{
		$(window.document.location).attr('href','dadosesocial.html?' + sessionStorage.login);
	}
}else{
	$(window.document.location).attr('href','login.html');
};
