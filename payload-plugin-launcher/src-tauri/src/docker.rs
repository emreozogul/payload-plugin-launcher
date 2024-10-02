// src-tauri/src/docker.rs
use bollard::Docker;
use bollard::image::BuildImageOptions;
use futures_util::stream::StreamExt;
use std::sync::Arc;
use tokio::sync::Mutex;
use crate::plugin::Plugin;

pub struct DockerManager {
    docker: Arc<Mutex<Docker>>,
}

pub struct ContainerInfo {
    pub id: String,
    pub port: u16,
}

impl DockerManager {
    pub fn new() -> Self {
        let docker = Docker::connect_with_local_defaults().expect("Failed to connect to Docker");
        DockerManager {
            docker: Arc::new(Mutex::new(docker)),
        }
    }

    pub async fn build_image(&self, plugin_path: &str, tag: &str) -> Result<(), String> {
        let docker = self.docker.lock().await;
        let mut build_opts = BuildImageOptions::default();
        build_opts.dockerfile = "Dockerfile";
        build_opts.t = tag;

        let tar_ball = tokio::fs::read(plugin_path).await.map_err(|e| e.to_string())?;

        let mut build_stream = docker.build_image(build_opts, None, Some(tar_ball.into()));

        while let Some(build_result) = build_stream.next().await {
            match build_result {
                Ok(output) => {
                    // Process build output if needed
                    println!("Build output: {:?}", output);
                }
                Err(e) => {
                    return Err(format!("Error during image build: {}", e));
                }
            }
        }

        Ok(())
    }

    pub async fn start_container(&self, image: &str, port: u16) -> Result<ContainerInfo, String> {
        let docker = self.docker.lock().await;
        // Implement container start logic using bollard
        // This is a placeholder and needs to be implemented with actual Docker SDK calls
        println!("Starting container for image {} on port {}", image, port);
        Ok(ContainerInfo {
            id: "placeholder_id".to_string(),
            port,
        })
    }

    pub async fn stop_container(&self, container_id: &str) -> Result<ContainerInfo, String> {
        let docker = self.docker.lock().await;
        // Implement container stop logic using bollard
        // This is a placeholder and needs to be implemented with actual Docker SDK calls
        println!("Stopping container {}", container_id);
        Ok(ContainerInfo {
            id: container_id.to_string(),
            port: 0, // In a real implementation, you'd return the actual port that was used
        })
    }

    pub async fn list_plugins(&self) -> Result<Vec<Plugin>, String> {
        let docker = self.docker.lock().await;
        // Implement logic to list all plugins (containers) using bollard
        // This is a placeholder and needs to be implemented with actual Docker SDK calls
        Ok(vec![])
    }
}