#!/bin/sh

release_ctl eval --mfa "Platemail.ReleaseTasks.migrate/1" --argv -- "$@"
