import React from "react";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Clock, 
  Briefcase, 
  BarChart3,
  User,
  Settings,
  CheckSquare,
  DollarSign,
  Target,
  FormInput,
  PenTool,
  BookOpen,
  Megaphone,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pb-32">{children}</div> {/* Increased padding to accommodate more icons */}

      {/* Apple-like Bottom Taskbar - Updated with more icons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-7 bg-white/40 backdrop-blur-xl shadow-lg rounded-2xl px-4 py-3 border border-white/30 overflow-x-auto max-w-[90vw]">
        <Link href="/dashboard" className="hover:scale-110 transition flex-shrink-0" title="Home">
          <Home className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/employees" className="hover:scale-110 transition flex-shrink-0" title="Employees">
          <Users className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/calendar" className="hover:scale-110 transition flex-shrink-0" title="Calendar">
          <Calendar className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/time-off" className="hover:scale-110 transition flex-shrink-0" title="Time Off & Leave">
          <Clock className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/recruitment" className="hover:scale-110 transition flex-shrink-0" title="Recruitment">
          <Briefcase className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/timesheets" className="hover:scale-110 transition flex-shrink-0" title="Timesheets">
          <FileText className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/checklists" className="hover:scale-110 transition flex-shrink-0" title="Checklists">
          <CheckSquare className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/expenses" className="hover:scale-110 transition flex-shrink-0" title="Expenses">
          <DollarSign className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/goals" className="hover:scale-110 transition flex-shrink-0" title="Goals">
          <Target className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/performance" className="hover:scale-110 transition flex-shrink-0" title="Performance">
          <BarChart3 className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/forms" className="hover:scale-110 transition flex-shrink-0" title="Forms">
          <FormInput className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/esignatures" className="hover:scale-110 transition flex-shrink-0" title="eSignatures">
          <PenTool className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/library" className="hover:scale-110 transition flex-shrink-0" title="Library">
          <BookOpen className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/news" className="hover:scale-110 transition flex-shrink-0" title="News/Pods">
          <Megaphone className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/reports" className="hover:scale-110 transition flex-shrink-0" title="Reports">
          <BarChart3 className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/setup" className="hover:scale-110 transition flex-shrink-0" title="Setup">
          <Settings className="w-6 h-6 text-gray-700" />
        </Link>
        
        <Link href="/help" className="hover:scale-110 transition flex-shrink-0" title="Help">
          <HelpCircle className="w-6 h-6 text-gray-700" />
        </Link>
      </div>
    </div>
  );
};

export default Layout;