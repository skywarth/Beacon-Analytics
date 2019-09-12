async function chartXLoaded(placeholder, actual) {
    $(actual).removeClass('d-none');
    //$(placeholder).addClass('d-none');
    $(placeholder).remove();


    //$(placeholder).addClass('successfully-saved');
    
}


function pageActualsInitialize(placeholders) {
    for (var i = 0; i < placeholders.length; i++) {
        $(placeholders[i]).addClass('d-none');
    }
}
pageActualsInitialize($('[data-actuality="actual"]'));
