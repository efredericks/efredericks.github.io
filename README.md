Template based on [minimal-music-project](https://github.com/ItsPatrq/minimal-music-project).

## Reminders

Ruby 2.7.2 + OpenSSL 1.1.0 needed to build (something messed up with jekyll-scholar

https://open-research.gemmadanks.com/tutorials/how-to-use-jekyll-scholar-with-github-pages/
https://stackoverflow.com/questions/72250611/rsa-sslv23-padding-undeclared-first-use-in-this-function-did-you-mean-rsa

## Build instructions (or, reminder to self)

* Checkout `gh-pages` branch
* Build bundle as usual
* Copy `_site/*` to temp folder
* Checkout `main` branch
* Copy contents of temp to root of repo
* Checkin and push
