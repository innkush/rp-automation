Feature: Delete Filter
    @delete
    Scenario: As a Use I want to be able to delete filter
        Given user clicks on side bar filter button
        Then user clicks on 'ADD_FILTER' button
        And user verifies demo data 'Demo Api Tests' is visible
        And user sets value 'New Filter To Delete' into 'Enter name' input field
        Then user clicks on 'SAVE' button
        And user sets value 'New Filter To Delete' into 'Enter filter name' input field
        And user adds new filter
        Then user verifies 'FILTER_NAME' link contains 'New Filter To Delete' text
        When user clicks on side bar filter button
        Then user sees all active filters:
            | Filter name          | Options                                                           | Owner            | Display on launches    |
            | New Filter To Delete | (Launch name contains New Filter To Delete) sorted by: Start time | Owner:superadmin | Display on launches:ON |
        And user sets value 'New Filter To Delete' into 'Search by name' input field
        Then user verifies filter 'New Filter To Delete' is visible
        And user clicks on 'DELETE' button
        And user verifies confirmation message is visible
        But user deletes new filter
    