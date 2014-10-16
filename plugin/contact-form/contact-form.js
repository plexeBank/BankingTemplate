/******************************************************************************/
/******************************************************************************/

function submitContactForm()
{
	blockForm('contact-form','block');
	$.post('plugin/contact-form/contact-form.php',$('#contact-form').serialize(),submitContactFormResponse,'json');
}

/******************************************************************************/

function submitContactFormResponse(response)
{
	blockForm('contact-form','unblock');
	$('#contact-form-name,#contact-form-mail,#contact-form-website,#contact-form-message,#contact-form-submit').qtip('destroy');

	var tPosition=
	{
		'contact-form-name'		: {'my':'bottom center','at':'top center'},
		'contact-form-mail'		: {'my':'bottom center','at':'top center'},
		'contact-form-website'	: {'my':'bottom center','at':'top center'},
		'contact-form-message'	: {'my':'top center','at':'bottom center'},
		'contact-form-submit'	: {'my':'bottom center','at':'top center'}
	};

	var error=false;

	if(typeof(response.info)!='undefined')
	{	
		if(response.info.length)
		{	
			for(var key in response.info)
			{
				error=error || response.error;
		
				var id=response.info[key].fieldId;

				$('#'+response.info[key].fieldId).parents('li:first').qtip(
				{
					show		:	{ target: jQuery(this) },
					style		:	{ classes:(response.error==1 ? 'qtip-error' : 'qtip-success')},
					content		: 	{ text:response.info[key].message },
					position	: 	{ my:tPosition[id]['my'],at:tPosition[id]['at'] }
				}).qtip('show');	
			}
		}
	}

	if(!error) 
	{
		$('#contact-form-name,#contact-form-mail,#contact-form-website,#contact-form-message').val('').blur();
		window.setTimeout(function() { $('#contact-form-send').qtip('destroy'); },2000);
	}
}

/******************************************************************************/
/******************************************************************************/