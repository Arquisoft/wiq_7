Feature: User plays game 1

Scenario: The user is logged in
  Given a logged user
  When I press play
  Then A question should be shown in the screen