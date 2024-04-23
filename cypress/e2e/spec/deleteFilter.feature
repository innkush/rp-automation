Feature: Delete Filter
    
    Scenario: As a Use I want to be able to delete filter
        When user clicks on side bar filter button
        Then user clicks on 'ADD_FILTER' button
        Then user verifies demo data 'Demo Api Tests' is visible
        And user sets value 'New Filter To Delete' into 'Enter name' input field
        Then user clicks on 'SAVE' button
        And user sets value 'New Filter To Delete' into 'Enter filter name' input field
        And user adds new filter
        Then user verifies 'FILTER_NAME' link contains 'New Filter To Delete' text
        When user clicks on side bar filter button
        And user sets value 'New Filter To Delete' into 'Search by name' input field
        Then user verifies filter 'New Filter To Delete' is visible
        Then user clicks on 'DELETE' button
        Then user verifies confirmation message is visible
        And user deletes new filter