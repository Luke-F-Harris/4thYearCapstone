using UnityEditor;
using UnityEngine;
using System.Collections;
 
public class GameBuilder
{
    static void WebGLProductionBuild()
    {
    // Build the player.\
    BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions();
    buildPlayerOptions.scenes = new[] { "Assets/Scenes/SampleScene.unity"};
    buildPlayerOptions.locationPathName = "B:/capstone/newcapstone/4thYearCapstone/Capstone/builds";
    buildPlayerOptions.target = BuildTarget.WebGL;
    buildPlayerOptions.options = BuildOptions.None; // set whatever you want here
    BuildPipeline.BuildPlayer(buildPlayerOptions);  // apply the setting changes
    }
}