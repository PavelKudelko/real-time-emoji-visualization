# Reacting in Real-Time

A real-time emoji visualization system for live streams that captures audience reactions and highlights significant moments.

![EmoteStream Demo](media/demo.gif)

## Features
- Real-time emoji visualization from stream data
- Significant moment detection based on emoji frequency
- Customizable threshold and interval settings
- Emoji filtering capabilities
- Responsive video player integration

## Technologies
- **Backend**: Node.js with Express (two server architecture)
- **Frontend**: Vue with TypeScript and Tailwind CSS
- **Messaging**: Kafka for real-time data processing
- **Deployment**: Docker containers with NGinx

## Documentation
For detailed technical information, see the [full documentation](./documentation.md).

## Quick Start
```bash
# Clone the repository
git clone https://course-gitlab.tuni.fi/compcs510-spring2025/supersonic.git

# Launch with Docker
cd supersonic/
docker-compose up --build
```

## Contributors
Lu Jie (jie.lu@tuni.fi) ||
Pavel Kudelko (pavel.kudelko@tuni.fi)