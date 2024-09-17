// src-tauri/src/commands.rs
use crate::docker::DockerManager;
use crate::port_manager::PortManager;
use crate::plugin::Plugin;
use tauri::State;

#[tauri::command]
pub async fn upload_plugin(
    plugin: Plugin,
    docker_manager: State<'_, DockerManager>,
) -> Result<(), String> {
    docker_manager.build_image(&plugin.path, &plugin.name).await
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