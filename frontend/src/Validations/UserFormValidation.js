function UserFormValidation(newUser) {
    var errorMessages = {};
    var formIsValid = true;
    var passwordPattern = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,20}$/);
    var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!newUser['name'] || !newUser['lastName'] || !newUser['password'] ||
        !newUser['passConfirmation'] || !newUser['email']) {
        formIsValid = false;
        errorMessages['emptyField'] = 'Field with * are required. They cannot be empty.'
    }

    if (typeof newUser['name'] !== 'undefined') {
        if (newUser['name'].length > 20) {
            formIsValid = false;
            errorMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (typeof newUser['lastName'] !== 'undefined') {
        if (newUser['lastName'].length > 20) {
            formIsValid = false;
            errorMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    if (typeof newUser['email'] !== 'undefined') {
        if (!emailPattern.test(newUser['email'])) {
            formIsValid = false;
            errorMessages['email'] = 'Please enter valid email address.';
        }
    }

    if (typeof newUser['password'] !== 'undefined' && typeof newUser['passConfirmation'] !== 'undefined') {
        if (newUser['password'] !== newUser['passConfirmation']) {
            formIsValid = false;
            errorMessages['password'] = 'Passwords do not match';
        } else {
            if (!passwordPattern.test(newUser['password'])) {
                formIsValid = false;
                errorMessages['password'] = 'Password must have 8-20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
            }
        }
    }

    return { errorMessages, formIsValid };
}

export default UserFormValidation;