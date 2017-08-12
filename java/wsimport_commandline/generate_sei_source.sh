#!/usr/bin/env bash
rm -rf generated_src
mkdir generated_src
wsimport -keep -s generated_src -d generated_src -verbose -p com.sc.ws.geoipservice http://www.webservicex.net/geoipservice.asmx?WSDL