import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Preloader from '../components/Preloader';
import logo from '../assets/malivelihood_kogi_logo.png';

const ApplicationForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section A
        fullName: '',
        gender: '',
        dob: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        lga: '',
        stateOrigin: '',
        nationality: '',
        // Section B
        isIndigene: '',
        indigeneLga: '',
        verificationMethod: '',
        // Section C
        educationLevel: '',
        institution: '',
        fieldOfStudy: '',
        graduationYear: '',
        // Section D
        hasExperience: '',
        experienceDesc: '',
        skills: '',
        vocationalTraining: '',
        // Section E
        essay: '',
        // Section F
        available: '',
        comply: '',
        relocate: '',
        // Section I
        declarationName: '',
        declarationDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Calculate age if DOB changes
            if (name === 'dob') {
                const birthDate = new Date(value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                newData.age = age >= 0 ? age.toString() : '';
            }

            return newData;
        });
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const totalSteps = 9;

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section A: Personal Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name (Surname First)</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Doe John" />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" name="age" value={formData.age} readOnly placeholder="Auto-calculated" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number (WhatsApp)</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234..." />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                            </div>
                            <div className="form-group full-width">
                                <label>Residential Address</label>
                                <textarea name="address" value={formData.address} onChange={handleChange} rows={2}></textarea>
                            </div>
                            <div className="form-group">
                                <label>LGA of Origin (Kogi)</label>
                                <input type="text" name="lga" value={formData.lga} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>State of Origin</label>
                                <input type="text" name="stateOrigin" value={formData.stateOrigin} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Nationality</label>
                                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section B: Kogi State Indigene Verification</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Are you an indigene of Kogi State?</label>
                                <select name="isIndigene" value={formData.isIndigene} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Please state your LGA clearly</label>
                                <input type="text" name="indigeneLga" value={formData.indigeneLga} onChange={handleChange} />
                            </div>
                            <div className="form-group full-width">
                                <label>How can your status be verified?</label>
                                <input type="text" name="verificationMethod" value={formData.verificationMethod} onChange={handleChange} placeholder="e.g. Certificate, Letter of Origin" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section C: Educational Background</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Highest Level of Education</label>
                                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
                                    <option value="">Select Level</option>
                                    <option value="Secondary School">Secondary School</option>
                                    <option value="OND / NCE">OND / NCE</option>
                                    <option value="HND / B.Sc.">HND / B.Sc.</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Name of Institution Attended</label>
                                <input type="text" name="institution" value={formData.institution} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Field of Study (if applicable)</label>
                                <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Year of Graduation</label>
                                <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
                            </div>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section D: Work Experience & Skills</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Prior Experience in Mining/Jewelry?</label>
                                <select name="hasExperience" value={formData.hasExperience} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Describe Experience (Max 150 words)</label>
                                <textarea name="experienceDesc" value={formData.experienceDesc} onChange={handleChange} rows={3}></textarea>
                            </div>
                            <div className="form-group full-width">
                                <label>Relevant Skills (Technical/Creative)</label>
                                <textarea name="skills" value={formData.skills} onChange={handleChange} rows={2}></textarea>
                            </div>
                            <div className="form-group full-width">
                                <label>Prior Vocational Training</label>
                                <input type="text" name="vocationalTraining" value={formData.vocationalTraining} onChange={handleChange} placeholder="Specify if any" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section E: Motivation Essay</h2>
                        <div className="form-group full-width">
                            <label>Personal Statement (250-500 words)</label>
                            <p className="field-hint">Tell us who you are, why you want to join, and how you will use these skills.</p>
                            <textarea
                                name="essay"
                                value={formData.essay}
                                onChange={handleChange}
                                rows={10}
                                style={{ minHeight: '300px' }}
                                placeholder="Write your essay here..."
                            ></textarea>
                        </div>
                    </motion.div>
                );
            case 6:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section F: Availability & Commitment</h2>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Are you available for the entire duration?</label>
                                <select name="available" value={formData.available} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Will you comply with all rules & assessments?</label>
                                <select name="comply" value={formData.comply} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Are you open to relocation if required?</label>
                                <select name="relocate" value={formData.relocate} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                );
            case 7:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section G: Document Uploads</h2>
                        <p className="field-hint" style={{ marginBottom: '2rem' }}>Please upload PDF or JPG files.</p>

                        <div className="form-grid">
                            {[
                                { label: "Valid Identification (ID/Passport/Voter's Card)", accept: ".pdf,.jpg,.jpeg,.png" },
                                { label: "Proof of Kogi State Indigene Status", accept: ".pdf,.jpg,.jpeg,.png" },
                                { label: "Recent Passport Photograph", accept: ".jpg,.jpeg,.png" },
                                { label: "Curriculum Vitae (Optional)", accept: ".pdf,.doc,.docx" }
                            ].map((doc, idx) => (
                                <div className="form-group" key={idx}>
                                    <label>{doc.label}</label>
                                    <div className="custom-file-upload">
                                        <input type="file" id={`file-${idx}`} accept={doc.accept} style={{ display: 'none' }} />
                                        <label htmlFor={`file-${idx}`} className="file-label">
                                            <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>📂</span>
                                            <span>Click to Upload File</span>
                                            <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', display: 'block' }}>{doc.accept.replace(/\./g, ' ').toUpperCase()}</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 8:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section H: Video Submission</h2>
                        <div className="form-group full-width">
                            <label>One-Minute Video (Mandatory)</label>
                            <p className="field-hint">
                                Upload a video (max 60s) introducing yourself, your LGA, and why you should be selected.
                            </p>
                            <div className="upload-box" style={{ border: '2px dashed #444', padding: '3rem', textAlign: 'center', marginTop: '1rem', borderRadius: '4px' }}>
                                <input type="file" accept="video/*" style={{ display: 'none' }} id="video-upload" />
                                <label htmlFor="video-upload" className="btn btn-outline">Select Video File</label>
                                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>Max size: 50MB</p>
                            </div>
                        </div>
                    </motion.div>
                );
            case 9:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="form-step">
                        <h2 className="title-md">Section I: Declaration</h2>
                        <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '2rem', borderLeft: '3px solid white', paddingLeft: '1rem' }}>
                            I hereby declare that all information provided in this application is true and accurate.
                            I understand that providing false information may lead to disqualification at any stage of the selection process.
                        </p>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name Signature</label>
                                <input type="text" name="declarationName" value={formData.declarationName} onChange={handleChange} placeholder="Type full name to sign" />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" name="declarationDate" value={formData.declarationDate} onChange={handleChange} />
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', padding: '2rem', background: '#111', borderRadius: '4px' }}>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Important Notes</h4>
                            <ul style={{ color: '#888', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li>Only shortlisted candidates will be contacted.</li>
                                <li>Submission of an application does not guarantee selection.</li>
                                <li>The selection process is strictly merit-based and transparent.</li>
                            </ul>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }

    };

    // Simulate initial page load
    useEffect(() => {
        // Preloader handles its own timing via onComplete, 
        // but we ensure it stays at least a moment if needed, 
        // essentially handled by the Preloader component's logic.
    }, []);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        }, 3000);
    };

    if (isLoading) {
        return <Preloader onComplete={() => setIsLoading(false)} />;
    }

    if (isSubmitted) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#050505',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ maxWidth: '600px' }}
                >
                    <div style={{ marginBottom: '2rem' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            style={{
                                width: '100px', height: '100px',
                                background: 'white', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto', color: 'black', fontSize: '3rem'
                            }}
                        >
                            ✓
                        </motion.div>
                    </div>
                    <h2 className="title-md" style={{ marginBottom: '1rem' }}>Application Received</h2>
                    <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '3rem' }}>
                        Thank you, {formData.fullName}. Your application for the Kogi State Youth Mining & Jewelry Craftsmanship Empowerment Programme has been submitted successfully.
                    </p>
                    <div style={{ padding: '1.5rem', border: '1px dashed #333', borderRadius: '4px', marginBottom: '3rem' }}>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Application Reference ID</p>
                        <p style={{ fontSize: '1.5rem', fontFamily: 'monospace', color: 'white' }}>KOGI-{Math.floor(Math.random() * 100000).toString().padStart(6, '0')}</p>
                    </div>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>If shortlisted, you will be contacted via email within 14 days.</p>
                    <button className="btn btn-outline" onClick={() => navigate('/')}>Return Home</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ background: '#050505', minHeight: '100vh', color: 'white', paddingTop: '100px', paddingBottom: '50px', position: 'relative' }}>

            {/* Submission Overlay */}
            {isSubmitting && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.9)', zIndex: 9999,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        width: '60px', height: '60px',
                        border: '4px solid #333', borderTop: '4px solid white',
                        borderRadius: '50%', animation: 'spin 1s linear infinite',
                        marginBottom: '1.5rem'
                    }}></div>
                    <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem' }}>Submitting Application...</h3>
                    <p style={{ color: '#888' }}>Please do not close this window.</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <img src={logo} alt="Logo" style={{ height: '60px', marginBottom: '1rem' }} />
                    <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Application Portal</h1>
                    <p style={{ color: '#888' }}>Step {step} of {totalSteps}</p>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '4px', background: '#222', marginTop: '1.5rem', position: 'relative' }}>
                        <div style={{
                            width: `${(step / totalSteps) * 100}%`,
                            height: '100%',
                            background: 'white',
                            transition: 'width 0.3s ease'
                        }}></div>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={(e) => e.preventDefault()}>
                    <AnimatePresence mode='wait'>
                        {renderStep()}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #222' }}>
                        {step > 1 ? (
                            <button className="btn btn-outline" onClick={prevStep}>Previous</button>
                        ) : (
                            <button className="btn btn-outline" onClick={() => navigate('/')}>Cancel</button>
                        )}

                        {step < totalSteps ? (
                            <button className="btn btn-primary" onClick={nextStep}>Next Step</button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit Application</button>
                        )}
                    </div>
                </form>

            </div>

            <style>{`
                .form-step {
                    min-height: 400px;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                .full-width {
                    grid-column: 1 / -1;
                }
                label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #888;
                    margin-bottom: 0.8rem;
                }
                input, select, textarea {
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid #333;
                    color: white;
                    padding: 0.8rem 0;
                    font-family: inherit;
                    font-size: 1rem;
                    border-radius: 0;
                    outline: none;
                    transition: all 0.3s;
                }
                input:focus, select:focus, textarea:focus {
                    border-bottom-color: white;
                }
                .custom-file-upload {
                    border: 1px dashed #444;
                    border-radius: 4px;
                    text-align: center;
                    transition: border-color 0.3s;
                }
                .custom-file-upload:hover {
                    border-color: #777;
                }
                .file-label {
                    display: block;
                    padding: 2rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                    color: #aaa;
                }
                .file-label:hover {
                    color: #fff;
                }
                .field-hint {
                    font-size: 0.85rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }
                select option {
                    background: #111;
                    color: white;
                }
                @media (max-width: 768px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ApplicationForm;
