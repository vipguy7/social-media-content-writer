
import { Sparkles, FileText, Users, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Added
import { Button } from '@/components/ui/button'; // Added
import { Link, useNavigate } from 'react-router-dom'; // Added

const Header = () => {
  const { user, logout, loading } = useAuth(); // Added
  const navigate = useNavigate(); // Added
  return (
    <header className="bg-background border-b border-border text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <div className="p-3 bg-card border rounded-lg">
              <Sparkles className="w-8 h-8 text-primary animate-float" />
            </div>
            <div>
              <h1 className="text-3xl font-bold myanmar-heading text-foreground">
                လက်ထောက် စာရေးလေး
              </h1>
              <p className="text-muted-foreground text-lg font-english mt-1">
                AI ဖြင့် မြန်မာဘာသာပိုစ့်များ ရေးသားခြင်း
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm animate-slide-in-right">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <>
                <Link to="/history">
                  <Button variant="ghost">History</Button>
                </Link>
                <span className="text-muted-foreground hidden sm:inline">{user.email}</span>
                <Button variant="outline" onClick={async () => { await logout(); navigate('/'); }}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
            {/* The following links can be kept or moved into a user dropdown if needed */}
            {/*
            <div className="hidden lg:flex items-center gap-3 p-3 bg-card border rounded-lg hover:bg-muted transition-all duration-300">
                <FileText className="w-5 h-5 text-primary" />
                <span className="myanmar-text font-medium text-foreground">ပရော်ဖက်ရှင်နယ် ပိုစ့်</span>
              </div>
              <div className="hidden lg:flex items-center gap-3 p-3 bg-card border rounded-lg hover:bg-muted transition-all duration-300">
                <Users className="w-5 h-5 text-primary" />
                <span className="myanmar-text font-medium text-foreground">ယဉ်ကျေးမှု အလေးပေးမှု</span>
              </div>
              <div className="hidden lg:flex items-center gap-3 p-3 bg-card border rounded-lg hover:bg-muted transition-all duration-300">
                <Globe className="w-5 h-5 text-primary" />
                <span className="myanmar-text font-medium text-foreground">ဒေသဆိုင်ရာ ဗဟုသုတ</span>
              </div>
            */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
