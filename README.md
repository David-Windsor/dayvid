## Dependencies
You're going to need the following dependencies to develop this:

1) If on windows install Windows Subsystem for Linux. This will let you use a linux shell while using VS Code. A good guide on how to do this can be found here: https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps. You should just need to follow through step 6. I would use Ubuntu for easier package support and most cloud providers provide a free Ubuntu/Debian option for a compute instance

2) Editor of your choice, I like VS Code for anything that isn't Java

3) Install Node. You can either do this with `sudo apt install nodejs` or you can use NVM to more easily manage versions of Node and NPM. NVM install instructions can be found here: https://github.com/nvm-sh/nvm#installing-and-updating. After that run `nvm install node` to get the latest. That will also set it as your default for whenever you run `node` and `npm`

4) Get the repo cloned. You will want to use an ssh key for interacting with git