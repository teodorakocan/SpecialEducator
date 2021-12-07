function NewUserValidation(newUser) {
    var errorValidationMessages = {};
    var isValid = true;
    var passwordPattern = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,20}$/);
    var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!newUser['name'] || !newUser['lastName'] || !newUser['password'] ||
        !newUser['role'] || !newUser['email']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'Field with * are required. They cannot be empty.'
    }

    if (newUser['name']) {
        if (newUser['name'].length > 20) {
            isValid = false;
            errorValidationMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (newUser['lastName']) {
        if (newUser['lastName'].length > 20) {
            isValid = false;
            errorValidationMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    if (newUser['email']) {
        if (!emailPattern.test(newUser['email'])) {
            isValid = false;
            errorValidationMessages['email'] = 'Please enter valid email address.';
        }
    }

    if (newUser['password']) {
        if (!passwordPattern.test(newUser['password'])) {
            isValid = false;
            errorValidationMessages['password'] = 'Password must have 8-20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
        }
    }

    return { errorValidationMessages, isValid };
}

export default NewUserValidation;