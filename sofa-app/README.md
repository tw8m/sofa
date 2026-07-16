# SOFA - Furniture Showroom & Maintenance App

## Features
- 🛋️ **Shop/Showroom** - Browse furniture products with bilingual support
- 📅 **Booking System** - Schedule maintenance services
- 💬 **Live Chat** - Real-time customer support chat
- 🌐 **Bilingual** - English and Arabic language toggle with RTL support
- 📞 **Contact Details** - Phone, Email, and WhatsApp integration
- 🎨 **Logo Space** - Designated header area for shop branding

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Custom CSS (no external dependencies)
- **API**: Next.js API Routes
- **Deployment**: Docker-ready with Nginx reverse proxy

## Project Structure
```
sofa-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts      # Get product by ID
│   │   │   │   └── route.ts          # List all products
│   │   │   ├── bookings/
│   │   │   │   └── route.ts          # Booking CRUD
│   │   │   └── chat/
│   │   │       └── route.ts          # Chat API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page component
├── public/                           # Static assets
├── nginx.conf                        # Nginx configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd sofa-app
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Submit product inquiry

### Bookings
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking

### Chat
- `POST /api/chat` - Send chat message

## Nginx Deployment

1. Build the Next.js app:
```bash
npm run build
```

2. Copy nginx.conf to your nginx configuration directory:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/sofa
sudo ln -s /etc/nginx/sites-available/sofa /etc/nginx/sites-enabled/
```

3. Start/restart nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Docker Deployment (Optional)

Create a Dockerfile:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t sofa-app .
docker run -p 3000:3000 sofa-app
```

## Environment Variables (for production)

Create a `.env.local` file:
```env
DATABASE_URL=your_database_url
EMAIL_SERVICE_API_KEY=your_email_api_key
WHATSAPP_API_KEY=your_whatsapp_api_key
```

## License

MIT License - feel free to use this project for your furniture showroom business!
