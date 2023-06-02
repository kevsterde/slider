$(document).ready(function(){

	// Global Variables

		var toggle_primary_button = $('.nav_toggle_button'),
				toggle_primary_icon = $('.nav_toggle_button i'),
				toggle_secondary_button = $('.page_nav li span'),
				primary_menu = $('.page_nav'),
				secondary_menu = $('.page_nav ul ul'),
				webHeight = $(document).height(),
				window_width = $(window).width();

	// Company name and phone number on content area
	$("main * :not('h1'),#banner,#middle,#bottom1,#bottom2,#bottom3,#bottom4,footer p").not('.woocommerce *').each(function() {
		var regex1 = /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{6})/g;
		var regex2 = /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{4}[\s.-]?\d{4})/g;
		var regex = /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g;
				$(this).html(
						$(this).html()
						.replace(/Jovial Care Givers LLC/gi, "<mark class='comp'>$&</mark>")
						.replace(regex1, "<mark class='main_phone'>$&</mark>").replace(regex2, "<mark class='main_phone'>$&</mark>").replace(regex, "<mark class='main_phone'>$&</mark>"));
		});

		$("main a[href]").each(function() {
		   var newHref = $(this).attr('href').replace("<mark class='comp'>", "").replace("</mark>", "");
			 $(this).attr('href', newHref);
		});

		// Forms on content area
		var form = $('main').find('#myframe');
			if(form.length > 0) {
			document.getElementById('myframe').onload = function(){
			  calcHeight();
			};
		}

	// Add class to tab having drop down
	$( ".page_nav li:has(ul)").find('span i').addClass("fa-caret-down");


	//Multi-line Tab
	toggle_secondary_button.click(function(){
		$(this).parent('li').siblings('li').children('ul').slideUp(400, function() {
			$(this).removeAttr('style');
		});

		$(this).parent('li').siblings('li').find('.fa').removeClass("fa-caret-up").addClass("fa-caret-down");

		$(this).parent('li').children('ul').slideToggle();
		$(this).children().toggleClass("fa-caret-up").toggleClass("fa-caret-down");
	});

	// Basic functionality for nav_toggle

	var hamburger = $(".hamburger");
    // hamburger.each(function(){
        // $(this).click(function(){
         // $(this).toggleClass("is-active");
        // });
      // });

	hamburger.click(function(){
		primary_menu.addClass('toggle_right_style');
		$('.toggle_right_nav').addClass('toggle_right_cont');
		$(".nav_toggle_button").toggleClass('active');
		$(".hamburger").toggleClass("is-active");
		$('body').addClass('active');
	});


	$('.toggle_nav_close, .menu_slide_right .hamburger').click(function(){
		primary_menu.removeClass('toggle_right_style');
		secondary_menu.removeAttr('style');
		toggle_secondary_button.children().removeClass("fa-caret-up").addClass("fa-caret-down");
		$('.toggle_right_nav').removeClass('toggle_right_cont');
		$(".nav_toggle_button").removeClass('active');
		$(".hamburger").removeClass("is-active");
		$('body').removeClass('active');
	});

	// Swap Elements
	function swap_this(){
		if(window_width <= 800){
			$('.main_logo').insertAfter('.logo_wrap');
			$('#nav_area').insertBefore('header');
			$('.footer_nav').insertBefore('.copyright');
		} else if (window_width <= 1010){
			$('.main_logo').insertBefore('.head_info');
			$('#nav_area').insertAfter('header');
			$('.footer_nav').insertBefore('.copyright');
			} else {
			$('.main_logo').insertBefore('.page_nav ul');
			$('#nav_area').insertAfter('header');
			$('.footer_nav').insertAfter('.footer_logo_con');

		}
	}

	const nonHomePageSwap = function () {
		const isHomePage = $("body").hasClass("front_page");
		if (isHomePage)  return;		
		
	  };



	swap_this();

	// Reset all configs when width > 800
	$(window).resize(function(){
		window_width = $(this).width();

		swap_this();

		if(window_width > 800) {
			$(".nav_toggle_button").removeClass('active');
			$(".hamburger").removeClass("is-active");
			primary_menu.removeClass('toggle_right_style');
			$('.toggle_right_nav').removeClass('toggle_right_cont');
			$('body').removeClass('active');
		}
		else{
			secondary_menu.removeAttr('style');
			toggle_secondary_button.children().removeClass("fa-caret-up").addClass("fa-caret-down");
		}


	});


	$('.back_top').click(function () { // back to top
		$("html, body").animate({
			scrollTop: 0
		}, 900);
		return false;
	});

	$(window).scroll(function(){  // fade in fade out button
	var windowScroll = $(this).scrollTop();

		if (windowScroll > (webHeight * 0.5) && window_width <= 600 ) {
			$(".back_top").fadeIn();
		} else{
			$(".back_top").fadeOut()
		};

		// HIDE NAV CHILD ON SCROLL

		const navCaret = () => {
			$(toggle_secondary_button).parent('li').siblings('li').children('ul').slideUp(400, function() {
				$(toggle_secondary_button).removeAttr('style');
			});

			$(toggle_secondary_button).children('i').removeClass("fa-caret-up").addClass("fa-caret-down");
			$(toggle_secondary_button).parent('li').children('ul').slideUp();

		};
		navCaret();


		// -----------------------



		// For (AddThis) Plugins
		if($('body #at-share-dock').hasClass('at-share-dock')) {
			$('.back_top').addClass('withAddThis_plugins');
			$('.footer_btm').addClass('withAddThis_ftr_btm');
		} else {
			$('.back_top').removeClass('withAddThis_plugins');
			$('.footer_btm').removeClass('withAddThis_ftr_btm');
		}


		  // for fixed background v2
	  if ($('#fixer').length >= 1) {
	    var fixbtm = $('#fixer').offset().top;
	    if (fixbtm <= windowScroll && window_width > 1024){
			$('#nav_area').addClass('fixed');
	    } else {
			$('#nav_area').removeClass('fixed');
	        }
	    }
  
	});



	if(document.addEventListener){
		document.addEventListener('invalid', function(e){
			e.target.className += ' invalid';
		}, true);
		}
		$("#submit_formmessage input").on('input', function() {
		$("#submit_formmessage input").removeClass('FormReq');
		$(".g-recaptcha iframe").removeClass('FormReq');
		});



		//---------------------- START OF CODE (FORM ACTIVATION) -------------------------------//
		$("#submit_formmessage .form_email").change(function(){
			validateEmail();
		});
		$('#submit_formmessage .form_btn').on('click', function(){
			if ($('#submit_formmessage .form_fullname').val() == '') {
				$('#submit_formmessage .form_fullname').addClass( "FormReq" );
			}else{
				$('#submit_formmessage .form_fullname').removeClass( "FormReq" );
			}
			if ($('#submit_formmessage .form_email').val() == '') {
				$('#submit_formmessage .form_email').addClass( "FormReq" );
			}else{
				validateEmail();
			}
			if(grecaptcha.getResponse() == "") {
				var $recaptcha = document.querySelector('#g-recaptcha-response');
					$recaptcha.setAttribute("required", "required");
					$('.g-recaptcha iframe').addClass('FormReq').attr('id','recaptcha');
			}
		});	

		// FOR EMAIL VALIDATOR
		function validateEmail(){
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var email = $('#submit_formmessage .form_email').val();
				if( !emailReg.test( email ) ) {
				  $('#submit_formmessage .form_email').addClass( "FormReq" );
				  $('#invalid-msg').show();
				  $('#invalid-msg').html('Please enter a valid email address.');
				} else {
				  $('#submit_formmessage .form_email').removeClass( "FormReq" );
				  $('#invalid-msg').hide();
				}
		}

		// FOR PROMPT POP-UP MESSAGE
		$('#success .close').click(function () {
			$('#success').fadeOut();
			$('#recaptcha-error').fadeOut();
		});
	   
		$('.rclose').click(function () {
			$('#recaptcha-error').fadeOut();
		});
	   
		$('#error-msg .error-close').click(function () {
			$('#error-msg').fadeOut();
		});

		//---------------------- END OF CODE (FORM ACTIVATION -------------------------------//
});


// FOR ALT IMAGE


const imgList = document.querySelectorAll("img")	;
let list = document.getElementById("imgList");
let i = 1;
imgList.forEach((item) => {
	let text = item.getAttribute("alt");
	let imgLink = item.getAttribute("src");
	
	let li = document.createElement("li" );
	let span = document.createElement("span" );
	let h5 = document.createElement("h5");
	li.innerText = i + " = ";
	h5.innerText = text ;
	span.innerText = " => " + imgLink;
	list.appendChild(li);
	li.appendChild(h5);
	li.appendChild(span);
	i++;
});