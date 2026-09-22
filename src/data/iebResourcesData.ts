import { IEBResource } from '../types';

export const IEB_RESOURCES_DATA: IEBResource[] = [
  // ==========================================
  // GRADE 12 MATHEMATICAL LITERACY
  // ==========================================
  {
    id: 'ieb-ml-gr12-2024-p1',
    title: '2024 IEB Grade 12 November Examination — Paper 1',
    subject: 'Mathematical Literacy',
    grade: 12,
    year: 2024,
    session: 'November Final',
    paperType: 'Paper 1 (Basic Skills)',
    resourceType: 'Past Exam Paper',
    totalMarks: 150,
    timeAllocationMinutes: 180,
    capsTopicsCovered: [
      'Personal Income Tax (SARS Brackets & Rebates)',
      'Municipal Stepped Water & Electricity Tariffs',
      'Data Handling: Five-Number Summary & Box-and-Whisker',
      'Measurement & Conversions',
      'Simple & Compound Interest Loans',
    ],
    description: 'Official 2024 IEB National Senior Certificate examination focusing on basic skills, direct formulas, routine tariff extractions, and foundational statistical calculations with South African contexts.',
    keyHighlights: [
      'Contains 5 detailed contextual questions with complete annexures',
      'Emphasis on 2024/2025 SARS tax deduction thresholds and medical tax credits',
      'Clear cognitive distribution: 60% Level 1 & Level 2, 40% Level 3 & Level 4',
    ],
    examinerInsights: [
      {
        topic: 'Personal Income Tax & SARS Brackets',
        overallPerformance: 'Moderate',
        averageScorePercentage: 62,
        commonErrors: [
          'Learners forgot to deduct the Primary Rebate (R17,235) before calculating the final payable tax amount.',
          'Subtracting base threshold incorrectly when applying the percentage rate (e.g. 36% of amount above R512,800).',
          'Confusing monthly taxable income with annual taxable earnings without multiplying by 12.',
        ],
        examinerTips: [
          'Emphasize the standard 4-step SARS tax protocol: 1. Annualize Income -> 2. Locate Bracket -> 3. Calculate Marginal Tax -> 4. Subtract Rebates -> 5. Divide by 12 if monthly PAYE is asked.',
          'Provide frequent warm-up drills where learners only identify the applicable bracket and rebate category.',
        ],
        teachingRecommendations: [
          'Dedicate 10 minutes in each Finance lesson to practice stepped bracket subtraction.',
          'Always require learners to write the formula step explicitly before substituting values.',
        ],
      },
      {
        topic: 'Municipal Stepped Water Tariffs',
        overallPerformance: 'Poorly Answered / High Remediation Required',
        averageScorePercentage: 48,
        commonErrors: [
          'Calculating total consumption using only the final highest bracket rate rather than cumulative step-by-step summing.',
          'Omitting the 15% VAT calculation or adding VAT twice.',
        ],
        examinerTips: [
          'Use a visual ladder diagram to show how kilolitres fill each tier before spilling into higher tariff blocks.',
        ],
        teachingRecommendations: [
          'Train learners to construct a 3-column working table: Tier | Consumed Volume | Cost calculation.',
        ],
      },
    ],
    sampleQuestions: [
      {
        questionNumber: 'Question 1.1',
        context: 'Mrs. Dlamini earns a gross monthly salary of R38,500. She contributes 7.5% towards pension fund and has medical aid for herself and two dependents.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 8,
        subQuestions: [
          {
            number: '1.1.1',
            text: 'Calculate Mrs. Dlamini\'s annual gross income before any deductions.',
            marks: 2,
            answerGuide: 'R38,500 × 12 = R462,000',
            markBreakdown: '1M (Multiplication by 12) + 1A (Correct total)',
          },
          {
            number: '1.1.2',
            text: 'Determine her annual taxable income after deducting allowable pension contributions.',
            marks: 3,
            answerGuide: 'Pension = 7.5% × R462,000 = R34,650. Taxable Income = R462,000 - R34,650 = R427,350.',
            markBreakdown: '1M (Pension calculation) + 1M (Subtraction) + 1CA (Taxable income)',
            commonPitfall: 'Forgetting that pension contribution reduces gross taxable income.',
          },
          {
            number: '1.1.3',
            text: 'Using the provided SARS tax table (Bracket 3: R370,500 - R512,800 @ R77,362 + 31% above R370,500), compute her net annual income tax after applying the primary rebate of R17,235.',
            marks: 3,
            answerGuide: 'Tax before rebate = R77,362 + 0.31 × (R427,350 - R370,500) = R77,362 + R17,623.50 = R94,985.50. Net Tax = R94,985.50 - R17,235 = R77,750.50.',
            markBreakdown: '1M (Bracket subtraction & rate) + 1M (Subtracting primary rebate) + 1A (Final net tax)',
          },
        ],
      },
      {
        questionNumber: 'Question 2.3',
        context: 'A school tuckshop records weekly cold drink sales across 15 weeks. The recorded values are: 120, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 190, 210, 240, 310.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 7,
        subQuestions: [
          {
            number: '2.3.1',
            text: 'Determine the Five-Number Summary (Minimum, Q1, Median, Q3, Maximum) for this data set.',
            marks: 5,
            answerGuide: 'Minimum = 120; Q1 = 145; Median = 165; Q3 = 190; Maximum = 310.',
            markBreakdown: '1A Min/Max + 1A Median + 2A Quartiles + 1A Order verification',
          },
          {
            number: '2.3.2',
            text: 'Calculate the Interquartile Range (IQR) and identify if 310 is an outlier using 1.5 × IQR rule.',
            marks: 2,
            answerGuide: 'IQR = Q3 - Q1 = 190 - 145 = 45. Upper Boundary = Q3 + 1.5(45) = 190 + 67.5 = 257.5. Since 310 > 257.5, it is an outlier.',
            markBreakdown: '1M (IQR formula) + 1A (Comparison & justified conclusion)',
          },
        ],
      },
    ],
    memorandumSnippet: 'Full official IEB marking guidelines with Method (M), Accuracy (A), Continuous Accuracy (CA), and Justification (J) codes.',
  },

  {
    id: 'ieb-ml-gr12-2024-p2',
    title: '2024 IEB Grade 12 November Examination — Paper 2',
    subject: 'Mathematical Literacy',
    grade: 12,
    year: 2024,
    session: 'November Final',
    paperType: 'Paper 2 (Applications)',
    resourceType: 'Past Exam Paper',
    totalMarks: 150,
    timeAllocationMinutes: 180,
    capsTopicsCovered: [
      'Complex Floor Plans & Elevation Drawings',
      'Packaging & Surface Area Optimization (Cylinders & Prisms)',
      'Break-Even & Cost-Benefit Analysis',
      'Multi-Tier Strip Charts & Road Travel Navigation',
      'Normal Distribution & Probability Modeling',
    ],
    description: 'Comprehensive IEB Paper 2 assessment testing multi-stage problem solving, real-world spatial reasoning, cost optimization, and critique of real commercial contracts.',
    keyHighlights: [
      'Integrated real-world case studies: Solar energy installation cost analysis & warehouse pallet packing',
      'High proportion of IEB Level 3 (Multi-step) and Level 4 (Reasoning/Evaluation) questions',
      'Includes full color scale drawings, assembly instructions, and elevation diagrams',
    ],
    examinerInsights: [
      {
        topic: 'Packaging & Warehouse Space Optimization',
        overallPerformance: 'Poorly Answered / High Remediation Required',
        averageScorePercentage: 41,
        commonErrors: [
          'Dividing total container volume by single box volume instead of checking spatial dimensions (Length ÷ length, Width ÷ width, Height ÷ height).',
          'Rounding up instead of truncating (rounding down) when fitting discrete physical items into rigid spaces.',
        ],
        examinerTips: [
          'Constantly drill: "Boxes cannot be melted down into liquid volume!" Learners must calculate count per dimension: ⌊L/l⌋ × ⌊W/w⌋ × ⌊H/h⌋.',
        ],
        teachingRecommendations: [
          'Use 3D physical blocks or cardboard mockups in Grade 11 & 12 class demonstrations.',
        ],
      },
      {
        topic: 'Elevation Plans & Scale Conversions',
        overallPerformance: 'Moderate',
        averageScorePercentage: 55,
        commonErrors: [
          'Squaring the scale factor incorrectly when calculating actual floor area from scaled paper plans.',
          'Confusing bar scale measurements with numerical ratio scale (e.g. 1 : 50 vs 1 cm represents 2 m).',
        ],
        examinerTips: [
          'Remind learners to convert paper dimensions to REAL meters BEFORE multiplying to calculate area.',
        ],
        teachingRecommendations: [
          'Provide architectural floor plan worksheets with true ruler measurement tasks.',
        ],
      },
    ],
    sampleQuestions: [
      {
        questionNumber: 'Question 3.2',
        context: 'A fruit packaging warehouse ships cylindrical canned peaches of diameter 8 cm and height 12 cm inside standard rectangular cardboard boxes of dimensions 40 cm × 32 cm × 25 cm.',
        cognitiveLevel: 'Level 4: Problem Solving',
        marks: 8,
        subQuestions: [
          {
            number: '3.2.1',
            text: 'Calculate the maximum number of cans that can be packed upright into one cardboard box.',
            marks: 4,
            answerGuide: 'Length: 40 ÷ 8 = 5 cans. Width: 32 ÷ 8 = 4 cans. Height: 25 ÷ 12 = 2.08 -> 2 cans. Total = 5 × 4 × 2 = 40 cans.',
            markBreakdown: '1M (Length/Width fit) + 1M (Height truncation) + 1M (Product of dimensions) + 1A (40 cans)',
            commonPitfall: 'Using Volume_box / Volume_can = 32,000 / 603.18 = 53 cans (INCORRECT physics).',
          },
          {
            number: '3.2.2',
            text: 'Calculate the percentage of wasted airspace inside the packed box, correct to 1 decimal place.',
            marks: 4,
            answerGuide: 'Volume of 1 can = π × r² × h = π × 4² × 12 = 603.185 cm³. Volume of 40 cans = 24,127.43 cm³. Box Volume = 32,000 cm³. Wasted Volume = 32,000 - 24,127.43 = 7,872.57 cm³. % Waste = (7,872.57 ÷ 32,000) × 100 = 24.6%.',
            markBreakdown: '1M (Can volume) + 1M (Total cans volume) + 1M (Difference calculation) + 1CA (24.6%)',
          },
        ],
      },
    ],
    memorandumSnippet: 'Detailed step-by-step marking rubrics including alternative valid orientation methods for packaging questions.',
  },

  {
    id: 'ieb-ml-gr12-examiner-report-2024',
    title: '2024 IEB National Subject Assessment & Examiner Overview Report',
    subject: 'Mathematical Literacy',
    grade: 12,
    year: 2024,
    session: 'November Final',
    paperType: 'Theory & Design',
    resourceType: 'Examiner Report',
    totalMarks: 300,
    timeAllocationMinutes: 360,
    capsTopicsCovered: [
      'Comprehensive Subject Diagnostic Across All 5 CAPS Mathematical Literacy Strands',
      'Examiner Consensus on Candidate Readiness & Mark Distribution',
      'Remediation Strategies for Grade 10-12 Teachers',
    ],
    description: 'The definitive annual report published by the IEB Internal Moderator and Chief Examiner, detailing national statistics, candidate trends, common errors in Paper 1 and 2, and recommendations for 2025/2026 classroom practice.',
    keyHighlights: [
      'National average score distribution: Paper 1 (58.4%), Paper 2 (51.2%)',
      'Identifies the top 5 areas of systemic mark loss across independent schools',
      'Specific guidance for setting internal Grade 10 & 11 prelim and term assessments',
    ],
    examinerInsights: [
      {
        topic: 'Summary of Candidate Strengths',
        overallPerformance: 'Well Answered',
        averageScorePercentage: 74,
        commonErrors: [],
        examinerTips: [
          'Candidates showed outstanding proficiency in basic arithmetic, reading single-tier bar graphs, and direct currency conversion using published exchange rates.',
        ],
        teachingRecommendations: [
          'Continue solidifying foundational arithmetic in Grades 10 and 11.',
        ],
      },
      {
        topic: 'Summary of Candidate Weaknesses & Remediation Priorities',
        overallPerformance: 'Poorly Answered / High Remediation Required',
        averageScorePercentage: 44,
        commonErrors: [
          'Premature rounding off in multi-step calculation chains causing final mark loss.',
          'Inability to interpret scale drawings when north point orientation or elevation direction changes.',
          'Superficial responses in Level 4 evaluation questions (e.g. saying "it is cheaper" without quoting supporting numerical data).',
        ],
        examinerTips: [
          'Strict instruction: "Never round off intermediate numbers in memory; keep values stored in calculator or write 4 decimal places until the final answer".',
          'Level 4 questions always require: 1. A clear decision + 2. Quoted mathematical evidence + 3. Real-world context reason.',
        ],
        teachingRecommendations: [
          'Institute a "Justify with Calculations" policy in all class worksheets.',
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 11 MATHEMATICAL LITERACY
  // ==========================================
  {
    id: 'ieb-ml-gr11-2024-exemplar',
    title: '2024 IEB Grade 11 Exemplar & Final Examination Paper',
    subject: 'Mathematical Literacy',
    grade: 11,
    year: 2024,
    session: 'November Final',
    paperType: 'Paper 1 (Basic Skills)',
    resourceType: 'Exemplar Assessment',
    totalMarks: 100,
    timeAllocationMinutes: 120,
    capsTopicsCovered: [
      'Bank Statement Analysis & Account Fees',
      'Simple vs Compound Interest Growth Comparison',
      '2D Perimeter & 3D Volume of Prisms',
      'Strip Maps & Travel Time Pacing',
    ],
    description: 'Standardized IEB-aligned Grade 11 final examination evaluating banking fee structures, vehicle hire comparison, perimeter fencing, and road trip navigation timetables.',
    keyHighlights: [
      'Includes authentic FNB / Standard Bank fee schedule extracts',
      'Rigorous time-distance-speed travel scenario with rest stops',
      'Full cognitive weight distribution matching Grade 11 IEB SAGs document',
    ],
    examinerInsights: [
      {
        topic: 'Bank Fee Schedules & Account Options',
        overallPerformance: 'Moderate',
        averageScorePercentage: 58,
        commonErrors: [
          'Confusing percentage-based withdrawal fees with flat minimum transaction costs.',
          'Missing monthly account maintenance fees in total cost tallies.',
        ],
        examinerTips: [
          'Ensure learners calculate both: fixed base fee + (rate × withdrawal amount above base).',
        ],
        teachingRecommendations: [
          'Use real monthly bank statements for classroom discovery tasks.',
        ],
      },
    ],
    sampleQuestions: [
      {
        questionNumber: 'Question 2.1',
        context: 'A driver travels from Polokwane to Johannesburg along the N1 highway (distance 320 km). The vehicle leaves Polokwane at 08:15 and travels at an average speed of 105 km/h, taking a 25-minute refreshment stop at Kranskop Toll Plaza.',
        cognitiveLevel: 'Level 3: Complex',
        marks: 6,
        subQuestions: [
          {
            number: '2.1.1',
            text: 'Calculate the total driving time in hours and minutes, rounded to the nearest minute.',
            marks: 3,
            answerGuide: 'Driving time = Distance ÷ Speed = 320 km ÷ 105 km/h = 3.0476 hours. 0.0476 × 60 = 2.85 -> 3 minutes. Total driving time = 3 hours 3 minutes.',
            markBreakdown: '1M (Time formula) + 1M (Decimal to minutes conversion) + 1A (3h 03m)',
          },
          {
            number: '2.1.2',
            text: 'Determine the exact arrival time in Johannesburg.',
            marks: 3,
            answerGuide: 'Total elapsed time = 3h 03m + 25m stop = 3h 28m. Departure = 08:15. Arrival = 08:15 + 3h 28m = 11:43.',
            markBreakdown: '1M (Adding rest stop) + 1M (Adding to departure time) + 1CA (11:43)',
          },
        ],
      },
    ],
  },

  {
    id: 'ieb-ml-gr11-marking-guide',
    title: 'Grade 11 Mathematical Literacy Comprehensive Marking Guideline & Rubrics',
    subject: 'Mathematical Literacy',
    grade: 11,
    year: 2023,
    session: 'November Final',
    paperType: 'Paper 2 (Applications)',
    resourceType: 'Marking Guideline',
    totalMarks: 100,
    timeAllocationMinutes: 120,
    capsTopicsCovered: [
      'Loan Amortization Tables',
      'Hire Purchase Contracts & Real Interest Costs',
      'Assembly Instructions & Exploded View Drawings',
    ],
    description: 'Complete IEB marking guideline featuring detailed mark breakdowns for Method (M), Accuracy (A), Continuous Accuracy (CA), and Justified Conclusion (J).',
    keyHighlights: [
      'Demonstrates correct application of continuous accuracy when early arithmetic errors occur',
      'Clear criteria for awarding partial marks on multi-step financial models',
    ],
  },

  // ==========================================
  // GRADE 10 MATHEMATICAL LITERACY
  // ==========================================
  {
    id: 'ieb-ml-gr10-2024-final',
    title: '2024 IEB Grade 10 Final Examination & Diagnostic Paper',
    subject: 'Mathematical Literacy',
    grade: 10,
    year: 2024,
    session: 'November Final',
    paperType: 'Paper 1 (Basic Skills)',
    resourceType: 'Past Exam Paper',
    totalMarks: 75,
    timeAllocationMinutes: 90,
    capsTopicsCovered: [
      'Personal Budgeting & Till Slip Verification',
      'VAT Inclusions & Exclusions (15%)',
      'Metric Unit Conversions (mm, cm, m, km, ml, L, kg)',
      'Basic Probability (Dice, Coins, Weather forecasts)',
    ],
    description: 'Foundational Grade 10 final assessment testing income and expenditure balances, percentage discounts, till slip error detection, and everyday probability contexts.',
    keyHighlights: [
      'Ideal baseline diagnostic tool for identifying gaps before progressing to Grade 11',
      'Emphasis on calculator discipline and metric system conversions',
    ],
    examinerInsights: [
      {
        topic: 'VAT Inclusions & Exclusions',
        overallPerformance: 'Poorly Answered / High Remediation Required',
        averageScorePercentage: 49,
        commonErrors: [
          'Calculating VAT-exclusive price by multiplying by 0.85 instead of dividing by 1.15.',
          'Treating 15% discount and 15% VAT as offsetting each other directly.',
        ],
        examinerTips: [
          'Teach the fundamental distinction: Price with VAT = Price without VAT × 1.15. Therefore, Price without VAT = Price with VAT ÷ 1.15.',
        ],
        teachingRecommendations: [
          'Use real supermarket receipts to have learners calculate VAT forwards and backwards.',
        ],
      },
    ],
    sampleQuestions: [
      {
        questionNumber: 'Question 1.2',
        context: 'A grocery till slip displays a total price of R483.00 inclusive of 15% VAT for taxable items.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 4,
        subQuestions: [
          {
            number: '1.2.1',
            text: 'Calculate the VAT amount included in this total.',
            marks: 3,
            answerGuide: 'Price without VAT = R483.00 ÷ 1.15 = R420.00. VAT amount = R483.00 - R420.00 = R63.00 (or R483 × (15/115) = R63.00).',
            markBreakdown: '1M (Division by 1.15) + 1M (Subtraction) + 1A (R63.00)',
            commonPitfall: 'Calculating 15% of R483 = R72.45 (INCORRECT method for VAT inclusive price).',
          },
        ],
      },
    ],
  },

  // ==========================================
  // GRADE 9 TECHNOLOGY
  // ==========================================
  {
    id: 'ieb-tech-gr9-final-exam',
    title: 'Grade 9 Technology Final Examination & Design Theory Paper',
    subject: 'Technology',
    grade: 9,
    year: 2024,
    session: 'November Final',
    paperType: 'Theory & Design',
    resourceType: 'Past Exam Paper',
    totalMarks: 100,
    timeAllocationMinutes: 90,
    capsTopicsCovered: [
      'IDMEC Design Process (Investigate, Design, Make, Evaluate, Communicate)',
      'Mechanical Systems: Gear Trains, Velocity Ratios & Spur/Bevel/Worm Gears',
      'Hydraulic & Pneumatic Systems (Pascal\'s Principle & Mechanical Advantage)',
      'Electronic Components (Resistors, LEDs, LDRs, Transistors, Ohm\'s Law)',
      'First Angle Orthographic Projection & Isometric Drawings',
    ],
    description: 'Comprehensive Senior Phase Grade 9 Technology examination testing systems & control, design ergonomics, structural integrity, and graphic communication conventions.',
    keyHighlights: [
      'Authentic mechanical velocity ratio & gear calculation problems',
      'Hydraulic master/slave cylinder pressure transmission questions',
      'Complete IDMEC design brief rubric for formal assessment moderation',
    ],
    examinerInsights: [
      {
        topic: 'Gear Systems & Velocity Ratio Calculations',
        overallPerformance: 'Moderate',
        averageScorePercentage: 54,
        commonErrors: [
          'Inverting the Velocity Ratio formula (Number of teeth on Driven ÷ Driver vs Driver ÷ Driven).',
          'Failing to recognize that adding an idler gear changes direction of rotation but NOT speed ratio.',
        ],
        examinerTips: [
          'Gear Velocity Ratio (VR) = Teeth on Driven Gear ÷ Teeth on Driver Gear = T_out / T_in.',
          'Output Speed = Input Speed ÷ VR.',
        ],
        teachingRecommendations: [
          'Use physical LEGO Technic or gear simulator boards in Grade 9 classroom demonstrations.',
        ],
      },
      {
        topic: 'Hydraulics & Pascal\'s Principle',
        overallPerformance: 'Poorly Answered / High Remediation Required',
        averageScorePercentage: 42,
        commonErrors: [
          'Confusing Hydraulic (liquid/oil) with Pneumatic (compressed gas/air) properties (e.g. thinking water compresses).',
          'Misapplying Mechanical Advantage = Load Force ÷ Effort Force.',
        ],
        examinerTips: [
          'Liquid is virtually incompressible, resulting in direct, rigid force transmission with high pressure.',
        ],
        teachingRecommendations: [
          'Have learners build two-syringe hydraulic cranes to visualize cross-sectional area multipliers.',
        ],
      },
    ],
    sampleQuestions: [
      {
        questionNumber: 'Question 2.1',
        context: 'A winch mechanism uses a driver gear with 12 teeth connected to a driven gear with 48 teeth. The electric motor turns the driver gear at 1,200 RPM.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 6,
        subQuestions: [
          {
            number: '2.1.1',
            text: 'Calculate the Velocity Ratio (Gear Ratio) of this gear train.',
            marks: 3,
            answerGuide: 'Velocity Ratio = Teeth on Driven Gear ÷ Teeth on Driver Gear = 48 ÷ 12 = 4 : 1 (or 4).',
            markBreakdown: '1M (Formula) + 1M (Substitution 48/12) + 1A (4 : 1)',
          },
          {
            number: '2.1.2',
            text: 'Determine the rotational output speed of the driven gear in RPM.',
            marks: 3,
            answerGuide: 'Output Speed = Input Speed ÷ Velocity Ratio = 1,200 RPM ÷ 4 = 300 RPM.',
            markBreakdown: '1M (Formula) + 1M (Division by 4) + 1A (300 RPM)',
          },
        ],
      },
      {
        questionNumber: 'Question 3.1',
        context: 'A hydraulic car jack utilizes a master cylinder with a piston cross-sectional area of 5 cm² and a slave cylinder with an area of 50 cm².',
        cognitiveLevel: 'Level 3: Complex',
        marks: 5,
        subQuestions: [
          {
            number: '3.1.1',
            text: 'Calculate the Mechanical Advantage (MA) of this hydraulic system.',
            marks: 2,
            answerGuide: 'MA = Area of Output (Slave) ÷ Area of Input (Master) = 50 cm² ÷ 5 cm² = 10.',
            markBreakdown: '1M (Formula) + 1A (MA = 10)',
          },
          {
            number: '3.1.2',
            text: 'If an effort force of 150 N is applied to the master piston, calculate the maximum load force in Newtons the slave piston can lift.',
            marks: 3,
            answerGuide: 'Output Force = Input Force × MA = 150 N × 10 = 1,500 N.',
            markBreakdown: '1M (Formula) + 1M (Substitution) + 1A (1,500 N)',
          },
        ],
      },
    ],
  },

  {
    id: 'ieb-tech-gr9-pat-guide',
    title: 'Grade 9 Technology Practical Assessment Task (PAT) & IDMEC Portfolio Rubric',
    subject: 'Technology',
    grade: 9,
    year: 2024,
    session: 'November Final',
    paperType: 'Practical Assessment Task',
    resourceType: 'PAT & Practical Guide',
    totalMarks: 100,
    timeAllocationMinutes: 600,
    capsTopicsCovered: [
      'IDMEC Design Brief Formulation & Specifications',
      'Freehand 2D & 3D Idea Generation Sketches',
      'Working Drawings (First Angle Orthographic with Dimensions & Hidden Detail)',
      'Model Making, Safety Protocols & Material Selection',
      'Formal Peer Evaluation & Testing Rubrics',
    ],
    description: 'Complete teacher moderation guide and marking rubric for the Grade 9 Technology Mini-PAT: Designing and constructing a rescue crane or sorting mechanism.',
    keyHighlights: [
      'Standardized DBE/IEB 4-level rubric descriptor matrix',
      'Includes safety compliance checklist for school workshops',
      'Clear guidelines for assessing working models vs design portfolios',
    ],
  },

  // ==========================================
  // GRADE 8 TECHNOLOGY
  // ==========================================
  {
    id: 'ieb-tech-gr8-final-exam',
    title: 'Grade 8 Technology Final Examination & Structures Paper',
    subject: 'Technology',
    grade: 8,
    year: 2024,
    session: 'November Final',
    paperType: 'Theory & Design',
    resourceType: 'Past Exam Paper',
    totalMarks: 80,
    timeAllocationMinutes: 75,
    capsTopicsCovered: [
      'Structures: Frame vs Shell vs Solid Structures',
      'Forces Acting on Structures (Tension, Compression, Shear, Torsion, Bending)',
      'Structural Failure (Fracture, Bending, Toppling, Buckling)',
      'Class 1, 2, and 3 Levers & Mechanical Advantage',
      'First Angle Orthographic Projection Conventions',
    ],
    description: 'Foundational Grade 8 Technology exam assessing structural classification, internal forces, beam deflection, lever equilibrium calculations, and line styles.',
    keyHighlights: [
      'Real South African bridge and pylon engineering contexts',
      'High visual clarity line style matching and drawing questions',
      'Cognitively accessible for junior secondary learners',
    ],
    examinerInsights: [
      {
        topic: 'Forces on Structural Members',
        overallPerformance: 'Well Answered',
        averageScorePercentage: 68,
        commonErrors: [
          'Confusing Tension (pulling apart) with Compression (squashing together) on bridge king posts.',
          'Drawing hidden detail lines as solid lines rather than dashed lines (`- - -`).',
        ],
        examinerTips: [
          'Use memory anchors: Tension = "Taut / Tight rope"; Compression = "Compact / Crush".',
        ],
        teachingRecommendations: [
          'Have learners bend foam rulers to visualize compression on top and tension on bottom.',
        ],
      },
    ],
    sampleQuestions: [
      {
        questionNumber: 'Question 1.3',
        context: 'A wheelbarrow is used on a construction site. The load of 600 N is placed 40 cm from the front wheel axle, while the handles are 120 cm from the axle.',
        cognitiveLevel: 'Level 2: Routine',
        marks: 5,
        subQuestions: [
          {
            number: '1.3.1',
            text: 'Identify the class of lever represented by a wheelbarrow (Class 1, 2, or 3) and justify your answer.',
            marks: 2,
            answerGuide: 'Class 2 Lever. Justification: The Load is located between the Fulcrum (wheel axle) and the Effort (handles).',
            markBreakdown: '1A (Class 2) + 1A (Correct load placement justification)',
          },
          {
            number: '1.3.2',
            text: 'Calculate the minimum upward effort force required at the handles to lift the load in equilibrium.',
            marks: 3,
            answerGuide: 'Effort × Effort Distance = Load × Load Distance -> Effort × 120 cm = 600 N × 40 cm -> Effort = 24,000 ÷ 120 = 200 N.',
            markBreakdown: '1M (Principle of Moments formula) + 1M (Substitution) + 1A (200 N)',
          },
        ],
      },
    ],
  },
  {
    id: 'ieb-tech-gr8-examiner-report',
    title: 'Senior Phase Technology Examiner & Moderation Guidelines',
    subject: 'Technology',
    grade: 8,
    year: 2023,
    session: 'November Final',
    paperType: 'Theory & Design',
    resourceType: 'Examiner Report',
    totalMarks: 80,
    timeAllocationMinutes: 75,
    capsTopicsCovered: [
      'Orthographic & Isometric Drawing Conventions',
      'Structural Analysis & Triangulation Testing',
      'Teacher Moderation Best Practices',
    ],
    description: 'Moderation summary and diagnostic tips for Grade 8 Technology teachers detailing accurate drawing standards, dimensioning rules, and rubric scoring.',
    keyHighlights: [
      'Diagrammatic guide on correct dimension placement according to SABS drawing codes',
      'How to guide learners who struggle with spatial visualization from 3D to 2D projections',
    ],
  },
];
