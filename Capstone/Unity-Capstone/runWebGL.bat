"C:\Program Files\Unity\Hub\Editor\2020.3.28f1\Editor\Unity.exe" -quit -batchmode  -projectPath "../Capstone/Unity-Capstone" -executeMethod GameBuilder.WebGLProductionBuild -logFile "./log.txt"
curl --header "Content-Type: application/json" --request POST --data "{\"index_file_path\":\"C:/Capstone/Builds/4\"}" http://localhost:3000/api/games/end
pause


