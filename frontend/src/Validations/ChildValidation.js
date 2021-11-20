function ChildValidation(newChild) {
    var errorValidationMessages = {};
    var isValid = true;
    
    if (!newChild['name'] || !newChild['lastName'] || !newChild['dateOfBirth']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'Field with * are required. They cannot be empty.'
    }

    if (typeof newChild['name'] !== 'undefined') {
        if (newChild['name'].length > 20) {
            isValid = false;
            errorValidationMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (typeof newChild['lastName'] !== 'undefined') {
        if (newChild['lastName'].length > 20) {
            isValid = false;
            errorValidationMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    return { errorValidationMessages, isValid };
}

export default ChildValidation;