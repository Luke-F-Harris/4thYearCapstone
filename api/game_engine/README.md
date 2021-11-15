This section handles the game mechanics

## We have to work out the actual logic of how to do this:
1. Processing code
    - What language are we using?
    - Are we adding our own custom variable and objects to the programming?
    - How do we process errors?
    - How do we combat malicious actions? (Specifically server side injections)
    - Are we adding constraints to the language?
    - Are we executing virtually?

&nbsp;

2. Game mechanics
    - How are we structuring the competition?
    - What are the game rules and constraints?
    - How do we enforce the rules and constraints?
    - How do we combine or compare two competing codes?
    - Do we need to make any changes to the rating system?
    - How do we apply the rating system?
        - How is it applied to multiple games on the same code?
        - How is it applied to different tiers

&nbsp;

3. User side
    - How do we structure the logging?
    - How can we create a robust logging that is lighweight?
    - How does the frontend process the logging?
    - How is the logging generated from compilation?

&nbsp;

## Some thoughts:
 - Compile codes independatly
 - Compile codes together
 - Run in a virtual environment
 - Sanatize heavaly an run on server
 - Use python
 - Create our own language
 - Ensure there are no errors on the frontent
 - Constrain the language used to set list of functionalities
 - Disable imports
 - Limit imports
