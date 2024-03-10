conn = new Mongo();

db = conn.getDB("mern-auth-refresh-token");

db.users.insert({ "username": "testuser123", "email": "testuser123@email.com", "password": "$2b$10$jPDVLSUS/9ZdWvunlx0D3uiU8JSMB0f2d4v9Rd84o2Z4F9TeIvZga" });
