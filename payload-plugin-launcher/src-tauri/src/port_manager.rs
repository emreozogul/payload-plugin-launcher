// src-tauri/src/port_manager.rs
use std::collections::HashSet;
use std::sync::Mutex;

pub struct PortManager {
    available_ports: Mutex<HashSet<u16>>,
}

impl PortManager {
    pub fn new(start_port: u16, end_port: u16) -> Self {
        let mut available_ports = HashSet::new();
        for port in start_port..=end_port {
            available_ports.insert(port);
        }
        PortManager {
            available_ports: Mutex::new(available_ports),
        }
    }

    pub fn get_available_port(&self) -> Result<u16, String> {
        let ports = self.available_ports.lock().unwrap();
        ports
            .iter()
            .next()
            .cloned()
            .ok_or_else(|| "No available ports".to_string())
    }

    pub fn mark_port_as_used(&self, port: u16) {
        let mut ports = self.available_ports.lock().unwrap();
        ports.remove(&port);
    }

    pub fn release_port(&self, port: u16) {
        let mut ports = self.available_ports.lock().unwrap();
        ports.insert(port);
    }
}
