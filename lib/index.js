import $ from 'jquery';
import 'jquery.easing';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../assets/css/grayscale.css';

import './stonehenge';

/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
		$('.navbar-toggle:visible').click();
	}
});

$('#subscribe').submit(function (event) {
	event.preventDefault();
	const $form = $(this);
	
	const display = message => {
		$form.siblings().andSelf().fadeOut();
		$(message).appendTo($form.parent()).fadeIn();
	};

	$.ajax({
		contentType: 'application/json',
		data: JSON.stringify({email: $('input', $form).val()}),
		dataType: 'json',
		method: 'POST',
		url: './api/capture-lead.php'
	})
		.done(() => {
			display('<p>Thank you for expressing your interest! We’ll be in touch.</p>')
		})
		.fail(jqXhr => {
			let error;
			try {
				error = JSON.parse(jqXhr.responseText).error;
			} catch (ex) {
				error = 'Something unknown went wrong.';
			}
			
			display('<p class="alert alert-danger">' + error + '</p>')
		});
});
