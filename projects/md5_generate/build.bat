cmd /c mvn clean install
mkdir target\build
copy run.bat target\build
copy target\md5_generate.jar target\build
