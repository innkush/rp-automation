Feature: 'Modify  Filter'

  Background: Create filter
    Given user clicks on side bar filter button
    Then user clicks on 'ADD_FILTER' button
    And user verifies demo data 'Demo Api Tests' is visible
  @modify
  Scenario Outline: 'As a Use I want to be able to modify filter by setting <bugType> bug type'
    Then user clicks on more condition button
    And user selects <bugType> condition
    And user scrolls into view of 'TOOLBAR'
    Then user verifies filter label 'FIELD_FILTER' has a value <bugType>
    And user sets value 'Demo Api' into 'Enter name' input field
    When user sets value <filterNumber> into 'Enter quantity' input field
    Then user see <filteredLaunches> number of filtered launches
    And user clicks on 'SAVE' button
    And user sets value 'New filter for bug type`' into 'Enter filter name' input field
    And user adds new filter
    Then user verifies 'FILTER_NAME' link contains 'New filter for bug type' text
    Examples:
      | bugType                | filterNumber | filteredLaunches |
      | 'Product Bug Group'    | '2'          | 50               |
      | 'Automation Bug Group' | '4'          | 2                |
      | 'Failed'               | '5'          | 4                |
