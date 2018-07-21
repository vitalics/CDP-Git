Feature: Delete vacation

  Scenario: Deleting vacation from list
    Given User open "HomePage"
    When User click by "Action required" whitch located on header
    Then User click by "vacation" button
    And Url has changed
    And User see list of vacation
    And User click by "Delete request" from first vacation