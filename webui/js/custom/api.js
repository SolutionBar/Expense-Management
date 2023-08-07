window.site_url = 'https://solutionbar.github.io/Expense-Management/';
// window.site_url = 'http://127.0.0.1:5501/';
window.api_url = 'https://expenseapi-lza8.onrender.com/';

$(document).ready(function(){

    $('#login-form').validate({
	    rules: {
	        "username": { required: true },
			"password": { required: true },
	    },
	    messages: {
	        "username": { required: '' },
			"password": { required: '' },
	    },
        submitHandler: function(form) {
            $('#login-form button[type="submit"]').prop('disabled', true);
            checkUser(form);
        }
    });
      
    $(document).off('click','#sendPasscode').on('click','#sendPasscode',function(){
        if($('#userName').val() == ''){
            alert('Please enter username');
        } else {
            if(validateUserName($('#userName').val()) != 'true'){
                alert('Sorry User Not Found');
            }
        }
    })

})

window.checkUser = function(form) {

    $.ajax({
        url: api_url+'userLogin',
        method: 'POST',
        data: $(form).serialize(),
        crossDomain: true,
        success: function(response) {
			localStorage.setItem('user_id', response.data.user_id);
			window.location.href = site_url+'webui/html/expense.html';
        },
        error: function(xhr, status, error) {
			// Handle login error
			$('#login-form button[type="submit"]').prop('disabled', false);
			$('#password-error').text('Invalid username or password');
        }
    });
}

var $validateExpenseItem;
window.addExpenseItemValidation = function() {
	$validateExpenseItem = $("#expense_item_form")
	$validateExpenseItem.validate({
	    errorPlacement: function errorPlacement(error, element) {
	        $(element).parents(".form-group").append(error.addClass("invalid-feedback small d-block"))
	    },
	    highlight: function(element) {
	        $(element).addClass("is-invalid");
	    },
	    unhighlight: function(element) {
	        $(element).removeClass("is-invalid");
	    },
	    rules: {
	        "inputMerchant": { required: true },
			"inputInvoice": { required: true },
			"inputDate": { required: true },
			"inputAmount": { required: true },
	        "inputCategory": { required: true },
	        // "inputTaxes": { required: true }
	    },
	    messages: {
	        "inputMerchant": { required: '' },
			"inputInvoice": { required: '' },
			"inputDate": { required: '' },
			"inputAmount": { required: '' },
	        "inputCategory": { required: '' },
	        // "inputTaxes": { required: '' }
	    }
	});
}