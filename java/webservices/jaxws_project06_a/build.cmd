rmdir /s /q target\generated-sources\wsimport
mkdir target
mkdir target\generated-sources
mkdir target\generated-sources\wsimport

wsimport -keep -verbose -d ./target/generated-sources/wsimport ./src/wsdl/*.wsdl
