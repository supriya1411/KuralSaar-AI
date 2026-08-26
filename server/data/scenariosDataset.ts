import { NormalizedScenario } from '../types';

export const SCENARIOS_DATASET: NormalizedScenario[] = [
  {
    id: 'scen-1',
    number: 1,
    title: 'The Land Dispute & The Sibling\'s Counsel (Conflict of Interest)',
    description:
      'Advocate Anita is approached by a farmer, Mr. Murugan, who wants to file a suit regarding an ancestral boundary dispute against a local builder company. During the initial consultation, Anita realizes that her younger brother is the principal civil contractor and an equity partner in the builder company defending the claim.',
    difficulty: 'Medium',
    category: 'Conflict of Interest',
    question: 'What is the most ethical and legally compliant course of action for Advocate Anita to take?',
    options: [
      {
        id: 'A',
        text: 'Accept the brief secretly, but persuade the farmer to settle out of court for a low price.',
        isCorrect: false,
        explanation: 'Inducing a client to settle unfavorably to protect personal family interests constitutes gross breach of fiduciary duty and professional misconduct.',
        ethicalFeedback: 'Violates Thirukkural 118 ("Saman Seithu Seerthookkum") regarding strict impartiality and betrayal of trust.',
        legalFeedback: 'Direct violation of Bar Council of India Rules Rule 22 and Section 35 of the Advocates Act 1961.'
      },
      {
        id: 'B',
        text: 'Disclose the sibling relationship immediately, recuse herself from representing either party, and refer the client to an independent senior advocate.',
        isCorrect: true,
        explanation: 'Full disclosure and immediate recusal prevents any pecuniary or personal bias, upholding absolute transparency and client trust.',
        ethicalFeedback: 'Exemplifies Kural 118 & 131: guarding professional conduct more preciously than life itself through unwavering impartiality.',
        legalFeedback: 'Adheres to the doctrine of Nemo Judex In Causa Sua and mandatory Bar Council conflict of interest disclosure rules.'
      },
      {
        id: 'C',
        text: 'Accept the fee and pass confidential documents to her brother to help him prepare his defense.',
        isCorrect: false,
        explanation: 'Leaking confidential client documents is a grave crime, breaching attorney-client privilege and actionable for damages.',
        ethicalFeedback: 'Breaches Kural 282 (Kallaamai) and basic moral sanctity.',
        legalFeedback: 'Severe violation of Section 132 of Bharatiya Sakshya Adhiniyam, 2023 (formerly Sec 126 Evidence Act) and attracts striking off the roll.'
      },
      {
        id: 'D',
        text: 'Charge a double retainer fee claiming the case has heightened difficulty without mentioning the brother.',
        isCorrect: false,
        explanation: 'Exploitative financial opportunism compounding a hidden conflict of interest.',
        ethicalFeedback: 'Condemned under Kural 1001 (Nandriyil Selvam) on illicitly derived wealth.',
        legalFeedback: 'Actionable misconduct before the State Bar Disciplinary Committee.'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Impartiality', 'Transparency', 'Fiduciary Duty', 'Integrity'],
    legalConcepts: ['Conflict of Interest', 'Bar Council Rules', 'Nemo Judex in Causa Sua', 'Advocates Act 1961'],
    relatedKuralIds: [111, 118, 131],
    relatedLegalKnowledgeIds: ['legal-qa-1', 'legal-qa-9', 'legal-qa-10'],
    explanation:
      'Under the Bar Council of India Rules, an advocate has a strict fiduciary obligation to avoid situations where personal or familial relationships may compromise independent professional judgment. Immediate disclosure and recusal protects the integrity of the judicial process.',
    thinkEthicallyHint: 'Consider whether justice can truly appear to be done if one party has secret familial ties to the advocate representing their opponent.',
    skillsImproved: [
      { name: 'Ethical Reasoning', percentage: 95, points: 50 },
      { name: 'Legal Awareness', percentage: 92, points: 30 },
      { name: 'Decision Making', percentage: 90, points: 20 }
    ],
    legalPerspective: {
      title: 'Bar Council of India Rules & Advocates Act 1961',
      statutes: ['Advocates Act 1961 Section 35', 'BCI Rules Part VI, Chapter II, Rule 22'],
      explanation: 'An advocate must decline employment if their connection with the adversary makes it difficult to maintain detached professional representation.',
      precedentOrCode: 'Chandra Shekhar Soni v. Bar Council of Rajasthan (AIR 1983 SC 1012)',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Impartiality & Thirukkural Jurisprudence',
      principles: ['Naduvunilaimai (Equanimity)', 'Ozhukkam Udaimai (Right Conduct)', 'Seinandri Arithal (Gratitude & Fiduciary Trust)'],
      deepDive: 'Kural 118 emphasizes that an ethical adjudicator must behave like a true balance scale, neither tilting toward family nor personal gain.'
    }
  },
  {
    id: 'scen-2',
    number: 2,
    title: 'The WhatsApp Group Defamation & Bullying (Cyberbullying)',
    description:
      'Ravi, an engineering student, creates a private college group chat and circulates fabricated screenshots and derogatory memes targeting a junior classmate to humiliate her after she won a student council debate.',
    difficulty: 'Easy',
    category: 'Cyberbullying',
    question: 'How does the law categorize Ravi\'s actions, and what is the proper ethical response for a bystander in the group?',
    options: [
      {
        id: 'A',
        text: 'It is harmless banter protected by free speech; group members should forward it to other batches.',
        isCorrect: false,
        explanation: 'Defamatory, targeted digital harassment is not protected speech under Article 19(2) and constitutes cyber offenses.',
        ethicalFeedback: 'Violates Kural 127 ("Yaakaavaa Raayinum Naakaakka") on the catastrophic harm of unrestrained hurtful speech.',
        legalFeedback: 'Attracts criminal liability under IT Act Section 66E/67 and BNS Section 78/356.'
      },
      {
        id: 'B',
        text: 'Report the cyber harassment to the institution\'s anti-ragging cell and cyber cell, refusing to forward or participate in the humiliation.',
        isCorrect: true,
        explanation: 'Active non-complicity combined with institutional reporting stops digital mobbing and upholds victim protection laws.',
        ethicalFeedback: 'Exemplifies Kural 129 ("Theeyinaal Suttapun") and 181 (avoiding slander and backbiting).',
        legalFeedback: 'Complies with UGC Anti-Ragging Regulations and Information Technology Act reporting provisions.'
      },
      {
        id: 'C',
        text: 'Retaliate by hacking Ravi\'s personal phone and posting his private family photos online.',
        isCorrect: false,
        explanation: 'Vigilante cyber-attacks are illegal independent offenses under IT Act Section 43/66.',
        ethicalFeedback: 'Violates Kural 314 on avoiding cyclical revenge.',
        legalFeedback: 'Constitutes hacking under Section 66 IT Act and unauthorized data breach.'
      },
      {
        id: 'D',
        text: 'Demand money from Ravi threatening to expose him to the college Dean.',
        isCorrect: false,
        explanation: 'Blackmailing a wrongdoer constitutes the independent criminal offense of Extortion.',
        ethicalFeedback: 'Directly violates Kural 282 (Kallaamai).',
        legalFeedback: 'Actionable under Section 308 BNS (formerly Section 384 IPC - Extortion).'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Speech Restraint', 'Non-Injury', 'Moral Courage', 'Dignity Protection'],
    legalConcepts: ['Cyber Bullying', 'IT Act Section 66E', 'Anti-Ragging Regulations', 'Criminal Defamation'],
    relatedKuralIds: [127, 129, 181],
    relatedLegalKnowledgeIds: ['legal-qa-2', 'legal-qa-7'],
    explanation:
      'Circulating non-consensual fabricated digital material to intimidate or defame a student constitutes cyberbullying and attracts provisions of the IT Act, BNS, and UGC Anti-Ragging Regulations.',
    thinkEthicallyHint: 'Consider how digital permanence multiplies the psychological injury of verbal cruelty.',
    skillsImproved: [
      { name: 'Legal Awareness', percentage: 94, points: 40 },
      { name: 'Ethical Reasoning', percentage: 90, points: 30 },
      { name: 'Prosocial Decision Making', percentage: 88, points: 30 }
    ],
    legalPerspective: {
      title: 'IT Act 2000 & Anti-Ragging Framework',
      statutes: ['Information Technology Act Section 66E / 67', 'BNS Section 78 (Stalking) & 356 (Defamation)', 'UGC Regulations 2009'],
      explanation: 'Institutions are mandated to take cognizance of digital bullying under zero-tolerance statutory guidelines.',
      precedentOrCode: 'Shreya Singhal v. Union of India / Vishwa Jagriti Mission Guidelines',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Restraint of Speech in Classical Philosophy',
      principles: ['Adakkam Udaimai (Self-Control)', 'Puran Kooramai (Anti-Slander)', 'Aruludaimai (Compassion)'],
      deepDive: 'Thiruvalluvar observes in Kural 129 that bodily burns heal, but the psychological scar of verbal cruelty remains permanently etched in memory.'
    }
  },
  {
    id: 'scen-3',
    number: 3,
    title: 'The Fake Job Offer & KYC OTP Request (Online Fraud Awareness)',
    description:
      'Vikram receives a WhatsApp message offering a remote data-entry role for Rs. 5,000/day. The sender asks Vikram to pay a Rs. 999 "security deposit" via a payment gateway link and share the banking OTP sent to his phone to "verify KYC".',
    difficulty: 'Easy',
    category: 'Online Fraud Awareness',
    question: 'What is the correct legal and procedural response to this online communication?',
    options: [
      {
        id: 'A',
        text: 'Share the OTP immediately because Rs. 999 is a small risk for a lucrative salary.',
        isCorrect: false,
        explanation: 'Sharing financial OTPs grants attackers authorization to drain bank accounts, facilitating cyber fraud.',
        ethicalFeedback: 'Fails in critical discernment (Kural 423 - Arivudaimai).',
        legalFeedback: 'Breaches basic digital financial safety guidelines issued by RBI and CERT-In.'
      },
      {
        id: 'B',
        text: 'Never share the OTP, refrain from clicking unverified payment links, and report the fraudulent number to the National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in).',
        isCorrect: true,
        explanation: 'Recognizing phishing patterns, safeguarding authentication credentials, and reporting to authorities mitigates cybercrime networks.',
        ethicalFeedback: 'Exemplifies Kural 423 (Truth realization through inquiry) and civic vigilance.',
        legalFeedback: 'Assists law enforcement under IT Act Section 66D and BNS Section 318 (Cheating by Personation).'
      },
      {
        id: 'C',
        text: 'Forward the message to all college classmates so they can also apply for the job.',
        isCorrect: false,
        explanation: 'Inadvertently acting as a vector for phishing scams harms vulnerable peers.',
        ethicalFeedback: 'Violates Kural 191 (Payanila Sollaamai) and duty of care.',
        legalFeedback: 'May lead to investigation for abetting online fraud syndicates.'
      },
      {
        id: 'D',
        text: 'Send a fake abusive link back to the sender in anger.',
        isCorrect: false,
        explanation: 'Engaging with cyber threat actors exposes personal devices to malware and accomplishes nothing lawful.',
        ethicalFeedback: 'Violates Kural 304 on counter-productive wrath.',
        legalFeedback: 'Unlawful distribution of malicious software violates IT Act Section 43/66.'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Critical Inquiry', 'Civic Vigilance', 'Truth Realization', 'Prudence'],
    legalConcepts: ['Phishing', 'IT Act Section 66D', 'Cybercrime Reporting', 'Identity Fraud'],
    relatedKuralIds: [282, 355, 423],
    relatedLegalKnowledgeIds: ['legal-qa-3'],
    explanation:
      'Phishing scams exploit financial eagerness. Lawful organizations never demand OTPs for job placements. Reporting to cybercrime.gov.in (Helpline 1930) enables immediate account freezing under standard financial protocols.',
    thinkEthicallyHint: 'Wisdom consists in investigating claims beyond superficial appearances before acting.',
    skillsImproved: [
      { name: 'Legal Awareness', percentage: 96, points: 40 },
      { name: 'Critical Thinking', percentage: 95, points: 40 },
      { name: 'Decision Making', percentage: 90, points: 20 }
    ],
    legalPerspective: {
      title: 'IT Act Section 66D & RBI Cybersecurity Directives',
      statutes: ['Information Technology Act Section 66C, 66D', 'BNS Section 318 (Cheating)', 'RBI Master Directions on Digital Payments Safety'],
      explanation: 'Cheating by impersonation through electronic devices is a cognizable cyber offense punishable by imprisonment.',
      precedentOrCode: 'National Cyber Crime Reporting Portal SOP 2023',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Arivudaimai (Possession of Wisdom)',
      principles: ['Epistemic Vigilance', 'Mei Unardhal (Seeing Truth)', 'Kallaamai (Rejecting Deceit)'],
      deepDive: 'Kural 423 states: "Whate\'er the matter be, from whomsoever heard, that matter\'s true inwardness to discern is wisdom."'
    }
  },
  {
    id: 'scen-4',
    number: 4,
    title: 'The Exam Question Leak & WhatsApp Forward (Peer Pressure)',
    description:
      'On the eve of the semester law exam, Rajesh is added to a study group where a close friend shares an unreleased leaked question paper received from an exam administrator. The friend pressures Rajesh to download it and keep quiet.',
    difficulty: 'Medium',
    category: 'Peer Pressure',
    question: 'How should Rajesh navigate the peer pressure while upholding legal and academic integrity?',
    options: [
      {
        id: 'A',
        text: 'Download the paper, memorize the answers, and justify it because "everyone else will score higher".',
        isCorrect: false,
        explanation: 'Succumbing to peer rationalizations compromises moral character and makes one a co-conspirator in academic fraud.',
        ethicalFeedback: 'Violates Kural 131 (Ozhukkam Udaimai) and Kural 656 on refusing shameful means.',
        legalFeedback: 'Constitutes criminal conspiracy and violations under Public Examinations (Prevention of Unfair Means) Act, 2024.'
      },
      {
        id: 'B',
        text: 'Refuse to use the leaked paper, advise friends to step away from the breach, and report the leak immediately to the Controller of Examinations.',
        isCorrect: true,
        explanation: 'Preserves the meritocratic integrity of public evaluation and fulfills the legal duty to deter examination malpractice.',
        ethicalFeedback: 'Exemplifies Kural 656 ("Eendraal Pasikaanbaan Aayinum") on upholding absolute integrity despite peer duress.',
        legalFeedback: 'Complies with Public Examinations Act 2024 and institutional academic integrity codes.'
      },
      {
        id: 'C',
        text: 'Sell copies of the leaked paper to students in other colleges to earn quick cash.',
        isCorrect: false,
        explanation: 'Commercial distribution of stolen intellectual material constitutes aggravated criminal fraud and organized cheating.',
        ethicalFeedback: 'Direct violation of Kural 282 (Kallaamai).',
        legalFeedback: 'Actionable under Section 10 of Public Examinations Act 2024 with minimum 3 to 5 years imprisonment.'
      },
      {
        id: 'D',
        text: 'Pretend not to see the message, study normally, but stay silent while others cheat.',
        isCorrect: false,
        explanation: 'Passive complicity allows systemic corruption to disadvantage honest candidates who studied without illicit leaks.',
        ethicalFeedback: 'Fails the civic duty of active righteous action (Kural 211 - Oppuravu Arithal).',
        legalFeedback: 'Fails institutional reporting obligations.'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Academic Integrity', 'Moral Courage', 'Resisting Malpractice', 'Meritocracy'],
    legalConcepts: ['Public Examinations Act 2024', 'Criminal Conspiracy', 'Breach of Confidentiality'],
    relatedKuralIds: [131, 282, 656],
    relatedLegalKnowledgeIds: ['legal-qa-4', 'legal-qa-6'],
    explanation:
      'The Public Examinations (Prevention of Unfair Means) Act, 2024 strictly penalizes paper leaks and unauthorized disclosure. Upholding ethical standards under peer pressure is essential for legal professionals.',
    thinkEthicallyHint: 'Ask yourself: if an entire batch passes through cheating, what happens to public trust in the justice system they will administer tomorrow?',
    skillsImproved: [
      { name: 'Ethical Reasoning', percentage: 95, points: 40 },
      { name: 'Critical Thinking', percentage: 90, points: 30 },
      { name: 'Professional Ethics', percentage: 92, points: 30 }
    ],
    legalPerspective: {
      title: 'Public Examinations (Prevention of Unfair Means) Act 2024',
      statutes: ['Public Examinations Act 2024 Sections 3, 9, 10', 'BNS Section 61 (Conspiracy)', 'University Conduct Regulations'],
      explanation: 'Organized paper leaks and distribution of unauthorized exam material carry stringent non-bailable penal sanctions.',
      precedentOrCode: 'Section 10 Public Examinations Act 2024',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Vinai Thooymai (Purity of Means)',
      principles: ['Ozhukkam (Integrity)', 'Sitrinam Seraamai (Avoiding Bad Alliances)', 'Kallaamai (Non-Theft)'],
      deepDive: 'Kural 656 dictates that even in extreme trial, one must never undertake actions condemned by wisdom.'
    }
  },
  {
    id: 'scen-5',
    number: 5,
    title: 'The Municipal Tender Speed-Money Demand (Corruption)',
    description:
      'A solar-energy startup has won a legitimate government procurement contract to install clean lighting in rural primary health centers. An assistant engineer demands a 5% "processing facilitation commission" before releasing the milestone payment.',
    difficulty: 'Hard',
    category: 'Corruption',
    question: 'What is the legally required and ethically sound path for the startup founder to pursue?',
    options: [
      {
        id: 'A',
        text: 'Pay the cash bribe disguised as "consulting fees" to protect the company\'s quarterly revenue.',
        isCorrect: false,
        explanation: 'Paying speed money or bribes is a severe criminal offense under the Prevention of Corruption Act (amended 2018).',
        ethicalFeedback: 'Violates Kural 651 & 656 (Ends do not justify unlawful means).',
        legalFeedback: 'Direct violation of Section 8 of Prevention of Corruption Act 1988 (offense of bribing a public servant).'
      },
      {
        id: 'B',
        text: 'Refuse the bribe demand, document the interaction with dates and evidence, and lodge a formal complaint with the State Vigilance and Anti-Corruption Directorate / Lokayukta.',
        isCorrect: true,
        explanation: 'Statutory compliance requires reporting bribe demands. Section 8 PCA protects individuals who report bribe demands within 7 days to investigative agencies.',
        ethicalFeedback: 'Exemplifies Kural 651 ("Vinai Thooymai") and Kural 55 (Sengonmai - Righteous rule).',
        legalFeedback: 'Invokes Section 8 proviso of PCA 1988 (whistleblower report protection) and the Lokayukta Act.'
      },
      {
        id: 'C',
        text: 'Subcontract the work to a shell company owned by the engineer\'s relative to bypass accounting audits.',
        isCorrect: false,
        explanation: 'Engaging in illicit quid pro quo through third-party intermediaries constitutes money laundering and corporate corruption.',
        ethicalFeedback: 'Direct violation of Kural 282 (Kallaamai) and transparent governance.',
        legalFeedback: 'Attracts corporate liability under Section 9 PCA 1988 and Prevention of Money Laundering Act (PMLA).'
      },
      {
        id: 'D',
        text: 'Abandon the rural clinic project entirely without explaining why to the health department.',
        isCorrect: false,
        explanation: 'Silently walking away harms the public welfare of rural patients without holding the corrupt official accountable.',
        ethicalFeedback: 'Fails civic responsibility (Kural 211 - Oppuravu Arithal).',
        legalFeedback: 'Breaches contractual obligations for healthcare service delivery.'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Zero Tolerance to Bribery', 'Purity of Action', 'Civic Accountability', 'Institutional Integrity'],
    legalConcepts: ['Prevention of Corruption Act 1988', 'Lokayukta', 'Corporate Compliance', 'Anti-Bribery'],
    relatedKuralIds: [651, 656, 1001],
    relatedLegalKnowledgeIds: ['legal-qa-6'],
    explanation:
      'Under the 2018 amendment to the Prevention of Corruption Act, giving a bribe is an independent offense under Section 8, but a citizen or business coerced into a bribe demand who reports it within 7 days to law enforcement is protected as a complainant.',
    thinkEthicallyHint: 'Giving into "small facilitation bribes" systematically normalizes extortion and locks out ethical entrepreneurs.',
    skillsImproved: [
      { name: 'Professional Ethics', percentage: 96, points: 50 },
      { name: 'Legal Awareness', percentage: 94, points: 30 },
      { name: 'Critical Thinking', percentage: 90, points: 20 }
    ],
    legalPerspective: {
      title: 'Prevention of Corruption Act 1988 (Amended 2018)',
      statutes: ['PC Act 1988 Section 7 (Public Servant taking Bribe)', 'PC Act 1988 Section 8 (Giving Bribe & 7-day reporting exception)', 'Section 9 (Commercial Organizations)'],
      explanation: 'Corporate entities and individuals must enforce clear anti-bribery policies.',
      precedentOrCode: 'CBI / State Vigilance Standard Trap Procedure Guidelines',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Vinai Thooymai & Good Governance',
      principles: ['Purity of Conduct', 'Anti-Extortion', 'Public Trust'],
      deepDive: 'Kural 651 teaches that while good connections bring temporary benefit, it is the clean, uncorrupted execution of deeds that guarantees permanent success.'
    }
  },
  {
    id: 'scen-6',
    number: 6,
    title: 'The Road Rage Assault & The Mediation Choice (Anger and Violence / Revenge)',
    description:
      'Following a minor fender-bender at a traffic intersection, the other driver exits his vehicle shouting insults and strikes Karthik\'s side mirror with an iron rod. Karthik\'s passenger urges him to grab a wrench from the boot and beat the other driver unconscious.',
    difficulty: 'Medium',
    category: 'Anger and Violence',
    question: 'How does the legal doctrine of Private Defence apply, and what is the lawful and ethical choice for Karthik?',
    options: [
      {
        id: 'A',
        text: 'Retrieve the wrench and attack the driver to teach him a lesson and satisfy personal honor.',
        isCorrect: false,
        explanation: 'Retaliatory assault exceeds any defensive purpose and transforms Karthik into a culpable criminal aggressor.',
        ethicalFeedback: 'Violates Kural 304 (Sinam destroys reason) and Kural 314 on the futility of reciprocal violence.',
        legalFeedback: 'Constitutes Voluntarily Causing Hurt under Section 115 BNS / 323 IPC and disqualifies private defence.'
      },
      {
        id: 'B',
        text: 'Remain safe inside the vehicle, record video evidence of the property damage, call the police control room (112), and pursue lawful insurance and criminal claims.',
        isCorrect: true,
        explanation: 'De-escalation preserves physical safety. Property damage is remediated through formal police complaint (FIR) and Motor Vehicles Third Party insurance claims.',
        ethicalFeedback: 'Exemplifies Kural 151 (Poraiyudaimai - Forbearance) and Kural 304 on overcoming destructive wrath.',
        legalFeedback: 'Complies with BNS Private Defence boundaries (Sections 34-44) and Motor Vehicles Act 1988 claims process.'
      },
      {
        id: 'C',
        text: 'Run over the other driver with the car claiming self-defence for property damage.',
        isCorrect: false,
        explanation: 'Using lethal vehicular force for minor property damage is disproportionate and constitutes Attempt to Murder (Sec 109 BNS / 307 IPC).',
        ethicalFeedback: 'Gross violation of Kural 321 (Kollaamai - Non-killing).',
        legalFeedback: 'Private defence never permits excessive lethal force for non-life-threatening property disputes.'
      },
      {
        id: 'D',
        text: 'Hire local thugs later that evening to vandalize the other driver\'s residence.',
        isCorrect: false,
        explanation: 'Premeditated private vigilantism is a severe criminal conspiracy punishable with imprisonment.',
        ethicalFeedback: 'Directly violates Kural 314 on rejecting cyclical revenge.',
        legalFeedback: 'Actionable under Section 61 BNS (Criminal Conspiracy) and Section 324 (Mischief).'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Anger Restraint', 'De-escalation', 'Due Process', 'Proportionality'],
    legalConcepts: ['Right of Private Defence', 'Proportionality Test', 'Motor Vehicles Act', 'Criminal Assault'],
    relatedKuralIds: [304, 314, 151],
    relatedLegalKnowledgeIds: ['legal-qa-8'],
    explanation:
      'The Right of Private Defence is strictly defensive, not punitive or retaliatory. Once an immediate threat is contained, self-help violence becomes criminal assault. Restraint and evidence recording protect both life and legal remedy.',
    thinkEthicallyHint: 'Will answering rage with escalated violence prevent tragedy or multiply it?',
    skillsImproved: [
      { name: 'Prosocial Decision Making', percentage: 95, points: 40 },
      { name: 'Legal Awareness', percentage: 92, points: 30 },
      { name: 'Critical Thinking', percentage: 88, points: 30 }
    ],
    legalPerspective: {
      title: 'BNS 2023 Sections 34-44 (Right of Private Defence)',
      statutes: ['Bharatiya Nyaya Sanhita Sections 34-44 (General Exceptions)', 'BNS Section 115 (Voluntarily Causing Hurt)', 'Motor Vehicles Act Section 134'],
      explanation: 'Force used in private defence must be proportional and must cease the moment danger to person ceases.',
      precedentOrCode: 'Darshan Singh v. State of Punjab (AIR 2010 SC 843)',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Vegulaamai & Poraiyudaimai (Restraint of Wrath & Forbearance)',
      principles: ['Emotional Mastery', 'Non-Injury', 'Restorative Resolution'],
      deepDive: 'Thiruvalluvar teaches that holding on to anger is like grasping a hot coal to throw at another—it slays the joyful light within oneself (Kural 304).'
    }
  },
  {
    id: 'scen-7',
    number: 7,
    title: 'The Found Laptop in the Coffee Shop (Theft / Misappropriation)',
    description:
      'Meera finds an expensive high-end laptop left behind on a table in a crowded airport lounge with no password lock. Her travel companion suggests wiping the operating system and keeping it, saying "finders keepers; whoever lost it was careless".',
    difficulty: 'Easy',
    category: 'Theft',
    question: 'How does Indian law treat retaining lost property, and what is the ethically honest action?',
    options: [
      {
        id: 'A',
        text: 'Wipe the hard drive and take the laptop home because the owner left it unattended.',
        isCorrect: false,
        explanation: 'Converting lost property to personal use without making reasonable efforts to discover the true owner constitutes Dishonest Misappropriation of Property.',
        ethicalFeedback: 'Violates Kural 282 (Kallaamai - coveting another\'s property through deceit).',
        legalFeedback: 'Direct violation of Section 314 BNS / Section 403 IPC punishable with imprisonment up to 2 years.'
      },
      {
        id: 'B',
        text: 'Hand the laptop immediately over to the Airport Lost & Found / Security desk, securing a formal handover receipt.',
        isCorrect: true,
        explanation: 'Fulfills legal duty under law to entrust lost articles to the lawful custodian so the rightful owner can reclaim their property.',
        ethicalFeedback: 'Exemplifies Kural 282 & Kural 131: absolute honesty in handling another\'s belongings.',
        legalFeedback: 'Complies with Indian Property Law and airport security regulations.'
      },
      {
        id: 'C',
        text: 'Search through the owner\'s personal emails and photos to blackmail them for a return reward.',
        isCorrect: false,
        explanation: 'Unauthorized access to computer systems and extortion are aggravated cyber and penal offenses.',
        ethicalFeedback: 'Severe violation of privacy ethics and integrity.',
        legalFeedback: 'Actionable under IT Act Section 43/66 (Unauthorized Access) and BNS Section 308 (Extortion).'
      },
      {
        id: 'D',
        text: 'Leave the laptop unattended on the table where anyone might walk away with it.',
        isCorrect: false,
        explanation: 'Passive neglect allows potential theft when a simple proactive handover to security would protect the owner.',
        ethicalFeedback: 'Fails positive civic solidarity (Kural 211).',
        legalFeedback: 'Missed opportunity for good Samaritan assistance.'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Fiduciary Honesty', 'Anti-Theft', 'Civic Trust', 'Respect for Property'],
    legalConcepts: ['Dishonest Misappropriation', 'Section 314 BNS', 'Lost Property Duties', 'Unauthorized Access'],
    relatedKuralIds: [282, 131],
    relatedLegalKnowledgeIds: ['legal-qa-4'],
    explanation:
      'Under Section 314 BNS (formerly Section 403 IPC, Explanation 2), a person who finds property and appropriates it to their own use before taking reasonable means to discover and give notice to the owner is guilty of criminal misappropriation.',
    thinkEthicallyHint: 'Integrity is what you choose to do when no one is watching.',
    skillsImproved: [
      { name: 'Ethical Reasoning', percentage: 96, points: 40 },
      { name: 'Legal Awareness', percentage: 90, points: 30 },
      { name: 'Prosocial Decision Making', percentage: 92, points: 30 }
    ],
    legalPerspective: {
      title: 'BNS 2023 Section 314 (Dishonest Misappropriation of Property)',
      statutes: ['Bharatiya Nyaya Sanhita Section 314 (formerly IPC 403)', 'IT Act Section 43/66 (Computer Privacy)'],
      explanation: 'Appropriating found movable property without bona fide attempts to find the owner constitutes a criminal offense.',
      precedentOrCode: 'Section 314 BNS Explanation 2',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Kallaamai (Non-Stealing & Purity of Mind)',
      principles: ['Internal Honesty', 'Respect for Others\' Possessions', 'Moral Self-Regulation'],
      deepDive: 'Kural 282 warns that even mentally entertaining the design to take another\'s possession through stealth corrupts moral character.'
    }
  },
  {
    id: 'scen-8',
    number: 8,
    title: 'The Housing Society Tenancy Refusal (Discrimination & Fairness)',
    description:
      'A cooperative housing society management committee passes an informal resolution barring individuals of a specific minority community or dietary practice from renting apartments in their complex.',
    difficulty: 'Hard',
    category: 'Discrimination',
    question: 'How do constitutional principles and civil rights laws evaluate this discriminatory housing restriction?',
    options: [
      {
        id: 'A',
        text: 'Cooperative societies are private clubs and have unlimited constitutional freedom to exclude any citizen based on caste or community.',
        isCorrect: false,
        explanation: 'Fundamental rights, public policy, and civil rights statutes restrict discriminatory byelaws that violate human dignity.',
        ethicalFeedback: 'Directly violates Thirukkural 972 ("Pirappokkum Ella Uyirkkum") on universal human equality by birth.',
        legalFeedback: 'Violates Article 15(2), Protection of Civil Rights Act 1955, and landmark Supreme Court jurisprudence on open housing.'
      },
      {
        id: 'B',
        text: 'Challenge the resolution as contrary to constitutional equality under Article 14/15, statutory open-housing mandates, and cooperative society public policy.',
        isCorrect: true,
        explanation: 'Cooperative housing societies performing quasi-public functions cannot enforce apartheid-like discriminatory covenants based on identity.',
        ethicalFeedback: 'Exemplifies Kural 972: all human beings are equal by birth; discrimination based on identity is unjust.',
        legalFeedback: 'Supported by Indian Supreme Court jurisprudence holding exclusionary housing byelaws void as contrary to public policy.'
      },
      {
        id: 'C',
        text: 'Encourage tenants to forge fake identity documents to conceal their community background.',
        isCorrect: false,
        explanation: 'Forging official identity documents constitutes criminal forgery and personation.',
        ethicalFeedback: 'Violates Kural 291 on truthfulness.',
        legalFeedback: 'Actionable under BNS Section 336 / 340 (Forgery of Valuable Security / Identity).'
      },
      {
        id: 'D',
        text: 'Impose retaliatory physical blockades on the housing society gates.',
        isCorrect: false,
        explanation: 'Unlawful restraint of public passage violates criminal statutes.',
        ethicalFeedback: 'Violates Kural 304 on wrath.',
        legalFeedback: 'Actionable under Section 126 BNS (Wrongful Restraint).'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Universal Equality', 'Human Dignity', 'Anti-Discrimination', 'Constitutional Morality'],
    legalConcepts: ['Article 14 & 15', 'Protection of Civil Rights Act', 'Cooperative Societies Law', 'Public Policy Doctrine'],
    relatedKuralIds: [972, 541],
    relatedLegalKnowledgeIds: ['legal-qa-5', 'legal-qa-10'],
    explanation:
      'The Supreme Court of India has consistently held that constitutional morality and Article 15 prohibit systemic spatial segregation. Cooperative society rules that discriminate based on birth, religion, or community violate Section 23 of the Indian Contract Act (agreements opposed to public policy).',
    thinkEthicallyHint: 'Reflect on Thirukkural 972: "All human beings are equal by birth; distinction arises solely from the virtue of their actions."',
    skillsImproved: [
      { name: 'Legal Awareness', percentage: 95, points: 40 },
      { name: 'Ethical Reasoning', percentage: 96, points: 40 },
      { name: 'Critical Thinking', percentage: 90, points: 20 }
    ],
    legalPerspective: {
      title: 'Constitutional Articles 14, 15, 21 & Public Policy',
      statutes: ['Constitution of India Articles 14, 15(2), 21', 'Indian Contract Act 1872 Section 23', 'Protection of Civil Rights Act 1955'],
      explanation: 'Restrictive covenants based purely on communal discrimination are void as opposed to public policy.',
      precedentOrCode: 'Indian Medical Association v. Union of India / Zoroastrian Co-operative Housing Society jurisprudence nuances',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Perumai (Universal Greatness & Equality by Birth)',
      principles: ['Equality Before Law', 'Human Brotherhood', 'Abolition of Prejudices'],
      deepDive: 'Kural 972 is celebrated globally as one of antiquity\'s clearest declarations of intrinsic human equality: "Pirappokkum Ella Uyirkkum".'
    }
  },
  {
    id: 'scen-9',
    number: 9,
    title: 'The Whistleblower in the Clinical Trial (Whistleblowing & Confidentiality)',
    description:
      'Dr. Priya, a senior bio-statistician at a pharmaceutical lab, discovers that clinical trial data for a new pediatric drug has been deliberately altered to conceal severe cardiac side effects. Company leadership instructs her to sign the confidentiality NDA and approve the submission.',
    difficulty: 'Hard',
    category: 'Confidentiality',
    question: 'How should Dr. Priya resolve the conflict between her employer confidentiality NDA and her ethical duty to protect public health?',
    options: [
      {
        id: 'A',
        text: 'Sign the fraudulent submission and keep quiet because company NDAs override all public health laws.',
        isCorrect: false,
        explanation: 'NDAs and contracts cannot legally bind an employee to facilitate criminal fraud or endanger human lives.',
        ethicalFeedback: 'Violates Kural 321 (Kollaamai - preventing harm to life) and Kural 656 on refusing shameful complicity.',
        legalFeedback: 'Makes the individual liable for criminal conspiracy (Sec 61 BNS), Drugs and Cosmetics Act violations, and culpable negligence.'
      },
      {
        id: 'B',
        text: 'Refuse to sign the falsified data, document the authentic trial anomalies, and report the safety violations to the Central Drugs Standard Control Organisation (CDSCO) under statutory whistleblower protections.',
        isCorrect: true,
        explanation: 'Protection of human life and statutory reporting of falsified medical data supersedes private commercial NDAs under Indian public policy.',
        ethicalFeedback: 'Exemplifies Kural 34 (Moral integrity over false compliance) and Kural 321 (Sanctity of life).',
        legalFeedback: 'Protected under Drugs and Cosmetics Act, Section 23 Contract Act, and statutory Whistleblower provisions.'
      },
      {
        id: 'C',
        text: 'Sell the clinical trial data secretly to a rival pharmaceutical company for personal profit.',
        isCorrect: false,
        explanation: 'Commercial trade secret theft compromises public safety and is unlawful commercial espionage.',
        ethicalFeedback: 'Direct breach of Kural 282 (Kallaamai).',
        legalFeedback: 'Actionable for civil damages and criminal breach of trust under BNS Section 316.'
      },
      {
        id: 'D',
        text: 'Destroy all trial servers with a magnet to erase all records.',
        isCorrect: false,
        explanation: 'Destruction of evidence is a criminal offense under Section 238 BNS / 201 IPC.',
        ethicalFeedback: 'Violates basic evidentiary honesty.',
        legalFeedback: 'Actionable under Section 238 BNS (Causing Disappearance of Evidence of Offense).'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Public Safety', 'Whistleblowing', 'Sanctity of Life', 'Scientific Honesty'],
    legalConcepts: ['Drugs and Cosmetics Act', 'Whistleblower Protection', 'Public Policy over NDAs', 'Evidence Integrity'],
    relatedKuralIds: [34, 321, 656],
    relatedLegalKnowledgeIds: ['legal-qa-6', 'legal-qa-9'],
    explanation:
      'Under Indian law (Section 23 of Indian Contract Act), an agreement to conceal dangerous product defects or fraud is contrary to public policy and void. Attorney/trade confidentiality does not protect acts in furtherance of illegal schemes or public harm.',
    thinkEthicallyHint: 'When corporate silence risks children\'s lives, moral duty to humanity transcends commercial employment clauses.',
    skillsImproved: [
      { name: 'Professional Ethics', percentage: 98, points: 50 },
      { name: 'Legal Awareness', percentage: 94, points: 30 },
      { name: 'Critical Thinking', percentage: 92, points: 20 }
    ],
    legalPerspective: {
      title: 'Drugs & Cosmetics Act & Whistleblower Protections',
      statutes: ['Drugs and Cosmetics Act 1940 & Clinical Trial Rules 2019', 'Indian Contract Act 1872 Section 23', 'BNS Section 316 (Criminal Breach of Trust exceptions)'],
      explanation: 'Statutory regulatory disclosures of public health hazards cannot be penalized under private non-disclosure agreements.',
      precedentOrCode: 'Section 23 Indian Contract Act 1872',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Aruludaimai & Kollaamai (Universal Compassion & Sanctity of Life)',
      principles: ['Protection of Vulnerable', 'Truth in Public Health', 'Inviolable Conscience'],
      deepDive: 'Kural 321 highlights the supreme moral virtue of guarding living beings from harm above all other considerations.'
    }
  },
  {
    id: 'scen-10',
    number: 10,
    title: 'The Viral Misinformation Broadcast (False Information & Defamation)',
    description:
      'Siddharth operates a popular hyper-local news YouTube channel. During a sensitive civic protest, he receives an unverified viral audio clip claiming police had stormed a local place of worship. The clip has dramatic music added to stoke anger.',
    difficulty: 'Medium',
    category: 'False Information',
    question: 'What is Siddharth\'s legal and journalistic responsibility before publishing breaking news?',
    options: [
      {
        id: 'A',
        text: 'Broadcast the clip instantly with clickbait headlines to maximize viral viewership and ad revenue.',
        isCorrect: false,
        explanation: 'Publishing unverified incendiary rumors that provoke public disorder is a serious penal offense.',
        ethicalFeedback: 'Violates Kural 291 (Vaaimai - Truthfulness) and Kural 191 (Payanila Sollaamai).',
        legalFeedback: 'Attracts liability under BNS Section 197 (Promoting Enmity) and Section 353 (Statements Conducing to Public Mischief).'
      },
      {
        id: 'B',
        text: 'Withhold publication, verify the clip\'s provenance with on-ground reporters and official press releases, and publish only confirmed facts with proper context.',
        isCorrect: true,
        explanation: 'Responsible journalism requires fact-checking, provenance verification, and avoiding rumors that incite communal disturbance.',
        ethicalFeedback: 'Exemplifies Kural 291 & Kural 423 (Discerning the inward truth behind claims).',
        legalFeedback: 'Complies with Cable Television Networks (Regulation) Act, IT Intermediary Guidelines, and Press Council norms.'
      },
      {
        id: 'C',
        text: 'Re-edit the audio to make it sound even more inflammatory before posting.',
        isCorrect: false,
        explanation: 'Fabricating or altering media to incite violence constitutes aggravated criminal mischief and forgery.',
        ethicalFeedback: 'Severe violation of moral truthfulness.',
        legalFeedback: 'Actionable under BNS Section 336 / 353 and IT Act Section 66D.'
      },
      {
        id: 'D',
        text: 'Blackmail the local police officer threatening to broadcast the video unless paid cash.',
        isCorrect: false,
        explanation: 'Extortion and criminal intimidation.',
        ethicalFeedback: 'Violates Kural 282 (Kallaamai).',
        legalFeedback: 'Actionable under Section 308 BNS (Extortion).'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Truth Verification', 'Responsible Communication', 'Public Harmony', 'Civic Duty'],
    legalConcepts: ['Defamation', 'Public Mischief (Sec 353 BNS)', 'Media Ethics', 'IT Intermediary Rules'],
    relatedKuralIds: [291, 423, 191],
    relatedLegalKnowledgeIds: ['legal-qa-7'],
    explanation:
      'Under Indian law, broadcasting false statements intending to cause public fear or communal unrest is penalized under Section 353 BNS (formerly Section 505 IPC). Verification and responsible gatekeeping are foundational legal duties.',
    thinkEthicallyHint: 'Words released into the public sphere cannot be recalled once violence is ignited.',
    skillsImproved: [
      { name: 'Critical Thinking', percentage: 95, points: 40 },
      { name: 'Legal Awareness', percentage: 92, points: 30 },
      { name: 'Ethical Reasoning', percentage: 90, points: 30 }
    ],
    legalPerspective: {
      title: 'BNS 2023 Section 353 & IT Intermediary Rules 2021',
      statutes: ['BNS Section 353 (Statements Conducing to Public Mischief)', 'BNS Section 197 (Promoting Enmity)', 'IT (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021'],
      explanation: 'Digital publishers must adhere to verification norms and avoid broadcasting hate speech or verified falsehoods.',
      precedentOrCode: 'Press Council of India Journalistic Conduct Guidelines',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Vaaimai & Payanila Sollaamai (Truthfulness & Refusing Harmful Talk)',
      principles: ['Epistemic Honesty', 'Prevention of Harm', 'Social Harmony'],
      deepDive: 'Thiruvalluvar defines true speech in Kural 291 as speech that brings not the slightest harm or malice to any soul.'
    }
  },
  {
    id: 'scen-11',
    number: 11,
    title: 'The Retaliatory Review After Dismissal (Revenge & Professional Ethics)',
    description:
      'After being lawfully dismissed from a law firm for repeated unexplained absenteeism and falsifying billing hours, an associate posts false allegations on legal hiring forums claiming the senior partner engages in document forgery.',
    difficulty: 'Medium',
    category: 'Revenge',
    question: 'How does the law view malicious retaliatory publications, and what was the ethical course for grievances?',
    options: [
      {
        id: 'A',
        text: 'Employees have an absolute legal right to publish any allegation, true or false, after termination as fair retaliation.',
        isCorrect: false,
        explanation: 'Retaliatory publication of fabricated defamatory statements is actionable for both criminal defamation and civil tortious damages.',
        ethicalFeedback: 'Violates Kural 314 on the futility and dishonor of vindictive spite.',
        legalFeedback: 'Directly actionable under BNS Section 356 (Defamation) and civil torts for libel.'
      },
      {
        id: 'B',
        text: 'Pursue legitimate employment grievances through the labor commissioner or designated contractual arbitration, avoiding malicious false claims.',
        isCorrect: true,
        explanation: 'Lawful dispute resolution channels provide fair hearing (Audi Alteram Partem), whereas malicious fabricated reviews attract defamation suits.',
        ethicalFeedback: 'Exemplifies Kural 131 (Ozhukkam Udaimai) and Kural 314 (Restorative over spiteful conduct).',
        legalFeedback: 'Complies with Industrial Disputes Act / Civil remedies while avoiding Section 356 BNS defamation.'
      },
      {
        id: 'C',
        text: 'Create 50 bot accounts to downvote the firm on Google Maps.',
        isCorrect: false,
        explanation: 'Spam manipulation violates terms of service and commercial disparagement rules.',
        ethicalFeedback: 'Violates Kural 191 (Payanila Sollaamai).',
        legalFeedback: 'Violates IT Act Section 43 (Computer tampering).'
      },
      {
        id: 'D',
        text: 'Threaten the firm\'s junior trainees if they do not quit in solidarity.',
        isCorrect: false,
        explanation: 'Criminal intimidation of coworkers.',
        ethicalFeedback: 'Directly violates Kural 304 on anger.',
        legalFeedback: 'Actionable under Section 351 BNS (Criminal Intimidation).'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Professional Conduct', 'Rejection of Malice', 'Lawful Grievance Redressal', 'Truthfulness'],
    legalConcepts: ['Criminal Defamation', 'Civil Libel', 'Bar Council Rules', 'Audi Alteram Partem'],
    relatedKuralIds: [131, 314, 291],
    relatedLegalKnowledgeIds: ['legal-qa-1', 'legal-qa-7'],
    explanation:
      'Vindictive retaliatory false reviews breach professional codes and expose the author to criminal defamation under Section 356 BNS and disciplinary debarment by the Bar Council.',
    thinkEthicallyHint: 'Grievances must be tested through evidence in proper forums, not through malicious falsehoods.',
    skillsImproved: [
      { name: 'Professional Ethics', percentage: 94, points: 40 },
      { name: 'Ethical Reasoning', percentage: 90, points: 30 },
      { name: 'Legal Awareness', percentage: 88, points: 30 }
    ],
    legalPerspective: {
      title: 'BNS Section 356 (Criminal Defamation) & Bar Council Ethics',
      statutes: ['Bharatiya Nyaya Sanhita Section 356', 'Bar Council of India Conduct Rules', 'Civil Law of Defamation'],
      explanation: 'Advocates and legal personnel are held to high standards of candor and decorum.',
      precedentOrCode: 'Subramanian Swamy v. Union of India (2016) 7 SCC 221',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Ozhukkam Udaimai & Innaa Seiyaamai',
      principles: ['Right Conduct', 'Equanimity under Adversity', 'Truthfulness'],
      deepDive: 'Kural 314 teaches that the noble response to adversity is to maintain moral nobility, rather than descend into degraded malice.'
    }
  },
  {
    id: 'scen-12',
    number: 12,
    title: 'The Biased Disciplinary Inquiry (Fairness & Natural Justice)',
    description:
      'A university inquiry committee investigating an alleged hostel altercation consists solely of the complainant student\'s close uncle (who is the department head) and his deputy. The accused student is refused permission to see the written complaint or bring a representative.',
    difficulty: 'Hard',
    category: 'Fairness',
    question: 'How do the Principles of Natural Justice evaluate this disciplinary inquiry?',
    options: [
      {
        id: 'A',
        text: 'The inquiry is legally sound because internal university panels are exempt from all constitutional and fair hearing requirements.',
        isCorrect: false,
        explanation: 'All domestic inquiry tribunals and disciplinary panels are strictly bound by the Principles of Natural Justice.',
        ethicalFeedback: 'Violates Kural 118 (Saman Seithu Seerthookkum) and Kural 541 (Oorndhukan Nodaadhu).',
        legalFeedback: 'Direct violation of Nemo Judex in Causa Sua and Audi Alteram Partem, rendering the proceedings void ab initio.'
      },
      {
        id: 'B',
        text: 'The inquiry violates both cardinal pillars of Natural Justice (Rule against Bias and Right to a Fair Hearing); the accused is entitled to an unbiased panel and disclosure of charges.',
        isCorrect: true,
        explanation: 'The uncle\'s presence creates personal bias (Nemo Judex In Causa Sua), and refusing copy of charges violates Audi Alteram Partem.',
        ethicalFeedback: 'Exemplifies Kural 118 (Balance beam scales) and Kural 541 (Investigating without favor).',
        legalFeedback: 'Enforceable under Article 226 writ jurisdiction before High Courts (A.K. Kraipak doctrine).'
      },
      {
        id: 'C',
        text: 'The accused student should immediately physically padlock the department offices in protest.',
        isCorrect: false,
        explanation: 'Criminal trespass and unlawful obstruction.',
        ethicalFeedback: 'Violates Kural 304 on destructive wrath.',
        legalFeedback: 'Actionable under Section 329 BNS (Criminal Trespass).'
      },
      {
        id: 'D',
        text: 'The accused should bribe the deputy to outvote the uncle.',
        isCorrect: false,
        explanation: 'Bribery of academic officers is corrupt and illegal.',
        ethicalFeedback: 'Directly violates Kural 656 (Vinai Thooymai).',
        legalFeedback: 'Actionable under Prevention of Corruption Act principles.'
      }
    ],
    correctAnswer: 'B',
    ethicalConcepts: ['Impartiality', 'Fair Hearing', 'Freedom from Bias', 'Due Process'],
    legalConcepts: ['Natural Justice', 'Audi Alteram Partem', 'Nemo Judex in Causa Sua', 'Article 14'],
    relatedKuralIds: [118, 541, 547],
    relatedLegalKnowledgeIds: ['legal-qa-10'],
    explanation:
      'Natural Justice is an integral part of Article 14 of the Indian Constitution. A domestic inquiry where the judge has a personal relationship with the complainant and refuses notice of charges is fundamentally flawed and liable to be quashed.',
    thinkEthicallyHint: 'Can any verdict be called "Justice" if the referee is playing for one team?',
    skillsImproved: [
      { name: 'Legal Awareness', percentage: 98, points: 50 },
      { name: 'Critical Thinking', percentage: 94, points: 30 },
      { name: 'Ethical Reasoning', percentage: 92, points: 20 }
    ],
    legalPerspective: {
      title: 'Principles of Natural Justice & Article 14',
      statutes: ['Constitution of India Article 14 & 226', 'Doctrine of Natural Justice', 'University Disciplinary Statutes'],
      explanation: 'Disciplinary orders passed in breach of natural justice are void and violative of equality before law.',
      precedentOrCode: 'A.K. Kraipak v. Union of India (1969) 2 SCC 262 / Maneka Gandhi v. UOI (1978)',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Naduvunilaimai & Sengonmai (Impartiality & Righteous Sceptre)',
      principles: ['Unbiased Judgment', 'Open Inquiry', 'Institutional Equanimity'],
      deepDive: 'Kural 541 states: "To investigate thoroughly without partiality, to uphold justice toward all, and to decide with discernment is true governance."'
    }
  }
];
