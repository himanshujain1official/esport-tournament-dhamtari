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
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            Slots Open
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-1.5 uppercase tracking-tight font-display">
            Register Your Squad
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm font-sans">
           <span className="mx-1.5 text-gray-300">•</span> Free Entry <span className="mx-1.5 text-gray-300">•</span> Open for All <span className="mx-1.5 text-gray-300">•</span> Limited Slots
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-7 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submittedEntry ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5 relative z-10 font-sans"
              >
                {/* 1. Game & Team Info */}
                <div>
                  <h3 className="text-[14px] sm:text-xs uppercase font-bold tracking-wider text-blue-700 mb-3 font-mono flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[9px] text-blue-700">1</span>
                    Squad Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Game Choice */}
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        Select Game <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          name="game"
                          required
                          value={formData.game}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="FF">🔥 Free Fire (Squad BR)</option>
                          <option value="BGMI">🎮 BGMI (Squad BR)</option>
                        </select>
                      </div>
                    </div>

                    {/* Squad / Team Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        Squad / Team Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="teamName"
                          required
                          placeholder="e.g. Soul Reapers"
                          value={formData.teamName}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* College Name */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        College / Institution Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="collegeName"
                          required
                          placeholder="e.g. BCS Govt. PG College Dhamtari"
                          value={formData.collegeName}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Team Captain (Lead Contact) */}
                <div className="pt-2 border-t border-gray-200">
                  <h3 className="text-[14px] sm:text-xs uppercase font-bold tracking-wider text-blue-700 mb-3 font-mono flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[9px] text-blue-700">2</span>
                    Team Captain (Lead Contact)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Captain Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        Captain Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="captainName"
                          required
                          placeholder="Leader Name"
                          value={formData.captainName}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Captain UID */}
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        In-Game UID <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="captainUid"
                          required
                          placeholder="e.g. 518928371"
                          value={formData.captainUid}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Phone */}
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        WhatsApp No. <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          pattern="[0-9]{10}"
                          title="Please enter 10 digit mobile number"
                          placeholder="10-digit mobile"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Squad Roster (Players 2, 3, 4 & Sub) */}
                <div className="pt-2 border-t border-gray-200">
                  <h3 className="text-[14px] sm:text-xs uppercase font-bold tracking-wider text-blue-700 mb-3 font-mono flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[9px] text-blue-700">3</span>
                    Squad Roster
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        Player 2 (IGN / UID) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="player2"
                        required
                        placeholder="Player 2 UID"
                        value={formData.player2}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        Player 3 (IGN / UID) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="player3"
                        required
                        placeholder="Player 3 UID"
                        value={formData.player3}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-700">
                        Player 4 (IGN / UID) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="player4"
                        required
                        placeholder="Player 4 UID"
                        value={formData.player4}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] sm:text-xs font-medium text-gray-600">
                        Substitute (Optional)
                      </label>
                      <input
                        type="text"
                        name="substitute"
                        placeholder="Substitute Player UID"
                        value={formData.substitute}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl py-3 sm:py-3.5 mt-3 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed font-display shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Confirm & Register Squad</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              /* Success / Entry Pass Card */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-4 text-center relative z-10"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-black mb-1 font-display">
                  Registration Confirmed!
                </h3>
                <p className="text-gray-600 text-xs max-w-sm font-sans mb-4 px-2">
                  Your squad is registered for the Dhamtari Esports Tournament. Save your entry pass below.
                </p>

                {/* Pass Card */}
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left shadow-md mb-4 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase tracking-wider font-mono block">Entry Pass Code</span>
                      <span className="text-blue-600 font-mono font-bold text-base sm:text-lg">{submittedEntry.id}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {submittedEntry.game}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-sans mb-3">
                    <div>
                      <span className="text-gray-500 block text-[10px]">Squad Name</span>
                      <span className="text-gray-900 font-medium text-xs truncate block">{submittedEntry.teamName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">Captain</span>
                      <span className="text-gray-900 font-medium text-xs truncate block">{submittedEntry.captainName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">Captain UID</span>
                      <span className="text-gray-900 font-mono text-xs">{submittedEntry.captainUid}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">WhatsApp</span>
                      <span className="text-gray-900 font-mono text-xs">{submittedEntry.phone}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 text-[10px] sm:text-[11px] text-gray-700 space-y-0.5 font-sans">
                    <p><span className="text-gray-500">Roster:</span> {submittedEntry.player2}, {submittedEntry.player3}, {submittedEntry.player4}</p>
                    {submittedEntry.substitute && (
                      <p><span className="text-gray-500">Sub:</span> {submittedEntry.substitute}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-md">
                  <button
                    onClick={handleCopyPass}
                    className="w-full sm:flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-gray-200"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied Details!' : 'Copy Pass'}
                  </button>

                  <a
                    href="https://chat.whatsapp.com/Cg0q1d5T38t1KQUSFn7cfc"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    Join WhatsApp
                  </a>
                </div>

                <button
                  onClick={() => {
                    setSubmittedEntry(null);
                    setFormData({
                      game: '',
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
                  }}
                  className="mt-4 text-[11px] text-gray-500 hover:text-blue-600 underline underline-offset-4 cursor-pointer"
                >
                  Register Another Team
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Organizer / Admin Trigger */}
        <div className="mt-4 sm:mt-5 flex items-center justify-between px-1 text-[9px] sm:text-xs text-gray-500 font-sans">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{allRegistrations.length} {allRegistrations.length === 1 ? 'Squad' : 'Squads'} Registered</span>
          </div>
          <button
            onClick={handleOpenAdmin}
            className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <Lock className="w-3 h-3 group-hover:text-blue-600" />
            <span>Organizer Login</span>
          </button>
        </div>
      </ScrollReveal>

      {/* 1. Admin PIN Prompt Modal */}
      <AnimatePresence>
        {showPinPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl w-full max-w-sm p-5 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setShowPinPrompt(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3 shadow-sm">
                <KeyRound className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold text-black font-display mb-1">
                Organizer Access
              </h3>
              <p className="text-[11px] text-gray-600 font-sans mb-3.5">
                Enter your organizer passcode to view registered participants & export tournament data.
              </p>

              <form onSubmit={handleVerifyPin} className="space-y-3">
                <div>
                  <input
                    type="password"
                    required
                    placeholder="Enter Admin Passcode"
                    value={enteredPin}
                    onChange={(e) => {
                      setEnteredPin(e.target.value);
                      setPinError('');
                    }}
                    autoFocus
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg sm:rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-center tracking-widest font-mono"
                  />
                  {pinError && (
                    <p className="text-rose-600 text-[11px] mt-1 text-center font-sans">
                      {pinError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold rounded-xl text-xs sm:text-sm font-display transition-colors cursor-pointer shadow-sm"
                >
                  Unlock Dashboard
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Admin / Registered Teams Dashboard Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2 bg-gray-50">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black font-display flex items-center gap-1.5">
                      Organizer Dashboard
                      <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded-full font-mono font-normal">
                        {allRegistrations.length} Teams
                      </span>
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-sans">
                      Manage participants, export CSV, and sync with Google Sheets.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {allRegistrations.length > 0 && (
                    <button
                      onClick={exportCSV}
                      className="px-2.5 py-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                      Export CSV
                    </button>
                  )}
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Google Sheets Sync Settings Bar */}
              <div className="p-3 bg-gray-50 border-b border-gray-200 font-sans">
                <form onSubmit={handleSaveSheetUrl} className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-700 shrink-0">
                    <Sheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold">Google Sheet URL:</span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={sheetWebhookUrl}
                    onChange={(e) => setSheetWebhookUrl(e.target.value)}
                    className="flex-1 w-full bg-white border border-gray-200 text-gray-900 text-[11px] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono shadow-sm"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer shadow-sm"
                  >
                    {sheetSavedNotice ? 'Saved!' : 'Save Sheet'}
                  </button>
                </form>
              </div>

              {/* Search & Filter Controls */}
              <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white font-sans">
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search squad, leader, UID, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 pl-8 pr-2.5 py-1.5 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                {/* Game Filter Pills */}
                <div className="flex items-center gap-1 self-start sm:self-auto">
                  {(['All', 'FF', 'BGMI'] as const).map((game) => (
                    <button
                      key={game}
                      onClick={() => setFilterGame(game)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                        filterGame === game
                          ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              {/* Participants Table */}
              <div className="p-3 sm:p-5 overflow-y-auto flex-1 font-sans text-xs bg-white">
                {filteredRegistrations.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-xs">
                    {allRegistrations.length === 0
                      ? 'No registrations submitted yet. As participants register, they will appear here.'
                      : 'No participants match your search/filter.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 uppercase text-[9px] tracking-wider">
                          <th className="pb-2 px-2.5">Pass ID</th>
                          <th className="pb-2 px-2.5">Game</th>
                          <th className="pb-2 px-2.5">Squad Name</th>
                          <th className="pb-2 px-2.5">Captain & UID</th>
                          <th className="pb-2 px-2.5">WhatsApp</th>
                          <th className="pb-2 px-2.5">College</th>
                          <th className="pb-2 px-2.5">Roster</th>
                          <th className="pb-2 px-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-[11px]">
                        {filteredRegistrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-2.5 font-mono text-blue-600 font-semibold">{reg.id}</td>
                            <td className="py-2.5 px-2.5">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                                  reg.game === 'FF'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'bg-sky-50 text-sky-700 border border-sky-200'
                                }`}
                              >
                                {reg.game}
                              </span>
                            </td>
                            <td className="py-2.5 px-2.5 font-semibold text-gray-900">{reg.teamName}</td>
                            <td className="py-2.5 px-2.5 text-gray-800">
                              <div>{reg.captainName}</div>
                              <span className="text-[9px] text-gray-500 font-mono">UID: {reg.captainUid}</span>
                            </td>
                            <td className="py-2.5 px-2.5 text-gray-800 font-mono">
                              <a
                                href={`https://wa.me/91${reg.phone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                {reg.phone}
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </td>
                            <td className="py-2.5 px-2.5 text-gray-600 text-[10px] max-w-[120px] truncate" title={reg.collegeName}>
                              {reg.collegeName}
                            </td>
                            <td className="py-2.5 px-2.5 text-gray-600 text-[10px] max-w-[160px] truncate" title={`${reg.player2}, ${reg.player3}, ${reg.player4} ${reg.substitute ? `(Sub: ${reg.substitute})` : ''}`}>
                              {reg.player2}, {reg.player3}, {reg.player4}
                              {reg.substitute && <span className="text-gray-400"> (Sub: {reg.substitute})</span>}
                            </td>
                            <td className="py-2.5 px-2.5 text-right">
                              <button
                                onClick={() => deleteRegistration(reg.id)}
                                className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                title="Delete squad"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs font-sans">
                {allRegistrations.length > 0 && (
                  <button
                    onClick={clearAllData}
                    className="text-rose-600 hover:text-rose-700 text-[11px] flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear Records
                  </button>
                )}
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black ml-auto cursor-pointer font-display shadow-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
