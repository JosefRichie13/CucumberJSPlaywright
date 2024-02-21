@AutomatedTests
@VisualTests

#Open issue which is preventing from using Playwright's own methods with Cucumber : https://github.com/microsoft/playwright/issues/15275

Feature: Visual Testing

  Scenario: Visual Testing Success
    Given I open the web page
    And I login as a "visual_success" user
    And I logout of the webpage
    When I login as a "standard" user
    Then I verify that the UI is same

  Scenario: Visual Testing Failure
    Given I open the web page
    And I login as a "visual_error" user
    And I logout of the webpage
    When I login as a "standard" user
    Then I verify that the UI is different