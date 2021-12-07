function UserDataChangeValidation(user) {
    var errorValidationMessages = {};
    var isValid = true;
    var emailPattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!user['name'] || !user['lastName'] || !user['email']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'All fields are required. They cannot be empty.'
    }

    if (user['name']) {
        if (user['name'].length > 20) {
            isValid = false;
            errorValidationMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (user['lastName']) {
        if (user['lastName'].length > 20) {
            isValid = false;
            errorValidationMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    if (typeof user['email'] !== 'undefined') {
        if (!emailPattern.test(user['email'])) {
            isValid = false;
            errorValidationMessages['email'] = 'Please enter valid email address.';
        }
    }

    return { errorValidationMessages, isValid };
}

export default UserDataChangeValidation;