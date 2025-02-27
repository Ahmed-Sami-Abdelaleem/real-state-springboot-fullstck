# Real-state

Project structure:
```
task-management/
├── docker-compose.yml
├── frontend/                  # Next.js application
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
└── backend/                   # Java EE application
    ├── Dockerfile
    ├── pom.xml
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   │   └── com/
    │   │   │       └── taskmanagement/
    │   │   │           ├── model/
    │   │   │           ├── repository/
    │   │   │           ├── service/
    │   │   │           ├── controller/
    │   │   │           └── config/
    │   │   ├── resources/
    │   │   │   ├── META-INF/
    │   │   │   │   └── persistence.xml
    │   │   │   └── application.properties
    │   │   └── webapp/
    │   │       └── WEB-INF/
    │   │           └── web.xml
    │   └── test/
└── mysql/
    ├── init.sql
    └── my.cnf
```