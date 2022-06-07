## Tip for testing second order injection attacks (XSS, SQLIi) using Post-request Macros in Burp Suite

 
During one of my recent assessments, I came across this cool feature in Burp Suite, called Post-request Macros.

While testing for second order XSS, our general approach is to send a request to URL-1 and then send a request to URL-2 to see if the input gets reflected in the response. We do this manually in most cases where the feature is like an "edit" functionality where you can only update something and not create new entries.

Fuzzing using Intruder in such cases is not useful because only the last payload in the list would be reflecting at URL-2.

There is this nice feature in Burp called "Session Handling Rules" under "Project Options" > "Sessions". You can create a rule such that, every time a request to URL-1 is sent via Burp Proxy/Repeater/Intruder, a request to URL-2 is sent automatically and the response that you get is of URL-2.

You need to do the following:
1. Navigate to "Project Options" > "Sessions"
2. Under "Macros", click on "Add" and select whatever requests that you want Burp to run automatically in a sequence
3. Click on "Ok" and in the "Macro Editor" make sure that the sequence is correct. Run "Test macro" if you want to have a trial run
4. Click on "Ok"
5. Under "Session Handling Rules", click on "Add" and give the name of the rule in "Rule Description" (e.g "XSS-getDetails")
6. Under "Rule Actions" click on "Add" and select "Run a post-request macro"
7. Select your macro
8. Under "Pass back to the invoking tool", select "The final response from the macro"
9. Click on OK
10. In the "Session handling rule editor" window, go to the "Scope" tab
11. Select the tools that this rule will be applied to
12. Under "URL Scope", tick "Use custom scope"
13. Under "Include in scope", select the URL after which the macro must be run

Your rule should work now and after any request that you send to that URL within Burp, your macro will run and give the response of the URL where the input is reflecting. You can now use Intruder to fuzz URL-1 and see the response of URL-2 where the input is reflected.

This feature can also be used for other test cases.
