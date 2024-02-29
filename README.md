# Near Earth Object (NEO) Tracker

The NEO Tracker is a web application built with Next.js, designed to provide real-time data and insights on Near Earth Objects (NEOs) using NASA's open API. The application features an interactive dashboard that displays information about NEOs, including size, velocity, distance from Earth, and potential hazard status.

## Features

- **Interactive Dashboard**: Explore today's NEOs with an interactive dashboard that highlights key information.
- **NEO Details**: Get detailed information about each NEO, including its orbit path, size, close approach data, and more.
- **Data Visualization**: Visual representations of NEO data, making it easier to understand their characteristics and potential impact.
- **Responsive Design**: Access the NEO Tracker on any device, with a responsive layout optimized for both desktop and mobile.

## Getting Started

To run the NEO Tracker locally, follow these steps:

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/neo-tracker.git
    cd neo-tracker
    ```

2. **Install dependencies**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Set up environment variables**

    Rename `.env.local.example` to `.env.local` and fill in your NASA API key:

    ```plaintext
    NEXT_PUBLIC_NASA_API_KEY=YOUR_NASA_API_KEY_HERE
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Or with yarn:

    ```bash
    yarn dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Contributing

Contributions are welcome! Whether it's submitting an issue, proposing a feature, or submitting a pull request, all contributions are appreciated.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [NASA API](https://api.nasa.gov/) - Explore the APIs provided by NASA, including the NEO Web Service.

## Deploying Your Project

Deploying your Next.js app is easy with the Vercel platform, optimized for Next.js projects. [Start your deployment](https://vercel.com/new) and enjoy the benefits of serverless functions, global CDN, and more.

## License

This project is open source and available under the [MIT License](LICENSE).
