import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import {
  CheckCircle2,
  Loader2,
  Gamepad2,
  Hash,
  Phone,
  User,
  Users,
  Building,
  Copy,
  Check,
  Download,
  Lock,
  KeyRound,
  MessageCircle,
  X,
  Search,
  Trash2,
  Sheet,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { section } from 'framer-motion/m';

export interface RegistrationData {
  id: string;
  timestamp: string;
  game: 'FF' | 'BGMI';
  teamName: string;
  captainName: string;
  captainUid: string;
  phone: string;
  collegeName: string;
  player2: string;
  player3: string;
  player4: string;
  substitute?: string;
}

const STORAGE_KEY = 'dhamtari_esports_registrations';
const GOOGLE_SHEET_URL_KEY = 'dhamtari_google_sheet_url';
const ADMIN_PIN_KEY = 'dhamtari_admin_pin';
const DEFAULT_ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || 'Himan123';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    game: 'FF',
    teamName: '',
    captainName: '',
    captainUid: '',
    phone: '',
    collegeName: '',
    player2: '',
    player3: '',
    player4: '',
    substitute: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState<RegistrationData | null>(null);
  const [copied, setCopied] = useState(false);

  // Admin & Security States
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Admin Search & Filter
  const [allRegistrations, setAllRegistrations] = useState<RegistrationData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGame, setFilterGame] = useState<'All' | 'FF' | 'BGMI'>('All');

  // Google Sheet Webhook URL
  const [sheetWebhookUrl, setSheetWebhookUrl] = useState('');
  const [sheetSavedNotice, setSheetSavedNotice] = useState(false);

  // Load registered teams and configured settings
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAllRegistrations(JSON.parse(stored));
      }
      const savedSheet = localStorage.getItem(GOOGLE_SHEET_URL_KEY) || import.meta.env.VITE_GOOGLE_SHEETS_URL || '';
      if (savedSheet) {
        setSheetWebhookUrl(savedSheet);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendToGoogleSheets = async (entry: RegistrationData) => {
    const targetUrl = sheetWebhookUrl || import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (!targetUrl) return;

    try {
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.warn('Google Sheets sync notice:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const gameLabel = formData.game === 'BGMI' ? 'BGMI' : 'FF';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `DHAM-${formData.game}-${randomCode}`;

    const newEntry: RegistrationData = {
      id: generatedId,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      game: gameLabel,
      teamName: formData.teamName.trim(),
      captainName: formData.captainName.trim(),
      captainUid: formData.captainUid.trim(),
      phone: formData.phone.trim(),
      collegeName: formData.collegeName.trim() || 'BCS Govt. PG College',
      player2: formData.player2.trim(),
      player3: formData.player3.trim(),
      player4: formData.player4.trim(),
      substitute: formData.substitute.trim(),
    };

    // Save locally
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const list: RegistrationData[] = existing ? JSON.parse(existing) : [];
      const updated = [newEntry, ...list];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setAllRegistrations(updated);
    } catch (err) {
      console.error('Failed to save to local storage:', err);
    }

    // Send to Google Sheets
    await sendToGoogleSheets(newEntry);

    setIsSubmitting(false);
    setSubmittedEntry(newEntry);
  };

  const handleCopyPass = () => {
    if (!submittedEntry) return;
    const text = `🎮 *DHAMTARI ESPORTS TOURNAMENT ENTRY PASS*\n` +
      `Registration ID: ${submittedEntry.id}\n` +
      `Game: ${submittedEntry.game}\n` +
      `Squad Name: ${submittedEntry.teamName}\n` +
      `Captain: ${submittedEntry.captainName} (UID: ${submittedEntry.captainUid})\n` +
      `Phone: ${submittedEntry.phone}\n` +
      `College: ${submittedEntry.collegeName}\n` +
      `Members: ${submittedEntry.player2}, ${submittedEntry.player3}, ${submittedEntry.player4}` +
      (submittedEntry.substitute ? `\nSub: ${submittedEntry.substitute}` : '');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Admin Verification Logic
  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setShowAdminModal(true);
    } else {
      setEnteredPin('');
      setPinError('');
      setShowPinPrompt(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN;
    if (enteredPin === storedPin) {
      setIsAdminAuthenticated(true);
      setShowPinPrompt(false);
      setShowAdminModal(true);
      setPinError('');
    } else {
      setPinError('Incorrect Passcode. Access denied.');
    }
  };

  const handleSaveSheetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(GOOGLE_SHEET_URL_KEY, sheetWebhookUrl.trim());
    setSheetSavedNotice(true);
    setTimeout(() => setSheetSavedNotice(false), 3000);
  };

  const deleteRegistration = (id: string) => {
    if (window.confirm('Delete this registration record?')) {
      const updated = allRegistrations.filter((r) => r.id !== id);
      setAllRegistrations(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const exportCSV = () => {
    if (allRegistrations.length === 0) return;
    const headers = [
      'Reg ID',
      'Date',
      'Game',
      'Squad Name',
      'Captain Name',
      'Captain UID',
      'WhatsApp Phone',
      'College',
      'Player 2',
      'Player 3',
      'Player 4',
      'Substitute',
    ];
    const rows = allRegistrations.map((r) => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.game}"`,
      `"${r.teamName}"`,
      `"${r.captainName}"`,
      `"${r.captainUid}"`,
      `"${r.phone}"`,
      `"${r.collegeName}"`,
      `"${r.player2}"`,
      `"${r.player3}"`,
      `"${r.player4}"`,
      `"${r.substitute || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dhamtari_esports_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllData = () => {
    if (window.confirm('WARNING: Are you sure you want to clear ALL registered participants stored in this browser?')) {
      localStorage.removeItem(STORAGE_KEY);
      setAllRegistrations([]);
    }
  };

  // Filtered registrations for admin view
  const filteredRegistrations = allRegistrations.filter((reg) => {
    const matchesGame = filterGame === 'All' || reg.game === filterGame;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      reg.id.toLowerCase().includes(q) ||
      reg.teamName.toLowerCase().includes(q) ||
      reg.captainName.toLowerCase().includes(q) ||
      reg.captainUid.toLowerCase().includes(q) ||
      reg.phone.includes(q);
    return matchesGame && matchesSearch;
  });

  return (
    <section id="register" className="py-7 sm:py-14 md:py-16 px-4 sm:px-6 relative z-10 max-w-3xl mx-auto bg-white">
      <ScrollReveal>

  <div className="flex flex-col items-center justify-center py-12 px-4">
  {/* Heading Section */}
  <div className="text-center mb-8">
    <span className="text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200">
      SLOTS OPEN
    </span>
    <h2 className="text-4xl font-extrabold text-black mt-5 tracking-tight">
      REGISTER YOUR SQUAD
    </h2>
    <div className="flex items-center justify-center gap-3 text-gray-600 mt-3 font-medium">
      <span>Free Entry</span>
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
      <span>Open for All</span>
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
      <span>Limited Slots</span>
    </div>
  </div>

  {/* Direct Google Form Button */}
  <a
    href="https://forms.gle/SAgEewwLX5LCP9y2A"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
  >
    <span>Register Now via Google Form</span>
    {/* Simple arrow icon */}
    <svg 
      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  </a>
</div>
      
      </ScrollReveal>

      <AnimatePresence>
        

      </AnimatePresence>
    </section>
  );
}
