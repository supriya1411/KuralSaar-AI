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
    keywords: ['cyberbullying', 'it act 2000', 'section 66e', 'stalking', 'harassment', 'privacy', 'online safety', 'bns 78'],
    source: 'Information Technology Act, 2000 & Bharatiya Nyaya Sanhita, 2023',
    metadata: {
      statute: 'Information Technology Act, 2000 (Sec 66E, 67) & BNS 2023 (Sec 78, 79, 356)',
      sectionCode: 'IT Act 66E / BNS Sec 78 (formerly IPC 354D)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Transitioned from IPC provisions (354D, 509) to modernized BNS 2023 definitions with explicit coverage for digital communications.',
      complexity: 'Intermediate',
      applicability: 'Electronic communications, social media platforms, cyber offenses'
    },
    searchText: 'cyberbullying online harassment unauthorized photos privacy it act 2000 section 66e section 67 stalking bns section 78 defamation'
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
    keywords: ['theft', 'misappropriation', 'bns 303', 'ipc 378', 'movable property', 'mens rea', 'wrongful gain'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 303, 314)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Chapter XVII)',
      sectionCode: 'BNS Section 303 (formerly IPC 378) / BNS Section 314 (formerly IPC 403)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Replaced traditional Indian Penal Code 1860 classifications with streamlined BNS 2023 definitions.',
      complexity: 'Fundamental',
      applicability: 'All offenses against movable property and conversion'
    },
    searchText: 'theft dishonest misappropriation of property bns section 303 ipc 378 mens rea wrongful gain movable property consent'
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
    keywords: ['corruption', 'bribe', 'prevention of corruption act', 'public servant', 'whistleblower', 'pca 1988', 'undue advantage'],
    source: 'Prevention of Corruption Act, 1988 (Amended 2018) & Whistle Blowers Protection Act, 2014',
    metadata: {
      statute: 'Prevention of Corruption Act, 1988 (Sections 7, 8, 9)',
      sectionCode: 'PC Act 1988 Sec 7, 8, 9',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'The 2018 Amendment brought supply-side bribery (bribe-givers) into the primary statutory purview while introducing corporate compliance defenses.',
      complexity: 'Intermediate',
      applicability: 'All public servants, administrative officers, and commercial entities dealing with the State'
    },
    searchText: 'prevention of corruption act 1988 bribery undue advantage public servant whistleblower protection corporate compliance anti graft'
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
    keywords: ['private defence', 'self defence', 'revenge', 'vigilantism', 'proportionality', 'bns 34', 'ipc 96'],
    source: 'Bharatiya Nyaya Sanhita, 2023 (Sections 34-44)',
    metadata: {
      statute: 'Bharatiya Nyaya Sanhita, 2023 (Chapter III - General Exceptions)',
      sectionCode: 'BNS Sections 34-44 (formerly IPC 96-106)',
      educationalDisclaimer: LEGAL_DISCLAIMER_TEXT,
      historicalNote: 'Supreme Court precedents (e.g. State of UP v. Ram Swarup) establish that private defence cannot be claimed by an aggressor or as an excuse for premeditated vengeance.',
      complexity: 'Intermediate',
      applicability: 'Criminal liability, self-defence claims, assault disputes'
    },
    searchText: 'private defence self defence revenge vigilantism proportionality bns 34 bns 36 general exceptions due process non retaliation'
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
  }
];
