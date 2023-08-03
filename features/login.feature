@AutomatedTests
@LoginAndLogout

Feature: User login and logout scenarios

  Scenario: Valid user login
    Given I open the web page
    When I login as a "standard" user
    Then I should see "Swag Labs" in the "homepage"

  Scenario: Locked out user cannot login
    Given I open the web page
    When I login as a "locked" user
    Then I should see the login error message "Sorry, this user has been locked out"  

  Scenario: Cannot login without a username
    Given I open the web page
    When I login as a "no_username" user
    Then I should see the login error message "Username is required"  