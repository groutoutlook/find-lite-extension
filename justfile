shebang := if os() == 'windows' { 'pwsh.exe' } else { '/usr/bin/env pwsh' }
set shell := ["nu", "-c"]
set windows-shell := ["pwsh.exe", "-NoLogo", "-NoProfile","-Command"]
set dotenv-load := true
set script-interpreter := ["pwsh.exe", "-NoLogo", "-NoProfile","-Command"]
set dotenv-filename	:= ".env"
set unstable
set fallback
# set dotenv-required := true
export JUST_ENV := "just_env" # WARN: this is also a method to export env var. 
_default:
    @just --list

alias b := build
build:
    # build task here

alias r := run
default_args := 'args here'
run args=default_args:
    @Write-Host {{default_args}} -ForegroundColor Red

alias fmt := format
format:
    biome format --write

alias t := test
test:
    # test.

alias w := watch
watch:
    # watch, mostly spin up an application e.g. `r r`-> read log by less/bat/ov/tailspin

PACKAGE_NAME := "find-lite"
alias dep := deploy
deploy:
    rm -f {{PACKAGE_NAME}}.zip
    zip -r {{PACKAGE_NAME}}.zip content background popup icons app.js manifest.jsonalias sk := seek

[script]
script:
    Write-Host "this is in powershell, without shebang syntax"
