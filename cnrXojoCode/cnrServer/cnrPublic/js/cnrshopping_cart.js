/*
	BYU Idaho 2019
	CS213 Web Engineering I
	Carlos N Reina
*/

/* ===== assign11.js ===== */

/* *************** initialize *************** */

var item_0_object = document.getElementById("check_0");
var item_1_object = document.getElementById("check_1");
var item_2_object = document.getElementById("check_2");
var item_3_object = document.getElementById("check_3");
var item_4_object = document.getElementById("check_4");

var form_object = document.getElementById("main_form");
var first_name_object = document.getElementById("first_name");
var last_name_object = document.getElementById("last_name");
var address_object = document.getElementById("address");
var phone_object = document.getElementById("phone");
var card_type_object_1 = document.getElementById("card_1");
var card_type_object_2 = document.getElementById("card_2");
var card_type_object_3 = document.getElementById("card_3");
var card_type_object_4 = document.getElementById("card_4");
var card_number_object = document.getElementById("credit_card");
var card_expiration_object = document.getElementById("exp_date");
var total_object = document.getElementById("total");
var validate_button_object = document.getElementById("validate");
var reset_button_object = document.getElementById("reset");
var selected_items_object = document.getElementById("selectedItems");

var first_name_message_object = document.getElementById("first_name_message");
var last_name_message_object = document.getElementById("last_name_message");
var address_message_object = document.getElementById("address_name_message");
var phone_message_object = document.getElementById("phone_message");
var card_type_message_object = document.getElementById("credit_card_type_message");
var card_number_message_object = document.getElementById("credit_card_number_message");
var card_expiration_message_object = document.getElementById("credit_card_dxpiration_date_message");

var first_name;
var last_name;
var address;
var phone;
var card_type;
var card_number;
var card_expiration;
var items_selected;
var total = 0.0;
var item_0_name = "Beautiful suburban home";
var item_1_name = "Delivery truck";
var item_2_name = "Smartphone";
var item_3_name = "Laptop";
var item_4_name = "Printer";
var item_0_price = 180000;
var item_1_price = 75000;
var item_2_price = 1150;
var item_3_price = 2150;
var item_4_price = 230;

var first_name_filled;
var last_name_filled;
var address_filled;
var phone_filled;
var card_type_filled;
var card_number_filled;
var card_expiration_filled;

window.onload = function() {
    reset_form();
    console.log("initializing");

    item_0_object.onclick = validate_checked_item_0;
    item_1_object.onclick = validate_checked_item_1;
    item_2_object.onclick = validate_checked_item_2;
    item_3_object.onclick = validate_checked_item_3;
    item_4_object.onclick = validate_checked_item_4;

    first_name_object.onchange = validate_first_name;
    last_name_object.onchange = validate_last_name;
    address_object.onchange = validate_address;
    phone_object.onchange = validate_phone;
    card_type_object_1.onchange = validate_card_type;
    card_type_object_2.onchange = validate_card_type;
    card_type_object_3.onchange = validate_card_type;
    card_type_object_4.onchange = validate_card_type;
    card_number_object.onchange = validate_card_number;
    card_expiration_object.onchange = validate_card_expiration;

    document.getElementById("validate").onclick = submitForm;
    document.getElementById("reset").onclick = reset_form;
};

/* ************* validate input ************* */

function validate_checked_item_0() {
    console.log("validate_checked_items");
    if (item_0_object.checked) {
        total = total + item_0_price;
    } else {
        total = total - item_0_price;
    }
    if (total < 0) {
        total = 0.0;
    }
    display_result();
};

function validate_checked_item_1() {
    console.log("validate_checked_items");
    if (item_1_object.checked) {
        total = total + item_1_price;
    } else {
        total = total - item_1_price;
    }
    if (total < 0) {
        total = 0.0;
    }
    display_result();
};

function validate_checked_item_2() {
    console.log("validate_checked_items");
    if (item_2_object.checked) {
        total = total + item_2_price;
    } else {
        total = total - item_2_price;
    }
    if (total < 0) {
        total = 0.0;
    }
    display_result();
};

function validate_checked_item_3() {
    console.log("validate_checked_items");
    if (item_3_object.checked) {
        total = total + item_3_price;
    } else {
        total = total - item_3_price;
    }
    if (total < 0) {
        total = 0.0;
    }
    display_result();
};

function validate_checked_item_4() {
    console.log("validate_checked_items");
    if (item_4_object.checked) {
        total = total + item_4_price;
    } else {
        total = total - item_4_price;
    }
    if (total < 0) {
        total = 0.0;
    }
    display_result();
};

function validate_first_name() {
    console.log("validate_first_name");

    if (first_name_object == null ||
        first_name_object.value == "") {

        first_name_filled = false;
        first_name_object.value = "";
        first_name_object.focus();
        first_name_object.style.border = "3px solid red";
        first_name_message_object.style.display = "block";

    } else {

        first_name_filled = true;
        first_name_object.style.border = "0";
        first_name_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {

            pay();
        }
    }
};

function validate_last_name() {
    console.log("validate_last_name");

    if (last_name_object == null ||
        last_name_object.value == "") {

        last_name_filled = false;
        last_name_object.value = "";
        last_name_object.focus();
        last_name_object.style.border = "3px solid red";
        last_name_message_object.style.display = "block";

    } else {

        last_name_filled = true;
        last_name_object.style.border = "0";
        last_name_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {

            pay();
        }
    }
};

function validate_address() {
    console.log("validate_address");

    if (address_object == null ||
        address_object.value == "") {

        address_filled = false;
        address_object.value = "";
        address_object.focus();
        address_object.style.border = "3px solid red";
        address_message_object.style.display = "block";

    } else {

        address_filled = true;
        address_object.style.border = "0";
        address_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {

            pay();
        }
    }
};

function validate_phone() {
    console.log("validate_phone");

    if (phone_object == null ||
        phone_object.value == "" ||
        !isValidPhoneNumber()) {

        phone_filled = false;
        phone_object.value = "";
        phone_object.focus();
        phone_object.style.border = "3px solid red";
        phone_message_object.style.display = "block";
    } else {
        phone_filled = true;
        phone_object.style.border = "0";
        phone_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {

            pay();
        }
    }
};

function validate_card_type() {
    console.log("validate_card_type");
    if (!card_type_object_1.checked &&
        !card_type_object_2.checked &&
        !card_type_object_3.checked &&
        !card_type_object_4.checked) {

        card_type_filled = false;
        card_type_object_1.value = "";
        card_type_object_1.focus();
        card_type_message_object.style.display = "block";

    } else {
        card_type_filled = true;
        card_type_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {

            pay();
        }
    }
};

function validate_card_number() {
    console.log("validate_card_number");

    if (card_number_object == null ||
        card_number_object.value == "" ||
        !isValidCreditCardNumber()) {

        card_number_filled = false;
        card_number_object.value = "";
        card_number_object.focus();
        card_number_object.style.border = "3px solid red";
        card_number_message_object.style.display = "block";

    } else {
        card_number_filled = true;
        card_number_object.style.border = "0";
        card_number_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {

            pay();
        }
    }
};

function validate_card_expiration() {
    console.log("validate_card_expiration");

    if (card_expiration_object == null ||
        card_expiration_object.value == "" ||
        !isValidExpirationDate()) {

        card_expiration_filled = false;
        card_expiration_object.value = "";
        card_expiration_object.focus();
        card_expiration_object.style.border = "3px solid red";
        card_expiration_message_object.style.display = "block";

    } else {
        card_expiration_filled = true;
        card_expiration_object.style.border = "0";
        card_expiration_message_object.style.display = "none";

        if (first_name_filled &&
            last_name_filled &&
            address_filled &&
            phone_filled &&
            card_type_filled &&
            card_number_filled &&
            card_expiration_filled) {
            pay();
        }
    }
};

function isValidPhoneNumber() {
    console.log("isValidPhoneNumber");

    const phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/img;
    return phone_regex.test(phone_object.value);
};

function isValidCreditCardNumber() {
    const apple_regex = /^(?:5[1-5][0-9]{14})$/;
    const visa_regex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercard_regex = /^(?:5[1-5][0-9]{14})$/;
    const american_express_regex = /^(?:3[47][0-9]{13})$/;
    const card_number = card_number_object.value;

    if (apple_regex.test(card_number)) {
        return true;
    } else if (visa_regex.test(card_number)) {
        return true;
    } else if (mastercard_regex.test(card_number)) {
        return true;
    } else if (american_express_regex.test(card_number)) {
        return true;
    } else {
        return false;
    }
};

function isValidExpirationDate() {
    console.log("isValidExpirationDate");

    const expiration_date_regex = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/;
    return expiration_date_regex.test(card_expiration_object.value);
};

/* **************** pay **************** */
function pay() {
    console.log("pay");

    if (first_name_filled &&
        last_name_filled &&
        address_filled &&
        phone_filled &&
        card_type_filled &&
        card_number_filled &&
        card_expiration_filled) {

        first_name = first_name_object.value;
        last_name = last_name_object.value;
        address = address_object.value;
        phone = phone_object.value;
        card_type = card_type_object_1.value;
        card_number = card_number_object.value;
        card_expiration = card_expiration_object.value;

    } else {
        if (!first_name_filled) {
            first_name_message_object.style.display = "block";
            first_name_object.focus();
        } else if (!last_name_filled) {
            last_name_message_object.style.display = "block";
            last_name_object.focus();
        } else if (!address_filled) {
            address_message_object.style.display = "block";
            address_object.focus();
        } else if (!phone_filled) {
            phone_message_object.style.display = "block";
            phone_object.focus();
        } else if (!card_type_filled) {
            card_type_message_object.style.display = "block";
            card_type_object_1.focus();
        } else if (!card_number_filled) {
            card_number_message_object.style.display = "block";
            card_number_object.focus();
        } else if (!card_expiration_filled) {
            card_expiration_message_object.style.display = "block";
            card_expiration_object.focus();
        } else {
            first_name_object.focus();
        }
    }

};

function submitForm() {
    console.log("submitForm");

    if (first_name_filled &&
        last_name_filled &&
        address_filled &&
        phone_filled &&
        card_type_filled &&
        card_number_filled &&
        card_expiration_filled &&
        total > 0) {

        first_name = first_name_object.value;
        last_name = last_name_object.value;
        address = address_object.value;
        phone = phone_object.value;
        card_type = card_type_object_1.value;
        card_number = card_number_object.value;
        card_expiration = card_expiration_object.value;

        // submit to server
        form_object.submit();

    } else {

        console.log("Inclomplete data (no submit)");

        if (!first_name_filled) {
            first_name_message_object.style.display = "block";
            first_name_object.focus();
        } else if (!last_name_filled) {
            last_name_message_object.style.display = "block";
            last_name_object.focus();
        } else if (!address_filled) {
            address_message_object.style.display = "block";
            address_object.focus();
        } else if (!phone_filled) {
            phone_message_object.style.display = "block";
            phone_object.focus();
        } else if (!card_type_filled) {
            card_type_message_object.style.display = "block";
            card_type_object_1.focus();
        } else if (!card_number_filled) {
            card_number_message_object.style.display = "block";
            card_number_object.focus();
        } else if (!card_expiration_filled) {
            card_expiration_message_object.style.display = "block";
            card_expiration_object.focus();
        } else if (total <= 0) {
            item_0_object.focus();
        } else {
            first_name_object.focus();
        }
    }
};

/* *************** display *************** */
function display_result() {
    console.log("display_result");

    // display total amount to pay
    total_object.value = total;

    // save selected items
    var selectedItemsList = "";
    selected_items_object.value = "";
    if (item_0_object.checked) {
        selectedItemsList += item_0_name + " - $" + item_0_price + "\n";
    }
    if (item_1_object.checked) {
        selectedItemsList += item_1_name + " - $" + item_1_price + "\n";
    }
    if (item_2_object.checked) {
        selectedItemsList += item_2_name + " - $" + item_2_price + "\n";
    }
    if (item_3_object.checked) {
        selectedItemsList += item_3_name + " - $" + item_3_price + "\n";
    }
    if (item_4_object.checked) {
        selectedItemsList += item_4_name + " - $" + item_4_price + "\n";
    }
    selected_items_object.value = selectedItemsList;
};

/* *************** clear form *************** */
function reset_form() {
    console.log("reset_form");

    first_name_filled = false;
    last_name_filled = false;
    address_filled = false;
    phone_filled = false;
    card_type_filled = false;
    card_number_filled = false;
    card_expiration_filled = false;
    total = 0.0;

    first_name_object.style.border = "0";
    first_name_message_object.style.display = "none";
    last_name_object.style.border = "0";
    last_name_message_object.style.display = "none";
    address_object.style.border = "0";
    address_message_object.style.display = "none";
    phone_object.style.border = "0";
    phone_message_object.style.display = "none";
    card_type_object_1.style.border = "0";
    card_type_message_object.style.display = "none";
    card_number_object.style.border = "0";
    card_number_message_object.style.display = "none";
    card_expiration_object.style.border = "0";
    card_expiration_message_object.style.display = "none";

    item_0_object.checked = false;
    item_1_object.checked = false;
    item_2_object.checked = false;
    item_3_object.checked = false;
    item_4_object.checked = false;
    card_type_object_1.checked = false;
    card_type_object_2.checked = false;
    card_type_object_3.checked = false;
    card_type_object_4.checked = false;

    total_object.value = total;

    first_name_object.focus();
};