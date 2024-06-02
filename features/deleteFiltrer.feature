Feature: Delete Filter

    Scenario: As a User, I want to be able to delete a filter
        Given I login to RP
        And I am on the Home page
        And I click on the sidebar filter button
        Then I see all active filters in the filter list with the correct options:
            | Filter name          | Options                                                           | Owner      |
            | New Filter To Delete | (Launch name contains New Filter To Delete) sorted by: Start time | superadmin |
        And I enter 'New Filter To Delete' into the 'Search by name' input field
        Then I see the filter 'New Filter To Delete' appears in the filter list
        And I click on the 'DELETE' button
        And I see a confirmation message on the deletion filter
        But I confirm the deletion of a filter
        And I see the filter is no longer visible in the filter list
