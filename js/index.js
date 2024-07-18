///    <reference types='../@types/jquery'/>
import { search, searchStatus } from "./search.js";
import { chart, chartInstance } from "./chart.js";

// ? =============> Global ===============>
let chartActive = false;
const allData = [];
let searchedData = [];
let chartRaw = '';

// ! =============> When Start ===============>
getData()
search()
// * =============> Events ===============>
$('#searchInput').on('input', function () {
    const searchingVal = $(this).val().toLowerCase();
    searchData(searchingVal)
})


$(document).on('click', 'td button', (e) => {
    const dataId = $(e.target).attr('data-id');
    showChart(dataId)
})

// ! =============> Functions ===============>
function closeChart() {
    $('.chart-container').remove()
    chartActive = false
}
function showChart(dataId) {

    if (chartActive == false) {
        chartRaw = `<section class="chart-container position-fixed">
                    <i id="closeChart" class="fa-brands fa-mixer position-absolute fa-2xl"></i>
                    <canvas id="myChart" ></canvas>
                </section>`


        $('table').after(chartRaw)
        const dynamicCanvaHeight = $('canvas').height();
        $('.chart-container').css({ 'min-height': dynamicCanvaHeight })


        chartActive = true;

    }

    $('#closeChart').on('click', closeChart);




    let totalAmountPerDay = {};
    let dateItem;
    let amountItem;
    let cName = '';
    allData.forEach(item => {
        if (item.customer_id == dataId) {
            const { customerName, date, amount } = item;
            cName = customerName;


            if (!totalAmountPerDay[date]) {
                totalAmountPerDay[date] = 0;
            }
            totalAmountPerDay[date] += amount;
        }


        dateItem = Object.keys(totalAmountPerDay);
        amountItem = Object.values(totalAmountPerDay);
    })


    chart(cName, dateItem, amountItem)
}


let bgActive = false;


function searchData(searchingVal) {
    if (chartInstance) {
        chartInstance.destroy();
        $('.chart-container').remove()
        chartActive = false;
    }
    else {
        $('table').after(chartRaw)
        chartActive = true;

    }

    let searchedCartoona = '';
    searchedData = [];

    allData.forEach(item => {
        let searchedVal = '';

        if (searchStatus == 'byName') {
            searchedVal = item.customerName.toLowerCase().includes(searchingVal)
        }
        else {
            searchedVal = item.amount.toString().includes(searchingVal);
        }

        if (searchedVal) {
            searchedData.push(item);

            const { customerName, customer_id, date, amount } = item

            searchedCartoona += `<tr>
                                    <th scope="row">${customer_id}</th>
                                    <td>${customerName}</td>
                                    <td>${date}</td>
                                    <td>${amount}</td>
                                    <td><button id="displayGraph" data-id='${customer_id}' class="btn btn-outline-dark">Display Graph</button></td>
                                </tr>`

        }


    })

    if (searchedData == false) {
        $('#tBody').html(searchedCartoona);
        if (bgActive == false) {
            $('table').after(`<div class="bg-empty"></div>`);
            bgActive = true;
        }
    }
    else {
        $('.bg-empty').remove()

        $('#tBody').html(searchedCartoona);
        bgActive = false;
    }


}

async function getData() {

    const url = 'http://localhost:3000/data';
    const response = await fetch(url);
    const result = await response.json();

    displayData(result)
}

function displayData(result) {

    let cartoona = ``;

    const customersArray = result.customers;
    const transactionsArray = result.transactions;


    // 
    const customersById = {} // 1:'Ahmed Ali'
    customersArray.forEach(customer => {
        customersById[customer.id] = customer.name
    });


    transactionsArray.forEach((transaction) => {
        const customerName = customersById[transaction.customer_id];

        const { customer_id, date, amount } = transaction;


        cartoona += `<tr>
                                <th scope="row">${customer_id}</th>
                                <td>${customerName}</td>
                                <td>${date}</td>
                                <td>${amount}</td>
                                <td><button data-id='${customer_id}' class="btn btn-outline-dark">Display Graph</button></td>
                            </tr>`


        allData.push({ customerName, customer_id, date, amount })

    })
    console.log(allData);


    $('#tBody').html(cartoona);

}


$('#homeLogo').on('click' , ()=>{
    window.location.href = './index.html'
})