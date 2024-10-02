// src-tauri/src/commands.rs
use crate::docker::DockerManager;
use crate::port_manager::PortManager;
use crate::plugin::Plugin;
use tauri::State;
use std::fs;
use std::path::Path;

#[tauri::command]
pub async fn upload_plugin(
    plugin: Plugin,
    docker_manager: State<'_, DockerManager>,
) -> Result<(), String> {
    // Create the plugins directory if it doesn't exist
    let plugins_dir = Path::new("plugins");
    fs::create_dir_all(plugins_dir).map_err(|e| e.to_string())?;

    // Create a directory for the plugin
    let plugin_dir = plugins_dir.join(&plugin.name);
    fs::create_dir_all(&plugin_dir).map_err(|e| e.to_string())?;

    // Copy the plugin files to the new directory
    // Note: You'll need to implement the actual file copying logic here
    // as it depends on how you're handling file uploads in your frontend

    // Create or copy the Dockerfile
    let dockerfile_path = plugin_dir.join("Dockerfile");
    if plugin.use_custom_dockerfile {
        if let Some(custom_dockerfile) = plugin.custom_dockerfile {
            fs::write(&dockerfile_path, custom_dockerfile).map_err(|e| e.to_string())?;
        } else {
            return Err("Custom Dockerfile is required when 'use_custom_dockerfile' is true".to_string());
        }
    } else {
        // Copy the default Dockerfile
        // You'll need to create a default Dockerfile template and copy it here
        // fs::copy("path/to/default/Dockerfile", &dockerfile_path).map_err(|e| e.to_string())?;
    }

    // Build the Docker image
    docker_manager.build_image(plugin_dir.to_str().unwrap(), &plugin.name).await?;

    Ok(())
}

#[tauri::command]
pub async fn start_plugin(
    plugin_id: String,
    docker_manager: State<'_, DockerManager>,
    port_manager: State<'_, PortManager>,
) -> Result<(), String> {
    let port = port_manager.get_available_port()?;
    docker_manager.start_container(&plugin_id, port).await?;
    port_manager.mark_port_as_used(port);
    Ok(())
}

#[tauri::command]
pub async fn stop_plugin(
    plugin_id: String,
    docker_manager: State<'_, DockerManager>,
    port_manager: State<'_, PortManager>,
) -> Result<(), String> {
    let container_info = docker_manager.stop_container(&plugin_id).await?;
    port_manager.release_port(container_info.port);
    Ok(())
}

#[tauri::command]
pub async fn reload_plugin(
    plugin_id: String,
    docker_manager: State<'_, DockerManager>,
    port_manager: State<'_, PortManager>,
) -> Result<(), String> {
    let old_container_info = docker_manager.stop_container(&plugin_id).await?;
    port_manager.release_port(old_container_info.port);

    let new_port = port_manager.get_available_port()?;
    docker_manager.start_container(&plugin_id, new_port).await?;
    port_manager.mark_port_as_used(new_port);
    Ok(())
}

#[tauri::command]
pub async fn get_plugins(docker_manager: State<'_, DockerManager>) -> Result<Vec<Plugin>, String> {
    docker_manager.list_plugins().await
}