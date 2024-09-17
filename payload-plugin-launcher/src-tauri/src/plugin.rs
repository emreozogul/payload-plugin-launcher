// src-tauri/src/plugin.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Plugin {
    pub id: String,
    pub name: String,
    pub description: String,
    pub path: String,
    pub container_id: Option<String>,
    pub port: Option<u16>,
}
