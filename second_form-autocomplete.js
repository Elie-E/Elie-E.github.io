let autocompleteField;
let adresseField1;
let adresseField2;
let postalCodeField;

function initAutocomplete() {
    let countrySelector = document.querySelector("select[id$='pays_user_adr']");
    let countrySelectedIso = (countrySelector.options[countrySelector.selectedIndex].value).toLowerCase();

    console.log(countrySelectedIso);

    countrySelector.addEventListener('change', function(){
    let countrySelectedIso = this.options[this.selectedIndex].value.toLowerCase();
    initAutocomplete();
    })

    adresseField1 = document.querySelector('.autocomplete_adresse_field');
    adresseField2 = document.querySelector("input[id$='adr2_user_adr']");
    postalCodeField = document.querySelector("input[id$='cp_user_adr']");

    autocompleteField = new google.maps.places.Autocomplete(adresseField1, {
        componentRestrictions: { country: countrySelectedIso },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    
    console.log(autocompleteField);

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
        console.log(componentType);
        switch (componentType) {
          case "street_number": {
            adresse1 = `${component.long_name} ${adresse1}`;
            break;
          }
    
          case "route": {
            adresse1 += component.short_name;
            break;
          }
    
          case "postal_code": {
            postalCode = `${component.long_name}${postalCode}`;
            break;
          }
    
          case "postal_code_suffix": {
            postalCode = `${postalCode}-${component.long_name}`;
            break;
          }
          case "locality":
            document.querySelector("input[id$='ville_user_adr']").value = component.long_name;
            break;
        //   case "administrative_area_level_1": {
        //     document.querySelector("#state").value = component.short_name;
        //     break;
        //   }
        }
      }
    
      adresseField1.value = adresse1;
      postalCodeField.value = postalCode;
      adresseField2.focus();
}

// window.initAutocomplete();