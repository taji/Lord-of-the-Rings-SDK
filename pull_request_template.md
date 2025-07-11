Please answer the following questions about your work:
*0 - What language did you program in?*

Typescript

*1 - Have you manually tested the SDK?*

Yes manual testing vi the index.ts file in the examples folder.  NOTE: This example application has been added to ci.yml and so is run automatically during CI.

*2 - Did you add a test suite? If so, how will we use it? If not, why?*

Yes, both the api (integration) tests and the isolated unit tests are located in the tests folder.  Run the "test" script in the package.json to verify the tests.  These have also been added to the ci.yml file and are run automatically github actions. 

*3 - Did you use any 3rd party library? Why did you use it? What are the tradeoffs?*

The only third party library used was dotenv to retreive the LOTR_API_KEY and the LOTR_API_BASE_URL environment variables.

The tradeoffs would be using dotenv vs writing my own version of dotenv.

According to NPM audit there are two moderate risks associated with esbuild (used by dotenv):

```
esbuild  <=0.24.2
Severity: moderate
esbuild enables any website to send any requests to the development server and read the response - https://github.com/advisories/GHSA-67mh-4wv8-2f99
fix available via `npm audit fix --force`
Will install tsup@8.5.0, which is a breaking change
node_modules/esbuild
  tsup  <=8.3.6
  Depends on vulnerable versions of esbuild
  node_modules/tsup


2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force
```

I chose not to resolve the issues as recommended in the output due the risk of breaking changes.  

NOTE:  I had to hardcode the LOTR_LOTR_API_KEY in the ci.yml github actions configuration due to not having the required priviliges to modify the Actions settings in github.  This is obviously a security issue and I would definitely address this before releasing to a production environment. 

*4 - Do you feel this SDK makes it easier to interact with the API?*

Yes, the sdk removes the additional effort required to write the http request and response logic required for the API and verify stability via testing.  It allows the developer to make a single function call to retrieve movies and/or quotes from the LOTR API.  Additionally, with a modern IDE, the proper typescript compilation and provided JSDocs provide code hinting, code completion and inline documentation.   

*5 - If you had more time, what else would you add?*

a. Add the remaining API resources (book, character, chapter, etc). 
b. Add the remaining fine tuning logic found in the API (so pagination, sorting ).
Add linting.
c. Analyze the sdk code for any security vulnerabilities that could be used as an LOTR API exploit.

*6 - What would you change in your current SDK solution?*

a. Fix the permission issue for configuring LOTR_API_KEY and LOTR_API_BASE_URL environment variables.
b.  I would move the API test action to after deployment.  
c. I'm not happy with the string based filtering mechanism as it could expose an API security vulnerability.  I'd prefer a proper domain specific language or checked syntax approach similar to graph ql. 

*7 - On a scale of 1 to 10 (10 being the highest), how would you rate this solution?*

About 6.5.  I'd say it's not production ready.  It needs proper architecture, security and code reviews. 

*8 - Anything else we should keep in mind when we evaluate the project?*

FYI (and being totally transparent):  I used Gemini CLI code assistance to guide and assist me through the coding process. I did not use any code generation tools similar to OpenAPI generator.  I've included the code-assist-docs folder with my instructions for Gemini to provide context.