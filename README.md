# Dev server

Development server for working inside dev containers from a web api.

currently it only exposes endpoints for listing, creating, editing and deleting files an running commands in the base container

## Architecture

The main idea is to be able to work on JS/TS/Python projects from inside a docker container.
to do that we need a container with this server and the docker cli, and a container running docker engine in privileged mode.
that way we can only run containers in the privileged container.

On the dev server container we can clone repositories and run commands on containers with docker dind.