let url = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const btn = document.querySelector(".submit");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let conversion = document.querySelector(".conversion i");
// let result=fetch(url); 
// console.log(result); 
const dropdowns = document.querySelectorAll(".dropdown select");
for (select of dropdowns) {
    for (key in countryList) {
        let createopt = document.createElement("option");
        createopt.innerText = key;
        createopt.value = key;
        if (select.name === "from" && key === "USD") {
            createopt.selected = "selected";
        }
        if (select.name === "to" && key === "INR") {
            createopt.selected = "selected";
        }
        select.append(createopt);
    }
    select.addEventListener("change", (evt) => {
        // console.log(select); 
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    // console.log(element.value); 
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // this is not done bcz it will change for that particular flag only 
    // in both case: - 
    // let img=document.querySelector(".dropdown .from img"); 
    let img = element.parentElement.parentElement.querySelector("img");
    img.src = newsrc;
};
// console.log(btn.innerText); 
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(fromcurr.value, tocurr.value);
    if (amtval === "" || amtval < 0) {
        amtval = 1;
        amount.value = "1";
    }
    const newurl = `${url}${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(newurl);
    let data = await response.json();
    let temp1 = `${fromcurr.value.toLowerCase()}`;
    let temp2 = `${tocurr.value.toLowerCase()}`;
    console.log(temp1, temp2);
    let rate = data[temp1][temp2];
    console.log(rate);


    let finalresult = amtval * rate;
    console.log(finalresult);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalresult} ${tocurr.value}`;
    console.log(msg);

    conversion.addEventListener("click", (evt) => {
        // console.log("inside conversion", evt); 
        // console.log(fromcurr, tocurr); 
        let temp = fromcurr.value;
        fromcurr.value = tocurr.value;
        tocurr.value = temp;
        updateFlag(fromcurr);
        updateFlag(tocurr);
        // console.log(temp, temp.value); 
    });
})
