# Product Overview

3ncount3r is a Dungeon/Game Master tool for tabletop RPGs (TTRPGs) focused on planning and running combat encounters. It is not a full Virtual Tabletop — it augments traditional play setups by providing encounter management on a single pane of glass.

## Core Concepts

- **Bring-Your-Own-API (BYOAPI)**: The frontend is backend-agnostic. It expects data in a defined format and can connect to any compliant API.
- **cl3anslat3**: The built-in BYOAPI providing D&D 5e SRD content under Creative Commons Attribution 4.0.
- **charact3r**: A planned player-facing module for character management.
- **Microfrontend architecture**: An Angular shell hosts React remotes via Webpack Module Federation.

## Domain

- Encounters: creating, running, and tracking combat encounters
- Creatures: browsing, searching, and managing creature stat blocks
- Parties: managing player character groups
- Dice: rolling and tracking dice results
- Initiative: turn order tracking during encounters

## Users

Currently single-user (the DM/GM). No multi-tenancy. Auth0 is integrated on the shell for identity but APIs are not secured.

## Naming Convention

The project uses leet-speak naming: `3ncount3r`, `cl3anslat3`, `charact3r`, `orch3strator`.
