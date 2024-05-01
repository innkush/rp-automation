Feature: Add filter

  Scenario: As a User, I want to be able to add a filter
    Given I am on the Home page
    When I click on the sidebar filter button
    And I click on the 'ADD_FILTER' button
    Then I see demo data 'Demo Api Tests' is in the launches list
