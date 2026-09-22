import { AssessmentTask, IEBAppendixDoc } from '../types';

export const IEB_APPENDICES: IEBAppendixDoc[] = [
  {
    appendixId: 'A',
    title: 'School-Based Moderation Form',
    description: 'Thinking Levels (Level 1 Knowing, Level 2 Routine, Level 3 Complex, Level 4 Reasoning) vs Curriculum Topics Matrix (Finance, Measurement, Maps/Plans, Data Handling, Probability).',
    purpose: 'Must be attached to the final draft of every alternate assessment task, standardised test, and preliminary exam paper.'
  },
  {
    appendixId: 'B',
    title: 'Evidence of Moderation Form',
    description: 'Comprehensive pre-administration moderation checklist comparing 1st Draft and Final Draft across Memo attachment, Front page layout, Typesetting, Mark allocations, Cognitive level distribution, and Ready for printing sign-off.',
    purpose: 'Completed by internal moderator / HOD prior to duplicating assessment papers for learners.'
  },
  {
    appendixId: 'C',
    title: 'Consolidation Form for Learners',
    description: 'First page of each learner portfolio recording Date of submission, Appendix B alignment, Description of task, Actual marks, % and Weighting (Test 1: 15%, Test 2: 15%, Alt Task 1: 15%, Alt Task 2: 15%, Prelim Paper 1: 20%, Prelim Paper 2: 20% = 100 Total) with Teacher and Learner Ownership Declarations.',
    purpose: 'Mandatory Cover Page for all IEB Grade 12 (and Grade 10-11) SBA portfolios.'
  },
  {
    appendixId: 'D',
    title: 'IEB Moderation Tool (Teacher & Learner File Audit)',
    description: '3-point rubric (3 = fully achieved, 2 = partially achieved, 1 = no evidence) evaluating Teacher File organisation, forms, marksheet, prelim exams, tests, alternate tasks, and Learner Files.',
    purpose: 'Used by Regional / National IEB External Moderators during the annual SBA moderation visits.'
  },
  {
    appendixId: 'E',
    title: 'Letter from the Principal',
    description: 'Official certification template addressed to IEB Moderator authenticating that SBA tasks were administered according to Subject Assessment Guidelines with verified learner ownership and internal moderation.',
    purpose: 'Mandatory principal sign-off included in the master teacher moderation file.'
  },
  {
    appendixId: 'F',
    title: 'Consolidated Mark Schedule',
    description: 'Standardised grade-wide spreadsheet recording candidate numbers, names, raw marks and percentages for Tests (30), Examinations (40), and Alternate Assessments (30) totaling 100.',
    purpose: 'Summary master mark sheet submitted for IEB moderation and Umalusi statistical verification.'
  },
  {
    appendixId: 'G',
    title: 'Learner Declaration: Use of AI in Assessment Tasks',
    description: 'Crucial academic integrity form where candidates declare specific AI tools used (ChatGPT, Grammarly, Claude, spreadsheets), purpose of use, extent of use (Light, Moderate, Extensive), and candidate own contribution.',
    purpose: 'Must be signed and attached by every learner to any alternate assessment task or project.'
  }
];

export const ALL_ASSESSMENTS: AssessmentTask[] = [
  // ==========================================
  // TECHNOLOGY GRADE 8 (CAPS & ATP Guided)
  // ==========================================
  {
    id: 'tech8-t1-casestudy',
    code: 'TECH8-T1-CS1',
    grade: 8,
    gradeClass: '8A',
    subject: 'Technology',
    curriculumStandard: 'CAPS / DBE ATP',
    term: 1,
    scheduledWeek: 5,
    targetDate: 'Term 1 • Week 5 (February)',
    title: 'Case Study & Assignment: Structural Forces, Materials & Frame vs Shell Structures',
    category: 'Case Study',
    duration: '1 Hour (In-class controlled)',
    totalMarks: 50,
    sbaWeightingPercentage: 10,
    sbaContributionMarks: 10,
    topicsCovered: ['Structures', 'Forces (Tension, Compression, Shear, Torsion)', 'Structural Failures', 'Material Properties'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 35,
      level3_complex: 20,
      level4_reasoning: 15
    },
    instructions: [
      'Answer all questions in the spaces provided.',
      'Show all sketches clearly using a pencil and ruler.',
      'Refer to the scenario of the suspension and pylon bridge failure provided.'
    ],
    scenarioOrBrief: 'A pedestrian suspension bridge in an industrial mining sector experienced structural deflection during heavy winds. Learners must analyze the static forces (tension in cables, compression in pylons) and recommend structural triangulation and bracing materials to prevent buckling.',
    questions: [
      {
        id: '1',
        title: 'Force Identification & Classification',
        description: 'Define and differentiate between dynamic and static loads. Identify the forces acting on member A (pylon) and cable B.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 12,
        markingCriteriaSnippet: '1 mark per correct force term; 2 marks for tension vs compression distinction with diagrams.'
      },
      {
        id: '2',
        title: 'Structural Failure Analysis',
        description: 'Analyze why the bridge deck suffered twisting (torsion) and suggest 2 reinforcement techniques (cross-bracing, gusset plates).',
        cognitiveLevel: 'Level 2: Routine',
        marks: 18,
        markingCriteriaSnippet: '4 marks for identifying torsion mechanism; 6 marks for neat annotated cross-bracing sketch; 8 marks for material selection justification.'
      },
      {
        id: '3',
        title: 'Design Evaluation & Environmental Impact',
        description: 'Evaluate the ecological impact of galvanized steel vs treated timber in wetland areas. Justify the most sustainable choice.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 20,
        markingCriteriaSnippet: 'Level 4 rubric evaluating corrosion resistance, lifecycle, structural load capacity and environmental safety.'
      }
    ],
    markingRubricOrMemo: 'Comprehensive CAPS analytical marking guide with step-by-step force diagrams, load distribution calculations, and material comparison criteria.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Task Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 3',
        urgentAlert: false,
        message: 'Review Grade 8 Term 1 ATP Week 3-4 coverage on structures. Print the bridge scenario source texts and verify student drawing instruments (30°/60° set squares, rulers).',
        checklist: [
          'Verify bridge case study diagrams are clear in printing.',
          'Confirm learners have mastered tension, compression, and shear definitions.',
          'Check that drawing templates are stocked in the technology lab.'
        ],
        suggestedAIPrompt: 'Generate a 10-minute diagnostic warmup quiz on structural forces (tension, compression, shear, torsion) for Grade 8 Technology.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Task Launch (Moderation Alert)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 4',
        urgentAlert: true,
        message: 'Submit the Case Study draft and Memorandum to the Technology HOD for internal moderation. Verify mark allocations (50 Marks) and cognitive weighting.',
        checklist: [
          'Complete Internal Moderation sign-off with Subject Head.',
          'Print master question papers and lock in secure assessment storage.',
          'Ensure special accommodations / enlarged text copies are prepared.'
        ],
        suggestedAIPrompt: 'Draft an internal moderation review checklist for Grade 8 Technology Term 1 Case Study.'
      },
      {
        stage: 'task_launch',
        title: 'Prompt: Task Administration Day',
        leadTimeDays: 0,
        triggerDateStr: 'Term 1 Week 5',
        urgentAlert: true,
        message: 'Administer the 50-mark Case Study under controlled classroom conditions (60 minutes). Supervise independent sketching.',
        checklist: [
          'Brief learners on instructions and time pacing (20 min per section).',
          'Collect all scripts and record attendance on the register.'
        ],
        suggestedAIPrompt: 'Create a 3-point quick scoring rubric for evaluating student technical sketches of gusset plates.'
      }
    ],
    aiAssistancePrompts: [
      'Generate a differentiated version of this bridge case study for learners needing visual scaffolding.',
      'Create an exemplar memorandum with full mark breakdown for Question 2 cross-bracing.'
    ]
  },
  {
    id: 'tech8-t1-test',
    code: 'TECH8-T1-TEST',
    grade: 8,
    gradeClass: '8B',
    subject: 'Technology',
    curriculumStandard: 'CAPS / DBE ATP',
    term: 1,
    scheduledWeek: 9,
    targetDate: 'Term 1 • Week 9 (March)',
    title: 'Grade 8 Controlled Test 1: Structures & Mechanical Advantage (Levers & Linkages)',
    category: 'Controlled Test',
    duration: '1 Hour',
    totalMarks: 60,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Class 1, 2, and 3 Levers', 'Mechanical Advantage Calculations', 'Linkages (Parallel, Reverse motion)', 'Structural Bracing'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 40,
      level3_complex: 20,
      level4_reasoning: 10
    },
    instructions: [
      'Answer all questions.',
      'Calculators may be used.',
      'Show formulas: MA = Load / Effort and MA = Distance moved by Effort / Distance moved by Load.'
    ],
    scenarioOrBrief: 'Formal controlled test covering all Term 1 Technology topics: Structures, Force calculations, Mechanical Advantage for Class 1, 2, and 3 levers, and pneumatic syringe linkage systems.',
    questions: [
      {
        id: 'Q1',
        title: 'Multiple Choice & Technical Matching',
        description: 'Match lever classes to real-world tools (wheelbarrow, scissors, tweezers, bottle opener) and identify fulcrum position.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 15,
        markingCriteriaSnippet: '1 mark per correct definition/matching.'
      },
      {
        id: 'Q2',
        title: 'Mechanical Advantage Calculations',
        description: 'Calculate the mechanical advantage of a crowbar lifting a 600 N rock with 150 N input effort. State if MA > 1 gives force or distance advantage.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 25,
        markingCriteriaSnippet: 'Formula 1 mark, substitution 2 marks, correct answer with unit 1 mark, justification 2 marks.'
      },
      {
        id: 'Q3',
        title: 'Systems Diagram & Linkage Design',
        description: 'Draw a systems diagram (Input -> Process -> Output) for a double-acting scissor linkage and calculate mechanical output.',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 20,
        markingCriteriaSnippet: 'Neat systems diagram 6 marks, linkage geometry 8 marks, efficiency evaluation 6 marks.'
      }
    ],
    markingRubricOrMemo: 'Full step-by-step memorandum with alternative calculation pathways and tolerance bands.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Test Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 7',
        urgentAlert: false,
        message: 'Issue Term 1 Test scope to Grade 8 learners. Schedule 2 revision periods focusing on Lever MA calculation formulas.',
        checklist: [
          'Hand out Revision Booklet on Levers & Structural Forces.',
          'Conduct formative diagnostic quiz on MA = Load / Effort.'
        ],
        suggestedAIPrompt: 'Generate 5 practice MA calculation word problems with worked solutions for Grade 8 revision.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Test (Printing & Moderation)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 8',
        urgentAlert: true,
        message: 'Print 60-mark test papers. Lock in safe. Send memorandum to moderator.',
        checklist: [
          'Verify print quality of diagrams in Question 3.',
          'Confirm venue seating and invigilation timetable.'
        ],
        suggestedAIPrompt: 'Generate an IEB/CAPS style cover page with mark grid for Grade 8 Controlled Test.'
      }
    ],
    aiAssistancePrompts: [
      'Generate a 1-page formula and diagram reference summary sheet for Grade 8 levers.'
    ]
  },
  {
    id: 'tech8-t2-minipat',
    code: 'TECH8-T2-PAT',
    grade: 8,
    gradeClass: '8A',
    subject: 'Technology',
    curriculumStandard: 'CAPS / DBE ATP',
    term: 2,
    scheduledWeek: 7,
    targetDate: 'Term 2 • Weeks 6–9 (May–June)',
    title: 'Grade 8 Mini-PAT: Structural Engineering — Design & Build a Model Cell Phone Tower / Truss Crane',
    category: 'Mini-PAT (Practical Assessment Task)',
    duration: '3 Weeks (Classroom project)',
    totalMarks: 70,
    sbaWeightingPercentage: 35,
    sbaContributionMarks: 35,
    topicsCovered: ['Design Process (Investigate, Design, Make, Evaluate, Communicate)', '3D Oblique & Isometric Drawing', 'Triangulation & Bracing', 'Budgeting & Costing'],
    cognitiveWeighting: {
      level1_knowing: 15,
      level2_routine: 35,
      level3_complex: 30,
      level4_reasoning: 20
    },
    instructions: [
      'Work through the 5 stages of the Technology Design Process.',
      'Individual portfolio submissions with working drawings (1st Angle Orthographic and Isometric).',
      'Construct a scale model using safe workshop materials (cardboard, dowels, hot glue, string).'
    ],
    scenarioOrBrief: 'A rural community requires a sturdy cell phone transmission tower (or cantilever mine rescue crane). The structure must be at least 400 mm tall, support a 500g load at the summit without buckling, withstand horizontal wind simulations, and maintain cost-efficiency.',
    questions: [
      {
        id: 'Stage1',
        title: 'Investigation & Design Brief',
        description: 'Analyze existing tower designs, write a comprehensive Design Brief (I am going to design and make...), and list 5 specifications and 3 constraints.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 15,
        markingCriteriaSnippet: 'Investigation table 5 marks; Design Brief 4 marks; Specifications & Constraints 6 marks.'
      },
      {
        id: 'Stage2',
        title: 'Design Ideas & Working Drawings',
        description: 'Produce 2 initial 3D freehand idea sketches with notes. Draw the chosen idea in 2D 1st Angle Orthographic projection (Front, Top, Left views) with full dimensions and scale (1:2).',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 25,
        markingCriteriaSnippet: '2 freehand ideas with annotations 8 marks; Orthographic 3 views with dimension lines and projection symbol 17 marks.'
      },
      {
        id: 'Stage3',
        title: 'Model Making & Construction',
        description: 'Build the scale model using triangulation techniques. Adhere to safety rules, cutting accuracy, and rigid joining methods.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 20,
        markingCriteriaSnippet: 'Triangulation rigidity 8 marks; Joinery and neatness 6 marks; Safe tool usage 6 marks.'
      },
      {
        id: 'Stage4',
        title: 'Testing, Evaluation & Reflection',
        description: 'Subject the tower to load testing (500g sandbag). Record deflection. Evaluate performance against original specifications and suggest 2 structural modifications.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 10,
        markingCriteriaSnippet: 'Testing data table 4 marks; Self-evaluation and modification report 6 marks.'
      }
    ],
    markingRubricOrMemo: 'Official CAPS Mini-PAT 70-mark analytic rubric covering drawing conventions (SANS 0111), structural rigidity, and engineering report write-up.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Mini-PAT Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 2 Week 4',
        urgentAlert: true,
        message: 'Order project consumables (dowels, corrugated board, PVA glue, craft knives, safety cutting mats). Issue the Project Scenario booklet.',
        checklist: [
          'Inventory workshop tools and verify safety goggles count.',
          'Prepare stock materials packs for all Grade 8 classes.',
          'Schedule the load-testing rig in the technology lab.'
        ],
        suggestedAIPrompt: 'Generate a student materials procurement checklist and safety pledge contract for Grade 8 Mini-PAT.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Mini-PAT Launch',
        leadTimeDays: 7,
        triggerDateStr: 'Term 2 Week 5',
        urgentAlert: false,
        message: 'Introduce the Design Brief writing workshop and review 1st Angle Orthographic projection rules with learners.',
        checklist: [
          'Demonstrate 3D isometric to 2D orthographic view conversion on the board.',
          'Distribute the 70-mark rubric to learners.'
        ],
        suggestedAIPrompt: 'Create step-by-step drawing exercises for 1st Angle Orthographic projections for Grade 8.'
      }
    ],
    aiAssistancePrompts: [
      'Generate a printable 70-mark Mini-PAT Learner Portfolio booklet with rubric tables.',
      'Generate remediation guide for learners struggling with 3D isometric projection.'
    ]
  },

  // ==========================================
  // TECHNOLOGY GRADE 9 (CAPS & ATP Guided)
  // ==========================================
  {
    id: 'tech9-t1-test',
    code: 'TECH9-T1-A1',
    grade: 9,
    gradeClass: '9A',
    subject: 'Technology',
    curriculumStandard: 'CAPS / DBE ATP',
    term: 1,
    scheduledWeek: 6,
    targetDate: 'Term 1 • Week 6 (March)',
    title: 'Grade 9 Assignment & Investigation: Hydraulic & Pneumatic Systems, Pascal’s Principle & Gear Ratios',
    category: 'Assignment',
    duration: '1 Hour',
    totalMarks: 50,
    sbaWeightingPercentage: 10,
    sbaContributionMarks: 10,
    topicsCovered: ['Pascal’s Principle (F1/A1 = F2/A2)', 'Hydraulic Jack Systems', 'Spur Gears & Gear Ratios', 'Velocity Ratios & Torque'],
    cognitiveWeighting: {
      level1_knowing: 25,
      level2_routine: 40,
      level3_complex: 25,
      level4_reasoning: 10
    },
    instructions: [
      'Answer all questions.',
      'Calculators permitted.',
      'State all mathematical formulas clearly before substituting values.'
    ],
    scenarioOrBrief: 'A vehicle workshop operates a hydraulic car hoist and a reduction spur gear transmission. Learners investigate pressure transmission in enclosed fluids and calculate output force gains, plunger displacement, and gear train velocity ratios.',
    questions: [
      {
        id: '1',
        title: 'Pascal’s Principle & Fluid Pressure',
        description: 'State Pascal’s Principle. Calculate the output force F2 when an effort of 200 N is applied to Master Piston A (area 0.005 m²) connected to Slave Piston B (area 0.05 m²).',
        cognitiveLevel: 'Level 2: Routine',
        marks: 18,
        markingCriteriaSnippet: 'Statement 2 marks; Pressure P = F1/A1 = 40 000 Pa (4 marks); Output force F2 = P x A2 = 2000 N (6 marks); Mechanical Advantage MA = 10 (6 marks).'
      },
      {
        id: '2',
        title: 'Spur Gear Ratio & Direction of Rotation',
        description: 'A driver gear with 20 teeth turns clockwise at 600 RPM, meshed with a driven gear with 60 teeth. Calculate the Gear Ratio (GR), driven rotation direction, and driven speed.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 17,
        markingCriteriaSnippet: 'Gear Ratio = 60/20 = 3:1 (6 marks); Counter-clockwise direction (3 marks); Driven speed = 600/3 = 200 RPM (8 marks).'
      },
      {
        id: '3',
        title: 'System Optimization & Energy Conservation',
        description: 'Explain why hydraulic systems require oil rather than air for heavy lifting. Critically analyze why work output cannot exceed work input.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 15,
        markingCriteriaSnippet: 'Incompressibility of liquids vs compressibility of gases (8 marks); Law of conservation of energy and friction losses (7 marks).'
      }
    ],
    markingRubricOrMemo: 'Complete step-by-step marking guidelines with alternative formula representations.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Task Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 4',
        urgentAlert: false,
        message: 'Conduct syringe and plastic tubing demonstrations in class. Verify learners can calculate circle area and pressure formulas (P = F / A).',
        checklist: [
          'Set up demonstration hydraulic pistons with different diameter syringes.',
          'Distribute Gear Train formula reference guide.'
        ],
        suggestedAIPrompt: 'Create 4 hydraulic calculation scaffolded worksheet problems with visual syringe diagrams.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Task Launch (Moderation Alert)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 5',
        urgentAlert: true,
        message: 'Internal moderation sign-off for Grade 9 Assignment 1. Confirm paper layout and mark allocation matches ATP requirements.',
        checklist: [
          'Submit task paper and marking memo to HOD.',
          'Duplicate test scripts.'
        ],
        suggestedAIPrompt: 'Generate an internal moderation checklist for Grade 9 Mechanical & Hydraulic Systems.'
      }
    ],
    aiAssistancePrompts: [
      'Generate a step-by-step worked solutions guide for Pascal principle questions.'
    ]
  },
  {
    id: 'tech9-t2-minipat',
    code: 'TECH9-T2-PAT',
    grade: 9,
    gradeClass: '9B',
    subject: 'Technology',
    curriculumStandard: 'CAPS / DBE ATP',
    term: 2,
    scheduledWeek: 8,
    targetDate: 'Term 2 • Weeks 6–9 (May–June)',
    title: 'Grade 9 Mini-PAT: Mechanical & Hydraulic Engineering — Syringe-Powered Hydraulic Excavator / Rescue Crane',
    category: 'Mini-PAT (Practical Assessment Task)',
    duration: '3 Weeks (Practical workshops)',
    totalMarks: 70,
    sbaWeightingPercentage: 35,
    sbaContributionMarks: 35,
    topicsCovered: ['Design Process', 'Hydraulic Syringe Actuators', 'Clever Linkages & Pulleys', 'Isometric & 1st Angle Orthographic CAD/Drawings', 'Costing & Bill of Materials'],
    cognitiveWeighting: {
      level1_knowing: 15,
      level2_routine: 35,
      level3_complex: 30,
      level4_reasoning: 20
    },
    instructions: [
      'Follow the Technology Design Process stages.',
      'Produce an engineering portfolio with annotated 3D drawings.',
      'Construct a working hydraulic crane using syringes (10ml and 20ml), PVC tubing, timber/cardboard, and pivots.'
    ],
    scenarioOrBrief: 'A disaster relief agency requires a compact, syringe-powered hydraulic rescue arm able to rotate 90°, extend over a 250 mm barrier, grip an object weighing 100g, and deposit it safely in a receptacle.',
    questions: [
      {
        id: 'Stage1',
        title: 'Investigation & Specifications',
        description: 'Investigate 3 types of hydraulic linkage joints and evaluate fluid types. Write a precise Design Brief with 6 specifications and 3 constraints.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 15,
        markingCriteriaSnippet: 'Comprehensive research synthesis 6 marks; Design brief 3 marks; Technical specifications 6 marks.'
      },
      {
        id: 'Stage2',
        title: 'Working Drawings & Bill of Materials',
        description: 'Draw the assembled rescue arm in 1st Angle Orthographic Projection with dimensions and balloon labeling. Compile a priced Bill of Materials (BOM).',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 25,
        markingCriteriaSnippet: 'Orthographic views with projection symbol 15 marks; Dimensioning accuracy 5 marks; Costed Bill of Materials 5 marks.'
      },
      {
        id: 'Stage3',
        title: 'Model Fabrication & Hydraulic Circuit Assembly',
        description: 'Build the hydraulic arm. Eliminate air bubbles in fluid lines, secure syringe mounts, and assemble smooth mechanical joints.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 20,
        markingCriteriaSnippet: 'Hydraulic circuit tightness and response 8 marks; Structural assembly and pivot stability 8 marks; Safe finishing 4 marks.'
      },
      {
        id: 'Stage4',
        title: 'Performance Testing & Design Optimization',
        description: 'Execute the obstacle test. Measure lifting time, payload stability, and angular range. Present a technical improvement proposal.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 10,
        markingCriteriaSnippet: 'Testing rubric 5 marks; Critical reflection and engineering modifications 5 marks.'
      }
    ],
    markingRubricOrMemo: 'Official CAPS Mini-PAT 70-mark analytic rubric.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Mini-PAT Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 2 Week 4',
        urgentAlert: true,
        message: 'Order hydraulic kits (10ml/20ml syringes, silicone tubing, cable ties, Masonite/MDF board, split pins). Distribute Project Brief.',
        checklist: [
          'Verify syringe plunger seals and tubing fittings.',
          'Review workshop safety rules for drilling and hot glue.',
          'Prepare testing obstacles and standard 100g test weights.'
        ],
        suggestedAIPrompt: 'Generate a Bill of Materials costing template for Grade 9 Technology Mini-PAT.'
      }
    ],
    aiAssistancePrompts: [
      'Generate printable student design templates with title blocks for orthographic drawings.'
    ]
  },

  // ==========================================
  // MATHEMATICAL LITERACY GRADE 10 (IEB SAG Aligned)
  // ==========================================
  {
    id: 'mlit10-t1-investigation',
    code: 'MLIT10-T1-INV1',
    grade: 10,
    gradeClass: '10',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 1,
    scheduledWeek: 6,
    targetDate: 'Term 1 • Week 6 (March)',
    title: 'IEB Alternate Assessment Task 1: Mathematical Investigation — Stepped Water & Electricity Tariff Analysis',
    category: 'Alternate Assessment: Investigation',
    duration: '1.5 Hours (Classroom / Supervised)',
    totalMarks: 50,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Tariff Systems (Stepped / Sliding scale)', 'Finance', 'Data Handling', 'Linear Graphs & Break-Even Analysis'],
    cognitiveWeighting: {
      level1_knowing: 25,
      level2_routine: 35,
      level3_complex: 25,
      level4_reasoning: 15
    },
    instructions: [
      'Answer all questions.',
      'Show all calculations, formulas, and units (Rands, kWh, kL).',
      'Attach Appendix G (IEB Learner AI Declaration Form) signed and completed.'
    ],
    scenarioOrBrief: 'A municipal tariff structure charges residential water on a stepped sliding scale (Block 1: 0-6 kL free/low cost, Block 2: 7-15 kL at R22.50/kL, Block 3: 16-30 kL at R38.00/kL, Block 4: >30 kL at R55.00/kL + 15% VAT). Learners formulate mathematical conjectures, construct piecewise tariff tables, draw multi-block line graphs, and evaluate water conservation strategies.',
    questions: [
      {
        id: '1',
        title: 'Block Tariff Calculation & Routine Billing',
        description: 'Calculate the total municipal water bill (including 15% VAT) for a household that consumes 24 kL in a single month.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 14,
        markingCriteriaSnippet: 'Block 1 calculation 3 marks; Block 2 calculation 3 marks; Block 3 calculation 4 marks; Subtotal and 15% VAT 4 marks.'
      },
      {
        id: '2',
        title: 'Comparative Graphing & Cost Rate Patterns',
        description: 'Plot a tariff cost graph (Cost in Rands vs Water Volume in kL) from 0 to 40 kL. Identify points of gradient change and explain why the tariff is non-linear.',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 20,
        markingCriteriaSnippet: 'Accurate scale and axes labeling 4 marks; Correct plotted piecewise line segments 10 marks; Mathematical explanation of gradient change 6 marks.'
      },
      {
        id: '3',
        title: 'Decision-Making & Financial Advice (IEB Level 4)',
        description: 'A family of 5 aims to reduce monthly expenditure. Critically analyze the financial savings of installing a 5 000L rainwater tank costing R8 500. Calculate the payback period.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 16,
        markingCriteriaSnippet: 'Monthly water savings in highest tariff block 6 marks; Payback period formula 6 marks; Critical reflection considering seasonal rainfall 4 marks.'
      }
    ],
    markingRubricOrMemo: 'Full IEB 4-level taxonomy marking memo with alternative calculation routes and concept marking standards.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Task Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 4',
        urgentAlert: false,
        message: 'Review stepped tariff calculations with Grade 10s. Emphasize that in stepped tariffs, only consumption within a block is multiplied by that rate (not the entire volume).',
        checklist: [
          'Hand out tariff practice worksheet with stepped blocks.',
          'Verify graph paper supplies in the stationery store.'
        ],
        suggestedAIPrompt: 'Generate 3 stepped tariff practice problems with detailed step-by-step billing calculations for Grade 10.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Task Launch (Moderation Alert)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 5',
        urgentAlert: true,
        message: 'Complete Appendix A (School-Based Moderation Form) and Appendix B (Evidence of Moderation Form) for Task 1. Verify Appendix G forms are printed.',
        checklist: [
          'HOD pre-moderation sign-off on Appendix A & B.',
          'Print Appendix G (AI Declaration) for every learner script.'
        ],
        suggestedAIPrompt: 'Format the IEB Appendix A cognitive level matrix for Grade 10 Mathematical Literacy Task 1.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate a real-world municipal water bill exemplar for Grade 10 tariff investigation.'
    ]
  },
  {
    id: 'mlit10-t1-test1',
    code: 'MLIT10-T1-TEST1',
    grade: 10,
    gradeClass: '10',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 1,
    scheduledWeek: 9,
    targetDate: 'Term 1 • Week 9 (March)',
    title: 'IEB Standardised Test 1: Finance, Number Operations, Percentages & Simple Interest',
    category: 'Standardised Test',
    duration: '1 Hour (Controlled Exam Conditions)',
    totalMarks: 60,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Personal Finance', 'Income & Expenditure', 'VAT (15%)', 'Simple Interest (I = P.r.t)', 'Hire Purchase Contracts'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 35,
      level3_complex: 20,
      level4_reasoning: 15
    },
    instructions: [
      'Answer all questions under controlled test conditions.',
      'Calculators permitted. Round off financial answers to 2 decimal places.',
      'Show all steps.'
    ],
    scenarioOrBrief: 'Standardised controlled test administered to all Grade 10 Math Literacy classes. Internally moderated in accordance with IEB SAG guidelines.',
    questions: [
      {
        id: '1',
        title: 'Taxation, Basic Calculations & Income Statements',
        description: 'Determine gross income, net income, statutory deductions (PAYE, UIF), and calculate exclusive/inclusive VAT amounts.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 18,
        markingCriteriaSnippet: '1-2 marks per routine percentage and arithmetic deduction.'
      },
      {
        id: '2',
        title: 'Hire Purchase & Simple Interest Comparison',
        description: 'A laptop cash price is R12 999. On hire purchase: 10% deposit, 24 monthly payments of R750. Calculate the total cost and true simple interest rate.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 24,
        markingCriteriaSnippet: 'Deposit R1 299.90 (3 marks); Balance financed (3 marks); Total installments R18 000 (4 marks); Total hire purchase price (4 marks); Difference & interest rate (10 marks).'
      },
      {
        id: '3',
        title: 'Financial Budgeting & Cash Flow Advice',
        description: 'Review a monthly household budget. Advise whether an unforeseen car maintenance expense of R4 500 can be absorbed without incurring high-interest debt.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 18,
        markingCriteriaSnippet: 'Surplus/deficit calculation 6 marks; Critical justification and restructuring non-essential spending 12 marks.'
      }
    ],
    markingRubricOrMemo: 'Standardised IEB marking memo with rubric for Level 4 financial justification.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Test Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 7',
        urgentAlert: false,
        message: 'Issue Grade 10 Test 1 notification and examination timetable to students. Distribute Revision Pack on Hire Purchase calculations.',
        checklist: [
          'Publish Test Scope on class bulletin.',
          'Schedule targeted afternoon clinic for struggling learners on percentage conversions.'
        ],
        suggestedAIPrompt: 'Create 5 hire purchase calculation revision questions with worked step-by-step memos.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix F'],
    aiAssistancePrompts: [
      'Generate a diagnostic error-analysis guide for Grade 10 Test 1.'
    ]
  },

  // ==========================================
  // MATHEMATICAL LITERACY GRADE 11 (IEB SAG Aligned)
  // ==========================================
  {
    id: 'mlit11-t1-investigation',
    code: 'MLIT11-T1-INV1',
    grade: 11,
    gradeClass: '11',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 1,
    scheduledWeek: 7,
    targetDate: 'Term 1 • Week 7 (March)',
    title: 'IEB Alternate Assessment Task 1: Mathematical Investigation — Cellular Data Contracts, Fixed Costs & Linear Cost Modelling',
    category: 'Alternate Assessment: Investigation',
    duration: '1.5 Hours',
    totalMarks: 50,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Patterns & Linear Equations', 'Cost = Fixed Cost + (Variable Rate × Usage)', 'Data & Call Tariffs', 'Graphical Modelling'],
    cognitiveWeighting: {
      level1_knowing: 20,
      level2_routine: 35,
      level3_complex: 25,
      level4_reasoning: 20
    },
    instructions: [
      'Work individually under teacher supervision.',
      'Use mathematical models, formulas, and graph plots.',
      'Complete and sign Appendix G (AI Usage Declaration).'
    ],
    scenarioOrBrief: 'Learners investigate 3 competing cell phone contracts (Contract A: prepaid R0.85/MB; Contract B: R199/month including 10GB, then R0.25/MB; Contract C: R399/month uncapped). Learners formulate linear equations, plot break-even intersection points, and justify the optimum package for differing user consumption profiles.',
    questions: [
      {
        id: '1',
        title: 'Formula Formulation & Table Generation',
        description: 'Write the algebraic cost formula for Contract A and Contract B in terms of x (data in GB). Generate a comparative table from 0 GB to 25 GB.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 15,
        markingCriteriaSnippet: 'Formula definitions 4 marks; Correct table computation with unit conversions (MB to GB) 11 marks.'
      },
      {
        id: '2',
        title: 'Break-Even Graphing & Intersection Analysis',
        description: 'Plot all three contract models on a single Cartesian plane. Identify the exact break-even point where Contract B becomes cheaper than Contract A.',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 20,
        markingCriteriaSnippet: 'Graph plotting with clear legend 8 marks; Algebraic equating for break-even 6 marks; Interpretation of intersections 6 marks.'
      },
      {
        id: '3',
        title: 'User Profile Recommendation (IEB SAG Page 11)',
        description: 'A university student consumes an average of 14.5 GB monthly, mostly on off-peak video streaming. Synthesize both mathematical and non-mathematical factors (network coverage, throttling, contract lock-in) to recommend the best option.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 15,
        markingCriteriaSnippet: 'Mathematical cost comparison 6 marks; Non-mathematical contextual justification 9 marks (referencing IEB Level 4 descriptors).'
      }
    ],
    markingRubricOrMemo: 'Full IEB marking memorandum aligned with Bloom’s taxonomy cognitive weighting guidelines.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Task Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 5',
        urgentAlert: false,
        message: 'Ensure Grade 11 learners are fluent in unit conversions (Megabytes to Gigabytes) and algebraic substitution into linear cost models.',
        checklist: [
          'Review linear equations C = mx + c with learners.',
          'Verify student possession of Cartesian graph paper and 30cm rulers.'
        ],
        suggestedAIPrompt: 'Generate 4 break-even linear cost graphing problems with solutions for Grade 11.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Task Launch',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 6',
        urgentAlert: true,
        message: 'Complete Appendix A and Appendix B internal moderation with the HOD. Print Appendix G (AI Declaration) for all candidates.',
        checklist: [
          'Moderator sign-off on Appendix B.',
          'Confirm security of printed test packs.'
        ],
        suggestedAIPrompt: 'Format Appendix A Matrix for Grade 11 Math Literacy Investigation.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate a real-world telecommunications rate card for the Grade 11 investigation.'
    ]
  },
  {
    id: 'mlit11-t2-project',
    code: 'MLIT11-T2-PROJ',
    grade: 11,
    gradeClass: '11',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 2,
    scheduledWeek: 6,
    targetDate: 'Term 2 • Weeks 5–8 (May–June)',
    title: 'IEB Alternate Assessment Task 2: Project — Packaging Design, Surface Area vs Volume Optimization & Material Costing',
    category: 'Alternate Assessment: Project',
    duration: '2 Hours (Guided portfolio over 2 weeks)',
    totalMarks: 50,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Measurement', 'Surface Area of Rectangular Prisms & Cylinders', 'Volume (V = l.b.h, V = π.r².h)', 'Cost Optimization & Packaging Waste'],
    cognitiveWeighting: {
      level1_knowing: 20,
      level2_routine: 30,
      level3_complex: 30,
      level4_reasoning: 20
    },
    instructions: [
      'Design two packaging containers of identical internal volume (750 ml).',
      'Calculate total cardboard/tinplate material usage, wastage percentage, and cost per 10 000 units.',
      'Must include Appendix G AI declaration.'
    ],
    scenarioOrBrief: 'Directly applying IEB SAG Page 12 descriptor: "Designing two packaging boxes for a product and comparing them based on material usage (surface area) and efficiency (volume), then selecting the most cost-effective design."',
    questions: [
      {
        id: '1',
        title: 'Geometric Dimensions & Surface Area Calculation',
        description: 'Calculate the total surface area (including 15% overlap flaps for gluing) of a rectangular prism box (dimensions 10cm x 7.5cm x 10cm = 750cm³) and a cylindrical can (radius 4.5cm, height 11.8cm = 750cm³).',
        cognitiveLevel: 'Level 2: Routine',
        marks: 18,
        markingCriteriaSnippet: 'Rectangular prism SA formula and flap addition 8 marks; Cylinder SA formula 2πr(r+h) 10 marks.'
      },
      {
        id: '2',
        title: 'Material Costing, Wastage & Packing Tessellation',
        description: 'Calculate the number of container nets that can be stamped from a standard 1200mm x 2400mm corrugated sheet. Determine the scrap material waste percentage and total manufacturing cost per 10 000 boxes.',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 18,
        markingCriteriaSnippet: 'Tessellation layout 6 marks; Wastage calculation 6 marks; Production cost computation 6 marks.'
      },
      {
        id: '3',
        title: 'Comparative Evaluation & Commercial Recommendation',
        description: 'Evaluate structural stacking strength during shipping palletization, branding print surface, and consumer convenience. Justify the final commercial container choice.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 14,
        markingCriteriaSnippet: 'Comprehensive Level 4 justification balancing cost vs practical transport logistics.'
      }
    ],
    markingRubricOrMemo: 'Detailed IEB analytic rubric with step-by-step surface area calculations and commercial justification criteria.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Project Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 2 Week 3',
        urgentAlert: false,
        message: 'Prepare 3D packaging net exemplars (cereal boxes, beverage cans). Review measurement conversion: 1 ml = 1 cm³ = 0.001 L.',
        checklist: [
          'Bring sample packaging boxes to class for disassembly demonstration.',
          'Issue Project guidelines and rubric.'
        ],
        suggestedAIPrompt: 'Generate 3D net diagrams and surface area formulas reference cards for Grade 11 Measurement.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate a sample spreadsheet model for packaging cost optimization.'
    ]
  },

  // ==========================================
  // MATHEMATICAL LITERACY GRADE 12 (STRICT IEB SAG 2025/2026 IMPLEMENTATION)
  // ==========================================
  {
    id: 'mlit12-t1-alt1',
    code: 'MLIT12-SBA-ALT1',
    grade: 12,
    gradeClass: '12',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 1,
    scheduledWeek: 6,
    targetDate: 'Term 1 • Week 6 (March)',
    title: 'IEB Alternate Assessment Task 1: Mathematical Investigation — Compound Inflation Trends, Home Loan Amortization & Prime Interest Rate Shocks',
    category: 'Alternate Assessment: Investigation',
    duration: '1.5 – 2 Hours (Supervised Session)',
    totalMarks: 50,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Finance (Compound Interest & Amortization Tables)', 'Data Handling (Inflation Indices CPI)', 'Level 4 Critical Reflection'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 30,
      level3_complex: 20,
      level4_reasoning: 20
    },
    instructions: [
      'This task contributes 15% to your Grade 12 IEB SBA Portfolio (15 Marks of 100 SBA).',
      'Work through all 3 sections under supervised classroom conditions.',
      'You must complete and attach Appendix G (Learner Declaration: Use of AI in Assessment Tasks).'
    ],
    scenarioOrBrief: 'Directly grounded in IEB SAG Page 11: "Constructing a table to model a loan scenario, considering interest, repayments, and monthly balances, and exploring the impact of interest rate changes or increased repayments on the total cost of the loan." A buyer obtains a R1 250 000 mortgage over 20 years at Prime (11.75%). Learners construct monthly amortization tables, investigate the financial impact of a 0.75% interest rate hike, and calculate the dramatic interest savings of an extra R1 000 monthly repayment.',
    questions: [
      {
        id: '1',
        title: 'CPI Inflation Index & Price Adjustment',
        description: 'Using official Stats SA CPI data tables (2020-2026), calculate the annual inflation rate between 2023 and 2025. Adjust a monthly grocery basket of R4 800 to its future inflated value.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 15,
        markingCriteriaSnippet: 'CPI ratio formula 5 marks; Annual percentage inflation rate 5 marks; Adjusted basket value 5 marks.'
      },
      {
        id: '2',
        title: 'Home Loan Amortization Table Construction',
        description: 'Calculate the monthly interest for Month 1 on R1 250 000 at 11.75% p.a. (Monthly Rate = 11.75% / 12). Given a fixed monthly repayment of R13 540, calculate capital paid off and new closing balance for Month 1, 2, and 3.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 15,
        markingCriteriaSnippet: 'Monthly rate conversion 3 marks; Month 1 interest R12 239.58 (4 marks); Capital reduction R1 300.42 (4 marks); Amortization table completion 4 marks.'
      },
      {
        id: '3',
        title: 'Interest Rate Shock & Extra Repayment Strategy (IEB Level 4)',
        description: 'Critically analyze the long-term impact if the Reserve Bank hikes interest rates by 75 basis points (+0.75%). Calculate the total interest saved over 20 years if the homeowner pays an additional R1 000 each month towards the capital balance. Formulate justified financial advice.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 20,
        markingCriteriaSnippet: 'Rate hike calculation 5 marks; Extra repayment loan reduction model 7 marks; Level 4 critical reflection and advice 8 marks.'
      }
    ],
    markingRubricOrMemo: 'Official IEB 50-mark Marking Memorandum. Conforms strictly to Table 2 Bloom’s Taxonomy cognitive weighting (Knowing 30%, Routine 30%, Multi-step 20%, Reasoning/Reflecting 20%). Includes concept marking guidelines for Level 4.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Task 1 Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 4',
        urgentAlert: false,
        message: 'Confirm all Grade 12 students are practicing loan amortization and compound formula calculations. Prepare Appendix G AI declaration forms.',
        checklist: [
          'Review compound interest vs loan amortization differences in class.',
          'Verify that stats tables from Stats SA are printed clearly in the task pack.'
        ],
        suggestedAIPrompt: 'Generate 3 loan amortization monthly calculation practice problems with worked answers for Grade 12 IEB.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Task 1 Launch (Pre-Moderation Alert)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 5',
        urgentAlert: true,
        message: 'Complete Appendix A (School-Based Moderation Form) and Appendix B (Evidence of Moderation Form). Sign off with HOD.',
        checklist: [
          'Check that Appendix A Topic vs Cognitive Levels matrix is mathematically balanced (Total 50 marks, 15% SBA).',
          'Ensure Appendix B is signed by teacher and moderator.',
          'Print master scripts and store in double-locked assessment cabinet.'
        ],
        suggestedAIPrompt: 'Generate the completed Appendix A matrix for Grade 12 Alternate Task 1.'
      },
      {
        stage: 'task_launch',
        title: 'Prompt: Task Administration & AI Integrity Briefing',
        leadTimeDays: 0,
        triggerDateStr: 'Term 1 Week 6',
        urgentAlert: true,
        message: 'Administer Task 1 under supervised conditions (90-120 minutes). Ensure every learner fills out and signs Appendix G (AI Declaration Table).',
        checklist: [
          'Brief learners on academic honesty and verify all Appendix G tables are completed.',
          'Collect all scripts and record onto the mark register.'
        ],
        suggestedAIPrompt: 'Draft an announcement reminder for Grade 12 learners regarding Appendix G AI usage compliance.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix D', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate an Excel loan amortization simulator matching the parameters of Task 1.',
      'Generate a sample student response demonstrating an exemplar Level 4 reflection.'
    ]
  },
  {
    id: 'mlit12-t1-test1',
    code: 'MLIT12-SBA-TEST1',
    grade: 12,
    gradeClass: '12',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 1,
    scheduledWeek: 9,
    targetDate: 'Term 1 • Week 9 (March)',
    title: 'IEB Standardised Test 1: Finance (Taxation SARS, Budgets) & Data Handling (Measures of Spread)',
    category: 'Standardised Test',
    duration: '1 Hour (Controlled Conditions)',
    totalMarks: 60,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['SARS Personal Income Tax (2025/2026 Tax Brackets & Rebates)', 'Medical Tax Credits', 'Box-and-Whisker Plots & Five-Number Summary', 'IQR & Outliers'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 30,
      level3_complex: 20,
      level4_reasoning: 20
    },
    instructions: [
      'Standardised test administered under controlled conditions.',
      'Duration: 60 Minutes. Total marks: 60 (contributes 15% to SBA Portfolio).',
      'Non-programmable calculators permitted. Show all working.'
    ],
    scenarioOrBrief: 'Formal IEB Standardised Test 1 assessing SARS progressive tax tables, primary/secondary rebates, medical aid tax credits, and statistical box-and-whisker plots of quarterly company sales data.',
    questions: [
      {
        id: '1',
        title: 'Question 1: Level 1 Baseline Knowing (IEB Mandate)',
        description: 'Define taxable income, threshold, and tax rebate. Identify the median, lower quartile (Q1), and upper quartile (Q3) from a given box-and-whisker plot.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 18,
        markingCriteriaSnippet: 'Question 1 strictly assesses Level 1 (20-30% of paper) as required by IEB SAG Section C.'
      },
      {
        id: '2',
        title: 'SARS Income Tax Calculation for 48-Year-Old Professional',
        description: 'An individual earns a gross monthly salary of R42 500 and contributes 7.5% to a registered pension fund. Using the 2025/2026 SARS tax bracket table, calculate the annual taxable income, tax before rebate, primary rebate subtraction, and net monthly PAYE.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 24,
        markingCriteriaSnippet: 'Pension deduction 4 marks; Taxable income R471 750 (4 marks); Bracket formula substitution 8 marks; Primary rebate deduction (R17 235) 4 marks; Monthly PAYE (4 marks).'
      },
      {
        id: '3',
        title: 'Statistical Comparison & Wage Equity Critique',
        description: 'Compare the salary distribution of male and female employees in an engineering firm using five-number summaries and Interquartile Ranges (IQR). Critically comment on salary skewness and wage parity.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 18,
        markingCriteriaSnippet: 'IQR calculation 6 marks; Skewness analysis 6 marks; Justified wage equity conclusion 6 marks.'
      }
    ],
    markingRubricOrMemo: 'Standardised memorandum with full cognitive level tagging for every mark allocation.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Standardised Test 1',
        leadTimeDays: 14,
        triggerDateStr: 'Term 1 Week 7',
        urgentAlert: false,
        message: 'Distribute SARS tax tables and practice questions to all Grade 12s. Emphasize the difference between tax bracket base tax and the marginal percentage.',
        checklist: [
          'Verify all learners have the updated 2025/2026 SARS tax bracket tables.',
          'Schedule after-school tutorial on Five-Number summary calculations.'
        ],
        suggestedAIPrompt: 'Create 3 progressive tax calculation problems with medical scheme credit adjustments for Grade 12.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Test 1 (Moderation Sign-off)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 1 Week 8',
        urgentAlert: true,
        message: 'Complete Appendix A and Appendix B. Verify Question 1 is 100% Level 1 knowing questions per IEB guidelines.',
        checklist: [
          'Confirm Question 1 fulfills the 20% ±5% Level 1 IEB requirement.',
          'HOD signature on Appendix B.'
        ],
        suggestedAIPrompt: 'Verify cognitive level balance of Grade 12 Standardised Test 1 against IEB Table 2.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix F'],
    aiAssistancePrompts: [
      'Generate an exam revision cheat-sheet for Grade 12 SARS tax calculation steps.'
    ]
  },
  {
    id: 'mlit12-t2-alt2',
    code: 'MLIT12-SBA-ALT2',
    grade: 12,
    gradeClass: '12',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 2,
    scheduledWeek: 6,
    targetDate: 'Term 2 • Weeks 5–8 (May–June)',
    title: 'IEB Alternate Assessment Task 2: Project / Case Study — AI-Supported Household Budgeting & Municipal Energy Tariff Simulation',
    category: 'Alternate Assessment: Project',
    duration: '2 Hours (Project Portfolio over 2 Weeks)',
    totalMarks: 50,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Finance (Household Budgeting & Cost Modelling)', 'Spreadsheets / AI-Assisted Data Modelling', 'Measurement & Energy Tariffs (kWh)', 'Level 4 Critical Reflection'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 30,
      level3_complex: 20,
      level4_reasoning: 20
    },
    instructions: [
      'This is the 2nd of two mandatory Alternate Assessment Tasks (contributes 15% to SBA).',
      'Must be a DIFFERENT task type from Task 1 (Project / Case Study vs Investigation) per IEB SAG Page 5.',
      'Must include Appendix G (Declaration on Use of AI in Assessment Tasks).'
    ],
    scenarioOrBrief: 'Directly from IEB SAG Page 6 & 9: "Budgeting with AI-supported spreadsheets, modelling costs or data trends using simulation tools, and critically analysing outputs from AI platforms." Learners track household energy consumption (appliances in Watts, daily hours of use, Eskom stepped tariffs), simulate solar PV installation economics, and critically evaluate an AI-generated savings model.',
    questions: [
      {
        id: '1',
        title: 'Energy Consumption Audit & Unit Conversions',
        description: 'Calculate total monthly kWh consumption for an air conditioner (2 400 W, 5 hrs/day), geyser (3 000 W, 3 hrs/day), and refrigerator (150 W, 24 hrs/day).',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 15,
        markingCriteriaSnippet: 'Conversion W to kW 3 marks; Daily kWh formulas 6 marks; 30-day monthly sum 6 marks.'
      },
      {
        id: '2',
        title: 'Prepaid vs Postpaid Stepped Electricity Tariff Modelling',
        description: 'Using City Power stepped tariff blocks (Block 1: 0-350 kWh @ R2.15/kWh; Block 2: 351-600 kWh @ R2.85/kWh; Block 3: >600 kWh @ R3.60/kWh + R200 basic service charge), calculate total cost and plot cost curves.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 15,
        markingCriteriaSnippet: 'Block 1 calculation 4 marks; Block 2 calculation 4 marks; Block 3 & service charge 7 marks.'
      },
      {
        id: '3',
        title: 'Solar PV Feasibility & Critical Critique of AI Output (IEB Level 4)',
        description: 'Learners prompt an AI simulator (or use spreadsheet template) to model a 5kW solar hybrid system costing R95 000. Learners critically verify AI-generated calculations, detect hallucinated tariff assumptions, and calculate the true payback period.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 20,
        markingCriteriaSnippet: 'Detection of AI assumptions 6 marks; True payback model calculation 7 marks; Justified commercial recommendation 7 marks.'
      }
    ],
    markingRubricOrMemo: 'IEB Project Analytic Rubric with criteria for mathematical reasoning, spreadsheet accuracy, and critical evaluation of AI-generated data.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Project Launch',
        leadTimeDays: 14,
        triggerDateStr: 'Term 2 Week 3',
        urgentAlert: false,
        message: 'Book the computer lab or verify student access to spreadsheet software (Google Sheets / MS Excel). Issue project guidelines.',
        checklist: [
          'Verify computer lab booking and projector readiness.',
          'Review kWh = (Watts x Hours) / 1000 formula in class.'
        ],
        suggestedAIPrompt: 'Create a spreadsheet template with pre-built formulas for household energy auditing for Grade 12.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Project Launch (Appendix G Compliance)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 2 Week 4',
        urgentAlert: true,
        message: 'Explain Appendix G AI Declaration Table requirements to learners. Moderate project brief with HOD on Appendix A and B.',
        checklist: [
          'Brief learners on ethical AI use and mandatory completion of Appendix G.',
          'Complete pre-moderation forms (Appendix A and B).'
        ],
        suggestedAIPrompt: 'Generate an ethical AI usage guide for Grade 12 Mathematical Literacy projects.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix D', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate an exemplar completed Appendix G form for a household energy project.'
    ]
  },
  {
    id: 'mlit12-t2-test2',
    code: 'MLIT12-SBA-TEST2',
    grade: 12,
    gradeClass: '12',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 2,
    scheduledWeek: 10,
    targetDate: 'Term 2 • Week 10 (June)',
    title: 'IEB Standardised Test 2 / June Mid-Year Examination: Measurement & Maps, Plans and Physical Representations',
    category: 'Standardised Test',
    duration: '1 Hour (Controlled Examination)',
    totalMarks: 60,
    sbaWeightingPercentage: 15,
    sbaContributionMarks: 15,
    topicsCovered: ['Scale & Conversions', 'Topographical & Road Maps (Distance, Speed, Time, Fuel Consumption)', 'Architectural Floor Plans & Elevations', 'Surface Area & Perimeter'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 30,
      level3_complex: 20,
      level4_reasoning: 20
    },
    instructions: [
      'Duration: 60 Minutes. Total marks: 60 (Contributes 15% to SBA Portfolio).',
      'Calculators, rulers, and compasses permitted.',
      'Show all scale conversions and formula workings.'
    ],
    scenarioOrBrief: 'Standardised Test 2 / June Mid-Year Exam covering Paper 2 core domains: Architectural house floor plans (scale 1:50), tiling area calculations, and a national highway strip map trip planner with toll tariffs and fuel economy.',
    questions: [
      {
        id: '1',
        title: 'Question 1: Level 1 Scale & Map Reading (IEB Mandate)',
        description: 'Read dimensions from a floor plan, explain compass bearing, convert bar scale to number scale, and identify symbols for doors and windows.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 18,
        markingCriteriaSnippet: 'Strictly Level 1 knowing questions per IEB SAG Section C.'
      },
      {
        id: '2',
        title: 'Floor Plan Area, Tiling & Material Budgeting',
        description: 'Calculate the total floor area of an open-plan kitchen and living room. Determine number of tile boxes required (0.25 m² per tile, 8 tiles per box, add 10% cutting waste). Calculate total tiling cost.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 22,
        markingCriteriaSnippet: 'Area calculation 6 marks; Waste factor +10% 4 marks; Box rounding up 6 marks; Total cost calculation 6 marks.'
      },
      {
        id: '3',
        title: 'Route Planning, Fuel Consumption & Speed Restrictions',
        description: 'Using a strip map from Johannesburg to Durban (580 km), calculate total driving time including two 20-minute rest stops. Calculate total fuel cost at 7.8 L / 100km (fuel price R22.80/L) and add 4 toll plaza fees.',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 20,
        markingCriteriaSnippet: 'Driving time and stop addition 6 marks; Fuel volume and cost 8 marks; Toll gate addition and total budget 6 marks.'
      }
    ],
    markingRubricOrMemo: 'Standardised IEB marking memo with exact scale measurement tolerances (±1 mm).',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before June Test 2',
        leadTimeDays: 14,
        triggerDateStr: 'Term 2 Week 8',
        urgentAlert: false,
        message: 'Ensure learners practice measuring with clear plastic 30cm rulers and understand bar scale ratios. Distribute architectural floor plan revision booklet.',
        checklist: [
          'Check student rulers and calculators.',
          'Conduct revision period on scale conversions (mm to m to km).'
        ],
        suggestedAIPrompt: 'Generate 4 scale conversion and floor plan tiling problems with diagrams and memos.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix F'],
    aiAssistancePrompts: [
      'Generate an architectural floor plan reading guide with typical IEB exam questions.'
    ]
  },
  {
    id: 'mlit12-t3-prelims',
    code: 'MLIT12-SBA-PRELIM',
    grade: 12,
    gradeClass: '12',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 3,
    scheduledWeek: 8,
    targetDate: 'Term 3 • Weeks 7–9 (August–September)',
    title: 'Grade 12 IEB Preliminary Examination: Paper 1 & Paper 2 (Total 300 Marks -> 40% SBA Weighting)',
    category: 'Preliminary Examination',
    duration: 'Paper 1: 3 Hours (150 Marks) + Paper 2: 3 Hours (150 Marks)',
    totalMarks: 300,
    sbaWeightingPercentage: 40,
    sbaContributionMarks: 40,
    topicsCovered: [
      'Paper 1 (60% Finance, 35% Data Handling, 5% Probability)',
      'Paper 2 (40% Maps & Plans, 55% Measurement, 5% Probability)'
    ],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 30,
      level3_complex: 20,
      level4_reasoning: 20
    },
    paperStructure: {
      paperNumber: 1,
      topicWeightings: [
        { topic: 'Paper 1: Finance', percentage: 60 },
        { topic: 'Paper 1: Data Handling', percentage: 35 },
        { topic: 'Paper 1: Probability', percentage: 5 },
        { topic: 'Paper 2: Maps, Plans & Representations', percentage: 40 },
        { topic: 'Paper 2: Measurement', percentage: 55 },
        { topic: 'Paper 2: Probability', percentage: 5 }
      ],
      guidelines: [
        'Paper 1: 3 Hours, 150 Marks (Weighting 20 in SBA).',
        'Paper 2: 3 Hours, 150 Marks (Weighting 20 in SBA).',
        'Question 1 in each paper will assess only Level 1 thinking (20% ±5% of total marks).',
        'Question 2 to 5 will be integrated and assess a range of cognitive levels (Levels 2, 3, 4).'
      ]
    },
    instructions: [
      'This examination comprises Paper 1 and Paper 2, each 3 hours and 150 marks.',
      'Paper 1 and Paper 2 each contribute 20 marks to the final 100-mark SBA portfolio (Total 40%).',
      'All 5 questions in each paper must be answered.',
      'Non-programmable, non-graphical calculators permitted.'
    ],
    scenarioOrBrief: 'Full official IEB Grade 12 Preliminary Examination strictly adhering to Table 1, Table 2, and Table 3 of the 2025/2026 IEB Subject Assessment Guidelines. Full moderation dossier (Appendices A, B, C, D, E, F) required for regional moderation submission.',
    questions: [
      {
        id: 'P1-Q1',
        title: 'Paper 1 - Question 1: Level 1 Finance & Data Handling Integration (30 Marks)',
        description: 'Directly tests basic definitions, formula recall, and single-step arithmetic across personal banking, simple interest, mean/mode/median, and probability ratios.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 30,
        markingCriteriaSnippet: 'Strictly Level 1 questions (20% of 150 marks = 30 marks) as specified in IEB SAG Section C.'
      },
      {
        id: 'P1-Q2-5',
        title: 'Paper 1 - Questions 2 to 5: Integrated Finance & Data Handling (120 Marks)',
        description: 'Complex taxation, loan amortization, CPI inflation indices, regression trends, scatter plots, and Level 4 financial critiques.',
        cognitiveLevel: 'Level 3: Multi-step / Complex',
        marks: 120,
        markingCriteriaSnippet: 'Cognitive spread: 45 marks Level 2, 30 marks Level 3, 30 marks Level 4, 15 marks Level 1.'
      },
      {
        id: 'P2-Q1',
        title: 'Paper 2 - Question 1: Level 1 Maps & Measurement Integration (30 Marks)',
        description: 'Basic scale reading, perimeter/area recall, compass directions, and reading building plans.',
        cognitiveLevel: 'Level 1: Knowing',
        marks: 30,
        markingCriteriaSnippet: 'Strictly Level 1 questions (30 marks) as specified in IEB SAG Section C.'
      },
      {
        id: 'P2-Q2-5',
        title: 'Paper 2 - Questions 2 to 5: Integrated Maps, Plans & Measurement (120 Marks)',
        description: 'Complex floor plans, structural packaging design, volume/capacity conversions, travel itineraries, elevation analysis, and Level 4 real-world decision reflections.',
        cognitiveLevel: 'Level 4: Reasoning / Reflecting',
        marks: 120,
        markingCriteriaSnippet: 'Cognitive spread: 45 marks Level 2, 30 marks Level 3, 30 marks Level 4, 15 marks Level 1.'
      }
    ],
    markingRubricOrMemo: 'Comprehensive 150-mark Paper 1 and 150-mark Paper 2 standard IEB Memoranda with Method (M), Accuracy (A), Calculation (CA), and Reasoning (R) mark distributions.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: 14 Days Before Preliminary Examinations',
        leadTimeDays: 14,
        triggerDateStr: 'Term 3 Week 5',
        urgentAlert: true,
        message: 'Conduct thorough past-paper revision sessions using IEB 2021-2025 exemplars. Finalize printing of 150-mark Paper 1 and Paper 2 exam booklets.',
        checklist: [
          'Verify invigilation schedules for 3-hour examination sessions.',
          'Confirm that Question 1 on both papers complies with the 20% Level 1 IEB constraint.',
          'Verify student calculators have fresh batteries.'
        ],
        suggestedAIPrompt: 'Generate a 10-day intensive Prelim revision schedule for Grade 12 IEB Mathematical Literacy.'
      },
      {
        stage: '1_week_prior',
        title: 'Prompt: 7 Days Before Prelims (Moderation & Safe Storage)',
        leadTimeDays: 7,
        triggerDateStr: 'Term 3 Week 6',
        urgentAlert: true,
        message: 'HOD pre-moderation on Appendix A & B for Paper 1 and Paper 2. Prepare learner SBA files (Appendix C cover page, mark schedules Appendix F).',
        checklist: [
          'Sign off Appendix B for Paper 1 and Paper 2.',
          'Assemble master Teacher Portfolio folder (Cover, Appendices A, B, C, D, E, F).'
        ],
        suggestedAIPrompt: 'Compile the complete IEB Teacher Portfolio check sheet for Prelim Moderation.'
      },
      {
        stage: 'submission_marking',
        title: 'Prompt: Prelim Marking & Moderation Phase',
        leadTimeDays: 0,
        triggerDateStr: 'Term 3 Week 9',
        urgentAlert: true,
        message: 'Execute standardised marking applying concept marking rules. Select top 5, middle 5, and bottom 5 sample scripts for internal and regional moderation.',
        checklist: [
          'Capture raw marks on Appendix F Consolidated Mark Schedule.',
          'Check that SBA marks sum to exactly 100 (Tests 30, Alternate Tasks 30, Prelims 40).',
          'Have Principal sign Appendix E (Letter from Principal).'
        ],
        suggestedAIPrompt: 'Calculate the final SBA weighted score (100 marks) from raw test, task, and prelim scores.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix D', 'Appendix E', 'Appendix F', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate a diagnostic performance report template for Grade 12 Preliminary Examinations.'
    ]
  },
  {
    id: 'mlit12-t4-final',
    code: 'MLIT12-FINAL-EXAM',
    grade: 12,
    gradeClass: '12',
    subject: 'Mathematical Literacy',
    curriculumStandard: 'IEB SAG (Subject Assessment Guidelines 2025/2026)',
    term: 4,
    scheduledWeek: 4,
    targetDate: 'Term 4 • October/November 2026',
    title: 'IEB National Senior Certificate Final Examination (Total 400 Marks: Paper 1 [150] + Paper 2 [150] + SBA [100])',
    category: 'Final Examination',
    duration: 'Paper 1: 3 Hours (150 Marks) + Paper 2: 3 Hours (150 Marks)',
    totalMarks: 400,
    sbaWeightingPercentage: 25,
    sbaContributionMarks: 100,
    topicsCovered: ['Complete IEB Mathematical Literacy Curriculum across all 5 content areas'],
    cognitiveWeighting: {
      level1_knowing: 30,
      level2_routine: 30,
      level3_complex: 20,
      level4_reasoning: 20
    },
    paperStructure: {
      topicWeightings: [
        { topic: 'Paper 1: Finance (60%) + Data Handling (35%) + Probability (5%)', percentage: 50 },
        { topic: 'Paper 2: Maps & Plans (40%) + Measurement (55%) + Probability (5%)', percentage: 50 }
      ],
      guidelines: [
        'National Examination set externally by the Independent Examinations Board (IEB).',
        'Final mark computed out of 400: Paper 1 (150) + Paper 2 (150) + SBA Portfolio (100).'
      ]
    },
    instructions: [
      'External IEB Final National Senior Certificate Examination.',
      'Paper 1 (3 Hours, 150 Marks) and Paper 2 (3 Hours, 150 Marks).',
      'School-Based Assessment Portfolio (100 Marks) submitted to IEB and Umalusi for statistical moderation.'
    ],
    scenarioOrBrief: 'Culmination of the NSC Mathematical Literacy course. Includes full verification of all learner portfolios and master teacher files against Appendix D Moderation Tool.',
    questions: [],
    markingRubricOrMemo: 'External IEB National Marking Standard.',
    educatorPrompts: [
      {
        stage: '2_weeks_prior',
        title: 'Prompt: Final Portfolio Audit & Submission',
        leadTimeDays: 14,
        triggerDateStr: 'Term 4 Week 2',
        urgentAlert: true,
        message: 'Audit every learner portfolio: ensure Appendix C is the first page, all 2 Tests, 2 Alternate Tasks, and Prelim Papers are marked, and Appendix G AI declarations are signed.',
        checklist: [
          'Verify all Appendix C forms are signed by Teacher and Candidate.',
          'Verify Appendix E (Principal Letter) is dated and signed.',
          'Package sample files according to the IEB regional moderation list.'
        ],
        suggestedAIPrompt: 'Generate a final SBA file pre-submission compliance audit checklist for IEB moderation.'
      }
    ],
    iebAppendicesRequired: ['Appendix A', 'Appendix B', 'Appendix C', 'Appendix D', 'Appendix E', 'Appendix F', 'Appendix G'],
    aiAssistancePrompts: [
      'Generate final exam motivational study guides and exam-room checklist for Grade 12 students.'
    ]
  }
];
