const updatePreviewMediaSrc = event => document.querySelector('.img-zoom-container img').src = event?.target?.src

const updateCart =  _=> {
    const cartCounter = document.querySelector('.cart-count');

    return cartCounter.textContent = parseInt(cartCounter.textContent, 10) + 1;
}

const updateLike = _=> {
    const counter = document?.querySelector('[data-like] .likes');

    document?.querySelector('[data-like]')?.setAttribute('disabled', true);

    return counter.textContent = parseInt(counter.textContent, 10) + 1;
}

const updatePrice = event => {
    const URL_QUERIES = getUrlQueryParams();

    const SIZE_TO_PRIZE = {
        'XL': 16,
        'L': 14,
        'M': 12,
        'S': 10
    };

    return document.querySelector('.price span').textContent = SIZE_TO_PRIZE[event?.target?.textContent || URL_QUERIES['size']];
}

const updateShipmentPrice = () => {
    const URL_QUERIES = getUrlQueryParams();
    const SHIPMENT_TO_PRICE = {
        'extra': 4,
        'premium': 9
    };

    if(URL_QUERIES['shipment'] === 'free') {

        return document.querySelector('.shipment strong').innerHTML = URL_QUERIES['shipment'];
    };

    return document.querySelector('.shipment span').textContent = SHIPMENT_TO_PRICE[URL_QUERIES['shipment']];
}

const parseFloatPrice = price => parseFloat(price.replace(' €', '').replace(',', '.'));

const getTotalPrice = () => {
    const shipmentInt = parseFloatPrice(document.querySelector('.shipment strong').textContent);
    const priceInt = parseFloatPrice(document.querySelector('.price strong').textContent);

    return (priceInt + shipmentInt).toFixed(2);
}

const updateTotal = () => document.querySelector('.toal span').textContent = getTotalPrice();

const updateShipmentTimes = event => {
    const URL_QUERIES = getUrlQueryParams();
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
    const date = new Date();
    const daysToAdd = PARSE_EXTRA_DAYS[event?.target?.value | URL_QUERIES['shipment']];

    document.querySelector('.date-holder').removeAttribute('style');
    document.querySelector('.date1').textContent = `${PARSE_WEEKDAY[date.getDay()]} ${date.getDate()} of ${PARSE_MONTH[date.getMonth()]}`;
    document.querySelector('.date2').textContent = `${PARSE_WEEKDAY[date.getDay() + daysToAdd]} ${date.getDate() + daysToAdd} of ${PARSE_MONTH[date.getMonth()]}`;
}

const getUrlQueryParams = () => {
    const queryParamsObject = {};
    const queryParamsArray = window.location.search.split(/\?|&/);
    const mapUrlQueryToObject = (key, value) => queryParamsObject[key] = value;

    queryParamsArray.forEach(keyValuePair => {
        if (keyValuePair != "") {
            let keyValueSplit = keyValuePair.split('=');

            mapUrlQueryToObject(keyValueSplit[0], keyValueSplit[1]);
        }
    })

    return queryParamsObject;
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
});

(setHiddenFormInputs = () => {
    const queryParams = getUrlQueryParams();

    document?.querySelectorAll('form input[hidden]').forEach(input => {
        input?.setAttribute('value', queryParams[input.name]);
    });
})();

(updateConfirmationInfo = () => {
    if (window.location.pathname.indexOf('confirm') != -1) {
        const queryParams = getUrlQueryParams();
        let img = document.querySelector('img');

        img.src = img?.src.replace('red', queryParams['color']);
        document.querySelector('.size').textContent = queryParams['size'];
        document.querySelector('p .color').textContent = queryParams['color'];
        updateShipmentTimes();
        updatePrice();
        updateShipmentPrice();
        updateTotal();
    }
})();