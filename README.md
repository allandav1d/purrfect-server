# Purrfect Server

<div align="center">
  <img src="app/public/web-app-manifest-512x512.png" alt="Purrfect Server Logo" width="200" height="200"/>
  <br/>
  <br/>
  
  <p align="center">
    <strong>🚀 Your Universal Server Management Platform</strong>
  </p>
  
  <p align="center">
    <em>One platform to manage them all - From local development to bare metal servers</em>
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-roadmap">Roadmap</a> •
    <a href="#-contributing">Contributing</a>
  </p>

  <p align="center">
    <img alt="GitHub License" src="https://img.shields.io/github/license/allandav1d/purrfect-server">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/allandav1d/purrfect-server">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/allandav1d/purrfect-server">
  </p>
</div>

---

Purrfect Server is a versatile management solution designed to work seamlessly across different environments. Whether you're managing local development setups, bare metal servers, or cloud instances, it provides a unified interface for all your server management needs.

> ⚠️ **Development Status**: This project is in early development (alpha stage).
> - 🏗️ Core features are being actively developed
> - 🧪 Not recommended for production use yet
> - 👷 Breaking changes may occur
> - 📝 Documentation is work in progress
> - 🤝 Contributions and feedback are highly welcome!

### Why Purrfect Server?

- 🎯 **Versatile Deployment**: Works on bare metal servers, local environments, and cloud instances
- 🔄 **Environment Agnostic**: Same powerful features regardless of where you run it
- 🚀 **Zero Configuration**: Get started quickly with smart defaults for any environment
- 🔒 **Secure by Default**: Built-in security features and best practices
- 📊 **Universal Monitoring**: Monitor any type of server or container setup
- 🌐 **Flexible Networking**: Works with various network configurations and setups
- 🛠️ **Developer Friendly**: Perfect for both development and production environments
- 🔌 **Extensible**: Plugin system for customizing to your specific needs
- 💻 **Local First**: Optimized for local development with easy scaling to production
- 🔄 **Seamless Migration**: Easy transition between different environments

### Perfect For

- 🖥️ **Bare Metal Servers**: Direct hardware access and performance optimization
- 🏠 **Local Development**: Ideal for development and testing environments
- 🌐 **Small to Medium Deployments**: Scales with your needs
- 🔬 **Testing Environments**: Perfect for staging and QA setups
- 🏢 **Enterprise Usage**: Suitable for larger deployments with advanced needs

## 🚀 Features & Technology Stack

### Core Technology
- ⚡ **Modern Framework**: Built with Next.js 15 and Turbopack for lightning-fast performance
- 🎨 **Beautiful UI**: Crafted with TailwindCSS and Radix UI for a modern, responsive interface
- 🎯 **Type Safety**: Powered by TypeScript for robust development
- 🔄 **API Architecture**: Type-safe APIs with tRPC for reliable communication

### Security & Data
- 🔒 **Authentication**: Secure user management with NextAuth.js
- 🗃️ **Database**: PostgreSQL with Drizzle ORM for reliable data storage
- 🔐 **Access Control**: Role-based permissions and security best practices

### Infrastructure
- 🚦 **Reverse Proxy**: Nginx for efficient request handling and load balancing
- 📊 **Monitoring**: Real-time system metrics and performance tracking
- 🔄 **Container Support**: Docker integration for consistent deployments

## 📋 Prerequisites

- Node.js 18+ or Bun 1.2+
- Docker and Docker Compose
- Git

## 🛠️ Installation

### Automatic Method (Recommended)

1. Run the installation script: (Not available yet)
```bash
curl -o setup.sh https://raw.githubusercontent.com/allandav1d/purrfect-server/main/app/setup.sh
chmod +x setup.sh
./setup.sh
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/allandav1d/purrfect-server.git
cd purrfect-server
```

2. Set up environment variables:
```bash
cd app
cp .env.example .env
```

3. Install dependencies:
```bash
bun install
```

4. Start the database:
```bash
./start-database.sh
```

5. Run migrations:
```bash
bun db:push
```

6. Start development server:
```bash
bun dev
```

## 🚀 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build the project
- `bun start` - Start production server
- `bun lint` - Run linter
- `bun format:write` - Format code
- `bun db:push` - Update database
- `bun db:studio` - Open Drizzle Studio

## 🏗️ Project Structure

```
purrfect-server/
├── app/                   # Next.js application
│   ├── src/               # Source code
│   ├── public/            # Static files
│   └── drizzle/           # Database migrations
└── proxy/                 # Nginx configuration
    ├── conf.d/            # Additional configurations
    └── html/              # Proxy static files
```

## 🗺️ Roadmap

### Phase 1: Core Setup
- [x] Basic system monitoring
- [x] Authentication system
- [x] Database integration
- [x] API endpoints
- [ ] Basic Docker container management
- [ ] Container logs viewer
- [ ] Simple domain management
- [ ] Basic SSL certificate automation
- [ ] Email notifications
- [ ] Comprehensive documentation

### Phase 2: Basic Features
- [ ] Container health monitoring
- [ ] Container resource monitoring
- [ ] Custom alerts and notifications
- [ ] Application templates
- [ ] One-click app installations
- [ ] Basic backup system
- [ ] Resource usage monitoring
- [ ] Performance metrics dashboard
- [ ] User management
- [ ] Basic team collaboration

### Phase 3: Advanced Management
- [ ] Multi-domain management
- [ ] Automated DNS configuration
- [ ] Custom domain mapping
- [ ] Wildcard SSL certificates
- [ ] Container resource limits
- [ ] Docker container orchestration
- [ ] Automated database backups
- [ ] Performance optimization tools
- [ ] Resource quotas

### Phase 4: Deployment & Automation
- [ ] Branch-based deployments
- [ ] Deploy preview environments
- [ ] Basic CI/CD integration
- [ ] Automated scaling
- [ ] Simple load balancing
- [ ] Rollback capabilities
- [ ] Two-factor authentication
- [ ] Role-based access control
- [ ] Audit logging
- [ ] API rate limiting

### Phase 5: Enterprise Scale
- [ ] Advanced CI/CD pipeline
- [ ] Blue-green deployments
- [ ] Canary deployments
- [ ] Custom deployment strategies
- [ ] Infrastructure as Code
- [ ] Advanced load balancing
- [ ] High availability setup
- [ ] Disaster recovery
- [ ] Multi-region support
- [ ] Plugin system

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Maintainers

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/allandav1d">
        <img src="https://github.com/allandav1d.png" width="100px;" alt="Allan Amorim" style="border-radius:50%;"/>
        <br />
        <sub><b>Allan Amorim</b></sub>
      </a>
      <br />
      <sub>Core Developer</sub>
    </td>
  </tr>
</table>

## 🌟 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/allandav1d">
        <img src="https://github.com/allandav1d.png" width="70px;" alt="Allan Amorim" style="border-radius:50%;"/>
        <br />
        <sub>💻 📖 🎨</sub><br />
        <sub><b>Allan Amorim</b></sub>
      </a>
    </td>
    <!-- Add new contributors following the same pattern -->
    <!-- Example:
    <td align="center">
      <a href="https://github.com/username">
        <img src="https://github.com/username.png" width="70px;" alt="Contributor Name" style="border-radius:50%;"/>
        <br />
        <sub>🐛 💡</sub><br />
        <sub><b>Contributor Name</b></sub>
      </a>
    </td>
    -->
  </tr>
</table>

<sub>
💻 Code &nbsp;
📖 Documentation &nbsp;
🎨 Design &nbsp;
🐛 Bug Reports &nbsp;
💡 Ideas &nbsp;
🧪 Tests &nbsp;
👀 Reviews &nbsp;
💬 Discussions
</sub>

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- All open source package contributors
