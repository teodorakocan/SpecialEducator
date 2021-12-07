function ChildValidation(newChild) {
    var errorValidationMessages = {};
    var isValid = true;
    var onlyNumbers = new RegExp('[0-9]');
    
    if (!newChild['name'] || !newChild['lastName'] || !newChild['dateOfBirth'] || !newChild['height'] ||
    !newChild['weight'] || !newChild['category'] || !newChild['degreeOfDisability']) {
        isValid = false;
        errorValidationMessages['emptyField'] = 'Field with * are required. They cannot be empty.'
    }

    if (newChild['name']) {
        if (newChild['name'].length > 20) {
            isValid = false;
            errorValidationMessages['name'] = 'Name cannot contain more than 20 characters.'
        }
    }

    if (newChild['lastName']) {
        if (newChild['lastName'].length > 20) {
            isValid = false;
            errorValidationMessages['lastName'] = 'Last name cannot contain more than 20 characters.'
        }
    }

    if (newChild['height']) {
        if (!onlyNumbers.test(newChild['height'])) {
            isValid = false;
                errorValidationMessages['height'] = 'Height field must contain only numbers.';
            }
    }

    if (newChild['weight']) {
        if (!onlyNumbers.test(newChild['weight'])) {
            isValid = false;
                errorValidationMessages['weight'] = 'Weight field must contain only numbers.';
            }
    }

    return { errorValidationMessages, isValid };
}

export default ChildValidation;