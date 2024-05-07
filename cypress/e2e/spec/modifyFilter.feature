Feature: 'Modify  Filter'

  Background: Create a filter
    Given I am on the Home page
    When I click on the sidebar filter button
    And I click on the 'ADD_FILTER' button
    Then I see demo data 'Demo Api Tests' is in the launches list
  @modify
  Scenario Outline: 'As a User, I want to be able to modify filter by setting <bugType> bug type'
    And I click on the more condition button
    And I select '<bugType>' condition from the dropdown menu
    And I scroll into view of 'TOOLBAR'
    Then I see filter label 'FIELD_FILTER' has a value '<bugType>'
    When I enter 'Demo Api' into the 'Enter name' input field
    And I enter '<filterNumber>' into the 'Enter quantity' input field
    Then I see <filteredLaunches> number of filtered launches
    And  I click on the 'SAVE' button
    And I enter 'New filter for bug type`' into the 'Enter filter name' input field
    And I confirm the adding of a filter
    Then I see the 'FILTER_NAME' link contains the 'New filter for bug type' text
    Examples:
      | bugType              | filterNumber | filteredLaunches |
      | Product Bug Group    | 2            | 50               |
      | Automation Bug Group | 4            | 2                |
      | Failed               | 5            | 4                |
