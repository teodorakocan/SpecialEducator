function CenterFormValidation(newCenter) {
    var errorMessages = {};
    var formIsValid = true;
    var passwordPattern = new RegExp('[0-9]');
    var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!newCenter['name'] || !newCenter['address'] || !newCenter['addressNumber'] ||
        !newCenter['city'] || !newCenter['state'] || !newCenter['email']) {
        formIsValid = false;
        errorMessages['emptyField'] = 'Field with * are required. They cannot be empty.';
    }

    if (typeof newCenter['name'] !== 'undefined') {
        if (newCenter['name'].length > 30) {
            formIsValid = false;
            errorMessages['name'] = 'Name cannot contain more than 30 characters.'
        }
    }

    if (typeof newCenter['address'] !== 'undefined') {
        if (newCenter['address'].length > 30) {
            formIsValid = false;
            errorMessages['address'] = 'Address cannot contain more than 30 characters.'
        }
    }

    if (typeof newCenter['city'] !== 'undefined') {
        if (newCenter['city'].length > 20) {
            formIsValid = false;
            errorMessages['city'] = 'City cannot contain more than 20 characters.'
        }
    }

    if (typeof newCenter['addressNumber'] !== 'undefined') {
        if (newCenter['addressNumber'].length > 5) {
            formIsValid = false;
            errorMessages['addressNumber'] = 'Address number cannot contain more than 5 characters.'
        }
    }

    if (typeof newCenter['email'] !== 'undefined') {
        if (!emailPattern.test(newCenter['email'])) {
            formIsValid = false;
            errorMessages['email'] = 'Please enter valid email address.';
        }
    }

    if (newCenter['phoneNumber']) {
        if (!newCenter['areaCode']) {
            formIsValid = false;
            errorMessages['areaCode'] = 'You must pick area code for your phone number.'
        } else {
            if (!passwordPattern.test(newCenter['phoneNumber'])) {
                formIsValid = false;
                errorMessages['phoneNumber'] = 'Phone number must contain only numbers.';
            }
        }
    }

    return { errorMessages, formIsValid };
}

export default CenterFormValidation;