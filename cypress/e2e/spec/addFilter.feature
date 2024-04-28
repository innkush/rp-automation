Feature: Add filter

  Scenario: As a User I want be able to add filter
    Given user clicks on side bar filter button
    When user clicks on 'ADD_FILTER' button
    Then user verifies demo data 'Demo Api Tests' is visible
