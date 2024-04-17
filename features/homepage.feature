@AutomatedTests
@HomePage

Feature: Home Page Scenarios

  Scenario: Cart bubble shows the same number of items added
    Given I open the web page
    When I login as a "standard" user
    And I add "Sauce Labs Bike Light" to the cart
    And I add "Sauce Labs Bolt T-Shirt" to the cart
    And I add "Sauce Labs Fleece Jacket" to the cart
    And I should see "3" items in the cart bubble
    And I remove "Sauce Labs Fleece Jacket" from the cart
    Then I should see "2" items in the cart bubble

  Scenario: Product sort Price (high to low)
    Given I open the web page
    When I login as a "standard" user
    Then the sort "Price (high to low)" should work correctly

  Scenario: Product sort Price (low to high)
    Given I open the web page
    When I login as a "standard" user
    Then the sort "Price (low to high)" should work correctly

  Scenario: Product sort Name (Z to A)
    Given I open the web page
    When I login as a "standard" user
    Then the sort "Name (Z to A)" should work correctly

  Scenario: Product sort Name (A to Z)
    Given I open the web page
    When I login as a "standard" user
    Then the sort "Name (A to Z)" should work correctly