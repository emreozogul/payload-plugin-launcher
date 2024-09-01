use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Plugin {
    pub id: i32,
    pub name: String,
    pub version: String,
    pub manifest_file: String,
    pub env_vars: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub access_token: String,
    pub user_id: Option<String>,
}

pub fn init_database(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS plugin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            version TEXT NOT NULL,
            manifest_file TEXT NOT NULL,
            env_vars TEXT NOT NULL
        )",
        [],
    )?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            access_token TEXT NOT NULL,
            user_id TEXT
        )",
        [],
    )?;
    Ok(())
}

pub fn get_plugins(conn: &Connection) -> Result<Vec<Plugin>, rusqlite::Error> {
    let mut stmt = conn.prepare("SELECT id, name, version, manifest_file, env_vars FROM plugin")?;
    let plugin_iter = stmt.query_map([], |row| {
        Ok(Plugin {
            id: row.get(0)?,
            name: row.get(1)?,
            version: row.get(2)?,
            manifest_file: row.get(3)?,
            env_vars: serde_json::from_str(row.get::<_, String>(4)?.as_str()).unwrap(),
        })
    })?;

    plugin_iter.collect()
}

pub fn add_plugin(conn: &Connection, plugin: Plugin) -> Result<(), rusqlite::Error> {
    conn.execute(
        "INSERT INTO plugin (name, version, manifest_file, env_vars) VALUES (?1, ?2, ?3, ?4)",
        params![
            plugin.name,
            plugin.version,
            plugin.manifest_file,
            serde_json::to_string(&plugin.env_vars).unwrap()
        ],
    )?;
    Ok(())
}
