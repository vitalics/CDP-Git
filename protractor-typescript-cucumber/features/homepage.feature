Feature: Main site

    Scenario: Main Site
        Given User open "home" page
        Then User click by "what we do" text button
        And User redirect on "what-we-do" routing

    Scenario Outline: Clicking by header value <text>
        Given User click by <text>
        Then Route change by <routing>

        Examples:
            | text         | routing      |
            | what we do   | what-we-do   |
            | how we do it | how-we-do-it |