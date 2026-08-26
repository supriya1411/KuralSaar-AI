import { NormalizedLegalKnowledge } from '../types';

export const LEGAL_DISCLAIMER_TEXT =
  'Educational legal reference. Verify current law using authoritative sources for real-world legal matters.';

export const RAW_LEGAL_DATASET: NormalizedLegalKnowledge[] = [
  {
    id: 'legal-qa-1',
    question: 'What constitutes an unlawful conflict of interest for an advocate or legal practitioner in India?',
    answer:
      'Under the Bar Council of India Rules (framed under the Advocates Act, 1961), an advocate must not accept a brief or appear in a case where there is a direct conflict of interest, such as representing opposing parties, having a personal pecuniary stake in the subject matter, or having previously advised the adverse party on confidential facts. Section 35 of the Advocates Act penalizes professional misconduct. The fundamental ethical mandate requires undivided loyalty to the client while upholding paramount duty to the court.',
    category: 'Professional Ethics & Advocates Act',
    legalConcepts: ['Conflict of Interest', 'Fiduciary Duty', 'Client Loyalty', 'Professional Misconduct'],
    keywords: ['advocate', 'conflict of interest', 'bar council', 'misconduct', 'client loyalty', 'advocates act 1961', 'fiduciary'],
    source: 'Bar Council of India Rules, Part VI, Chapter II (Standards of Professional Conduct and Etiquette)',
    metadata: {
      statute: 'Advocates Act, 1961 (Section 35) & Bar Council of India Rules',
      sectionCode: 'Section 35 Advocates Act 1961 / Rule 22 BCI Rules',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'The Indian legal framework strictly distinguishes between legitimate zealous advocacy and impermissible multi-party representation.',
      complexity: 'Fundamental',
      applicability: 'All practicing advocates, legal firms, and in-house counsels in India'
    },
    searchText: 'conflict of interest advocate legal practitioner bar council of india advocates act 1961 professional misconduct fiduciary duty loyalty'
  },
  {
    id: 'legal-qa-2',
    question: 'What are the legal provisions against cyberbullying, online harassment, and unauthorized publication of private photos in India?',
    answer:
      'Online harassment and cyberbullying are addressed across multiple statutes: Section 66E of the Information Technology Act, 2000 punishes intentional capture, publication, or transmission of images of private areas of a person without consent. Section 67 penalizes publishing obscene digital content. Under Bharatiya Nyaya Sanhita (BNS) 2023, Section 78 addresses stalking (including electronic and cyber stalking, formerly Section 354D IPC), and Section 79 punishes acts intended to insult the modesty of a woman (formerly Section 509 IPC). Section 356 BNS penalizes criminal defamation.',
    category: 'Cyber Law & Digital Rights',
    legalConcepts: ['Cyber Stalking', 'Privacy Violation', 'Digital Harassment', 'Online Bullying', 'Defamation'],
    keywords: ['cyberbullying', 'it act 2000', 'section 66e', 'stalking', 'harassment', 'privacy', 'online safety', 'bns 78', 'whatsapp', 'messages', 'monitor'],
    source: 'Information Technology Act, 2000 & Bharatiya Nyaya Sanhita, 2023',
    metadata: {
      statute: 'Information Technology Act, 2000 (Sec 66E, 67) & BNS 2023 (Sec 78, 79, 356)',
      sectionCode: 'IT Act 66E / BNS Sec 78 (formerly IPC 354D)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Transitioned from IPC provisions (354D, 509) to modernized BNS 2023 definitions with explicit coverage for digital communications.',
      complexity: 'Intermediate',
      applicability: 'Electronic communications, social media platforms, cyber offenses'
    },
    searchText: 'cyberbullying online harassment unauthorized photos privacy it act 2000 section 66e section 67 stalking bns section 78 defamation whatsapp monitor employee'
  },
  {
    id: 'legal-qa-3',
    question: 'How does Indian law define and penalize Online Fraud, Phishing, and Impersonation Cheating?',
    answer:
      'Cyber fraud and phishing are penalized primarily under the Information Technology Act, 2000 and the Bharatiya Nyaya Sanhita, 2023. Section 66D of the IT Act specifically punishes cheating by personation by using computer resources or communication devices with imprisonment up to 3 years and fine. Section 66C punishes identity theft (fraudulent use of electronic signatures, passwords, or unique identification features). Under BNS 2023, Section 318 penalizes cheating (formerly Section 420 IPC), and Section 336 deals with forgery of electronic records.',
    category: 'Cyber Crime & Financial Integrity',
    legalConcepts: ['Phishing', 'Identity Theft', 'Cheating by Personation', 'Cyber Fraud', 'Electronic Forgery'],
    keywords: ['phishing', 'online fraud', 'it act section 66d', 'identity theft', 'cheating', 'bns section 318', 'otp scam'],
    source: 'IT Act 2000 (Sections 66C, 66D) & Bharatiya Nyaya Sanhita 2023 (Sec 318, 336)',
    metadata: {
      statute: 'Information Technology Act 2000 & BNS 2023',
      sectionCode: 'IT Act 66C, 66D / BNS 318 (formerly IPC 420)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Financial fraud via UPI, SIM swaps, and credential phishing is actively prosecuted under hybrid IT Act and Penal Code provisions.',
      complexity: 'Fundamental',
      applicability: 'Digital banking, online transactions, cyber financial scams'
    },
    searchText: 'online fraud phishing cheating by personation it act section 66d section 66c identity theft otp scam bns 318 financial crime'
  },
  {
    id: 'legal-qa-4',
    question: 'What constitutes the criminal offense of Theft and Dishonest Misappropriation of Property in India?',
    answer:
      'Theft is defined under Section 303 of the Bharatiya Nyaya Sanhita, 2023 (formerly Section 378 IPC) as intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, and moving that property in order to such taking. Dishonest Misappropriation of Property is penalized under Section 314 BNS (formerly Section 403 IPC), where a person converts property already in their possession to their own dishonest use. Dishonest intention (Mens Rea) to cause wrongful gain or wrongful loss is the essential ingredient.',
    category: 'Criminal Law & Property Rights',
    legalConcepts: ['Theft', 'Dishonest Misappropriation', 'Mens Rea', 'Wrongful Gain', 'Wrongful Loss'],
    keywords: ['theft', 'misappropriation', 'bns 303', 'ipc 378', 'movable property', 'mens rea', 'wrongful gain', 'lost wallet', 'found money'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 303, 314)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Chapter XVII)',
      sectionCode: 'BNS Section 303 (formerly IPC 378) / BNS Section 314 (formerly IPC 403)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Replaced traditional Indian Penal Code 1860 classifications with streamlined BNS 2023 definitions.',
      complexity: 'Fundamental',
      applicability: 'All offenses against movable property and conversion'
    },
    searchText: 'theft dishonest misappropriation of property bns section 303 ipc 378 mens rea wrongful gain movable property consent lost wallet street found money'
  },
  {
    id: 'legal-qa-5',
    question: 'What are the constitutional guarantees against discrimination under Articles 14, 15, and 17 of the Indian Constitution?',
    answer:
      'Article 14 guarantees equality before the law and equal protection of the laws within the territory of India, prohibiting arbitrary state action. Article 15(1) strictly prohibits the State from discriminating against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. Article 15(2) ensures equal access to public spaces, shops, and utilities. Article 17 abolishes "Untouchability" and forbids its practice in any form, enforceable under the Protection of Civil Rights Act, 1955 and the SC/ST (Prevention of Atrocities) Act, 1989.',
    category: 'Constitutional Law & Human Rights',
    legalConcepts: ['Right to Equality', 'Non-Discrimination', 'Abolition of Untouchability', 'Equal Protection', 'Rule of Law'],
    keywords: ['constitution', 'article 14', 'article 15', 'article 17', 'equality', 'non discrimination', 'civil rights'],
    source: 'Constitution of India (Part III - Fundamental Rights)',
    metadata: {
      statute: 'Constitution of India (Articles 14, 15, 17)',
      sectionCode: 'Articles 14, 15, 17 of the Indian Constitution',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Landmark judicial interpretations (e.g. Maneka Gandhi v. UOI, Navtej Johar v. UOI) have expanded Article 14 to strike down arbitrariness and affirm human dignity.',
      complexity: 'Intermediate',
      applicability: 'All public organs, statutory bodies, and state instrumentalities'
    },
    searchText: 'constitutional equality article 14 article 15 article 17 non discrimination rule of law fundamental rights civil rights human dignity'
  },
  {
    id: 'legal-qa-6',
    question: 'What are the key offenses and whistleblower protections under the Prevention of Corruption Act, 1988 in India?',
    answer:
      'The Prevention of Corruption Act, 1988 (amended in 2018) penalizes public servants who accept, obtain, or agree to accept any undue advantage with the intention of performing a public duty improperly (Section 7). Giving an undue advantage (bribing a public servant) is penalized under Section 8. Commercial organizations can also be held liable for bribery under Section 9 unless they had adequate preventive procedures in place. Whistleblowers who expose corruption in good faith are protected under the Whistle Blowers Protection Act, 2014.',
    category: 'Anti-Corruption & Governance',
    legalConcepts: ['Bribery', 'Undue Advantage', 'Public Duty', 'Corporate Liability', 'Whistleblower Protection'],
    keywords: ['corruption', 'bribe', 'prevention of corruption act', 'public servant', 'whistleblower', 'pca 1988', 'undue advantage', 'hospital'],
    source: 'Prevention of Corruption Act, 1988 (Amended 2018) & Whistle Blowers Protection Act, 2014',
    metadata: {
      statute: 'Prevention of Corruption Act, 1988 (Sections 7, 8, 9)',
      sectionCode: 'PC Act 1988 Sec 7, 8, 9',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'The 2018 Amendment brought supply-side bribery (bribe-givers) into the primary statutory purview while introducing corporate compliance defenses.',
      complexity: 'Intermediate',
      applicability: 'All public servants, administrative officers, and commercial entities dealing with the State'
    },
    searchText: 'prevention of corruption act 1988 bribery undue advantage public servant whistleblower protection corporate compliance anti graft emergency hospital'
  },
  {
    id: 'legal-qa-7',
    question: 'What is the difference between Perjury (Giving False Evidence) and Criminal Defamation in Indian law?',
    answer:
      'Perjury is an offense against public justice under Section 227 of Bharatiya Nyaya Sanhita, 2023 (formerly Section 191 IPC), where a person legally bound by oath or affirmation makes a statement which they know or believe to be false. It undermines judicial adjudication. Criminal Defamation, under Section 356 BNS (formerly Section 499 IPC), is an offense against personal reputation where a person makes or publishes an imputation intending to harm the reputation of another, subject to exceptions such as imputation of truth made for the public good.',
    category: 'Evidence, Court Integrity & Defamation',
    legalConcepts: ['Perjury', 'False Evidence', 'Criminal Defamation', 'Public Justice', 'Reputation Rights'],
    keywords: ['perjury', 'false evidence', 'defamation', 'oath', 'reputation', 'bns 227', 'bns 356', 'ipc 191'],
    source: 'Bharatiya Nyaya Sanhita, 2023 & Bharatiya Sakshya Adhiniyam, 2023',
    metadata: {
      statute: 'BNS 2023 (Sections 227, 356) & Oaths Act, 1969',
      sectionCode: 'BNS Sec 227 (formerly IPC 191) / BNS Sec 356 (formerly IPC 499)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'False affidavits in judicial proceedings attract strict contempt and Section 340 CrPC / BNSS inquiry procedures.',
      complexity: 'Advanced',
      applicability: 'Judicial proceedings, affidavits, media reporting, public statements'
    },
    searchText: 'perjury giving false evidence criminal defamation bns 227 bns 356 oaths act judicial integrity reputation public justice'
  },
  {
    id: 'legal-qa-8',
    question: 'How does Indian jurisprudence view Private Revenge vs. the Constitutional Right to Private Defence?',
    answer:
      'Indian law strictly rejects private revenge, vigilante justice, and retaliatory violence. The State maintains a monopoly on lawful punishment through due process. The Right of Private Defence (Sections 34 to 44 of BNS 2023, formerly Sections 96 to 106 IPC) is strictly a defensive shield, not a punitive weapon. It exists solely to repel imminent unlawful aggression when state assistance cannot be obtained in time. It ceases the moment danger ceases, and must never inflict more harm than necessary for defence. Acts of revenge carried out after danger has passed constitute culpable assault or homicide.',
    category: 'Criminal Jurisprudence & Self-Defence',
    legalConcepts: ['Right of Private Defence', 'Proportionality', 'Prohibition of Vigilantism', 'Due Process', 'Retaliation'],
    keywords: ['private defence', 'self defence', 'revenge', 'vigilantism', 'proportionality', 'bns 34', 'ipc 96', 'insult', 'attack'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 34-44)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Chapter III - General Exceptions)',
      sectionCode: 'BNS Sections 34-44 (formerly IPC 96-106)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Supreme Court precedents (e.g. State of UP v. Ram Swarup) establish that private defence cannot be claimed by an aggressor or as an excuse for premeditated vengeance.',
      complexity: 'Intermediate',
      applicability: 'Criminal liability, self-defence claims, assault disputes'
    },
    searchText: 'private defence self defence revenge vigilantism proportionality bns 34 bns 36 general exceptions due process non retaliation assault physical attack'
  },
  {
    id: 'legal-qa-9',
    question: 'What is the scope of Attorney-Client Privilege and Confidentiality under the Indian legal framework?',
    answer:
      'Attorney-client communication is protected under Section 132 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA, formerly Section 126 of the Indian Evidence Act, 1872). An advocate cannot disclose any communication made to them in the course and for the purpose of their professional employment, nor state the contents or condition of any document with which they became acquainted. Exceptions include: communications made in furtherance of any illegal purpose or observing that any crime or fraud has been committed since the commencement of employment.',
    category: 'Professional Ethics & Evidence Law',
    legalConcepts: ['Attorney-Client Privilege', 'Confidentiality', 'Privileged Communications', 'Evidence Admissibility'],
    keywords: ['attorney client privilege', 'confidentiality', 'bsa 132', 'evidence act 126', 'professional secret', 'advocate'],
    source: 'Bharatiya Sakshya Adhiniyam, 2023 (Section 132) & Bar Council of India Rules',
    metadata: {
      statute: 'Bharatiya Sakshya Adhiniyam, 2023 (Sec 132)',
      sectionCode: 'BSA Section 132 (formerly Indian Evidence Act Section 126)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Privilege belongs to the client and can only be expressly waived by the client.',
      complexity: 'Intermediate',
      applicability: 'All legal consultations, trial preparations, corporate disclosures'
    },
    searchText: 'attorney client privilege confidentiality bsa section 132 evidence act 126 privileged communication bar council ethics'
  },
  {
    id: 'legal-qa-10',
    question: 'What are the two foundational Pillars of Natural Justice (Nemo Judex in Causa Sua & Audi Alteram Partem)?',
    answer:
      'The Principles of Natural Justice govern all judicial, quasi-judicial, and administrative decisions in India. Pillar 1: "Nemo Judex in Causa Sua" (No one should be a judge in their own cause) ensures freedom from bias (pecuniary, personal, or subject-matter bias). Pillar 2: "Audi Alteram Partem" (Hear the other side) mandates that no party shall be condemned unheard; every individual has the right to notice of charges, fair opportunity to adduce evidence, and an unbiased hearing before adverse orders are passed. Violation renders the decision void under Article 14.',
    category: 'Administrative & Constitutional Law',
    legalConcepts: ['Natural Justice', 'Audi Alteram Partem', 'Nemo Judex in Causa Sua', 'Rule Against Bias', 'Fair Hearing'],
    keywords: ['natural justice', 'audi alteram partem', 'nemo judex in causa sua', 'bias', 'fair hearing', 'article 14', 'administrative law'],
    source: 'Administrative Law Jurisprudence & Supreme Court of India rulings (AK Kraipak, Maneka Gandhi)',
    metadata: {
      statute: 'Constitutional Doctrine under Article 14 & Article 21',
      sectionCode: 'Principles of Natural Justice',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Established as an indispensable pillar of the Rule of Law in landmark rulings like A.K. Kraipak v. Union of India (1969).',
      complexity: 'Intermediate',
      applicability: 'Courts, tribunals, disciplinary committees, university enquiry panels'
    },
    searchText: 'natural justice audi alteram partem nemo judex in causa sua rule against bias fair hearing administrative law article 14'
  },
  {
    id: 'legal-qa-11',
    question: 'What are the statutory protections for accident victims and legal duties of bystanders and doctors under the Good Samaritan Guidelines?',
    answer:
      'Under Section 134A of the Motor Vehicles Act, 1988 (inserted by Amendment Act 2019) and the Supreme Court Good Samaritan Guidelines (SaveLIFE Foundation v. Union of India, 2016), any bystander or Good Samaritan who renders emergency medical or non-medical assistance to a road accident victim is protected from civil or criminal liability. Hospitals and doctors are legally mandated under Article 21 (Right to Life, affirmed in Parmanand Katara v. Union of India) to provide immediate emergency medical treatment without delaying care for medico-legal formalities or advance payment.',
    category: 'Medical Ethics, Torts & Emergency Law',
    legalConcepts: ['Good Samaritan Protections', 'Emergency Medical Care', 'Right to Life', 'Motor Vehicles Act Sec 134A', 'Medical Duty'],
    keywords: ['doctor', 'accident', 'emergency', 'good samaritan', 'hospital', 'treatment', 'motor vehicles act', 'parmanand katara', 'victim'],
    source: 'Motor Vehicles Act, 1988 (Section 134A) & Supreme Court Directives (Parmanand Katara Case)',
    metadata: {
      statute: 'Motor Vehicles Act, 1988 (Sec 134A) & Constitution Article 21',
      sectionCode: 'MV Act Sec 134A / Parmanand Katara Guidelines',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Landmark judgment Parmanand Katara (1989) established that saving human life is the primary duty of every medical professional regardless of legal procedure.',
      complexity: 'Fundamental',
      applicability: 'All registered medical practitioners, government/private hospitals, and bystanders'
    },
    searchText: 'doctor refuse emergency medical treatment accident victim good samaritan guidelines motor vehicles act 134a parmanand katara right to life article 21 hospital'
  },
  {
    id: 'legal-qa-12',
    question: 'What are consumer remedies for defective products and deficiency of service under the Consumer Protection Act, 2019?',
    answer:
      'Under the Consumer Protection Act, 2019, consumers can file complaints before Consumer Disputes Redressal Commissions (District, State, National) for defective goods, deficiency in service, unfair trade practices, and misleading advertisements. Section 82 introduces Product Liability, making manufacturers, service providers, and sellers liable to compensate a consumer for harm caused by defective products or deficient services. E-commerce platforms are regulated under Consumer Protection (E-Commerce) Rules, 2020.',
    category: 'Consumer Law & Commercial Integrity',
    legalConcepts: ['Defective Product', 'Deficiency of Service', 'Product Liability', 'Unfair Trade Practice', 'Consumer Redressal'],
    keywords: ['consumer', 'defective product', 'deficiency of service', 'consumer protection act 2019', 'product liability', 'e commerce', 'refund'],
    source: 'Consumer Protection Act, 2019 (Sections 2, 82, 83)',
    metadata: {
      statute: 'Consumer Protection Act, 2019 (Section 82-87)',
      sectionCode: 'Consumer Protection Act 2019 Sec 82',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Replaced the 1986 Act, introducing Product Liability, Mediation cells, and Central Consumer Protection Authority (CCPA).',
      complexity: 'Intermediate',
      applicability: 'All buyers of goods and services, e-commerce sellers, manufacturers'
    },
    searchText: 'consumer remedies defective product product liability deficiency of service consumer protection act 2019 unfair trade practice e commerce refund'
  },
  {
    id: 'legal-qa-13',
    question: 'What are the whistleblower protections and public interest disclosure mechanisms in India?',
    answer:
      'Whistleblower mechanisms operate under the Whistle Blowers Protection Act, 2014 and Section 177 of the Companies Act, 2013 (Vigil Mechanism). Employees and whistleblowers who disclose corruption, willful misuse of power, or illegal activities (such as environmental violations or corporate fraud) in good faith are protected from victimization, dismissal, or retaliation. Non-Disclosure Agreements (NDAs) cannot enforce secrecy over illegal criminal acts or statutory violations under Section 23 of the Indian Contract Act, 1872.',
    category: 'Corporate Governance & Whistleblowing',
    legalConcepts: ['Whistleblower Protection', 'Vigil Mechanism', 'Public Interest Disclosure', 'Illegal NDA Void', 'Corporate Integrity'],
    keywords: ['whistleblower', 'nda', 'non disclosure agreement', 'illegal dumping', 'toxic', 'companies act', 'vigil mechanism', 'public interest'],
    source: 'Whistle Blowers Protection Act, 2014 & Companies Act, 2013 (Section 177)',
    metadata: {
      statute: 'Whistle Blowers Protection Act, 2014 & Companies Act 2013 Sec 177',
      sectionCode: 'Companies Act Sec 177 / Contract Act Sec 23',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Section 23 Indian Contract Act establishes that agreements opposing public policy or promoting illegal acts are void ab initio.',
      complexity: 'Intermediate',
      applicability: 'Listed companies, government departments, corporate employees'
    },
    searchText: 'whistleblower protection non disclosure agreement nda toxic dumping illegal companies act section 177 public interest disclosure contract act section 23'
  },
  {
    id: 'legal-qa-14',
    question: 'What are the provisions governing Digital Personal Data Privacy and Data Fiduciary duties under DPDP Act 2023?',
    answer:
      'The Digital Personal Data Protection Act, 2023 (DPDP Act) establishes statutory rules for processing digital personal data. Data Fiduciaries must process data only for lawful purposes with clear, explicit consent (Section 6) or specified legitimate uses. Data Principals (citizens) possess rights to access, correction, erasure, and grievance redressal (Sections 11-13). Personal data breaches must be reported to the Data Protection Board and affected individuals. Unauthorized monitoring or scraping of personal data without consent attracts monetary penalties up to Rs. 250 Crore.',
    category: 'Digital Personal Data Protection (DPDP)',
    legalConcepts: ['Data Privacy', 'Data Fiduciary', 'Data Principal Rights', 'Consent Architecture', 'Data Breach Penalty'],
    keywords: ['dpdp act 2023', 'data privacy', 'personal data', 'consent', 'whatsapp', 'data fiduciary', 'monitoring', 'phone', 'employee privacy'],
    source: 'Digital Personal Data Protection Act, 2023 (Sections 4-13, 27)',
    metadata: {
      statute: 'Digital Personal Data Protection Act, 2023',
      sectionCode: 'DPDP Act 2023 Sec 6, 8, 11',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Codified the landmark Supreme Court ruling in K.S. Puttaswamy v. Union of India (2017) affirming privacy as a Fundamental Right under Article 21.',
      complexity: 'Advanced',
      applicability: 'All entities processing digital personal data in India'
    },
    searchText: 'digital personal data protection dpdp act 2023 data privacy consent data fiduciary puttaswamy employer monitoring whatsapp phone employee'
  },
  {
    id: 'legal-qa-15',
    question: 'What are the offenses related to treason, waging war against the State, and sedition under Bharatiya Nyaya Sanhita 2023?',
    answer:
      'Offenses against the State are codified under Chapter VI of Bharatiya Nyaya Sanhita, 2023. Section 147 (formerly Section 121 IPC) penalizes waging or attempting to wage war against the Government of India with death or imprisonment for life. Section 152 BNS penalizes acts endangering the sovereignty, unity, and integrity of India (replacing the old Sedition Section 124A IPC). The offense requires deliberate acts of subversive violence, armed rebellion, or inciting armed secession against the Constitution.',
    category: 'State Security & Constitutional Offenses',
    legalConcepts: ['Waging War Against State', 'Sovereignty & Integrity', 'Subversion', 'Constitutional Order', 'State Security'],
    keywords: ['treason', 'waging war', 'government', 'sovereignty', 'bns 147', 'bns 152', 'sedition', 'integrity of india'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Chapter VI, Sections 147-154)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Sections 147, 152)',
      sectionCode: 'BNS Sec 147 (formerly IPC 121) / BNS Sec 152',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'BNS 2023 explicitly modernized state offenses to focus on threats to national sovereignty and integrity rather than mere colonial disaffection.',
      complexity: 'Advanced',
      applicability: 'National security, subversive armed action, state protection'
    },
    searchText: 'treason waging war against government BNS section 147 BNS section 152 sovereignty integrity sedition state security'
  },
  {
    id: 'legal-qa-16',
    question: 'What is the law regarding workplace sexual harassment under the POSH Act 2013?',
    answer:
      'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) mandates every employer employing 10 or more workers to constitute an Internal Complaints Committee (ICC). It covers physical contact, demands for sexual favors, sexually colored remarks, and creating a hostile work environment. Complaints must be inquired into within 90 days. Employers who fail to comply face penalty fines and cancellation of business licenses.',
    category: 'Workplace Law & Gender Justice',
    legalConcepts: ['POSH Act', 'Internal Complaints Committee', 'Workplace Safety', 'Hostile Work Environment', 'Gender Justice'],
    keywords: ['posh act', 'sexual harassment', 'workplace', 'internal committee', 'icc', 'women safety', 'employment'],
    source: 'POSH Act, 2013 & Supreme Court Vishaka Guidelines',
    metadata: {
      statute: 'POSH Act, 2013 (Sections 4, 9, 11)',
      sectionCode: 'POSH Act Sec 4 & 9',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Enacted pursuant to Vishaka v. State of Rajasthan (1997) where Supreme Court formulated workplace safety guidelines under Article 14 and 21.',
      complexity: 'Intermediate',
      applicability: 'All offices, corporations, universities, and institutions with 10+ employees'
    },
    searchText: 'posh act sexual harassment workplace internal complaints committee icc women safety vishaka guidelines gender justice'
  },
  {
    id: 'legal-qa-17',
    question: 'What are the legal regulations and penalties for Environmental Nuisance and Illegal Industrial Pollution in India?',
    answer:
      'Environmental protection is enforced under the Environment (Protection) Act, 1986, Water (Prevention and Control of Pollution) Act, 1974, and Air Act, 1981. Under Section 270 and 271 of Bharatiya Nyaya Sanhita, 2023 (formerly Sections 269/278 IPC), fouling water of public springs or making atmosphere noxious to health is a punishable public nuisance offense. The National Green Tribunal (NGT) applies the "Polluter Pays Principle" and "Precautionary Principle" to levy heavy environmental compensation on defaulting industries.',
    category: 'Environmental Law & Public Health',
    legalConcepts: ['Polluter Pays Principle', 'Public Nuisance', 'Environmental Protection Act', 'NGT Jurisdiction', 'Toxic Dumping'],
    keywords: ['pollution', 'environment', 'toxic dumping', 'ngt', 'national green tribunal', 'public nuisance', 'polluter pays', 'air water act'],
    source: 'Environment (Protection) Act, 1986 & Bharatiya Nyaya Sanhita, 2023 (Sec 270, 271)',
    metadata: {
      statute: 'Environment (Protection) Act, 1986 & BNS 2023',
      sectionCode: 'EPA 1986 Sec 15 / BNS Sec 270, 271',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'M.C. Mehta v. Union of India established absolute liability for hazardous industries.',
      complexity: 'Intermediate',
      applicability: 'Industrial units, corporate entities, municipal bodies'
    },
    searchText: 'environmental pollution toxic dumping illegal polluter pays public nuisance ngt environment protection act bns section 270 271'
  },
  {
    id: 'legal-qa-18',
    question: 'What is the law on Right to Information (RTI Act 2005) and Public Authority transparency obligations?',
    answer:
      'The Right to Information Act, 2005 empowers Indian citizens to request information from Public Authorities (Section 3). Public Information Officers (PIOs) must provide information within 30 days. Section 4 mandates proactive voluntary disclosure by government organs. Exemptions from disclosure under Section 8 include national security, cabinet papers, and personal privacy without public interest, but corruption allegations and human rights violations are strictly disclosable.',
    category: 'Administrative Law & RTI',
    legalConcepts: ['Right to Information', 'Public Authority', 'Proactive Disclosure', 'Transparency', 'Citizens Rights'],
    keywords: ['rti', 'right to information', 'transparency', 'public authority', 'pio', 'government records', 'section 8 exemption'],
    source: 'Right to Information Act, 2005 (Sections 3, 4, 7, 8)',
    metadata: {
      statute: 'Right to Information Act, 2005',
      sectionCode: 'RTI Act Sec 3 & Sec 8',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Evolved from freedom of speech under Article 19(1)(a) as affirmed in State of UP v. Raj Narain (1975).',
      complexity: 'Fundamental',
      applicability: 'All public institutions, government bodies, statutory corporations'
    },
    searchText: 'right to information rti act 2005 transparency public authority public information officer section 8 exemptions'
  },
  {
    id: 'legal-qa-19',
    question: 'What constitutes Criminal Breach of Trust and Cheating under Bharatiya Nyaya Sanhita 2023?',
    answer:
      'Criminal Breach of Trust under Section 316 BNS 2023 (formerly Section 405 IPC) occurs when a person entrusted with property or dominion over property dishonestly misappropriates or converts it to their own use. Cheating under Section 318 BNS (formerly Section 420 IPC) involves fraudulently deceiving a person to deliver property or alter records. Both offenses require proof of fraudulent intention at inception for cheating, or dishonesty during bailment for breach of trust.',
    category: 'Criminal Law & Commercial Fraud',
    legalConcepts: ['Criminal Breach of Trust', 'Cheating', 'Fraudulent Intention', 'BNS Sec 316', 'BNS Sec 318'],
    keywords: ['breach of trust', 'cheating', 'bns 316', 'bns 318', 'ipc 405', 'ipc 420', 'fraud', 'misappropriation'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 316, 318)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Chapter XVII)',
      sectionCode: 'BNS Sec 316 / BNS Sec 318',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Distinguishes simple breach of contract from criminal breach of trust based on dishonest intent.',
      complexity: 'Intermediate',
      applicability: 'Financial dealings, corporate entrustment, contractual performance'
    },
    searchText: 'criminal breach of trust cheating bns section 316 bns section 318 ipc 405 ipc 420 commercial fraud entrustment'
  },
  {
    id: 'legal-qa-20',
    question: 'What are the rules governing Zero FIR and mandatory registration of complaints under BNSS 2023?',
    answer:
      'Under Section 173 of Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS, replacing CrPC), a police station must register a "Zero FIR" for any cognizable offense irrespective of the territorial jurisdiction where the crime took place. The officer must record the information, assign a Zero FIR number, immediately initiate preliminary investigation or transfer the record to the jurisdictional police station within 24 hours. Failure to register an FIR for severe offenses is punishable under Section 199 BNS.',
    category: 'Criminal Procedure & BNSS 2023',
    legalConcepts: ['Zero FIR', 'BNSS Section 173', 'Cognizable Offense', 'Police Duty', 'Access to Justice'],
    keywords: ['zero fir', 'bnss 173', 'crpc 154', 'police station', 'fir registration', 'jurisdiction', 'cognizable'],
    source: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Section 173) & Supreme Court (Lalita Kumari Case)',
    metadata: {
      statute: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Sec 173)',
      sectionCode: 'BNSS Sec 173 (formerly CrPC Sec 154)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Lalita Kumari v. Govt of UP (2014) made FIR registration mandatory for cognizable offenses.',
      complexity: 'Fundamental',
      applicability: 'All police stations, crime victims, procedure'
    },
    searchText: 'zero fir bnss section 173 crpc section 154 cognizable offense police registration jurisdiction mandatory fir'
  },
  {
    id: 'legal-qa-21',
    question: 'What constitutes Criminal Intimidation and Extortion under Bharatiya Nyaya Sanhita 2023?',
    answer:
      'Criminal Intimidation under Section 351 BNS (formerly IPC Section 503) consists of threatening another with injury to person, reputation, or property with intent to cause alarm or compel an act. Extortion under Section 308 BNS (formerly IPC Section 383) involves intentionally putting a person in fear of injury and thereby dishonestly inducing them to deliver property or valuable security. Aggravated intimidation involving threats of death or severe harm carries enhanced imprisonment up to 7 years.',
    category: 'Criminal Law & Public Order',
    legalConcepts: ['Criminal Intimidation', 'Extortion', 'BNS Section 351', 'BNS Section 308', 'Coercion'],
    keywords: ['criminal intimidation', 'extortion', 'bns 351', 'bns 308', 'ipc 503', 'ipc 383', 'threat', 'blackmail'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 308, 351)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023',
      sectionCode: 'BNS Sec 308 / BNS Sec 351',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Protects personal autonomy and freedom from coercive threats and blackmail.',
      complexity: 'Intermediate',
      applicability: 'Interpersonal disputes, blackmail, extortion demands'
    },
    searchText: 'criminal intimidation extortion bns section 351 bns section 308 ipc 503 ipc 383 threat blackmail alarm coercion'
  },
  {
    id: 'legal-qa-22',
    question: 'What are the legal rules governing Electronic Evidence admissibility under Bharatiya Sakshya Adhiniyam 2023?',
    answer:
      'Under Section 61 and Section 63 of Bharatiya Sakshya Adhiniyam, 2023 (BSA, replacing Indian Evidence Act Sections 65A/65B), electronic records (emails, server logs, WhatsApp chats, CCTV footage) are admissible as documentary evidence without further proof if accompanied by a Certificate under Section 63(4). The certificate must verify device integrity, lawful custody, and proper computer operation during data generation, as affirmed in Anvar P.V. v. P.K. Basheer.',
    category: 'Evidence Law & Digital Forensics',
    legalConcepts: ['Electronic Evidence', 'BSA Section 63 Certificate', 'Digital Integrity', 'Chain of Custody', 'Documentary Proof'],
    keywords: ['electronic evidence', 'bsa 63', 'evidence act 65b', 'whatsapp proof', 'cctv footage', 'digital certificate', 'anvar pv'],
    source: 'Bharatiya Sakshya Adhiniyam, 2023 (Sections 61, 63)',
    metadata: {
      statute: 'Bharatiya Sakshya Adhiniyam, 2023 (Sec 63)',
      sectionCode: 'BSA Sec 63 (formerly Evidence Act Sec 65B)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'BSA 2023 explicitly accords equal legal status to electronic and digital records as paper documents.',
      complexity: 'Advanced',
      applicability: 'All civil and criminal trial proceedings involving digital records'
    },
    searchText: 'electronic evidence bsa section 63 evidence act section 65b digital certificate whatsapp chat cctv proof trial admissibility'
  },
  {
    id: 'legal-qa-23',
    question: 'What is the doctrine of Restraint of Trade under Section 27 of the Indian Contract Act 1872?',
    answer:
      'Section 27 of the Indian Contract Act, 1872 provides that every agreement by which anyone is restrained from exercising a lawful profession, trade, or business of any kind is to that extent void ab initio. Unlike English law, Indian contract law strictly invalidates post-employment non-compete clauses (Percept D\'Mark v. Zaheer Khan). Exceptions are limited solely to the sale of goodwill of a business where reasonable geographic restrictions apply.',
    category: 'Contract Law & Commercial Freedom',
    legalConcepts: ['Restraint of Trade', 'Section 27 Contract Act', 'Non-Compete Void', 'Commercial Freedom', 'Goodwill Exception'],
    keywords: ['non compete', 'restraint of trade', 'contract act section 27', 'employment clause', 'void agreement', 'zaheer khan case'],
    source: 'Indian Contract Act, 1872 (Section 27)',
    metadata: {
      statute: 'Indian Contract Act, 1872 (Section 27)',
      sectionCode: 'Contract Act 1872 Sec 27',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Promotes open economic competition and protects employee mobility across trade sectors.',
      complexity: 'Intermediate',
      applicability: 'Employment contracts, corporate NDAs, non-compete agreements'
    },
    searchText: 'restraint of trade non compete clause Indian contract act section 27 void agreement employment restriction commercial freedom'
  },
  {
    id: 'legal-qa-24',
    question: 'What is the law on Medical Negligence and Duty of Care under Indian Torts and Consumer Law?',
    answer:
      'Medical Negligence occurs when a medical practitioner fails to exercise reasonable skill and care expected of a prudent professional, resulting in harm (Jacob Mathew v. State of Punjab). To establish liability, three elements must be proved: duty of care owed, breach of duty, and consequential injury. Gross medical rashness attracts criminal prosecution under Section 106 BNS 2023 (formerly 304A IPC), while civil deficiency is adjudicated under the Consumer Protection Act.',
    category: 'Torts, Consumer & Medical Law',
    legalConcepts: ['Medical Negligence', 'Duty of Care', 'Jacob Mathew Test', 'Bolam Test', 'Consumer Remedy'],
    keywords: ['medical negligence', 'doctor error', 'jacob mathew', 'duty of care', 'bns 106', 'ipc 304a', 'hospital liability'],
    source: 'Consumer Protection Act & BNS 2023 (Sec 106) & Jacob Mathew v. State of Punjab',
    metadata: {
      statute: 'BNS 2023 Sec 106 & Consumer Protection Act 2019',
      sectionCode: 'BNS Sec 106 (formerly IPC 304A) / Consumer Law',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Supreme Court in Jacob Mathew (2005) set higher threshold for criminal prosecution of doctors to prevent frivolous intimidation.',
      complexity: 'Intermediate',
      applicability: 'Medical practice, hospital care, tort litigation'
    },
    searchText: 'medical negligence duty of care doctor error jacob mathew test bns section 106 consumer protection liability'
  },
  {
    id: 'legal-qa-25',
    question: 'What are Constitutional Writs under Articles 32 and 226 of the Indian Constitution?',
    answer:
      'The Supreme Court (Article 32) and High Courts (Article 226) issue five constitutional writs to enforce Fundamental Rights: 1. Habeas Corpus (produce unlawful detainee), 2. Mandamus (command public authority to perform legal duty), 3. Prohibition (prevent inferior court from exceeding jurisdiction), 4. Quo Warranto (challenge illegal public office holder), 5. Certiorari (quash illegal judicial order). Dr. B.R. Ambedkar termed Article 32 the "heart and soul" of the Constitution.',
    category: 'Constitutional Law & Judicial Remedies',
    legalConcepts: ['Constitutional Writs', 'Habeas Corpus', 'Mandamus', 'Certiorari', 'Article 32 & 226'],
    keywords: ['writs', 'habeas corpus', 'mandamus', 'certiorari', 'article 32', 'article 226', 'supreme court', 'high court', 'fundamental rights'],
    source: 'Constitution of India (Articles 32 and 226)',
    metadata: {
      statute: 'Constitution of India (Articles 32, 226)',
      sectionCode: 'Articles 32 & 226 Constitution of India',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'High Court writ jurisdiction under Article 226 is wider than Article 32 as it extends to non-fundamental legal rights.',
      complexity: 'Intermediate',
      applicability: 'Constitutional remedies, public interest litigation, illegal detention'
    },
    searchText: 'constitutional writs habeas corpus mandamus certiorari quo warranto article 32 article 226 supreme court fundamental rights'
  },
  {
    id: 'legal-qa-26',
    question: 'What are the rules governing Bail, Non-Bailable Offenses, and Anticipatory Bail under BNSS 2023?',
    answer:
      'Under Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS, replacing CrPC), bail is a statutory right for bailable offenses (Section 478). For non-bailable offenses (Section 480), bail is discretionary based on risk of fleeing, tampering with evidence, or repeating crime. Anticipatory Bail (Section 484 BNSS, formerly Section 438 CrPC) allows a person apprehending arrest on false or malicious charges to seek pre-arrest bail from the Sessions Court or High Court.',
    category: 'Criminal Procedure & Personal Liberty',
    legalConcepts: ['Anticipatory Bail', 'BNSS Section 484', 'Personal Liberty', 'CrPC 438', 'Presumption of Innocence'],
    keywords: ['bail', 'anticipatory bail', 'bnss 484', 'crpc 438', 'non bailable', 'arrest', 'liberty'],
    source: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Sections 478, 480, 484)',
    metadata: {
      statute: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      sectionCode: 'BNSS Sec 484 (formerly CrPC Sec 438)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Gurbaksh Singh Sibbia v. State of Punjab established that anticipatory bail upholds Article 21 personal liberty.',
      complexity: 'Intermediate',
      applicability: 'Pre-arrest protection, criminal defence, custody'
    },
    searchText: 'bail anticipatory bail bnss section 484 crpc section 438 non bailable offense personal liberty pre arrest protection'
  },
  {
    id: 'legal-qa-27',
    question: 'What is the law on Criminal Defamation vs Freedom of Speech under BNS 2023 and Article 19(1)(a)?',
    answer:
      'Freedom of Speech under Article 19(1)(a) is subject to reasonable restrictions under Article 19(2), including public order and defamation. Section 356 BNS 2023 (formerly Section 499 IPC) penalizes criminal defamation. Exceptions protect imputations of truth made for public good, public servant conduct reporting, and fair criticism of public performances (Subramanian Swamy v. Union of India, 2016).',
    category: 'Constitutional Freedom & Defamation',
    legalConcepts: ['Freedom of Speech', 'Criminal Defamation', 'Article 19(2)', 'Public Interest Defense', 'BNS Sec 356'],
    keywords: ['defamation', 'speech freedom', 'article 19', 'bns 356', 'ipc 499', 'subramanian swamy', 'public good'],
    source: 'Constitution of India (Art 19) & BNS 2023 (Section 356)',
    metadata: {
      statute: 'Constitution Art 19(1)(a) & BNS 2023 Sec 356',
      sectionCode: 'BNS Sec 356 / Art 19(2)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Supreme Court upheld constitutionality of criminal defamation while emphasizing high evidentiary bar for truth defense.',
      complexity: 'Intermediate',
      applicability: 'Journalism, social media publishing, public speeches'
    },
    searchText: 'freedom of speech criminal defamation article 19 bns section 356 ipc 499 subramanian swamy public good defense'
  },
  {
    id: 'legal-qa-28',
    question: 'What are the provisions against Hacking, Data Tampering, and Unauthorised Access under IT Act 2000?',
    answer:
      'Section 43 of the Information Technology Act, 2000 penalizes downloading, copying, or damaging data without authorization with civil compensation. Section 66 makes hacking and dishonestly or fraudulently introducing malware or altering computer systems a criminal offense punishable with up to 3 years imprisonment and fine up to 5 lakh rupees. Section 66B penalizes receiving stolen computer resources.',
    category: 'Cyber Law & Infrastructure Security',
    legalConcepts: ['Hacking', 'Data Tampering', 'IT Act Section 66', 'Unauthorised Access', 'Cyber Damages'],
    keywords: ['hacking', 'data tampering', 'it act section 66', 'malware', 'cyber security', 'unauthorised access', 'section 43'],
    source: 'Information Technology Act, 2000 (Sections 43, 66, 66B)',
    metadata: {
      statute: 'Information Technology Act, 2000 (Sec 43 & 66)',
      sectionCode: 'IT Act Sec 43, 66',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Provides foundation for cybersecurity compliance across critical information infrastructure.',
      complexity: 'Intermediate',
      applicability: 'IT systems, enterprise data, cyber attack prevention'
    },
    searchText: 'hacking data tampering it act section 66 section 43 unauthorised access malware cyber security compensation'
  },
  {
    id: 'legal-qa-29',
    question: 'What constitutes Forgery and Making False Documents under Bharatiya Nyaya Sanhita 2023?',
    answer:
      'Forgery is defined under Section 336 BNS 2023 (formerly Section 463 IPC) as making any false document or electronic record with intent to cause damage or injury to the public or any person, or to support any claim. Section 338 BNS penalizes using as genuine a forged document known to be forged. Creating fake certificates, digital seals, or altered agreements carries imprisonment up to 7 years.',
    category: 'Criminal Law & Document Integrity',
    legalConcepts: ['Forgery', 'False Document', 'BNS Section 336', 'Electronic Forgery', 'Document Integrity'],
    keywords: ['forgery', 'fake document', 'bns 336', 'ipc 463', 'altered record', 'signature fraud', 'electronic record'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 336, 338)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023',
      sectionCode: 'BNS Sec 336 (formerly IPC 463)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Applies equally to traditional written records and digital signatures / electronic files.',
      complexity: 'Intermediate',
      applicability: 'Property deeds, corporate contracts, identity documents'
    },
    searchText: 'forgery false document electronic record bns section 336 ipc 463 signature fraud document integrity fake certificates'
  },
  {
    id: 'legal-qa-30',
    question: 'What is the law regarding Fundamental Duties under Article 51A of the Indian Constitution?',
    answer:
      'Article 51A (introduced by 42nd Amendment 1976) lists 11 Fundamental Duties of every Indian citizen, including abiding by the Constitution, cherishing noble ideals of the freedom struggle, protecting national sovereignty, promoting harmony beyond religious/caste barriers, renouncing practices derogatory to women, safeguarding public property, and protecting the natural environment.',
    category: 'Constitutional Duties & Civic Ethics',
    legalConcepts: ['Fundamental Duties', 'Article 51A', 'Civic Responsibility', 'Environmental Duty', 'Constitutional Ethics'],
    keywords: ['fundamental duties', 'article 51a', 'constitution', 'civic duty', 'public property', 'environment duty', 'harmony'],
    source: 'Constitution of India (Part IVA - Article 51A)',
    metadata: {
      statute: 'Constitution of India (Article 51A)',
      sectionCode: 'Article 51A Constitution of India',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Supreme Court in AIIMS Students Union v. AIIMS (2002) held Fundamental Duties are co-extensive with Fundamental Rights.',
      complexity: 'Fundamental',
      applicability: 'All citizens of India, civic education, state policy'
    },
    searchText: 'fundamental duties article 51a constitution civic responsibility environmental duty public property constitutional ethics'
  },
  {
    id: 'legal-qa-31',
    question: 'What are the legal provisions regarding Culpable Homicide and Murder under Bharatiya Nyaya Sanhita 2023?',
    answer:
      'Section 100 BNS 2023 (formerly IPC Section 299) defines Culpable Homicide as causing death by an act done with intention or knowledge of causing death or bodily injury likely to cause death. Section 101 BNS (formerly IPC Section 300) defines Murder as aggravated culpable homicide done with clear intent or extreme imminence of death. Exceptions reducing murder to culpable homicide not amounting to murder include Grave and Sudden Provocation, Private Defence excess, and Sudden Fight.',
    category: 'Criminal Homicide Jurisprudence',
    legalConcepts: ['Culpable Homicide', 'Murder', 'BNS Section 100', 'BNS Section 101', 'Mens Rea'],
    keywords: ['murder', 'culpable homicide', 'bns 100', 'bns 101', 'ipc 299', 'ipc 300', 'provocation', 'homicide'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 100, 101, 103, 105)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Chapter VI)',
      sectionCode: 'BNS Sec 100 & 101',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'K.M. Nanavati v. State of Maharashtra established strict test for Grave and Sudden Provocation exception.',
      complexity: 'Advanced',
      applicability: 'Penal offences against human life'
    },
    searchText: 'culpable homicide murder bns section 100 bns section 101 ipc 299 ipc 300 provocation mens rea homicide jurisprudence'
  },
  {
    id: 'legal-qa-32',
    question: 'What is the rule against Self-Incrimination under Article 20(3) of the Indian Constitution?',
    answer:
      'Article 20(3) guarantees that no person accused of any offense shall be compelled to be a witness against himself. It grants immunity from forced confessions, coerced testimony, or involuntary narco-analysis / polygraph tests (Selvi v. State of Karnataka, 2010). Admissions obtained through torture or coercion are inadmissible in evidence under Section 22 of Bharatiya Sakshya Adhiniyam 2023.',
    category: 'Constitutional Rights & Criminal Defence',
    legalConcepts: ['Right Against Self Incrimination', 'Article 20(3)', 'Selvi Precedent', 'Coerced Confession Inadmissible', 'Accused Rights'],
    keywords: ['self incrimination', 'article 20 3', 'narco test', 'polygraph', 'selvi case', 'forced confession', 'accused rights'],
    source: 'Constitution of India (Art 20(3)) & BSA 2023 (Section 22) & Selvi v. State of Karnataka',
    metadata: {
      statute: 'Constitution Art 20(3) & BSA 2023 Sec 22',
      sectionCode: 'Article 20(3) / Selvi Guidelines',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Selvi ruling affirmed that involuntary neurological tests violate right to privacy and self-incrimination.',
      complexity: 'Intermediate',
      applicability: 'Police interrogation, trial procedure, custodial investigation'
    },
    searchText: 'right against self incrimination article 20 3 selvi precedent forced confession coerced testimony narco test polygraph accused rights'
  },
  {
    id: 'legal-qa-33',
    question: 'What are the laws against Cruelty and Domestic Violence under BNS 2023 and PWDVA 2005?',
    answer:
      'Cruelty by husband or relatives of husband is penalized under Section 85 BNS 2023 (formerly IPC Section 498A). Protection of Women from Domestic Violence Act, 2005 (PWDVA) provides civil remedies including protection orders, residence orders, monetary relief, and custody orders against physical, emotional, verbal, sexual, or economic abuse within a shared household.',
    category: 'Family & Protection Laws',
    legalConcepts: ['Domestic Violence', 'PWDVA 2005', 'Section 85 BNS', 'Protection Orders', 'Gender Protection'],
    keywords: ['domestic violence', 'pwdva', 'bns 85', 'ipc 498a', 'cruelty', 'protection order', 'women rights'],
    source: 'Protection of Women from Domestic Violence Act, 2005 & BNS 2023 (Sec 85)',
    metadata: {
      statute: 'PWDVA 2005 & BNS 2023 Sec 85',
      sectionCode: 'BNS Sec 85 (formerly IPC 498A) / PWDVA 2005',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'PWDVA offers quasi-civil fast-track relief before Magistrates alongside penal remedies under BNS.',
      complexity: 'Intermediate',
      applicability: 'Domestic relations, shared households, matrimonial disputes'
    },
    searchText: 'domestic violence pwdva 2005 bns section 85 ipc 498a protection order cruelty gender rights family law'
  },
  {
    id: 'legal-qa-34',
    question: 'What is the law on Public Nuisance, Noise Pollution, and Public Order under BNS 2023?',
    answer:
      'Public Nuisance is defined under Section 270 BNS 2023 (formerly IPC 268) as an act or illegal omission causing common injury, danger, or annoyance to the public. Noise pollution exceeding decibel limits during night hours violates Article 21 (In Re: Noise Pollution, Supreme Court 2005). Magistrates can issue orders under Section 163 BNSS (formerly 144 CrPC) to abate urgent public nuisances.',
    category: 'Public Health & Nuisance Law',
    legalConcepts: ['Public Nuisance', 'Noise Pollution', 'BNS Section 270', 'BNSS Section 163', 'Public Tranquility'],
    keywords: ['public nuisance', 'noise pollution', 'bns 270', 'ipc 268', 'bnss 163', 'crpc 144', 'annoyance'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sec 270) & BNSS 2023 (Sec 163)',
    metadata: {
      statute: 'BNS 2023 Sec 270 & BNSS 2023 Sec 163',
      sectionCode: 'BNS Sec 270 / BNSS Sec 163',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Noise pollution rules establish zero sound amplification between 10 PM and 6 AM.',
      complexity: 'Fundamental',
      applicability: 'Civic spaces, residential welfare, public events'
    },
    searchText: 'public nuisance noise pollution bns section 270 ipc 268 bnss section 163 crpc 144 public order civic health'
  },
  {
    id: 'legal-qa-35',
    question: 'What is the doctrine of Res Judicata and Finality of Decisions under Section 11 of CPC 1908?',
    answer:
      'Under Section 11 of the Code of Civil Procedure, 1908 (CPC), no court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties and finally decided by a competent court. Res Judicata prevents endless litigation and respects finality of judicial decrees.',
    category: 'Civil Procedure & Finality of Law',
    legalConcepts: ['Res Judicata', 'Section 11 CPC', 'Finality of Judgments', 'Judicial Economy', 'Prohibition of Double Jeopardy'],
    keywords: ['res judicata', 'cpc section 11', 'former suit', 'final judgment', 'civil procedure', 're-litigation'],
    source: 'Code of Civil Procedure, 1908 (Section 11)',
    metadata: {
      statute: 'Code of Civil Procedure, 1908 (Section 11)',
      sectionCode: 'CPC 1908 Sec 11',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Based on Latin maxims interest reipublicae ut sit finis litium and nemo debet bis vexari pro una et eadem causa.',
      complexity: 'Intermediate',
      applicability: 'Civil litigation, property disputes, contractual claims'
    },
    searchText: 'res judicata cpc section 11 finality of judgments civil procedure former suit litigation economy'
  },
  {
    id: 'legal-qa-36',
    question: 'What is the statutory protection against Double Jeopardy under Article 20(2) and BNSS 2023?',
    answer:
      'Article 20(2) of the Indian Constitution provides that no person shall be prosecuted and punished for the same offense more than once (Nemo Debet Bis Vexari). Section 337 of BNSS 2023 (formerly Section 300 CrPC) codifies the plea of Autrefois Acquit (previously acquitted) and Autrefois Convict (previously convicted), preventing re-trial for the same offense.',
    category: 'Constitutional & Criminal Safeguards',
    legalConcepts: ['Double Jeopardy', 'Article 20(2)', 'Autrefois Acquit', 'Autrefois Convict', 'BNSS Section 337'],
    keywords: ['double jeopardy', 'article 20 2', 'bnss 337', 'crpc 300', 'autrefois acquit', 're trial prohibition'],
    source: 'Constitution of India (Art 20(2)) & BNSS 2023 (Section 337)',
    metadata: {
      statute: 'Constitution Art 20(2) & BNSS 2023 Sec 337',
      sectionCode: 'Article 20(2) / BNSS Sec 337',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Applies to criminal proceedings before judicial courts where both prosecution and punishment occurred in prior trial.',
      complexity: 'Intermediate',
      applicability: 'Criminal trials, double prosecution prevention'
    },
    searchText: 'double jeopardy article 20 2 bnss section 337 crpc 300 autrefois acquit autrefois convict criminal safeguards'
  },
  {
    id: 'legal-qa-37',
    question: 'What are the legal rules on Unfair Trade Practices and False Advertisements under Consumer Act 2019?',
    answer:
      'The Consumer Protection Act, 2019 defines Unfair Trade Practice under Section 2(47) as adopting any unfair method or deceptive practice to promote sales, including false statements regarding quality, standards, or price. Misleading advertisements attract penalties up to 10 lakh rupees on manufacturers and endorsers (Section 21) imposed by the Central Consumer Protection Authority (CCPA).',
    category: 'Commercial Ethics & Consumer Law',
    legalConcepts: ['Unfair Trade Practice', 'False Advertisement', 'CCPA Authority', 'Consumer Deception', 'Endorser Liability'],
    keywords: ['unfair trade practice', 'false ad', 'misleading ad', 'consumer protection', 'ccpa', 'celebrity endorsement', 'deceptive price'],
    source: 'Consumer Protection Act, 2019 (Sections 2(47), 21)',
    metadata: {
      statute: 'Consumer Protection Act, 2019 (Sec 21)',
      sectionCode: 'CPA 2019 Sec 2(47) & Sec 21',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Introduced explicit accountability for celebrity endorsers promoting deceptive products.',
      complexity: 'Intermediate',
      applicability: 'Commercial marketing, e-commerce, consumer product sales'
    },
    searchText: 'unfair trade practice false advertisement misleading ad ccpa penalty consumer protection act endorser liability'
  },
  {
    id: 'legal-qa-38',
    question: 'What are the legal rules regarding Equal Pay and Non-Discrimination under the Code on Wages 2019?',
    answer:
      'The Code on Wages, 2019 (replacing the Equal Remuneration Act, 1976) prohibits gender discrimination in wages for the same work or work of a similar nature performed by any employee. Employers cannot reduce wages or discriminate in recruitment and promotion on grounds of gender. Section 3 mandates equal pay across gender identities.',
    category: 'Labor Law & Gender Equity',
    legalConcepts: ['Equal Pay for Equal Work', 'Gender Equity', 'Code on Wages 2019', 'Non-Discrimination', 'Labor Standards'],
    keywords: ['equal pay', 'equal remuneration', 'gender wages', 'code on wages 2019', 'labor law', 'workplace equality'],
    source: 'Code on Wages, 2019 (Section 3) & Equal Remuneration Act, 1976',
    metadata: {
      statute: 'Code on Wages, 2019 (Section 3)',
      sectionCode: 'Code on Wages Sec 3',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Mackinnon Mackenzie case established that work of similar nature must be judged objectively without gender bias.',
      complexity: 'Fundamental',
      applicability: 'All industrial establishments, corporate employers, factories'
    },
    searchText: 'equal pay for equal work equal remuneration gender wage discrimination code on wages 2019 labor law equity'
  },
  {
    id: 'legal-qa-39',
    question: 'What is the legal duty of care and statutory liability for Hazardous Activities under the Absolute Liability Doctrine?',
    answer:
      'Under the Absolute Liability Doctrine (established in M.C. Mehta v. Union of India / Oleum Gas Leak Case, 1987), any enterprise engaged in an inherently dangerous or hazardous activity owes an absolute, non-delegable duty to the community. If any escape of toxic substance causes harm, the enterprise is strictly liable to compensate victims without any exceptions like Act of God or third-party sabotage.',
    category: 'Tort Law & Industrial Safety',
    legalConcepts: ['Absolute Liability', 'Hazardous Activity', 'MC Mehta Oleum Gas Leak', 'Strict Liability', 'Industrial Disaster'],
    keywords: ['absolute liability', 'hazardous industry', 'mc mehta case', 'oleum gas leak', 'toxic escape', 'industrial safety'],
    source: 'M.C. Mehta v. Union of India (1987) & Public Liability Insurance Act, 1991',
    metadata: {
      statute: 'Judicial Doctrine & Public Liability Insurance Act 1991',
      sectionCode: 'Absolute Liability Rule (Supreme Court)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Departed from English Rylands v. Fletcher rule by eliminating all exceptions for hazardous corporate enterprises.',
      complexity: 'Advanced',
      applicability: 'Chemical plants, nuclear installations, hazardous industries'
    },
    searchText: 'absolute liability doctrine hazardous activity mc mehta oleum gas leak industrial disaster strict liability toxic escape'
  },
  {
    id: 'legal-qa-40',
    question: 'What are the statutory provisions governing Negotiable Instruments and Dishonour of Cheques under Section 138 NI Act?',
    answer:
      'Section 138 of the Negotiable Instruments Act, 1881 makes dishonour of a cheque for insufficiency of funds a criminal offense punishable with imprisonment up to 2 years or fine up to double the cheque amount. The payee must issue statutory notice within 30 days of dishonour. Under Section 143A, courts can order interim compensation to the complainant during trial.',
    category: 'Banking & Negotiable Instruments Law',
    legalConcepts: ['Cheque Dishonour', 'Section 138 NI Act', 'Statutory Demand Notice', 'Banking Integrity', 'Interim Compensation'],
    keywords: ['cheque bounce', 'section 138 ni act', 'negotiable instruments', 'demand notice', 'banking fraud', 'cheque dishonour'],
    source: 'Negotiable Instruments Act, 1881 (Sections 138, 141, 143A)',
    metadata: {
      statute: 'Negotiable Instruments Act, 1881 (Sec 138)',
      sectionCode: 'NI Act 1881 Sec 138',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Inserted to enhance credibility of banking cheques in commercial transactions.',
      complexity: 'Fundamental',
      applicability: 'Commercial transactions, loan repayments, debt settlements'
    },
    searchText: 'cheque bounce dishonour section 138 ni act negotiable instruments statutory demand notice banking fraud'
  },
  {
    id: 'legal-qa-41',
    question: 'What is the law regarding Right to Fair Trial and Police Custody Limits under BNSS 2023?',
    answer:
      'Article 21 guarantees a fair, speedy trial before an independent judiciary (Hussainara Khatoon case). Under Section 58 of BNSS 2023 (formerly Section 57 CrPC), an arrested person cannot be detained in police custody for more than 24 hours without producing them before a Magistrate. Police custody extension under Section 187 BNSS is limited to a maximum of 15 days in total.',
    category: 'Criminal Procedure & Human Rights',
    legalConcepts: ['Right to Fair Trial', '24 Hour Arrest Limit', 'BNSS Section 58', 'Magistrate Production', 'Speedy Trial'],
    keywords: ['fair trial', '24 hours arrest', 'bnss 58', 'crpc 57', 'police custody', 'hussainara khatoon', 'magistrate'],
    source: 'Constitution Art 21 & BNSS 2023 (Sec 58, 187) & Hussainara Khatoon v. Home Secretary',
    metadata: {
      statute: 'Constitution Art 21 & BNSS 2023 Sec 58',
      sectionCode: 'BNSS Sec 58 / Art 21',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Hussainara Khatoon (1979) established speedy trial as an integral aspect of Article 21 fundamental rights.',
      complexity: 'Intermediate',
      applicability: 'Arrest procedure, custodial rights, human rights compliance'
    },
    searchText: 'right to fair trial 24 hours arrest limit bnss section 58 crpc 57 police custody magistrate speedy trial'
  },
  {
    id: 'legal-qa-42',
    question: 'What is the law on Contempt of Court under the Contempt of Courts Act 1971?',
    answer:
      'Under the Contempt of Courts Act, 1971, contempt is classified into Civil Contempt (willful disobedience of court orders) and Criminal Contempt (scandalizing the court, lowering judicial authority, or interfering with administration of justice under Section 2(c)). Truth is a valid defense under Section 13 if made in public interest and bona fide.',
    category: 'Judicial Authority & Contempt Law',
    legalConcepts: ['Contempt of Court', 'Civil Contempt', 'Criminal Contempt', 'Judicial Authority', 'Public Interest Truth Defense'],
    keywords: ['contempt of court', 'civil contempt', 'criminal contempt', 'scandalizing court', 'judicial authority', 'contempt 1971'],
    source: 'Contempt of Courts Act, 1971 (Sections 2, 12, 13) & Constitution Art 129 / 215',
    metadata: {
      statute: 'Contempt of Courts Act, 1971 & Constitution Art 129',
      sectionCode: 'Contempt Act Sec 2 & 12',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Articles 129 and 215 declare Supreme Court and High Courts as Courts of Record with inherent contempt powers.',
      complexity: 'Intermediate',
      applicability: 'Judicial order enforcement, courtroom decorum, legal reporting'
    },
    searchText: 'contempt of court civil contempt criminal contempt scandalizing court judicial authority contempt act 1971 truth defense'
  },
  {
    id: 'legal-qa-43',
    question: 'What are the legal guidelines regarding Arrest of Persons and DK Basu Safeguards under BNSS 2023?',
    answer:
      'Arrest procedure is strictly regulated under Sections 35 to 43 of BNSS 2023 (incorporating D.K. Basu v. State of West Bengal guidelines). Police officers making an arrest must wear clear identification badges, prepare an arrest memo attested by a family member/witness, inform the arrested person of grounds of arrest and right to bail, and permit consultation with an advocate (Section 38 BNSS). Custodial torture attracts severe penal liability.',
    category: 'Police Powers & Custodial Protections',
    legalConcepts: ['DK Basu Guidelines', 'Arrest Safeguards', 'BNSS Section 35', 'Custodial Rights', 'Anti-Torture Mandate'],
    keywords: ['dk basu case', 'arrest guidelines', 'bnss 35', 'crpc 41', 'custodial rights', 'arrest memo', 'police arrest'],
    source: 'D.K. Basu v. State of West Bengal (1997) & BNSS 2023 (Sections 35-43)',
    metadata: {
      statute: 'BNSS 2023 (Sec 35-43) & DK Basu Guidelines',
      sectionCode: 'BNSS Sec 35 (formerly CrPC Sec 41)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'D.K. Basu guidelines converted judicial directions into mandatory statutory code to prevent custodial deaths.',
      complexity: 'Intermediate',
      applicability: 'Police procedure, arrest memo, detainee rights'
    },
    searchText: 'dk basu guidelines arrest safeguards bnss section 35 crpc 41 custodial rights arrest memo police powers anti torture'
  },
  {
    id: 'legal-qa-44',
    question: 'What is the Public Trust Doctrine in Indian Environmental Jurisprudence?',
    answer:
      'The Public Trust Doctrine (affirmed in M.C. Mehta v. Kamal Nath, 1997) dictates that certain natural resources such as rivers, forests, seashores, and air are held by the State as a trustee for the free and unimpeded use of the general public. The State cannot alienate or divert public natural resources to private commercial ownership if it impairs ecological sustainability.',
    category: 'Environmental Law & Public Trust',
    legalConcepts: ['Public Trust Doctrine', 'State Ownership as Trustee', 'MC Mehta v Kamal Nath', 'Ecological Sustainability', 'Environmental Ethics'],
    keywords: ['public trust doctrine', 'kamal nath case', 'natural resources', 'river forest', 'environmental trust', 'public property'],
    source: 'M.C. Mehta v. Kamal Nath (1997) & Article 21 & 48A',
    metadata: {
      statute: 'Judicial Doctrine & Constitution Art 21 & Art 48A',
      sectionCode: 'Public Trust Doctrine (Supreme Court)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Derived from ancient Roman law and Tamil ethical maxims regarding communal water/forest stewardship.',
      complexity: 'Intermediate',
      applicability: 'Environmental clearances, riverbed mining, forest land diversion'
    },
    searchText: 'public trust doctrine state as trustee mc mehta kamal nath natural resources environmental protection ecological sustainability'
  },
  {
    id: 'legal-qa-45',
    question: 'What are the statutory rules on Compounding of Offenses under Section 359 BNSS 2023?',
    answer:
      'Compounding of Offenses under Section 359 of BNSS 2023 (formerly Section 320 CrPC) allows private disputes and minor offenses (such as hurt, defamation, trespass) to be settled amicably between victim and offender. Compounding has the legal effect of an acquittal of the accused. Serious non-compoundable offenses against society (murder, rape, dacoity) cannot be compounded.',
    category: 'Criminal Settlement & Mediation',
    legalConcepts: ['Compounding of Offenses', 'BNSS Section 359', 'Acquittal Effect', 'Amicable Settlement', 'Restorative Justice'],
    keywords: ['compounding offense', 'bnss 359', 'crpc 320', 'settlement', 'compromise', 'acquittal', 'minor dispute'],
    source: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (Section 359)',
    metadata: {
      statute: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      sectionCode: 'BNSS Sec 359 (formerly CrPC Sec 320)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Encourages restorative justice and dispute resolution without prolonged penal trial for personal grievances.',
      complexity: 'Fundamental',
      applicability: 'Minor criminal disputes, compromise petitions, trial settlement'
    },
    searchText: 'compounding of offenses bnss section 359 crpc 320 settlement compromise acquittal restorative justice minor dispute'
  },
  {
    id: 'legal-qa-46',
    question: 'What is the law regarding Corporate Criminal Liability and Officers in Default under Companies Act 2013?',
    answer:
      'Under Indian corporate jurisprudence (Standard Chartered Bank v. Directorate of Enforcement), corporations can be criminally prosecuted and fined for offenses requiring mens rea. Under Section 2(60) of the Companies Act, 2013, "Officers in Default" (managing directors, key managerial personnel, functional directors) face personal criminal liability for corporate statutory non-compliance.',
    category: 'Corporate Law & White Collar Crime',
    legalConcepts: ['Corporate Criminal Liability', 'Officer in Default', 'Companies Act 2013', 'Corporate Fraud', 'Mens Rea of Corporation'],
    keywords: ['corporate criminal liability', 'officer in default', 'companies act 2013', 'managing director liability', 'white collar crime'],
    source: 'Companies Act, 2013 (Section 2(60), 447) & Standard Chartered Bank Case',
    metadata: {
      statute: 'Companies Act, 2013 (Sec 2(60) & Sec 447)',
      sectionCode: 'Companies Act Sec 2(60), 447',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Section 447 Companies Act provides stringent imprisonment up to 10 years for corporate fraud.',
      complexity: 'Advanced',
      applicability: 'Company directors, key managerial personnel, corporate governance'
    },
    searchText: 'corporate criminal liability officer in default companies act 2013 section 447 corporate fraud director liability mens rea'
  },
  {
    id: 'legal-qa-47',
    question: 'What are the legal standards for Medical Consent and Patient Autonomy in Indian Jurisprudence?',
    answer:
      'Medical treatment without informed consent constitutes civil tort of battery and negligence (Samira Kohli v. Dr. Prabha Manchanda, 2008). Doctors must explain the diagnosis, proposed treatment, risks, and alternatives to a competent patient. Emergency treatment without consent is permissible solely when the patient is unconscious and immediate life-saving care is mandatory.',
    category: 'Medical Law & Patient Autonomy',
    legalConcepts: ['Informed Medical Consent', 'Patient Autonomy', 'Samira Kohli Case', 'Medical Battery', 'Emergency Exception'],
    keywords: ['medical consent', 'informed consent', 'patient autonomy', 'samira kohli', 'hospital consent', 'doctor obligation'],
    source: 'Samira Kohli v. Dr. Prabha Manchanda (2008) & Indian Medical Council Regulations',
    metadata: {
      statute: 'Supreme Court Precedent & Medical Council Regulations 2002',
      sectionCode: 'Samira Kohli Test',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Affirmed patient right to bodily self-determination under Article 21.',
      complexity: 'Intermediate',
      applicability: 'Surgical procedures, medical diagnosis, patient rights'
    },
    searchText: 'informed medical consent patient autonomy samira kohli case medical battery emergency treatment exception'
  },
  {
    id: 'legal-qa-48',
    question: 'What is the statutory framework for Mediation and Alternative Dispute Resolution under Section 89 CPC and Mediation Act 2023?',
    answer:
      'Section 89 of the Code of Civil Procedure, 1908 and the Mediation Act, 2023 promote Alternative Dispute Resolution (ADR). Courts can refer pending civil disputes to court-annexed mediation, conciliation, or Lok Adalats. Mediated settlement agreements hold the same legal status and enforceability as a civil court decree under Section 27 of the Mediation Act 2023.',
    category: 'Alternative Dispute Resolution (ADR)',
    legalConcepts: ['Mediation Act 2023', 'Section 89 CPC', 'ADR', 'Mediated Settlement Enforcement', 'Court Referral'],
    keywords: ['mediation', 'adr', 'cpc section 89', 'mediation act 2023', 'lok adalat', 'settlement agreement', 'conciliation'],
    source: 'Mediation Act, 2023 & Code of Civil Procedure, 1908 (Section 89)',
    metadata: {
      statute: 'Mediation Act, 2023 & CPC Sec 89',
      sectionCode: 'Mediation Act 2023 / CPC Sec 89',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Afcons Infrastructure v. Cherian Varkey formulated guidelines for mandatory court ADR referrals.',
      complexity: 'Fundamental',
      applicability: 'Commercial disputes, civil suits, matrimonial claims'
    },
    searchText: 'mediation act 2023 cpc section 89 adr alternative dispute resolution lok adalat mediated settlement decree'
  },
  {
    id: 'legal-qa-49',
    question: 'What is the law regarding Cyber Extortion and Ransomware Attacks under IT Act 2000 and BNS 2023?',
    answer:
      'Ransomware attacks and cyber extortion (encrypting files demanding digital payment) are penalized under Section 66 (Hacking) and Section 66D of the IT Act, 2000, alongside Section 308 (Extortion) and Section 336 (Electronic Forgery) of BNS 2023. Perpetrators face up to 10 years imprisonment, and financial institutions must report incidents to CERT-In within 6 hours.',
    category: 'Cyber Crime & CERT-In Rules',
    legalConcepts: ['Ransomware', 'Cyber Extortion', 'CERT-In Reporting', 'IT Act Section 66', 'Data Recovery'],
    keywords: ['ransomware', 'cyber extortion', 'cert-in', 'cert in 6 hours', 'it act section 66', 'bns extortion', 'crypto ransom'],
    source: 'IT Act, 2000 & CERT-In Cyber Security Directions, 2022 & BNS 2023',
    metadata: {
      statute: 'IT Act 2000 & CERT-In Directions 2022',
      sectionCode: 'IT Act Sec 66 / CERT-In Sec 70B',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Mandates 6-hour incident reporting window for critical infrastructure cyber breaches.',
      complexity: 'Intermediate',
      applicability: 'IT enterprises, banks, healthcare databases, critical infrastructure'
    },
    searchText: 'ransomware cyber extortion cert-in reporting 6 hours it act section 66 bns extortion data encryption security'
  },
  {
    id: 'legal-qa-50',
    question: 'What are the constitutional rights of an Arrested Person under Article 22 of the Indian Constitution?',
    answer:
      'Article 22 guarantees fundamental safeguards to any person arrested: 1. Right to be informed as soon as may be of the grounds of arrest (Art 22(1)), 2. Right to consult and be defended by a legal practitioner of choice, 3. Right to be produced before the nearest magistrate within 24 hours (Art 22(2)), 4. Protection against detention beyond 24 hours without magistrate order.',
    category: 'Constitutional Rights & Detainee Protections',
    legalConcepts: ['Article 22 Rights', 'Grounds of Arrest', 'Right to Counsel', '24 Hour Production', 'Constitutional Safeguards'],
    keywords: ['article 22', 'arrest rights', 'grounds of arrest', 'right to lawyer', 'magistrate 24 hours', 'detainee protection'],
    source: 'Constitution of India (Part III - Article 22)',
    metadata: {
      statute: 'Constitution of India (Article 22)',
      sectionCode: 'Article 22(1) & 22(2)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Complements BNSS Section 35-58 procedure with non-negotiable constitutional backing.',
      complexity: 'Fundamental',
      applicability: 'All police arrests, custodial detentions, trial defense'
    },
    searchText: 'article 22 arrest rights grounds of arrest right to lawyer legal counsel magistrate 24 hours constitutional safeguards'
  },
  {
    id: 'legal-qa-51',
    question: 'What is the law governing Deceptive Packaging and Slack Fill under Consumer Protection Rules?',
    answer:
      'Deceptive packaging and slack fill (filling containers deceptively to mislead buyers about quantity) constitute Unfair Trade Practice under Section 2(47) of Consumer Protection Act, 2019 and Legal Metrology (Packaged Commodities) Rules, 2011. Manufacturers must state net quantity, unit sale price, and expiry date clearly.',
    category: 'Consumer Rights & Packaging Transparency',
    legalConcepts: ['Deceptive Packaging', 'Legal Metrology Rules', 'Consumer Rights', 'Slack Fill', 'Price Transparency'],
    keywords: ['deceptive packaging', 'slack fill', 'legal metrology', 'packaged commodities', 'consumer protection', 'net weight'],
    source: 'Consumer Protection Act, 2019 & Legal Metrology Rules, 2011',
    metadata: {
      statute: 'Legal Metrology Act, 2009 & CPA 2019',
      sectionCode: 'CPA Sec 2(47) / Metrology Sec 18',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Mandates transparent unit sale price display on all retail packaged goods.',
      complexity: 'Fundamental',
      applicability: 'FMCG manufacturers, retail sellers, consumer goods'
    },
    searchText: 'deceptive packaging slack fill legal metrology packaged commodities rules consumer protection act price transparency'
  },
  {
    id: 'legal-qa-52',
    question: 'What is the legal framework governing Public Nuisance vs Private Nuisance under Indian Tort Law?',
    answer:
      'Public Nuisance affects the reasonable comfort and health of the general public or a class of citizens (punishable under Section 270 BNS 2023 and actionable via Section 91 CPC suit). Private Nuisance is a civil tort involving continuous, unreasonable interference with an individual\'s use or enjoyment of their private land or property, remedy for which is an injunction or damages.',
    category: 'Tort Law & Property Rights',
    legalConcepts: ['Public Nuisance', 'Private Nuisance', 'Section 91 CPC', 'Property Quiet Enjoyment', 'Tort Injunction'],
    keywords: ['private nuisance', 'public nuisance', 'tort law', 'cpc section 91', 'quiet enjoyment', 'land interference', 'injunction'],
    source: 'Code of Civil Procedure, 1908 (Section 91) & BNS 2023 (Section 270)',
    metadata: {
      statute: 'CPC 1908 Sec 91 & BNS 2023 Sec 270',
      sectionCode: 'CPC Sec 91 / BNS Sec 270',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Section 91 CPC allows two or more persons to file a suit for public nuisance with court leave.',
      complexity: 'Intermediate',
      applicability: 'Property disputes, neighborhood noise/pollution, public obstruction'
    },
    searchText: 'public nuisance private nuisance tort law cpc section 91 bns section 270 quiet enjoyment property rights injunction'
  }
];
