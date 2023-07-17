# 3ncount3r 
3ncount3r is a Dungeon/Game Master's tool to assist with planning and running combat encounters for TTRPGs. It is not meant to be a full fledged VTT but instead aims to augment more traditional setups (like how I run my games).

The tool has evolved, though, and a tool for players is in the works (for players to manage their characters).

There is also the matter of copyright (and at the time of starting with the project some fu(n)ckyness from WotC around OGL) so 3ncount3r is built with the idea of Bring-Your-Own-API. It is a backendless frontend that expects data in a specific way in order to show you what you need for running encounters, on a single pane of glass. cl3anslat3, the "built-in" BYOAPI, is half an answer to the data problem and provides SRD content under the Creative Commons license.

# Yes, it is a Microfrontend
Currently 3ncount3r consists of a shell and one remote (3ncount3r itself). The plan is to add charact3r as a second remote. Please keep this in mind since it does mean:
- There are more moving parts
- There are more CORS issues

# Word of Warning
This project is a work in progress. Like, really WIP. Shit will break. It is not built with great exception handling (partially because I couldn't be arsed but mostly because I haven't looked into how to do it cleanly in Node.JS) and probably not half as defensive as it should be.

This is something I wanted to build and something I entered for the Entelect Tech Accelerator 2023 (a great company initiative for employees) so it's function over form.

It also has many different technologies because I'm experimenting. I have an idea of what I want to do (and I'll document it on my blog in the, hopefully, near future) and it's likely to be needlessly complex but that's what I want to do.

# Making it Work on my Machine
There's a docker compose file that 'should' just work if you've cloned the repo (and you're not using any of the ports). I've been using it in Docker on WSL (can't be arsed to use Docker Desktop after the license change) and it's been working for me, but I'm also the one building it so...

If you need to change the ports because you don't like the numbers I chose (or you do and they're already being used) then there are config files you can modify in the hostingConfigs folder. There's one for each API, a nginx config to enable CORS on the 3ncount3r remote and a Module Federation manifest for the 3ncount3r shell.

# Don't Want to use the Docker Compose?
Urg, okay there are images for each of the subsystems which you can run individually. You'll need to add a config for the APIs because the built in config is meant for DEV. You'll also need to setup CORS if the shell and remotes do not live on the same server/container/host. The dockerfiles should give you a rough idea of what I did and what is required to get things to "just work".

# Why are you not Helpful
Sorry, this is a very light readme and I'll document things better in the future (at least that's the plan).

# Contributing
Since this is a project for a "competition" of sorts at Entelect (my employer) I cannot accept any contributed code. Feel free to fork the project and go nuts if you want I just can't accept any code from outside of my team.

# Attribution
As mentioned, I do use some Dungeons and Dragons System Reference Document stuff and as is required by the license:

This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of
the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The
SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at
https://creativecommons.org/licenses/by/4.0/legalcode.

# License
This software is licensed under GPLv3 (minus the SRD stuff which is CC BY 4.0 and not mine).