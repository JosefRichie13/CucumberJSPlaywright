@AutomatedTests
@Footer

Feature: Footer Scenarios

  Scenario: Footer is not visible when logged out
    Given I open the web page
    Then I confirm that the footer is "not visible"

  Scenario: Footer is visible when logged in
    Given I open the web page
    When I login as a "standard" user
    Then I confirm that the footer is "visible"

  Scenario: Footer links redirect correctly
    Given I open the web page
    When I login as a "standard" user
    Then the "Twitter" icon in the footer should open "https://twitter.com/saucelabs"
    And the "Facebook" icon in the footer should open "https://www.facebook.com/saucelabs"
    And the "LinkedIn" icon in the footer should open "https://www.linkedin.com/company/sauce-labs/"