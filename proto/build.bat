@echo off
setlocal

:: Definisci la directory dei proto
set PROTO_DIR=.\proto

echo [PROTOBUF] Javascript and Typescript compiling

:: Genera codice JavaScript
grpc_tools_node_protoc ^
--js_out=import_style=commonjs,binary:%PROTO_DIR% ^
--grpc_out=%PROTO_DIR% ^
--plugin=protoc-gen-grpc=.\node_modules\.bin\grpc_tools_node_protoc_plugin.cmd ^
-I .\proto proto\*.proto && ^
grpc_tools_node_protoc ^
--plugin=protoc-gen-ts=.\node_modules\.bin\protoc-gen-ts.cmd ^
--ts_out=%PROTO_DIR% ^
-I .\proto proto\*.proto &&^
echo [PROTOBUF] Success

endlocal
