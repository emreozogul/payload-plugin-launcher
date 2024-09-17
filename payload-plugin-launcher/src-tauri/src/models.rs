use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct PluginConfig {
    pub name: String,
    pub description: String,
    // Additional fields as needed
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Plugin {
    pub id: String,
    pub name: String,
    pub description: String,
    pub image: String,
    pub status: String,
    pub port: Option<u16>,
}
