#!/bin/bash
set -e
rm -rf dist/
npx sass ./styles/index.scss ./dist/index.css --watch
