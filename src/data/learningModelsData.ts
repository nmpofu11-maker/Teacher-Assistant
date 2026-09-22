import { LearningModel } from '../types';

export const LEARNING_MODELS: LearningModel[] = [
  {
    id: 'idmec-tech',
    title: 'IDMEC Design Loop Model',
    tagline: 'The official CAPS & Engineering Design pedagogy for Senior Phase Technology',
    subject: 'Technology',
    targetGrades: 'Grades 8A, 8B, 9A, 9B',
    philosophy: 'Technology education is not merely tool usage; it is structured human problem-solving. Through iterative design loops, learners move from identifying authentic human needs to technical fabrication, rigorous testing, and graphic communication.',
    diagramTitle: 'The 5-Stage IDMEC Iterative Design Cycle',
    stages: [
      {
        id: 'stage-i',
        name: 'Investigate',
        code: 'I',
        order: 1,
        shortDesc: 'Identify the problem, research existing mechanisms, analyze constraints and user needs.',
        didacticGoal: 'Develop analytical and research capabilities. Ensure learners understand the real-world South African context before attempting solutions.',
        teacherAction: 'Presents an authentic scenario (e.g. rural footbridge failure, mine hoist mechanism, load-shedding security gate). Guides research questions and constraint audits.',
        learnerAction: 'Interviews hypothetical users, audits material constraints (cost, availability, safety), and analyzes existing commercial or vernacular solutions.',
        cognitiveLevel: 'CAPS Cognitive Level: Knowing & Analytical Research',
        keyQuestionStems: [
          'What is the fundamental human or structural problem we need to solve?',
          'What are the non-negotiable constraints (budget, dimensions, load capacity, environmental factors)?',
          'How have existing mechanical or electrical systems addressed this challenge?'
        ],
        classroomExample: 'Grade 8 Structures: Investigating why cellular network towers or mine headgears use triangular cross-bracing instead of square frames.',
        commonMisconception: 'Learners often rush directly into building or drawing without understanding structural forces (tension, compression, torsion) or material limits.',
        iebCapsStrategy: 'Require learners to produce a 3-bullet "Need Statement" and a 5-point "Design Specifications List" in their workbooks.'
      },
      {
        id: 'stage-d',
        name: 'Design',
        code: 'D',
        order: 2,
        shortDesc: 'Formulate design brief, generate multiple conceptual sketches, choose and justify optimal design.',
        didacticGoal: 'Foster creativity, divergent thinking, and objective multi-criteria decision making under constraints.',
        teacherAction: 'Models rapid freehand sketching, teaches design brief formulation ("I will design and make a... that must..."), and facilitates rubric-based concept selection.',
        learnerAction: 'Draws at least two distinctly different 2D/3D conceptual solutions with annotations, labels forces/materials, and scores them on a decision matrix.',
        cognitiveLevel: 'CAPS Cognitive Level: Creative Synthesis & Evaluation',
        keyQuestionStems: [
          'Does this design brief explicitly state what, who, where, and why?',
          'Which design best balances mechanical advantage against ease of assembly and cost?',
          'How does the choice of levers, gears, or linkages affect velocity ratio and torque?'
        ],
        classroomExample: 'Grade 9 Mechanical Systems: Sketching two alternative gear trains (spur gears with idler vs bevel gears at 90°) for a crane winch.',
        commonMisconception: 'Drawing only one concept and assuming it is final, or drawing artistic pictures rather than functional engineering sketches with dimensions.',
        iebCapsStrategy: 'Insist on 2 annotated idea sketches followed by a formal 4-line Design Brief using the standard DBE format.'
      },
      {
        id: 'stage-m',
        name: 'Make',
        code: 'M',
        order: 3,
        shortDesc: 'Produce working drawings (scale, orthographic/isometric), plan materials and tool safety, build working prototype.',
        didacticGoal: 'Develop technical drafting literacy, dimensional precision, workshop safety, and craftsmanship.',
        teacherAction: 'Demonstrates First Angle Orthographic projection conventions (hidden detail, center lines, dimensions), enforces workshop tool safety, and models material processing.',
        learnerAction: 'Drafts formal 1st angle orthographic drawings to scale, lists cutting lists and required tools, and fabricates the structural or mechanical artefact.',
        cognitiveLevel: 'CAPS Cognitive Level: Practical Execution & Drafting Conventions',
        keyQuestionStems: [
          'Are your drawing line conventions compliant with SANS 10111 (outlines A-type, dimension lines B-type)?',
          'What is your step-by-step manufacturing sequence to minimize material waste?',
          'What personal protective equipment (PPE) and tool safety protocols apply here?'
        ],
        classroomExample: 'Grade 8 Orthographic: Producing 3-view projections (Front, Top, Left) of an L-shaped wooden bracket to a 1:1 scale.',
        commonMisconception: 'Swapping Top and Left views in 1st Angle Orthographic projection, or dimensioning inside the drawing rather than outside dimension lines.',
        iebCapsStrategy: 'Use 10-minute drafting calibration check: verify that front view aligns horizontally with left view, and vertically with top view.'
      },
      {
        id: 'stage-e',
        name: 'Evaluate',
        code: 'E',
        order: 4,
        shortDesc: 'Test the prototype against the initial design brief specifications, identify failure modes, critique fitness-for-purpose.',
        didacticGoal: 'Cultivate critical objective reasoning, empirical testing methodologies, and willingness to learn from failure.',
        teacherAction: 'Facilitates structured testing apparatus (e.g. spring balances, graduated load weights, circuit multimeters) and moderates fair test conditions.',
        learnerAction: 'Applies increasing load to structure/mechanism, records quantitative metrics (maximum load, deflection, current draw, speed), and documents failures.',
        cognitiveLevel: 'CAPS Cognitive Level: High-Order Analysis & Empirical Critique',
        keyQuestionStems: [
          'Did the prototype satisfy every constraint outlined in the initial Design Specifications table?',
          'Where was the exact failure point (shear at joint, buckling of compression strut, gear tooth slipping)?',
          'How would you re-engineer this component to improve safety factor while maintaining budget?'
        ],
        classroomExample: 'Grade 9 Structures: Testing a bridge truss with weights to compute the strength-to-weight ratio (Load Carried ÷ Mass of Bridge).',
        commonMisconception: 'Treating structural failure as a personal mistake rather than essential diagnostic engineering feedback for iteration.',
        iebCapsStrategy: 'Enforce a structured 3-column evaluation table: [Specification] vs [Actual Performance] vs [Recommended Engineering Modification].'
      },
      {
        id: 'stage-c',
        name: 'Communicate',
        code: 'C',
        order: 5,
        shortDesc: 'Present the design folio, explain trade-offs, document project lifecycle, and deliver peer critique.',
        didacticGoal: 'Master technical communication, oral presentation, graphic layout, and professional engineering ethics.',
        teacherAction: 'Provides presentation rubrics, assesses folio completeness according to CAPS PAT requirements, and chairs peer review sessions.',
        learnerAction: 'Compiles project portfolio (brief, sketches, orthographic drawings, test data, photos), presents to class or panel, and answers technical questions.',
        cognitiveLevel: 'CAPS Cognitive Level: Metacognitive Synthesis & Public Defense',
        keyQuestionStems: [
          'How can you clearly articulate the engineering trade-offs made between strength, weight, and cost?',
          'Is your folio logically indexed and legible for external DBE/IEB moderation?',
          'What ethical and environmental impact does your design have regarding recycling and lifecycle?'
        ],
        classroomExample: 'Grade 8 & 9 Folio Presentation: Presenting the complete Design Folio with Title page, Index, IDMEC evidence, and self-assessment rubric.',
        commonMisconception: 'Submitting loose, unlabelled drawing sheets without formal headings, scale indicators, or reflective summaries.',
        iebCapsStrategy: 'Use a structured 5-mark presentation checklist: Clarity of Brief (1), Quality of Graphic Projections (2), Test Data Analysis (1), Folio Organization (1).'
      }
    ],
    classroomImpact: [
      'Transforms Technology lessons from rote theory into authentic engineering inquiry.',
      'Ensures continuous alignment with DBE CAPS PAT (Practical Assessment Task) requirements.',
      'Prevents learners from jumping into fabrication without technical drawings or safety planning.',
      'Empowers learners with clear, predictable milestone rubrics for every term project.'
    ],
    evaluationCriteria: [
      'Evidence of all 5 IDMEC phases in student workbooks.',
      'Strict adherence to SANS drawing line types and 1st Angle Orthographic conventions.',
      'Empirical test data recorded during the Evaluate stage.',
      'Reflective communication documenting design modifications.'
    ]
  },
  {
    id: 'context-mathlit',
    title: 'Contextual Modeling & GRR Cycle',
    tagline: 'The premier CAPS & IEB Mathematical Literacy problem-solving and instructional model',
    subject: 'Mathematical Literacy',
    targetGrades: 'Grades 10, 11, 12',
    philosophy: 'Mathematical Literacy is not abstract mathematics; it is math applied to life. Every lesson and assessment begins in an authentic socio-economic context, translates that context into mathematical models, executes accurate procedures, and critically interprets the result back into reality to empower informed decision making.',
    diagramTitle: 'The 5-Step Context-to-Abstraction-to-Reflection Cycle',
    stages: [
      {
        id: 'ml-context',
        name: 'Real-World Context & Provocation',
        code: 'Context',
        order: 1,
        shortDesc: 'Ground the lesson in an authentic South African context (tariffs, tax tables, payslips, floor plans).',
        didacticGoal: 'Activate prior personal experience, eliminate math anxiety, and establish the urgent relevance of the quantitative dilemma.',
        teacherAction: 'Presents a genuine document or scenario: a municipal water bill with stepped sliding tariffs, a SARS PAYE tax bracket table, a 20-year vehicle finance quote, or an architectural site plan.',
        learnerAction: 'Analyzes the raw source document, identifies everyday terminology (e.g. VAT inclusive, basic charge, surcharge, interest rate p.a.), and poses questions.',
        cognitiveLevel: 'CAPS Level 1: Contextual Knowing & Document Literacy',
        keyQuestionStems: [
          'What real-life problem or cost is this document trying to communicate?',
          'Who is the decision-maker in this scenario, and what are their financial or spatial constraints?',
          'What units and rate structures are being used (e.g. R/kL, c/kWh, m² vs mm)?'
        ],
        classroomExample: 'Grade 11 Finance: Examining an actual municipal water account showing progressive step-tariffs (0-6kL free, 7-15kL @ R24.50/kL, 16-30kL @ R38.90/kL).',
        commonMisconception: 'Learners assume tariffs are calculated with a single flat rate across total consumption, ignoring progressive block tiers.',
        iebCapsStrategy: 'Always provide authentic unsimplified documents with fine print, headers, and dates to build genuine IEB exam stamina.'
      },
      {
        id: 'ml-formulate',
        name: 'Mathematical Formulation ("I Do")',
        code: 'Model',
        order: 2,
        shortDesc: 'Translate the real-world situation into mathematical relationships, formulas, variables, and units.',
        didacticGoal: 'Bridge the gap between language and mathematics. Teach learners how to extract variables and construct equations.',
        teacherAction: 'Explicitly models ("I Do") how to dissect the scenario: highlights key numbers, sets up conversion chains, writes down general formulas, and states assumptions.',
        learnerAction: 'Extracts given parameters into a structured "Given / To Find" table, verifies unit compatibility, and selects appropriate formulas.',
        cognitiveLevel: 'CAPS Level 2: Routine Formulation & Algebraic Setup',
        keyQuestionStems: [
          'Which numbers are fixed constants (e.g. basic monthly charge, VAT 15%) versus variable inputs (consumption, kilometers)?',
          'Do any units need conversion before calculation (e.g. centimeters to meters, kiloliters to liters, annual interest to monthly rate)?',
          'What general formula represents this relationship: linear tariff $y = mx + c$, or exponential growth $A = P(1+i)^n$?'
        ],
        classroomExample: 'Grade 12 Finance: Translating an annual salary of R420,000 into taxable income, identifying the correct SARS tax bracket, and setting up the formula with primary rebate.',
        commonMisconception: 'Plugging numbers directly into a calculator without writing down the general formula or converting annual rates to monthly compounding.',
        iebCapsStrategy: 'IEB marking allocates Method Marks (M) specifically for writing down the correct formula and correct substitution before the answer.'
      },
      {
        id: 'ml-compute',
        name: 'Procedural Execution & Guided Mastery ("We Do")',
        code: 'Compute',
        order: 3,
        shortDesc: 'Execute multi-step arithmetic, calculator syntax, algebra, or graphing with collaborative scaffolding.',
        didacticGoal: 'Build procedural fluency, calculator confidence, tabular organization, and accuracy under exam constraints.',
        teacherAction: 'Leads guided practice ("We Do"). Solves side-by-side on the board, highlights calculator keys (e.g. brackets, exponential powers, fractions), and circulates for targeted intervention.',
        learnerAction: 'Calculates collaboratively in pairs, checks intermediate sub-totals, avoids premature rounding of decimals, and checks arithmetic with peers.',
        cognitiveLevel: 'CAPS Level 2 & 3: Routine to Multi-Step Computational Mastery',
        keyQuestionStems: [
          'Are we keeping at least 4 decimal places during intermediate steps to prevent rounding errors in the final Rand value?',
          'Does the calculator display match the written brackets and order of operations (BODMAS)?',
          'How do we structure this multi-tier tariff calculation in a clear breakdown table to secure all method marks?'
        ],
        classroomExample: 'Grade 10 Measurement: Calculating the total surface area and volume of a cylindrical water tank, converting m³ into liters ($1\\text{ m}^3 = 1,000\\text{ L}$).',
        commonMisconception: 'Rounding off intermediate currency or interest figures to 2 decimal places too early, producing an incorrect final cent balance.',
        iebCapsStrategy: 'Enforce the CAPS rounding rule: only round the FINAL answer to 2 decimal places (or as specified in context, e.g. whole cans of paint).'
      },
      {
        id: 'ml-interpret',
        name: 'Contextual Interpretation ("You Do")',
        code: 'Interpret',
        order: 4,
        shortDesc: 'Translate mathematical answers back into real-world meaning and contextual constraints.',
        didacticGoal: 'Ensure mathematics never ends as an abstract number. Foster critical sense-making and practical relevance.',
        teacherAction: 'Poses probing questions: "What does this number actually mean for this person? Can you buy 3.2 cans of paint?"',
        learnerAction: 'Completes independent practice ("You Do"). Interprets numerical answers: rounds up paint cans to the next whole integer, explains budget surpluses or deficits.',
        cognitiveLevel: 'CAPS Level 3: Context-Specific Interpretation & Constraint Checking',
        keyQuestionStems: [
          'What does this final number signify in the original real-world story?',
          'Does contextual reality require rounding UP (e.g. buying tiles/paint, hiring buses) even if the decimal is below .5?',
          'Is this monthly repayment realistic considering the applicant’s net disposable income?'
        ],
        classroomExample: 'Grade 11 Measurement: The calculation yields 4.15 tins of varnish required. Contextual interpretation: The homeowner MUST purchase 5 full tins, costing $5 \\times \\text{R185.00}$.',
        commonMisconception: 'Applying mathematical rounding rules blindly (rounding 4.15 down to 4 tins), leaving the project incomplete in the real world.',
        iebCapsStrategy: 'IEB exam questions frequently include a 1-mark sub-question: "State why 4.15 cannot be the final answer in this practical context."'
      },
      {
        id: 'ml-reflect',
        name: 'Critical Reasoning & Evaluation (Level 4)',
        code: 'Critique',
        order: 5,
        shortDesc: 'Evaluate financial viability, critique deceptive statistics/graphs, provide justified ethical advice.',
        didacticGoal: 'Empower learners to become critical, vigilant citizens who cannot be deceived by marketing claims, predatory credit, or misleading data.',
        teacherAction: 'Acts as a critical challenger. Introduces conflicting options (e.g. Hire Purchase vs Bank Loan, Prepaid vs Postpaid electricity) and demands justified reasoning.',
        learnerAction: 'Compares alternatives quantitatively, writes structured comparative paragraphs, and justifies recommendations using mathematical evidence.',
        cognitiveLevel: 'CAPS Level 4: Reasoning, Reflection & Critique (10-15% of IEB Paper)',
        keyQuestionStems: [
          'Which option is financially superior in the long run, taking into account total interest, insurance, and hidden fees?',
          'How does this broken vertical axis on the bar graph distort the public’s perception of company profits?',
          'What ethical advice would you give to a family facing this debt-to-income ratio?'
        ],
        classroomExample: 'Grade 12 Finance & Data: Comparing a Hire Purchase agreement (15% deposit, 24% interest, insurance) against an unsecured bank loan over 3 years, calculating total cost of credit.',
        commonMisconception: 'Giving vague general opinions ("Option A is better because I like it") without referencing specific Rand differences or percentage statistics.',
        iebCapsStrategy: 'Level 4 rubric requires two components: (1) Valid mathematical calculation comparison, and (2) Contextual justification referencing the calculated numbers.'
      }
    ],
    classroomImpact: [
      'Eliminates the common complaint "Why are we learning this? When will I ever use this?"',
      'Directly trains learners on the exact 4-Level cognitive weighting of DBE and IEB Matric examinations.',
      'Prevents careless rounding and translation errors in real-world scenario questions.',
      'Develops financially literate, critical young adults capable of navigating tax, banking, and contracts.'
    ],
    evaluationCriteria: [
      'Every lesson plan features an authentic South African context document.',
      'Explicit progression from "I Do" modeling through to "You Do" contextual interpretation.',
      'Consistent inclusion of CAPS Cognitive Level 4 reasoning questions in weekly worksheets.',
      'Scoring rubrics award separate marks for formula, substitution, calculation, and contextual comment.'
    ]
  },
  {
    id: 'grr-pacing',
    title: 'Gradual Release of Responsibility (GRR)',
    tagline: 'The universal 4-stage instructional pacing model ("I Do, We Do, You Do")',
    subject: 'All',
    targetGrades: 'All Classes (8A to 12)',
    philosophy: 'Effective learning requires intentional scaffolding: from direct teacher modeling with thinking made visible, through guided collaborative mastery, to independent application with diagnostic feedback.',
    diagramTitle: 'The GRR Instructional Ladder',
    stages: [
      {
        id: 'grr-1',
        name: 'Focused Instruction ("I Do")',
        code: 'I Do',
        order: 1,
        shortDesc: 'Teacher demonstrates the concept, models thinking aloud, and outlines criteria for success.',
        didacticGoal: 'Establish clarity, prevent initial misconceptions, and make cognitive problem-solving visible.',
        teacherAction: 'Models on board / projector, thinks aloud ("Notice how I convert cm to m here before squaring"), writes clean step-by-step exemplars.',
        learnerAction: 'Actively listens, takes structured notes, tracks teacher’s decision-making steps, and identifies core rules.',
        cognitiveLevel: 'Foundation: Cognitive Modeling',
        keyQuestionStems: [
          'What is the first question I ask myself when I encounter this problem?',
          'Why did I choose this formula or drawing projection over another?',
          'What common trap am I deliberately avoiding here?'
        ],
        classroomExample: 'Teacher models how to calculate VAT-exclusive price from a VAT-inclusive receipt by dividing by 1.15 rather than subtracting 15%.',
        commonMisconception: 'Learners assume they can subtract 15% from the inclusive total, resulting in an erroneous base figure.',
        iebCapsStrategy: 'Keep "I Do" tightly contained (10-15 minutes) to avoid passive learner cognitive overload.'
      },
      {
        id: 'grr-2',
        name: 'Guided Instruction ("We Do")',
        code: 'We Do',
        order: 2,
        shortDesc: 'Teacher and learners work through problems together; teacher prompts and scaffolds.',
        didacticGoal: 'Provide immediate formative feedback, build confidence, and co-construct problem solutions.',
        teacherAction: 'Poses guiding prompts, calls on multiple learners to provide intermediate steps, and writes class-generated solutions on board.',
        learnerAction: 'Suggests next steps, catches peers’ errors constructively, tries steps on mini-whiteboards or rough pads.',
        cognitiveLevel: 'Scaffolding: Guided Collaborative Synthesis',
        keyQuestionStems: [
          'What is our next logical move in this calculation or drawing?',
          'Who can spot the unit discrepancy before we compute?',
          'How can we confirm that this intermediate answer is reasonable?'
        ],
        classroomExample: 'Solving a compound gear train together: Learner A determines driver teeth, Learner B calculates velocity ratio, Learner C determines rotation direction.',
        commonMisconception: 'Letting 1-2 confident students answer while the rest of the class passively observes.',
        iebCapsStrategy: 'Use cold-calling and mini-whiteboard checks to verify 100% engagement across the room.'
      },
      {
        id: 'grr-3',
        name: 'Collaborative Practice ("You Do Together")',
        code: 'Peer',
        order: 3,
        shortDesc: 'Learners work in structured pairs or small groups on differentiated tasks with peer accountability.',
        didacticGoal: 'Deepen understanding through verbalization, peer teaching, and social cognitive articulation.',
        teacherAction: 'Circulates actively, observes peer dialogues, diagnoses stubborn misconceptions, and offers micro-interventions.',
        learnerAction: 'Solves exam-style questions in pairs, compares alternative methods, explains reasoning to partner, and agrees on final working.',
        cognitiveLevel: 'Consolidation: Peer Articulation & Error Analysis',
        keyQuestionStems: [
          'Can you explain your method to your partner so they understand every step?',
          'Do your answers match? If not, trace back where your calculations diverged.',
          'Which IEB marking criteria did you use to evaluate your partner’s work?'
        ],
        classroomExample: 'Pair challenge: One learner calculates cost under Municipal Tariff A, the other calculates under Tariff B, and together they determine the break-even consumption point.',
        commonMisconception: 'One partner doing all the work while the other copies answers without cognitive engagement.',
        iebCapsStrategy: 'Assign complementary roles (e.g. Calculator Operator & Method Auditor) that swap on alternate questions.'
      },
      {
        id: 'grr-4',
        name: 'Independent Mastery & Exit Ticket ("You Do Alone")',
        code: 'You Do',
        order: 4,
        shortDesc: 'Individual problem solving to verify independent mastery and inform tomorrow’s lesson pacing.',
        didacticGoal: 'Measure individual learner competence objectively and gather diagnostic data for differentiated follow-up.',
        teacherAction: 'Administers quick 3-question diagnostic exit ticket or independent worksheet section under silence.',
        learnerAction: 'Completes tasks individually without peer assistance, showing all working and submitting before leaving.',
        cognitiveLevel: 'Mastery: Independent Diagnostic Assessment',
        keyQuestionStems: [
          'Can I solve this problem independently without teacher or peer prompting?',
          'Have I showed all method steps required for full IEB/CAPS credit?',
          'Which specific step do I still feel uncertain about?'
        ],
        classroomExample: 'Independent 5-minute exit ticket: 1 Level 1 question, 1 Level 2 question, and 1 Level 3 question on today’s ATP topic.',
        commonMisconception: 'Skipping the exit ticket due to poor time management, losing valuable diagnostic data for the next day.',
        iebCapsStrategy: 'Collect and rapidly sort exit tickets into 3 piles: (1) Full Mastery, (2) Minor Calculation Error, (3) Conceptual Misunderstanding.'
      }
    ],
    classroomImpact: [
      'Provides a disciplined, reliable rhythm for 45-minute single and 90-minute double periods.',
      'Prevents teacher exhaustion from lecturing the entire 45 minutes.',
      'Shifts cognitive heavy-lifting to learners through systematic, scaffolded transfer.',
      'Generates daily diagnostic data before formal assessments occur.'
    ],
    evaluationCriteria: [
      'Pacing distribution adheres to the 5m-15m-15m-10m lesson allocation.',
      'Visible evidence of teacher modeling before independent learner practice.',
      'High rate of learner on-task engagement during collaborative and independent phases.',
      'Daily diagnostic feedback loops collected via exit tickets.'
    ]
  },
  {
    id: 'caps-cognitive',
    title: 'CAPS & IEB 4-Level Cognitive Depth Taxonomy',
    tagline: 'The official examination cognitive framework for Mathematical Literacy & Technology',
    subject: 'All',
    targetGrades: 'Grades 8 to 12',
    philosophy: 'Assessment and instruction must deliberately balance lower-order knowledge retrieval with higher-order critical problem-solving and evaluation. Teaching only Level 1 and 2 produces learners who fail IEB Paper 2 examinations.',
    diagramTitle: 'The 4-Tier Cognitive Balance Pyramid',
    stages: [
      {
        id: 'cog-1',
        name: 'Level 1: Knowing (30% Weighting)',
        code: 'L1',
        order: 1,
        shortDesc: 'Direct recall of facts, extraction of stated values, standard definitions, and vocabulary.',
        didacticGoal: 'Ensure bedrock terminology, formula recognition, and direct document reading are automatic.',
        teacherAction: 'Checks definitions, asks direct recall questions, ensures learners can locate values in tables and keys.',
        learnerAction: 'Quotes definitions, identifies symbols, extracts numbers from keys/tables without mathematical manipulation.',
        cognitiveLevel: 'Lower Order: Knowledge & Retrieval',
        keyQuestionStems: [
          'State the definition of...',
          'Identify the value corresponding to... from the given table.',
          'Name the tool, projection line, or financial term.'
        ],
        classroomExample: 'State the VAT percentage currently applicable in South Africa (15%).',
        commonMisconception: 'Spending too much instructional time on Level 1 to the detriment of analytical levels.',
        iebCapsStrategy: 'Caps at 30% of total examination paper marks.'
      },
      {
        id: 'cog-2',
        name: 'Level 2: Routine Procedures (35-40% Weighting)',
        code: 'L2',
        order: 2,
        shortDesc: 'Applying well-known procedures, single-step formulas, and direct calculations in familiar contexts.',
        didacticGoal: 'Develop fluent mechanical execution, formula substitution, and standard conversions.',
        teacherAction: 'Drills standard procedures, provides worked formulas, demonstrates conversion multipliers.',
        learnerAction: 'Applies formulas directly, executes arithmetic, performs single-step unit conversions.',
        cognitiveLevel: 'Routine Application: Procedural Fluency',
        keyQuestionStems: [
          'Calculate the total cost if...',
          'Convert 450 cm into meters.',
          'Substitute the given values into the simple interest formula.'
        ],
        classroomExample: 'Calculate the simple interest earned on R5,000 invested at 8% p.a. for 3 years ($I = P \\times r \\times t$).',
        commonMisconception: 'Learners memorize formulas without understanding what the variables represent.',
        iebCapsStrategy: 'Represents the largest single chunk of examination marks (35-40%).'
      },
      {
        id: 'cog-3',
        name: 'Level 3: Multi-Step Procedures in Complex Contexts (20% Weighting)',
        code: 'L3',
        order: 3,
        shortDesc: 'Multi-stage problem solving, decision chains, non-routine contexts, and multi-tier rate structures.',
        didacticGoal: 'Build resilience, strategic problem decomposition, and multi-variable synthesis.',
        teacherAction: 'Coaches learners to break complex tasks into sub-problems, tracks multiple constraints simultaneously.',
        learnerAction: 'Synthesizes information from multiple tables/graphs, solves sequential equations, manages step-tariffs.',
        cognitiveLevel: 'Higher Order: Complex Multi-Step Analysis',
        keyQuestionStems: [
          'Determine the total municipal bill including basic charge, 3 stepped tariff blocks, and 15% VAT.',
          'Calculate the total quantity of tiles required allowing 10% for cutting waste and box packaging constraints.',
          'Analyze the compound gear train velocity ratio across 4 meshed gears.'
        ],
        classroomExample: 'Calculating SARS annual PAYE tax: Gross Income → Minus allowable deductions → Apply tax bracket rate → Subtract Primary & Age Rebates → Divide by 12 for monthly PAYE.',
        commonMisconception: 'Giving up when the problem has more than 2 steps, or losing track of intermediate sub-totals.',
        iebCapsStrategy: 'Requires learners to carry forward method marks even if a minor arithmetic slip occurred earlier.'
      },
      {
        id: 'cog-4',
        name: 'Level 4: Reasoning and Reflecting (10-15% Weighting)',
        code: 'L4',
        order: 4,
        shortDesc: 'Evaluating alternatives, justifying decisions, critiquing data/graphs, and giving evidence-based advice.',
        didacticGoal: 'Cultivate critical thinking, citizenship, ethical evaluation, and sophisticated communication.',
        teacherAction: 'Facilitates debate, challenges claims, requires mathematical proof for all statements.',
        learnerAction: 'Writes comparative justification paragraphs, identifies misleading graphic scales, recommends optimal solutions with quantitative evidence.',
        cognitiveLevel: 'Highest Order: Evaluation, Critique & Justified Reasoning',
        keyQuestionStems: [
          'Advise the homeowner which bank loan option to choose, justifying with reference to total repayment and interest.',
          'Critique the company’s claim that profits have tripled, pointing out how the graph scale distorts reality.',
          'Evaluate the structural design modification to determine if it meets safety factor guidelines.'
        ],
        classroomExample: 'Critiquing a car dealership advert: "Drive away for only R1,999/month!" Uncovering the 40% balloon payment and calculating the actual total cost of credit.',
        commonMisconception: 'Giving purely emotional or non-mathematical answers without quoting calculated values.',
        iebCapsStrategy: 'Mandatory in IEB Paper 1 & Paper 2; differentiates Level 6 and Level 7 (A-grade) candidates.'
      }
    ],
    classroomImpact: [
      'Ensures classroom quizzes and tests mirror the exact cognitive ratios of official IEB and CAPS matric exams.',
      'Prevents grade inflation from overly simplistic tests.',
      'Prepares students systematically for challenging high-order Paper 2 scenarios.',
      'Provides actionable diagnostic profiling of student strengths and growth areas.'
    ],
    evaluationCriteria: [
      'Every test or worksheet includes cognitive level tagging on every sub-question.',
      'Mark allocation conforms to the 30% / 35-40% / 20% / 10-15% distribution.',
      'Assessment rubrics clearly define Level 4 reasoning criteria.',
      'Learners are taught how to recognize cognitive levels during exam preparation.'
    ]
  }
];

export function getLearningModelForClass(classId: string): LearningModel {
  if (classId === '8A' || classId === '8B' || classId === '9A' || classId === '9B') {
    return LEARNING_MODELS.find(m => m.id === 'idmec-tech') || LEARNING_MODELS[0];
  }
  return LEARNING_MODELS.find(m => m.id === 'context-mathlit') || LEARNING_MODELS[1];
}
