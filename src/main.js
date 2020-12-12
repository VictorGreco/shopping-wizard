const updatePreviewMediaSrc = event => {

    return document.querySelector('.img-zoom-container img').src = event.target.src;
}

const updateCart = event => {
    const cartCounter = document.querySelector('.cart-count');

    return cartCounter.textContent = parseInt(cartCounter.textContent, 10) + 1;
}

const updateLike = event => {
    const counter = document.querySelector('[data-like] .likes');

    document.querySelector('[data-like]').setAttribute('disabled', true);

    return counter.textContent = parseInt(counter.textContent, 10) + 1;

}

const updatePrice = event => {
    const SIZE_TO_PRIZE = {
        'XL': 16,
        'L': 14,
        'M': 12,
        'S': 10
    };

    return document.querySelector('.price span').textContent = SIZE_TO_PRIZE[event?.target.textContent];
}

const updateShipmentTimes = event => {
    const PARSE_EXTRA_DAYS = {
        'free': 1,
        'extra': 2,
        'premium': 3
    };

    const PARSE_WEEKDAY = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };

    const PARSE_MONTH = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };
    const date1Wrapper = document.querySelector('.date1');
    const date2Wrapper = document.querySelector('.date2');
    const date = new Date()
    const daysToAdd = PARSE_EXTRA_DAYS[event.target.value];
    const date1TextContent = `${PARSE_WEEKDAY[date.getDay()]} ${date.getDate()} of ${PARSE_MONTH[date.getMonth()]}`;
    const date2TextContent = `${PARSE_WEEKDAY[date.getDay() + daysToAdd]} ${date.getDate() + daysToAdd}  of ${PARSE_MONTH[date.getMonth()]}`;

    document.querySelector('.date-holder').removeAttribute('style');

    date1Wrapper.textContent = date1TextContent;
    date2Wrapper.textContent = date2TextContent;
}

const submitHandler = event => {
    event.preventDefault();
    console.log(event);
}

var password = document.getElementById("password")
var confirm_password = document.getElementById("confirm_password");

if (password && confirm_password) {

    const validatePassword = () => password.value != confirm_password.value ?
        confirm_password.setCustomValidity("Passwords Don't Match") :
        confirm_password.setCustomValidity('');

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
}


document.querySelectorAll('.size span')?.forEach(preview => {
    preview.addEventListener('click', updatePrice);
});

document.querySelector('[data-add-cart]')?.addEventListener('click', updateCart);
document.querySelector('[data-like]')?.addEventListener('click', updateLike);


document.querySelectorAll('.product-view')?.forEach(preview => {
    preview.addEventListener('click', updatePreviewMediaSrc);
});

document.querySelectorAll('#shipment-options [type="radio"]')?.forEach(radio => {
    radio.addEventListener('change', updateShipmentTimes);
})

//document.querySelector('[type="submit"]')?.addEventListener('click', submitHandler);