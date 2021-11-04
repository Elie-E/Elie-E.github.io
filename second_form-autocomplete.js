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

    autocompleteField.addListener("place_changed", fillInAddress);}

function fillInAddress() {
    const place = autocompleteField.getPlace();
console.log(place);
    let adresse1 = "";
    let postalCode = "";

    for (const component of place.address_components) {
        console.log(component);
        const componentType = component.types[0];
        switch (componentType) {
          case "street_number": {
            adresse1 = `${component.long_name} ${address1}`;
            break;
          }
    
          case "route": {
            adresse1 += component.short_name;
            break;
          }
    
          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
          }
    
          case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
          }
          case "locality":
            document.querySelector("#locality").value = component.long_name;
            break;
          case "administrative_area_level_1": {
            document.querySelector("#state").value = component.short_name;
            break;
          }
          case "country":
            document.querySelector("#country").value = component.long_name;
            break;
        }
      }
    
      adresseField1.value = adresse1;
      postalCodeField.value = postcode;
      adresseField2.focus();
}

window.initAutocomplete();