function ParentValidation(newParent) {
    var errorValidationMessages = {};
    var isValid = true;
    var phoneNumberPattern = new RegExp('^[0-9]*$');
    var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var passwordPattern = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,20}$/);
    
    if (!newParent['name'] || !newParent['lastName'] || !newParent['email'] || !newParent['password']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'Field with * are required. They cannot be empty.'
    }

    if (newParent['name']) {
        if (newParent['name'].length > 20) {
            isValid = false;
            errorValidationMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (newParent['lastName']) {
        if (newParent['lastName'].length > 20) {
            isValid = false;
            errorValidationMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    if (newParent['email']) {
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

    if (newParent['password']) {
        if (!passwordPattern.test(newParent['password'])) {
            isValid = false;
            errorValidationMessages['password'] = 'Password must have 8-20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
        }
    }

    return { errorValidationMessages, isValid };
}

export default ParentValidation;