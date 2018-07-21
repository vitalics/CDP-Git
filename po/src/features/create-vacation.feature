Feature: Vacation

  Scenario: Creating vacation
    Given User open "Homepage"
    When User click "add vacation" button
    Then Url has changed
    And User see form
    And User click on "save as draft" button
    And User see a first request with "Draft" status