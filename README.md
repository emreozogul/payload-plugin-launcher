# Payload Plugin Launcher

1. Create a new Tauri project with React:
```bash
npm init tauri-app plugin-based-app --template react-ts
cd plugin-based-app
```

2. Install additional dependencies:
```bash
npm install zustand react-router-dom
```

3. Update your `src-tauri/Cargo.toml` to include SQLite support:
```toml
[dependencies]
tauri = { version = "1.4", features = ["shell-open"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
rusqlite = { version = "0.29.0", features = ["bundled"] }
```
