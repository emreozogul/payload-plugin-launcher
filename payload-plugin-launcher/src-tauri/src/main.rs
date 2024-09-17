// src-tauri/src/main.rs
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use payload_plugin_launcher_lib::{commands, docker, port_manager};
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let docker_manager = docker::DockerManager::new();
            let port_manager = port_manager::PortManager::new(3000, 4000); // Port range from 3000 to 4000
            app.manage(docker_manager);
            app.manage(port_manager);
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::upload_plugin,
            commands::start_plugin,
            commands::stop_plugin,
            commands::reload_plugin,
            commands::get_plugins
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
