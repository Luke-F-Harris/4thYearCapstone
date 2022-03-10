using UnityEditor;
using UnityEngine;
using System.Collections;

public class GameBuilder
{
    static void WebGLProductionBuild()
    {
        // Build the player.\
        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
        buildPlayerOptions.scenes = new[] { "Assets/Scenes/LukeScene.unity" };
        buildPlayerOptions.locationPathName = "C:/Users/lukeh/Documents/School/FirstSem/4450Clone/4thYearCapstone/api/routing/../../Builds/GameBuilds/7_1";
        buildPlayerOptions.target = BuildTarget.WebGL;
        buildPlayerOptions.options = BuildOptions.None; // set whatever you want here
        BuildPipeline.BuildPlayer(buildPlayerOptions);  // apply the setting changes
    }
}