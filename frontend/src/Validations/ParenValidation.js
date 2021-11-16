function ParentValidation(newParent) {
    var errorValidationMessages = {};
    var isValid = true;
    var phoneNumberPattern = new RegExp('[0-9]');
    var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!newParent['name'] || !newParent['lastName'] || !newParent['email']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'Field with * are required. They cannot be empty.'
    }

    if (typeof newParent['name'] !== 'undefined') {
        if (newParent['name'].length > 20) {
            isValid = false;
            errorValidationMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (typeof newParent['lastName'] !== 'undefined') {
        if (newParent['lastName'].length > 20) {
            isValid = false;
            errorValidationMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    if (typeof newParent['email'] !== 'undefined') {
        if (!emailPattern.test(newParent['email'])) {
            isValid = false;
            errorValidationMessages['email'] = 'Please enter valid email address.';
        }
    }

    if (newParent['phoneNumber']) {
        if (!newParent['areaCode']) {
            isValid = false;
            errorValidationMessages['areaCode'] = 'You must pick area code for your phone number.'
        } else {
            if (!phoneNumberPattern.test(newParent['phoneNumber'])) {
                isValid = false;
                errorValidationMessages['phoneNumber'] = 'Phone number must contain only numbers.';
            }
        }
    }

    return { errorValidationMessages, isValid };
}

export default ParentValidation;