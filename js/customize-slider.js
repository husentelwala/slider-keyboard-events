/*************************/
/***** AUTHOR : HUSENTELWALA 
/***** DATE : 12-02-2014
/*************************/
$(document).ready(function(){	
	/*** VARIABLE DECLARATION 
	/****************************************/ 
	$animation_name="zoomInRight";	
	$active="active";	
	$custom_slider=".custom-slider-h";	
	$active_with_animation=$active+'.'+$animation_name;
	$active_with_animation_cls=$active+' '+$animation_name;
	
	$custom_slider_li=$custom_slider+' ul li';
	$li_last_child=$custom_slider+' '+"ul li:last-child";
	$li_first_child=$custom_slider+' '+"ul li:first-child";
	$custom_ol_li=$custom_slider+' '+"ol li";
	$custom_li_active=$custom_slider_li+ "." + $active_with_animation;
	$next='#next';
	$prev='#prev';	
	var myVar;
	var currentSlide;
	/*** FUNCTION CALLING 
	/****************************************/ 
	addAnimation(); // ANIMATION FUNCTION
	createOrderListBullet(); // CREATING BULLET LIST
	intializeSlider();
	
	$('body').delegate($custom_ol_li, 'click', function() {
		clearIntervalFn();
		$clickElmentIndex=($(this).index());		
		pushTo($clickElmentIndex);
		return false;
	});
	
	$(document).keydown(function(keyId) {
		switch(keyId.which) {
			case 37: // Previous : LEFT
				clearIntervalFn();
				pushPrev();		
				return false;			
		        break;
			case 39: // Next : RIGHT
				clearIntervalFn();
				pushNext();				
				return false;
				break;
			case 40: // Previous : DOWN
				clearIntervalFn();
				pushPrev();		
				return false;			
		        break;
			case 38: // Next : UP
				clearIntervalFn();
				pushNext();				
				return false;
				break;				
		}
	});
	$('body').delegate($next, 'click', function() {		
		clearIntervalFn();
		pushNext();				
		return false;
	});

	$('body').delegate($prev, 'click', function() {		
		clearIntervalFn();
		pushPrev();		
		return false;
	});
	
	function updateOrderlist()
	{
		$($custom_ol_li).removeClass($active);
		currentSlide=$($custom_slider).find('ul li.'+$active).index();
		$($custom_ol_li).eq(currentSlide).addClass($active);
	}
	function intializeSlider()
	{
		$("ul li." + $active).siblings().hide();	
		myVar = setInterval(function(){ pushNext() }, 5000);		
		$($custom_slider).find('li.active').addClass($animation_name); // ANIMATION ADDED 
		updateOrderlist();
	}
	function addAnimation()
	{
		$($custom_slider).find('ul li').each(function(){
			$(this).addClass('animated');
		});
	}	
	function createOrderListBullet()
	{
		$tempContent='<ol>';
		$tempCounter=0;	
		$($custom_slider).find('ul li').each(function(){			
			$tempCounter++;
			$tempContent+='<li>'+ $tempCounter+'</li>';			
		});
		$($custom_slider).append($tempContent);
		$tempContent+='</ol>';	
	}
	function pushTo($clickElementIndex)
	{
		$("ul li." + $active_with_animation).hide().removeClass($active_with_animation_cls);
		$($custom_slider_li).eq($clickElementIndex).fadeIn().addClass($active_with_animation_cls);
		updateOrderlist();
		return false;
	}
	function pushPrev($e)
	{	
		if($("ul li." + $active).is(':first-child'))
		{					
			$($li_last_child).fadeIn().addClass($active_with_animation_cls);
			$($li_first_child).hide().removeClass($active_with_animation_cls);
		}	
		else 
		{
			$($custom_li_active).prev().fadeIn().addClass($active_with_animation_cls);
			$($custom_li_active).next().hide().removeClass($active_with_animation_cls);
		}		
		updateOrderlist();
		$e.preventDefault();
		return false;
	}
	function pushNext()
	{
		if($($custom_li_active).is(':last-child'))
		{		
			$($li_first_child).fadeIn().addClass($active_with_animation_cls);
			$($li_last_child).hide().removeClass($active_with_animation_cls);
		}		
		else 
		{
			$($custom_li_active).next().fadeIn().addClass($active_with_animation_cls)
			$($custom_li_active).prev().hide().removeClass($active_with_animation_cls);
		}
		updateOrderlist();
		return false;
	}
	function clearIntervalFn() {
		clearInterval(myVar);		
		myVar=setInterval(function(){ pushNext(); }, 5000);
	}
});
