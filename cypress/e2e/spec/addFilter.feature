Feature: Add filter

  Scenario: As a User I want be able to add filter
    When user clicks on side bar filter button
    Then user clicks on 'ADD_FILTER' button
    Then user verifies demo data 'Demo Api Tests' is visible