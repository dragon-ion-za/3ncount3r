# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

# Running the damn thing

There's a docker image somewhere (local only which is the issue).
To start it do:
wsl
docker start 0d847a6338972bea3a6f74d2cb849796b87fa0315584c6a8207fb783c4af0b3d

To wipe the DB:
docker exe -it 5etools-api-3ncount3r bash
mongosh
use 3ncount3r_data
db.dropDatabase()

To set it up do:
docker run -d -p 27017:27017 --name 5etools-api-3ncount3r -v data-vol:/data/db mongo:latest