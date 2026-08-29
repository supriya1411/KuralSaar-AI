import { Scenario, RetrievalResult } from '../types';
import { getLocalizedScenario } from '../i18n/scenarioLocalizations';
import { Language } from '../i18n/translations';

const MOCK_FALLBACK_SCENARIOS: Scenario[] = [
  {
    id: 'scen-1',
    number: 1,
    title: "The Land Dispute & The Sibling's Counsel (Conflict of Interest)",
    description: "Advocate Anita is approached by a farmer, Mr. Murugan, who wants to file a suit regarding an ancestral boundary dispute against a local builder company. During the initial consultation, Anita realizes that her younger brother is the principal civil contractor and an equity partner in the builder company defending the claim.",
    difficulty: 'Medium',
    category: 'Conflict of Interest',
    summary: "Advocate discovers rival builder firm is owned by her close brother...",
    question: "What is the most ethical and legally compliant course of action for Advocate Anita to take?",
    options: [
      {
        id: 'A',
        text: 'Accept the brief secretly, but persuade the farmer to settle out of court for a low price.',
        explanation: 'Inducing a client to settle unfavorably to protect personal family interests constitutes gross breach of fiduciary duty and professional misconduct.'
      },
      {
        id: 'B',
        text: 'Disclose the sibling relationship immediately, recuse herself from representing either party, and refer the client to an independent senior advocate.',
        explanation: 'Full disclosure and immediate recusal prevents any pecuniary or personal bias, upholding absolute transparency and client trust.'
      },
      {
        id: 'C',
        text: 'Accept the fee and pass confidential documents to her brother to help him prepare his defense.',
        explanation: 'Leaking confidential client documents is a grave crime breaching attorney-client privilege.'
      },
      {
        id: 'D',
        text: 'Charge a double retainer fee claiming the case has heightened difficulty without mentioning the brother.',
        explanation: 'Exploitative financial opportunism compounding a hidden conflict of interest.'
      }
    ],
    correctOptionId: 'B',
    xpReward: 100,
    thinkEthicallyHint: 'Consider whether justice can truly appear to be done if one party has secret familial ties to the advocate representing their opponent.',
    ethicalConcepts: ['Impartiality', 'Transparency', 'Fiduciary Duty', 'Integrity'],
    legalConcepts: ['Conflict of Interest', 'Bar Council Rules', 'Nemo Judex in Causa Sua', 'Advocates Act 1961'],
    skillsImproved: [{ name: 'Ethical Reasoning', percentage: 95, points: 50 }],
    relatedKuralNumber: 118,
    legalPerspective: {
      title: 'Bar Council of India Rules & Advocates Act 1961',
      statutes: ['Advocates Act 1961 Section 35', 'BCI Rules Part VI, Chapter II, Rule 22'],
      explanation: 'An advocate must decline employment if their connection with the adversary makes it difficult to maintain detached professional representation.',
      precedentOrCode: 'Chandra Shekhar Soni v. Bar Council of Rajasthan (AIR 1983 SC 1012)',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Impartiality & Thirukkural Jurisprudence',
      principles: ['Naduvunilaimai (Equanimity)', 'Ozhukkam Udaimai (Right Conduct)'],
      deepDive: 'Kural 118 emphasizes that an ethical adjudicator must behave like a true balance scale, neither tilting toward family nor personal gain.'
    }
  },
  {
    id: 'scen-2',
    number: 2,
    title: 'The Cyberbullying & Defamation Group Chat',
    description: 'Ravi, an engineering student, creates a private college group chat and circulates fabricated screenshots and derogatory memes targeting a junior classmate to humiliate her after she won a student council debate.',
    difficulty: 'Easy',
    category: 'Cyberbullying',
    summary: 'Student circulates fake screenshots to humiliate classmate on social media...',
    question: 'How does the law categorize Ravi\'s actions, and what is the proper ethical response for a bystander in the group?',
    options: [
      {
        id: 'A',
        text: 'It is harmless banter protected by free speech; group members should forward it to other batches.',
        explanation: 'Defamatory, targeted digital harassment is not protected speech under Article 19(2).'
      },
      {
        id: 'B',
        text: 'Report the cyber harassment to the institution\'s anti-ragging cell and cyber cell, refusing to forward or participate in the humiliation.',
        explanation: 'Active non-complicity combined with institutional reporting stops digital mobbing.'
      },
      {
        id: 'C',
        text: 'Encourage the victim to delete her account and remain silent.',
        explanation: 'Victim-blaming creates secondary trauma.'
      },
      {
        id: 'D',
        text: 'Demand money from Ravi in exchange for not reporting the group chat to the Dean.',
        explanation: 'Extortion compounding a cybercrime.'
      }
    ],
    correctOptionId: 'B',
    xpReward: 75,
    thinkEthicallyHint: 'Reflect on whether silence during harassment makes a bystander complicit in the moral wrong.',
    ethicalConcepts: ['Veracity', 'Restraint', 'Compassion'],
    legalConcepts: ['IT Act Section 66E', 'BNS Defamation', 'UGC Anti-Ragging Rules'],
    skillsImproved: [{ name: 'Prosocial Decision Making', percentage: 90, points: 40 }],
    relatedKuralNumber: 127,
    legalPerspective: {
      title: 'IT Act 2000 & Bharatiya Nyaya Sanhita',
      statutes: ['Information Technology Act 2000 Section 66E/67', 'BNS 2023 Section 356'],
      explanation: 'Circulating non-consensual defamatory images is punishable with imprisonment.',
      precedentOrCode: 'Shreya Singhal v. Union of India (2015)',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Control of Speech & Compassion',
      principles: ['Adakkamudaimai (Self-Control)', 'Aruluudaimai (Compassion)'],
      deepDive: 'Kural 127 reminds us that unbridled speech inflicts wounds deeper than physical fire.'
    }
  },
  {
    id: 'scen-3',
    number: 3,
    title: 'Hospital ICU Ventilator Triage & Wealthy Donor',
    description: 'Dr. Vikram has only one remaining ICU ventilator available during an emergency surge. Two critical patients arrive simultaneously: Patient A is a low-income laborer with a 90% survival prognosis, while Patient B is a wealthy hospital donor with a 45% survival prognosis whose family offers a massive grant to the hospital in exchange for priority.',
    difficulty: 'Easy',
    category: 'Medical Ethics',
    summary: 'Single ICU ventilator available between low-income patient & hospital donor...',
    question: 'Under medical ethics and constitutional equality, how must Dr. Vikram allocate the ventilator?',
    options: [
      {
        id: 'A',
        text: 'Allocate to Patient B because the financial donor grant can save more lives in the long run.',
        explanation: 'Commercializing emergency care violates medical oaths and constitutional equality.'
      },
      {
        id: 'B',
        text: 'Allocate strictly based on clinical urgency and survival prognosis (Patient A), refusing financial considerations.',
        explanation: 'Medical triage must be strictly clinical and impartial under Article 21 and the Hippocratic Oath.'
      },
      {
        id: 'C',
        text: 'Conduct a coin toss to avoid personal blame.',
        explanation: 'Abdication of clinical judgment in emergency triage is improper.'
      },
      {
        id: 'D',
        text: 'Delay allocation until both families negotiate a financial compromise.',
        explanation: 'Endangers both lives and breaches duty of emergency care.'
      }
    ],
    correctOptionId: 'B',
    xpReward: 75,
    thinkEthicallyHint: 'Is human life evaluated by financial contribution or by equal human dignity?',
    ethicalConcepts: ['Impartiality', 'Equity', 'Compassion'],
    legalConcepts: ['Article 21 Right to Life', 'Medical Council Regulations', 'Emergency Triage Rules'],
    skillsImproved: [{ name: 'Ethical Reasoning', percentage: 98, points: 50 }],
    relatedKuralNumber: 282,
    legalPerspective: {
      title: 'Article 21 Right to Health & Medical Oath',
      statutes: ['Constitution of India Article 21', 'NMC Code of Ethics 2023'],
      explanation: 'Right to emergency medical care is a fundamental right under Article 21.',
      precedentOrCode: 'Paschim Banga Khet Mazdoor Samity v. State of WB (1996)',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Equanimity & Universal Benevolence',
      principles: ['Naduvunilaimai (Equanimity)', 'Aruluudaimai (Compassion)'],
      deepDive: 'Kural 282 and 241 dictate that human worth cannot be bought or sold for monetary gain.'
    }
  },
  {
    id: 'scen-4',
    number: 4,
    title: 'The Exam Question Leak & WhatsApp Forward (Peer Pressure)',
    description: 'On the eve of the semester law exam, Rajesh is added to a study group where a close friend shares an unreleased leaked question paper received from an exam administrator. The friend pressures Rajesh to download it and keep quiet.',
    difficulty: 'Medium',
    category: 'Peer Pressure',
    summary: 'Friend shares leaked exam paper in group chat and demands silence...',
    question: 'How should Rajesh navigate the peer pressure while upholding legal and academic integrity?',
    options: [
      {
        id: 'A',
        text: 'Download the paper, memorize the answers, and justify it because "everyone else will score higher".',
        explanation: 'Succumbing to peer rationalizations compromises moral character and makes one a co-conspirator in academic fraud.'
      },
      {
        id: 'B',
        text: 'Refuse to use the leaked paper, advise friends to step away from the breach, and report the leak immediately to the Controller of Examinations.',
        explanation: 'Preserves the meritocratic integrity of public evaluation and fulfills the legal duty to deter examination malpractice.'
      },
      {
        id: 'C',
        text: 'Sell copies of the leaked paper to students in other colleges to earn quick cash.',
        explanation: 'Commercial distribution of stolen intellectual material constitutes aggravated criminal fraud.'
      },
      {
        id: 'D',
        text: 'Pretend not to see the message, study normally, but stay silent while others cheat.',
        explanation: 'Passive complicity allows systemic corruption to disadvantage honest candidates.'
      }
    ],
    correctOptionId: 'B',
    xpReward: 100,
    thinkEthicallyHint: 'If an entire batch passes through cheating, what happens to public trust in the justice system they will administer tomorrow?',
    ethicalConcepts: ['Academic Integrity', 'Moral Courage', 'Resisting Malpractice'],
    legalConcepts: ['Public Examinations Act 2024', 'Criminal Conspiracy'],
    skillsImproved: [{ name: 'Ethical Reasoning', percentage: 95, points: 40 }],
    relatedKuralNumber: 656,
    legalPerspective: {
      title: 'Public Examinations (Prevention of Unfair Means) Act 2024',
      statutes: ['Public Examinations Act 2024 Sections 3, 9, 10', 'BNS Section 61 (Conspiracy)'],
      explanation: 'Organized paper leaks carry stringent penal sanctions under statutory law.',
      precedentOrCode: 'Section 10 Public Examinations Act 2024',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Vinai Thooymai (Purity of Means)',
      principles: ['Ozhukkam (Integrity)', 'Kallaamai (Non-Theft)'],
      deepDive: 'Kural 656 dictates that even in extreme trial, one must never undertake actions condemned by wisdom.'
    }
  },
  {
    id: 'scen-5',
    number: 5,
    title: 'The Municipal Tender Speed-Money Demand (Corruption)',
    description: 'A solar-energy startup has won a legitimate government procurement contract to install clean lighting in rural primary health centers. An assistant engineer demands a 5% "processing facilitation commission" before releasing the milestone payment.',
    difficulty: 'Hard',
    category: 'Corruption',
    summary: 'Government engineer demands bribe before releasing startup milestone payment...',
    question: 'What is the legally required and ethically sound path for the startup founder to pursue?',
    options: [
      {
        id: 'A',
        text: 'Pay the cash bribe disguised as "consulting fees" to protect the company\'s quarterly revenue.',
        explanation: 'Paying bribes is a severe criminal offense under the Prevention of Corruption Act.'
      },
      {
        id: 'B',
        text: 'Refuse the bribe demand, document the interaction with dates and evidence, and lodge a formal complaint with the State Vigilance and Anti-Corruption Directorate / Lokayukta.',
        explanation: 'Statutory compliance requires reporting bribe demands. Section 8 PCA protects individuals who report bribe demands within 7 days.'
      },
      {
        id: 'C',
        text: 'Subcontract the work to a shell company owned by the engineer\'s relative to bypass accounting audits.',
        explanation: 'Engaging in illicit quid pro quo through third-party intermediaries constitutes money laundering.'
      },
      {
        id: 'D',
        text: 'Abandon the rural clinic project entirely without explaining why to the health department.',
        explanation: 'Silently walking away harms public welfare without holding the corrupt official accountable.'
      }
    ],
    correctOptionId: 'B',
    xpReward: 150,
    thinkEthicallyHint: 'Giving into "small facilitation bribes" systematically normalizes extortion and locks out ethical entrepreneurs.',
    ethicalConcepts: ['Zero Tolerance to Bribery', 'Purity of Action', 'Civic Accountability'],
    legalConcepts: ['Prevention of Corruption Act 1988', 'Lokayukta'],
    skillsImproved: [{ name: 'Professional Ethics', percentage: 96, points: 50 }],
    relatedKuralNumber: 651,
    legalPerspective: {
      title: 'Prevention of Corruption Act 1988 (Amended 2018)',
      statutes: ['PC Act 1988 Section 7 & Section 8'],
      explanation: 'Giving a bribe is an offense, but reporting coerced demands within 7 days protects the complainant.',
      precedentOrCode: 'CBI Trap SOP Guidelines',
      isDisclaimerDemo: true
    },
    ethicalPerspective: {
      title: 'Vinai Thooymai & Good Governance',
      principles: ['Purity of Conduct', 'Anti-Extortion'],
      deepDive: 'Kural 651 teaches that clean execution of deeds guarantees permanent success.'
    }
  }
];

export const scenarioService = {
  async getAllScenarios(lang: Language = 'en'): Promise<RetrievalResult<Scenario>> {
    try {
      const res = await fetch('/api/scenarios');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const transformed: Scenario[] = json.data.map((item: any) => {
            const raw: Scenario = {
              id: item.id,
              number: item.number,
              title: item.title,
              difficulty: item.difficulty,
              category: item.category,
              summary: item.description?.slice(0, 120) + '...',
              description: item.description,
              question: item.question,
              options: item.options || [],
              correctOptionId: item.correctAnswer || item.correctOptionId || 'B',
              xpReward: item.difficulty === 'Hard' ? 150 : item.difficulty === 'Medium' ? 100 : 75,
              thinkEthicallyHint: item.thinkEthicallyHint,
              ethicalConcepts: item.ethicalConcepts || [],
              legalConcepts: item.legalConcepts || [],
              skillsImproved: item.skillsImproved || [],
              relatedKuralNumber: item.relatedKuralIds?.[0] || item.relatedKuralNumber || 118,
              legalPerspective: item.legalPerspective || {
                title: 'Indian Legal Context',
                statutes: ['Statutory Indian Law'],
                explanation: 'Educational reference.',
                precedentOrCode: 'Section Reference',
                isDisclaimerDemo: true
              },
              ethicalPerspective: item.ethicalPerspective || {
                title: 'Thirukkural Ethical Foundation',
                principles: item.ethicalConcepts || ['Aram'],
                deepDive: 'Ethical wisdom grounded in classical texts.'
              }
            };
            return getLocalizedScenario(raw, lang) as Scenario;
          });

          return {
            data: transformed,
            total: transformed.length,
            isMockData: false,
            notice: 'Sourced directly from Backend Scenario Service.'
          };
        }
      }
    } catch (err) {
      console.warn('[scenarioService] API request error, falling back to mock scenarios:', err);
    }

    // Fallback guarantees data is NEVER empty
    const localizedFallback = MOCK_FALLBACK_SCENARIOS.map((s) => getLocalizedScenario(s, lang) as Scenario);
    return {
      data: localizedFallback,
      total: localizedFallback.length,
      isMockData: true,
      notice: 'Using resilient fallback scenarios.',
    };
  },

  async getScenarioById(id: string, lang: Language = 'en'): Promise<Scenario | null> {
    try {
      const res = await fetch(`/api/scenarios/${id}`);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success && json.data) {
          const item = json.data;
          const raw: Scenario = {
            id: item.id,
            number: item.number,
            title: item.title,
            difficulty: item.difficulty,
            category: item.category,
            summary: item.description?.slice(0, 120) + '...',
            description: item.description,
            question: item.question,
            options: item.options || [],
            correctOptionId: item.correctAnswer || item.correctOptionId || 'B',
            xpReward: item.difficulty === 'Hard' ? 150 : item.difficulty === 'Medium' ? 100 : 75,
            thinkEthicallyHint: item.thinkEthicallyHint,
            ethicalConcepts: item.ethicalConcepts || [],
            legalConcepts: item.legalConcepts || [],
            skillsImproved: item.skillsImproved || [],
            relatedKuralNumber: item.relatedKuralIds?.[0] || item.relatedKuralNumber || 118,
            legalPerspective: item.legalPerspective,
            ethicalPerspective: item.ethicalPerspective
          };
          return getLocalizedScenario(raw, lang) as Scenario;
        }
      }
    } catch (err) {
      console.warn('[scenarioService] Failed to fetch scenario by id:', err);
    }

    const fallback = MOCK_FALLBACK_SCENARIOS.find((s) => s.id === id) || MOCK_FALLBACK_SCENARIOS[0];
    return getLocalizedScenario(fallback, lang) as Scenario;
  },

  async getScenarioByNumber(num: number, lang: Language = 'en'): Promise<Scenario | null> {
    const list = await this.getAllScenarios(lang);
    const found = list.data.find((s) => s.number === num);
    return found || list.data[0] || null;
  },

  async getTodayScenario(lang: Language = 'en'): Promise<Scenario | null> {
    const list = await this.getAllScenarios(lang);
    return list.data[0] || null;
  },

  async submitScenarioAnswer(scenarioId: string, selectedOption: 'A' | 'B' | 'C' | 'D') {
    try {
      const res = await fetch(`/api/scenarios/${scenarioId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOption })
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[scenarioService] Error submitting answer to API:', err);
    }
    return null;
  }
};
