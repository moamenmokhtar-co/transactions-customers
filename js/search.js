export let searchStatus = 'byName';
export function search() {
    const filterList = `<ul id="filterList" class="bg-white position-absolute rounded-2 mb-0 text-center list-unstyled z-2">
    <li id="byName" class=" py-3 rounded-2 position-relative">By Name</li>
    <li id="byAmount" class=" py-3 rounded-2 position-relative">By Amount</li>
</ul>`


    let filterActive = false;

    // Press filterBtn
    $('#filterBtn').on('click', () => {

        if (!filterActive) {
            $('#filterBtn').after(filterList);
            $('#filterArrow').css('transform', 'rotate(180deg)')
            filterActive = true;
        }
        else {
            $('#filterArrow').css('transform', 'rotate(0deg)')
            $('#filterList').remove()
            filterActive = false;
        }

    })


    // filterList Options
    $(document).on('click', '#filterList', e => {
        searchStatus = $(e.target).attr('id')
        if (searchStatus == 'byName') {
            $('#searchInput').val('').attr({'placeholder' : 'Search By Name' , 'type' : 'text'})

            $('#filter').text('By Name')
            // console.log(searchStatus);

        }
        else {
            $('#searchInput').val('').attr({'placeholder' : 'Taype The Amount' , 'type' : 'number'})

            $('#filter').text('By Amount')
        // console.log(searchStatus);

        }
        $('#filterArrow').css('transform', 'rotate(0deg)')
        $('#filterList').remove()
        filterActive = false;


    })
}