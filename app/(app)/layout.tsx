import Navbar from '@/components/ui/navbar'; // Check karein path 'navbar' hai ya 'navBar'

interface LayoutProps {
  children: React.ReactNode;
}

// 'export default' hona bahut zaruri hai
export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}