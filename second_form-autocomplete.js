console.log('z');
// $(document).ready(function(){
//     let countrySelectedIso = $('#pays_user_adr option:selected').val().toLowerCase();
// // Select all the "select" which id's end with "pays_user_adr" :
//     $("select[id$='pays_user_adr']").on('change', function() {        
//         let countrySelectedIso = $(this).val().toLowerCase();
//    //     console.log(countrySelectedIso);
//     });
// });

let countrySelector = document.querySelector("select[id$='pays_user_adr']");
let countrySelectedIso = (countrySelector.options[countrySelector.selectedIndex].value).toLowerCase();

console.log(countrySelectedIso);

countrySelector.addEventListener('change', function(){
    let countrySelectedIso = this.options[this.selectedIndex].value.toLowerCase();
    console.log(countrySelectedIso);
})

let autocompleteField;
let adresseField1;
let adresseField2;
let postalCodeField;

window.initAutocomplete = function() {
    console.log('zizi');
    adresseField1 = document.querySelector('.autocomplete_adresse_field');
    adresseField2 = document.querySelector("input[id$='adr2_user_adr']");
    postalCodeField = document.querySelector("input[id$='cp_user_adr']");

    autocompleteField = new google.maps.places.Autocomplete(adresseField1, {
        componentRestrictions: { country: "fr" },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    adresseField1.focus();

    autocompleteField.addListener("place_changed", fillInAddress);
}
window.initAutocomplete();

function fillInAddress() {
    const place = autocompleteField.getPlace();
    let adresse1 = "";
    let postalCode = "";
    
}
