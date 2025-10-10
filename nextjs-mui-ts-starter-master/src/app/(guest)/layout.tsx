import '@/styles/app.css';

export const metadata = {
    title: 'NextJS MUI TS Starter',
    description: 'A starter template for Next.js with Material-UI and TypeScript',
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

