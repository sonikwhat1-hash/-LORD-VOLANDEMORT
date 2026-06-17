
supportInput.addEventListener('input', function (e) {
    let value = e.target.value;

    const errorDiv = document.getElementById('support-error');
    if (value === '') {
        errorDiv.textContent = '';
        e.target.classList.remove('valid', 'error');
    } else if (value.length > 1024) {
        errorDiv.textContent = `Максимум 1024 символа (сейчас: ${value.length})`;
        e.target.classList.remove('valid');
        e.target.classList.add('error');
    } else if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/|"]/.test(value)) {
        errorDiv.textContent = 'Специальные символы не допускаются';
        e.target.classList.remove('valid');
        e.target.classList.add('error');
    } else if (value.length < 50) {
       
        errorDiv.textContent = `Рекомендуется минимум 50 символов (сейчас: ${value.length})`;
        e.target.classList.remove('error');
        e.target.classList.add('valid');
    } else {
        errorDiv.textContent = '';
        e.target.classList.remove('error');
        e.target.classList.add('valid');
    }

    checkFormValidity();
});

function checkFormValidity() {
    const phoneValid = validatePhone(phoneInput.value);
    const contactValid = contactInput.value.length > 0 &&
        contactInput.value.length <= 25 &&
        /^[а-яa-z]+$/.test(contactInput.value);

    const supportValue = supportInput.value;
    let supportValid = true;

    if (supportValue !== '') {
        supportValid = supportValue.length <= 1024 &&
            !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/|"]/.test(supportValue);
    }

   
    const errors = [];

    if (!phoneValid) {
        if (phoneInput.value === '') {
            errors.push('❌ Не заполнено поле "Номер телефона"');
        } else {
            errors.push('❌ Неверный формат телефона (нужно: +11-15 цифр)');
        }
    }

    if (!contactValid) {
        if (contactInput.value === '') {
            errors.push('❌ Не заполнено поле "Контактное лицо"');
        } else if (contactInput.value.length > 25) {
            errors.push('❌ Превышен лимит символов в поле "Контактное лицо" (макс. 25)');
        } else if (!/^[а-яa-z]+$/.test(contactInput.value)) {
            errors.push('❌ Поле "Контактное лицо" должно содержать только буквы нижнего регистра');
        }
    }

    if (!supportValid && supportValue !== '') {
        if (supportValue.length > 1024) {
            errors.push(`❌ Превышен лимит символов в поле "Поддержка Дамблдора" (макс. 1024)`);
        } else if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/|"]/.test(supportValue)) {
            errors.push('❌ Поле "Поддержка Дамблдора" содержит недопустимые символы');
        }
    }

    const validationMessages = document.getElementById('validation-messages');
    if (errors.length > 0) {
        validationMessages.innerHTML = '<div style="margin-bottom: 10px; color: #ff4444; font-weight: bold;">Кнопка "ДАЛЕЕ" не работает по следующим причинам:</div>' +
            errors.map(err => `<div>${err}</div>`).join('');
    } else {
        validationMessages.innerHTML = '';
    }

    if (phoneValid && contactValid && supportValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}