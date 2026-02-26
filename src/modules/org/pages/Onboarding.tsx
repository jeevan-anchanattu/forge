import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgeStore } from '@/shared/store';
import { Button, cn } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';
import {
    Building2,
    MapPin,
    DollarSign,
    FileText,
    Users,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Upload
} from 'lucide-react';

const STEPS = [
    { id: 1, title: 'Identity', icon: Building2 },
    { id: 2, title: 'Profile', icon: MapPin },
    { id: 3, title: 'Economics', icon: DollarSign },
    { id: 4, title: 'Templates', icon: FileText },
    { id: 5, title: 'Team', icon: Users },
];

export const OnboardingPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const { setOrg } = useForgeStore();

    const [formData, setFormData] = useState({
        name: '',
        industry: 'Mechanical Fabrication',
        country: 'Canada',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        email: '',
        taxId: '',
        overheadPct: 15,
        profitMargin: 20,
        labourRate: 85,
        logoUrl: '',
        documentTemplate: 'Industrial Dark',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, logoUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        if (currentStep === 1 && !formData.name.trim()) {
            setErrors({ name: 'Organization name is required' });
            return;
        }

        setErrors({});
        if (currentStep < 5) setCurrentStep(s => s + 1);
        else handleComplete();
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(s => s - 1);
    };

    const handleComplete = () => {
        // Mock completion
        setOrg({
            id: 'org_new',
            name: formData.name,
            slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
            industry: formData.industry,
            subscriptionTier: 'professional',
            featureOverrides: {},
            createdAt: new Date().toISOString()
        } as any);
        setCurrentStep(6); // Move to success step instead of dashboard
    };

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent-primary/5 via-bg-primary to-bg-primary">
            <div className="w-full max-w-4xl space-y-8">
                {/* Progress Header */}
                <div className="flex items-center justify-between px-4">
                    {STEPS.map((step) => (
                        <div key={step.id} className="flex flex-col items-center space-y-2 relative group flex-1">
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300 ${currentStep >= step.id
                                    ? 'bg-accent-primary border-accent-primary text-bg-primary shadow-glow'
                                    : 'bg-bg-card border-border-subtle text-text-tertiary'
                                    }`}
                            >
                                {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                            </div>
                            <span className={`text-[10px] uppercase font-bold tracking-widest ${currentStep >= step.id ? 'text-accent-primary' : 'text-text-tertiary'}`}>
                                {step.title}
                            </span>
                            {step.id < 5 && (
                                <div className={`absolute top-5 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] ${currentStep > step.id ? 'bg-accent-primary' : 'bg-border-subtle'}`} />
                            )}
                        </div>
                    ))}
                </div>

                <Card className="p-8 lg:p-12 border-accent-primary/10 shadow-glow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                        {/* Step 1: Identity */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Organization Identity</h2>
                                    <p className="text-text-secondary">Establish your fabrication facility's digital presence</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Organization Name"
                                        placeholder="e.g. Cambridge Precision Fabrication"
                                        value={formData.name}
                                        onChange={e => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({ ...errors, name: '' });
                                        }}
                                        error={errors.name}
                                        required
                                    />
                                    <Input
                                        label="Primary Industry"
                                        placeholder="Mechanical Fabrication"
                                        value={formData.industry}
                                        onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Facility Logo</label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleLogoUpload}
                                        accept="image/svg+xml,image/png,image/jpeg"
                                        className="hidden"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-32 w-full border-2 border-dashed border-border-subtle rounded-xl flex flex-col items-center justify-center space-y-2 hover:border-accent-primary/40 hover:bg-surface/50 transition-all cursor-pointer group overflow-hidden"
                                    >
                                        {formData.logoUrl ? (
                                            <img src={formData.logoUrl} alt="Logo Preview" className="h-full w-full object-contain p-4" />
                                        ) : (
                                            <>
                                                <Upload className="h-8 w-8 text-text-tertiary group-hover:text-accent-primary transition-colors" />
                                                <span className="text-sm text-text-secondary group-hover:text-text-primary">Click to upload SVG or PNG logo</span>
                                            </>
                                        )}
                                    </div>
                                    {formData.logoUrl && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({ ...formData, logoUrl: '' });
                                            }}
                                            className="text-[10px] text-error uppercase font-bold tracking-widest self-end hover:underline"
                                        >
                                            Remove Logo
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Profile */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Company Profile</h2>
                                    <p className="text-text-secondary">Physical address and legal identifiers for legal documents</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <Input label="Street Address" placeholder="123 Engineering Way" />
                                    </div>
                                    <Input label="City" placeholder="Cambridge" />
                                    <Input label="Province/State" placeholder="Ontario" />
                                    <Input label="Postal Code" placeholder="N3C 1A1" />
                                    <Input label="Phone Number" placeholder="+1 (519) 555-0100" />
                                </div>
                                <Input label="Tax ID / VAT Registration" placeholder="GST #123456789RT0001" />
                            </div>
                        )}

                        {/* Step 3: Economics */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Economic Defaults</h2>
                                    <p className="text-text-secondary">Set standard rates for quotations and financial forecasting</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Input label="Standard Labour Rate ($/hr)" type="number" defaultValue={85} />
                                    <Input label="Overhead Percentage (%)" type="number" defaultValue={15} />
                                    <Input label="Target Profit Margin (%)" type="number" defaultValue={20} />
                                </div>
                                <div className="p-4 bg-surface rounded-lg border border-border-subtle space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent-primary">Base Rate Calculator Preview</h4>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Fully Burdened Hourly Rate</span>
                                        <span className="text-text-primary font-mono font-bold">$117.30</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Templates */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Document Aesthetics</h2>
                                    <p className="text-text-secondary">Choose how your quotations and reports are presented to clients</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Industrial Dark', 'Clean Engineering', 'Modern Minimalist', 'High Contrast'].map(t => (
                                        <div
                                            key={t}
                                            onClick={() => setFormData({ ...formData, documentTemplate: t })}
                                            className={cn(
                                                "p-4 border rounded-xl bg-surface transition-all cursor-pointer flex items-center group",
                                                formData.documentTemplate === t
                                                    ? "border-accent-primary shadow-glow-sm"
                                                    : "border-border-subtle hover:border-accent-primary/50"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-4 w-4 rounded-full border mr-3 flex items-center justify-center transition-all",
                                                formData.documentTemplate === t
                                                    ? "border-accent-primary bg-accent-primary"
                                                    : "border-border-subtle group-hover:border-accent-primary"
                                            )}>
                                                {formData.documentTemplate === t && <div className="h-1.5 w-1.5 rounded-full bg-bg-primary" />}
                                            </div>
                                            <span className={cn(
                                                "text-sm font-medium transition-colors",
                                                formData.documentTemplate === t ? "text-accent-primary" : "text-text-primary"
                                            )}>
                                                {t}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 5: Invite Team */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Construct Your Team</h2>
                                    <p className="text-text-secondary">Invite your first collaborators to the control center</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex space-x-3">
                                        <div className="flex-1">
                                            <Input placeholder="colleague@company.com" />
                                        </div>
                                        <select className="bg-surface border border-border-subtle rounded-md px-3 text-sm text-text-primary outline-none focus:ring-1 focus:ring-accent-primary">
                                            <option>Coordinator</option>
                                            <option>Contributor</option>
                                            <option>Reviewer</option>
                                        </select>
                                        <Button variant="secondary">Add</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Success */}
                        {currentStep === 6 && (
                            <div className="space-y-6 text-center py-10">
                                <div className="mx-auto h-20 w-20 rounded-full bg-accent-primary/20 border border-accent-primary/40 flex items-center justify-center mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-accent-primary" />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Organization Created</h2>
                                <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                                    An email has been sent to the admin account. Please use the link provided in the email to set your initial username and password, and then log in to the system for the first time.
                                </p>
                                <div className="pt-8 text-center">
                                    <Button
                                        variant="primary"
                                        className="px-10 font-bold"
                                        onClick={() => {
                                            const { logout } = useForgeStore.getState();
                                            logout();
                                            navigate('/login');
                                        }}
                                    >
                                        Return to Login
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        {currentStep < 6 && (
                            <div className="pt-8 flex justify-between border-t border-border-subtle">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="group"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Previous Step
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={nextStep}
                                    className="px-8 font-bold"
                                >
                                    {currentStep === 5 ? 'Complete Setup' : 'Continue'}
                                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
