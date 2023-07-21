# 3ncount3r 
3ncount3r is a Dungeon/Game Master's tool to assist with planning and running combat encounters for TTRPGs. It is not meant to be a full fledged VTT but instead aims to augment more traditional setups (like how I run my games).

The tool has evolved, though, and a tool for players is in the works (for players to manage their characters).

There is also the matter of copyright (and at the time of starting with the project some fu(n)ckyness from WotC around OGL) so 3ncount3r is built with the idea of Bring-Your-Own-API. It is a backendless frontend (try saying that three times fast) that expects data in a specific way in order to show you what you need for running encounters, on a single pane of glass. cl3anslat3, the "built-in" BYOAPI, is half an answer to the data problem and provides SRD content under the Creative Commons license.

# Yes, it is a Microfrontend
Currently 3ncount3r consists of a shell and one remote (3ncount3r itself). The plan is to add charact3r as a second remote. Please keep this in mind since it does mean:
- There are more moving parts
- There are more CORS issues

# Word of Warning
This project is a work in progress. Like, really WIP. Shit will break. It is not built with great exception handling (partially because I couldn't be arsed but mostly because I haven't looked into how to do it cleanly in Node.JS) and probably not half as defensive as it should be.

This is something I wanted to build and something I entered for the Entelect Tech Accelerator 2023 (a great company initiative for employees) so it's function over form at the moment.

It also has many different technologies because I'm experimenting. I have an idea of what I want to do (and I'll document it on my blog in the, hopefully, near future) and it's likely to be needlessly complex.

I also haven't added any security yet (it's originally designed as a single-user system) so if you plan on running it yourself, don't expose it to the internet.

# Making it Work on my Machine
There's a docker compose file in the `deployment/local` folder that 'should' just work if you cloned the repo (if you download the entire folder it should also work just fine). This is assuming you're not using any of the port numbers I defined in the files.

If you need to change the ports because you don't like the numbers I chose (or you do and they're already being used) then there are config files you can modify in the `deployment/local/config` folder. There's one for each API, a nginx config to enable CORS on the 3ncount3r remote and a Module Federation manifest for the 3ncount3r shell.

# RTFM?
Yeah, about that...

I'm planning on (once again) starting with my blog where I'll (hopefully) post updates on releases, features and a little bit of a user guide (or maybe I'll use one of those cool tutorial tools, because I don't think this is complex enough yet 🤣).

# Contributing
Since this is a project for a "competition" of sorts at Entelect (my employer) I cannot accept any contributed code. Feel free to fork the project and go nuts if you want, though.

# Attribution
As mentioned, I do use some Dungeons and Dragons System Reference Document stuff and as is required by the license:

This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of
the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The
SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at
https://creativecommons.org/licenses/by/4.0/legalcode.

# Credit Where Credit is Due
I also want to mention 5e Tools where I got inspiration from for the data files' structure.

# License
This software is licensed under GPLv3 (minus the SRD stuff which is CC BY 4.0 and not mine).