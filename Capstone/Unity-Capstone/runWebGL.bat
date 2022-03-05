"C:\Program Files\Unity\Hub\Editor\2020.3.28f1\Editor\Unity.exe" -quit -batchmode  -projectPath %cd% -executeMethod GameBuilder.WebGLProductionBuild -logFile "./log.txt"
curl -X POST http://localhost:3000/api/games/end -H 'Content-Type: application/json' -d '{"index_file_path":"C:/Capstone/Builds"}'
pause
