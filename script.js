const countryList = {
    USD:"US",
    NPR:"NP",
    INR:"IN",
    EUR:"EU",
    GBP:"GB",
    AUD:"AU",
    CAD:"CA",
    CNY:"CN",
    JPY:"JP",
    PKR:"PK",
    AED:"AE",
    SAR:"SA",
    BDT:"BD",
    RUB:"RU",
    KRW:"KR",
    BRL:"BR",
    ZAR:"ZA",
    CHF:"CH",
    SGD:"SG",
    THB:"TH",
    MYR:"MY",
    NZD:"NZ",
    HKD:"HK",
    SEK:"SE",
    NOK:"NO",
    DKK:"DK",
    TRY:"TR",
    QAR:"QA",
    OMR:"OM",
    KWD:"KW"
};

const from = document.getElementById("from");
const to = document.getElementById("to");

const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

const amount = document.getElementById("amount");
const msg = document.querySelector(".msg");

const btn = document.getElementById("btn");

// Add Currency Options
for(let code in countryList){

    let option1 = document.createElement("option");
    option1.innerText = code;
    option1.value = code;

    if(code === "USD"){
        option1.selected = "selected";
    }

    from.appendChild(option1);

    let option2 = document.createElement("option");
    option2.innerText = code;
    option2.value = code;

    if(code === "NPR"){
        option2.selected = "selected";
    }

    to.appendChild(option2);
}

// Update Flags
function updateFlag(element,flag){

    let countryCode = countryList[element.value];

    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Convert Currency
async function convertCurrency(){

    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }

    const URL = `https://api.exchangerate-api.com/v4/latest/${from.value}`;

    let response = await fetch(URL);

    let data = await response.json();

    let rate = data.rates[to.value];

    let finalAmount = amtVal * rate;

    msg.innerText =
    `${amtVal} ${from.value} = ${finalAmount.toFixed(2)} ${to.value}`;
}

// Change Flags
from.addEventListener("change",()=>{

    updateFlag(from,fromFlag);

});

to.addEventListener("change",()=>{

    updateFlag(to,toFlag);

});

// Button Click
btn.addEventListener("click",(e)=>{

    e.preventDefault();

    convertCurrency();

});

// Page Load
window.addEventListener("load",()=>{

    convertCurrency();

});