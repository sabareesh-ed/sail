document.addEventListener('DOMContentLoaded', function() {
    console.log("code works")
    updatePolicyDetails();

    const allSections = document.querySelectorAll('.controls');
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    const toggleDisplay = (className, displayStyle) => {
        const elements = document.querySelectorAll('.' + className);
        elements.forEach(element => {
            element.style.display = displayStyle;
        });
    };

    if(allSections.length > 0) {
        allSections[0].style.display = 'flex';
    }

    // Define the SVG markup
    const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24px" width="auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  
    `;

    // Find all buttons with the class 'back-button'
    const backButtons = document.querySelectorAll('.back-button');

    // Append the SVG to each button
    backButtons.forEach(button => {
        button.innerHTML += svgMarkup;
    });

    const previewButtons = document.querySelectorAll('.preview-button');
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the policy-display-wrapper and change its display to flex
            const policyDisplayWrapper = document.querySelector('.policy-display-wrapper');
            if (policyDisplayWrapper) {
                policyDisplayWrapper.style.display = 'flex';
            }
        });
    });

    // Find the element with the ID 'close-btn' and add a click event listener
    const closeButton = document.getElementById('close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            // Find the policy-display-wrapper and change its display to none
            const policyDisplayWrapper = document.querySelector('.policy-display-wrapper');
            if (policyDisplayWrapper) {
                policyDisplayWrapper.style.display = 'none';
            }
        });
    }

    
    const saveFormData = (section) => {
        const inputs = document.querySelectorAll('#' + section + ' .w-input');
        const checkboxes = document.querySelectorAll('#' + section + ' .w-checkbox-input');
        const data = {};

        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        checkboxes.forEach(checkbox => {
            data[checkbox.id] = checkbox.checked;
        });

        const currentData = JSON.parse(localStorage.getItem('form-data')) || {};
        currentData[section] = data;
        localStorage.setItem('form-data', JSON.stringify(currentData));
    };

    const loadCompanyName = () => {
        const companyName = JSON.parse(localStorage.getItem('welcome'));

        if (companyName) {
            document.getElementById('companyName').value = companyName;
        }
    };

    function updatePolicyDetails() {
        const formData = JSON.parse(localStorage.getItem('form-data')) || {};
        const companyName = JSON.parse(localStorage.getItem('welcome')) || "Your Company Name";

        const companySpan = document.querySelector('.policy-title-bold');
        if (companySpan) companySpan.innerText = companyName;

        function updateSpanTextById(id, text) {
            const span = document.getElementById(id);
            if (span) span.innerText = text;
        }

        function updateInnerHTMLById(id, htmlContent) {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = htmlContent;
            }
        }        

        // Accommodation
        if (formData.accomodation) {
            document.getElementById('accomodationWrap').style.display = 'flex';
            if (formData.accomodation.howToBookTrips) {
                updateSpanTextById('howToBookTripsSpan', formData.accomodation.howToBookTrips || '');
                document.getElementById('accomodation-1').style.display = 'block';
            } else {
                document.getElementById('accomodation-1').style.display = 'none';
            }
            if (formData.accomodation.accomodationPerDiem === true) {
                updateInnerHTMLById('budgetPerDiemSpan', 'Maximum budget per person per night is <strong class="font-semibold">set by your per diem policy.</strong>');
                document.getElementById('accomodation-2').style.display = 'block';
            } else if (formData.accomodation.budgetPerNight) {
                const budgetContent = `Maximum budget is <strong class="font-semibold">${formData.accomodation.budgetPerNight}</strong> per person per night.`;
                updateInnerHTMLById('budgetPerDiemSpan', budgetContent);
                document.getElementById('accomodation-2').style.display = 'block';
            } else {
                document.getElementById('accomodation-2').style.display = 'none';
            }
            updateSpanTextById('accomodationExtraSpan', formData.accomodation.accomodationExtra || '');
        } else {
            document.getElementById('accomodationWrap').style.display = 'none';
        }

        // Assuming updateInnerHTMLById function is already defined
        // Check for food data and apply logic accordingly
        if (formData.food) {
            document.getElementById('foodWrap').style.display = 'flex'; // Ensure the food section wrapper is shown

            // Breakfast
            if (formData.food.breakfast || formData.food.breakfastPerDiem) {
                const breakfastMessage = formData.food.breakfastPerDiem ?
                    'Breakfast – covered by the Per Diem policy' :
                    `Breakfast – up to <strong class="font-semibold">${formData.food.breakfast}</strong> per person per meal`;
                updateInnerHTMLById('food-1', breakfastMessage);
                document.getElementById('food-1').style.display = 'block'; // Show breakfast detail
            } else {
                document.getElementById('food-1').style.display = 'none'; // Hide breakfast detail if not applicable
            }

            // Lunch
            if (formData.food.lunch || formData.food.lunchPerDiem) {
                const lunchMessage = formData.food.lunchPerDiem ?
                    'Lunch – covered by the Per Diem policy' :
                    `Lunch – up to <strong class="font-semibold">${formData.food.lunch}</strong> per person per meal`;
                updateInnerHTMLById('food-2', lunchMessage);
                document.getElementById('food-2').style.display = 'block'; // Show lunch detail
            } else {
                document.getElementById('food-2').style.display = 'none'; // Hide lunch detail if not applicable
            }

            // Dinner
            if (formData.food.dinner || formData.food.dinnerPerDiem) {
                const dinnerMessage = formData.food.dinnerPerDiem ?
                    'Dinner – covered by the Per Diem policy' :
                    `Dinner – up to <strong class="font-semibold">${formData.food.dinner}</strong> per person per meal`;
                updateInnerHTMLById('food-3', dinnerMessage);
                document.getElementById('food-3').style.display = 'block'; // Show dinner detail
            } else {
                document.getElementById('food-3').style.display = 'none'; // Hide dinner detail if not applicable
            }

            // Update Extra Food guidelines if provided
            if (formData.food.extraFood) {
                updateInnerHTMLById('extraFoodSpan', formData.food.extraFood); 
                document.getElementById('extraFoodSpan').style.display = 'flex'; 
            } else {
                document.getElementById('extraFoodSpan').style.display = 'none'; 
            }
        } else {
            document.getElementById('foodWrap').style.display = 'none'; // Hide the entire food section if no food data exists
        }

        function updatePolicySections(formData) {
            // Transport Section
            const transportWrap = document.getElementById('transportWrap');
            if (formData.transport) {
                transportWrap.style.display = 'flex';
                updateVisibilityAndContent('transport-1', 'airTravelPolicySpan', formData.transport.airTravelPolicy);
                updateVisibilityAndContent('transport-2', 'cityTravelPolicySpan', formData.transport.cityTravelPolicy);
                updateVisibilityAndContent('transport-3', 'mileageAmountSpan', formData.transport.mileageAmount);
                updateVisibilityAndContent(null, 'extraTransportSpan', formData.transport.extraTransport, true); // No specific wrapper to show/hide
            } else {
                transportWrap.style.display = 'none';
            }

            // Conferences & Events Section
            const conferencesWrap = document.getElementById('conferencesWrap');
            if (formData.conferences) {
                conferencesWrap.style.display = 'flex';
                updateVisibilityAndContent('conference-1', 'conferenceAmountSpan', formData.conferences.conferenceAmount);
                updateVisibilityAndContent(null, 'extraConferencesSpan', formData.conferences.extraConferences, true);
            } else {
                conferencesWrap.style.display = 'none';
            }

            // Remote Work Section
            const remoteWorkWrap = document.getElementById('remoteWorkWrap');
            if (formData.remote) {
                remoteWorkWrap.style.display = 'flex';
                updateVisibilityAndContent('remote-1', 'hardwareAmountSpan', formData.remote.hardwareAmount);
                updateVisibilityAndContent('remote-2', 'softwareAmountSpan', formData.remote.softwareAmount);
                updateVisibilityAndContent(null, 'extraRemoteSpan', formData.remote.extraRemote, true);
            } else {
                remoteWorkWrap.style.display = 'none';
            }

            // Gifts & Flowers Section
            const giftsAndFlowersWrap = document.getElementById('giftsAndFlowersWrap');
            if (formData['gifts-and-flowers']) {
                giftsAndFlowersWrap.style.display = 'flex';
                updateVisibilityAndContent('gift-1', 'clientAmountSpan', formData['gifts-and-flowers'].clientAmount);
                updateVisibilityAndContent('gift-2', 'employeeAmountSpan', formData['gifts-and-flowers'].employeeAmount);
                updateVisibilityAndContent(null, 'extraGiftsSpan', formData['gifts-and-flowers'].extraGifts, true);
            } else {
                giftsAndFlowersWrap.style.display = 'none';
            }

            // Details Section
            const detailsWrap = document.getElementById('detailsWrap');
            if (formData.details) {
                detailsWrap.style.display = 'flex';
                updateVisibilityAndContent('detail-1', 'detailDaysSpan', formData.details.detailDays);
                updateVisibilityAndContent('detail-2', 'detailsReimbursementSpan', formData.details.detailsReimbursement);
                // For contactName and Email, assuming it needs special handling
                let contactInfo = formData.details.contactName ? formData.details.contactName : '';
                if (formData.details.contactEmail) {
                    contactInfo += contactInfo ? ` (${formData.details.contactEmail})` : formData.details.contactEmail;
                }
                document.getElementById('contactNameandEmailSpan').innerText = contactInfo;
                updateVisibilityAndContent(null, 'extraDetailsSpan', formData.details.extraDetails, true); 
            } else {
                detailsWrap.style.display = 'none';
            }
        }

        // Helper function to update visibility and content of elements
        function updateVisibilityAndContent(wrapperId, spanId, content, alwaysShowSpan = false) {
            const spanElement = document.getElementById(spanId);
            if (content) {
                spanElement.innerText = content;
                if (wrapperId && !alwaysShowSpan) {
                    document.getElementById(wrapperId).style.display = 'block';
                }
            } else {
                if (wrapperId && !alwaysShowSpan) {
                    document.getElementById(wrapperId).style.display = 'none';
                }
                if (alwaysShowSpan) { // For spans that don't have a specific wrapper and should always be visible
                    spanElement.innerText = ''; // Clear content if not applicable
                }
            }
        }

        updatePolicySections(formData);

    }
    

    function populateInputsFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('form-data')) || {};
    
        Object.keys(storedData).forEach(section => {
            const sectionData = storedData[section];
            Object.keys(sectionData).forEach(key => {
                const input = document.getElementById(key);
                if (input) {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = sectionData[key];
                    } else {
                        input.value = sectionData[key];
                    }
                }
            });
        });
    }

    // Initial load
    loadCompanyName();
    populateInputsFromLocalStorage();
    toggleDisplay('builder-wrapper', 'none');

    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', function() {
        const companyName = document.getElementById('companyName').value;
        console.log("companyName", companyName)
        localStorage.setItem('welcome', JSON.stringify(companyName));
        
        allSections.forEach(section => {
            section.style.display = 'none';
        });

        if(allSections.length > 0) {
            allSections[0].style.display = 'flex';
        }
        
        toggleDisplay('builder-wrapper', 'flex');
    });


    // Event listeners for back and next/skip buttons
    const controlWrappers = document.querySelectorAll('.controls-wrapper .controls');
    controlWrappers.forEach((wrapper, index) => {
        const nextButton = wrapper.querySelector('.button:not(.is-skip)');
        const backButton = wrapper.querySelector('.back-button');
        const skipButton = wrapper.querySelector('.button.is-skip');
        const backButtonAllDone = wrapper.querySelector('.back-button-alldone');

        function navigateToNextSection(index, controlWrappers) {
            if (index < controlWrappers.length - 1) {
                controlWrappers[index].style.display = 'none'; // Hide current section
                controlWrappers[index + 1].style.display = 'flex'; // Show next section
            } else {
                alert('All sections completed.');
            }
        }        

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                // Check if at least one input is filled in the current section
                const inputs = wrapper.querySelectorAll('.w-input');
                const isAnyInputFilled = Array.from(inputs).some(input => input.value.trim() !== '');

                if (isAnyInputFilled) {
                    saveFormData(wrapper.id); // Save data for the current section
                    navigateToNextSection(index, controlWrappers);
                } else {
                    alert('Please fill in at least one field before proceeding.');
                }
            });
        }


        if (skipButton) {
            skipButton.addEventListener('click', function() {
                // Clear all input fields in the current section
                const inputs = wrapper.querySelectorAll('.w-input');
                inputs.forEach(input => {
                    input.value = ''; // Clear the input
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false; // Uncheck if it's a checkbox or radio button
                    }
                });
        
                // Clear the corresponding section's data from localStorage
                const currentData = JSON.parse(localStorage.getItem('form-data')) || {};
                if (currentData[wrapper.id]) {
                    delete currentData[wrapper.id]; // Delete the section's data
                    localStorage.setItem('form-data', JSON.stringify(currentData)); // Update localStorage
                }
        
                navigateToNextSection(index, controlWrappers);
            });
        }


        console.log("back button", backButton)
        
        if (backButton) {
            backButton.addEventListener('click', function() {
                if(index === 0) {
                    toggleDisplay('builder-wrapper', 'none');
                } else {
                    controlWrappers[index].style.display = 'none';
                    controlWrappers[index - 1].style.display = 'flex';
                }
            });
        }
    });

    const backButtonAllDone = document.getElementById('back-8');
    console.log(backButtonAllDone, "backButtonAllDone")
    if (backButtonAllDone) {
        backButtonAllDone.addEventListener('click', function() {
            document.querySelector('.builder-wrapper').style.display = 'none';
        });
    } else {
        console.log('back-button-alldone not found');
    }

    const perDiemCheckboxes = document.querySelectorAll('.w-checkbox-input.checkbox');

    perDiemCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!this.closest('.controls').id.includes('all-done')) {
                const associatedInput = this.closest('.input').querySelector('.text-field');
                console.log("change", associatedInput);
    
                if (this.checked) {
                    associatedInput.disabled = true;
                    // associatedInput.value = '';
                } else {
                    associatedInput.disabled = false;
                }
            }
        });
    });
    

    document.querySelectorAll('.w-input').forEach(input => {
        input.addEventListener('input', function() {
            const section = this.closest('.controls').id;
            saveFormData(section);
        });
    });

    // Attach event listeners to all checkboxes
    document.querySelectorAll('.w-checkbox-input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const section = this.closest('.controls').id;
            saveFormData(section);
        });
    });

    setInterval(updatePolicyDetails, 100);

});
