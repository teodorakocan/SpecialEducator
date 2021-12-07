function PasswordValidation(password) {
    var errorValidationMessages = {};
    var isValid = true;
    var passwordPattern = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,20}$/);
    
    if (!password['oldPassword'] || !password['newPassword'] || !password['passConfirmation']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'All fields are required.'
    }

    if (password['newPassword'] && password['passConfirmation']) {
        if (password['newPassword'] !== password['passConfirmation']) {
            isValid = false;
            errorValidationMessages['password'] = 'Passwords do not match';
        } else {
            if (!passwordPattern.test(password['newPassword'])) {
                isValid = false;
                errorValidationMessages['password'] = 'Password must have 8-20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
            }
        }
    }
    return { errorValidationMessages, isValid };
}

export default PasswordValidation;