"C:\Program Files\Unity\Hub\Editor\2020.3.28f1\Editor\Unity.exe" -quit -batchmode  -projectPath "../Capstone/Unity-Capstone" -executeMethod GameBuilder.WebGLProductionBuild -logFile "./log.txt"
curl --header "Content-Type: application/json" --request POST --data "{\"index_file_path\":\"C:/Users/lukeh/Documents/School/FirstSem/4450Clone/4thYearCapstone/api/routing/../../Builds/GameBuilds/c1_1\"}" http://localhost:3000/api/games/end