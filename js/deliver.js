var choices = []

$('#checkBoxDiv').change(function() {

    var values = 0.00;
    $('#checkBoxDiv :checked').each(function() {
        values = parseFloat(($(this).val()));
    });
    choices.push(parseFloat(values));
});

function getSum(total, num) {
    return total + num;
}

function delivery_cost(item) {
    document.getElementById('demo').innerHTML = choices.reduce(getSum);
}

function couponAdd() {
    let coupon = getElementById('coupondisc').value;
    document.getElementById('display').innerHTML = ((parseFloat(coupon) + choices.reduce(getSum)));
}