import { AIPromptTemplate } from '../types';

export const AI_PROMPT_TEMPLATES: AIPromptTemplate[] = [
  // Technology Grade 8 & 9 Prompts
  {
    id: 'prompt-tech-8-lesson',
    category: 'Lesson Planning',
    title: 'Grade 8 Technology: 45-Minute IDMEC Lesson Planner',
    targetSubject: 'Technology',
    targetGrade: '8A',
    description: 'Generates a CAPS-aligned 45-minute lesson with 5m hook, 20m concept breakdown, 15m design sketch/analysis, and 5m exit ticket.',
    tags: ['Grade 8', 'Technology', 'IDMEC', 'Structures', 'Mechanisms'],
    promptText: `Act as an expert South African CAPS Technology teacher. Design a comprehensive 45-minute lesson plan for Grade 8 [Topic Name] (Term [Term], Week [Week]).

Incorporate:
1. Prior Knowledge Hook (5 min): Link to Grade 7 baseline or previous mechanism principles.
2. Direct Instruction & Concept Breakdown (20 min): Detail core concepts (e.g. Mechanical Advantage, Triangulation, Cam/Crank motion, Forces) with precise technical terminology and drawing conventions.
3. Guided Learner Activity (15 min): Hands-on design analysis, isometric sketching on 30° grid, or gear ratio calculations.
4. Formative Assessment & Exit Ticket (5 min): 3 targeted diagnostic questions.
5. CAPS Resources & Safety: Reference DBE Sasol Inzalo workbook pages and safe workshop practice.`
  },
  {
    id: 'prompt-tech-9-pat',
    category: 'PAT & Practical Guidance',
    title: 'Grade 9 Technology: PAT & Systems Engineering Rubric',
    targetSubject: 'Technology',
    targetGrade: '9A',
    description: 'Generates stage-by-stage guidance for PAT 1 & PAT 2 (Investigate, Design, Make, Evaluate, Communicate) with IEB-style criteria.',
    tags: ['Grade 9', 'PAT', 'Pneumatics', 'Hydraulics', 'Electronics'],
    promptText: `Act as a Senior Technology Moderator for DBE/IEB schools. Create a structured PAT guidance and assessment rubric for Grade 9 [PAT Topic: e.g., Hydraulic Crane / Electronic Alarm System] for 70 Marks total:

- Phase 1: Investigate (15 Marks) - Scenario problem analysis, fitness-for-purpose, materials suitability, and costing.
- Phase 2: Design (20 Marks) - Design Brief with specifications & constraints, 2 initial idea sketches, 1st angle orthographic working drawings with dimensions, and construction flow chart.
- Phase 3: Make (35 Marks) - Safe workshop execution, scale modeling, material joining, and functional verification.
- Phase 4: Evaluate & Communicate - Objective testing against design brief, budgeting, and 5-minute tender pitch presentation.`
  },
  {
    id: 'prompt-mathlit-12-ieb-tax',
    category: 'IEB Exam Style Question',
    title: 'Grade 12 Maths Literacy: IEB Tax & Tariff Exam Question Generator',
    targetSubject: 'Mathematical Literacy',
    targetGrade: '12',
    description: 'Creates authentic 4-tier cognitive level questions (Knowing, Routine, Complex, Problem Solving) modelled on recent IEB Matric past papers.',
    tags: ['Grade 12', 'Maths Lit', 'IEB Past Papers', 'Income Tax', 'Tariffs'],
    promptText: `Act as an IEB (Independent Examinations Board) Senior Examiner for Mathematical Literacy Paper 1. Generate an authentic 25-mark examination question set based on [Topic: e.g. 2024 SARS Personal Income Tax & Stepped Electricity Tariffs].

Structure strictly according to IEB Cognitive Levels:
- Question 1.1 (Level 1: Knowing - 20%): Define taxable income, state primary rebate, or extract direct value from tax bracket table. [4 Marks]
- Question 1.2 (Level 2: Routine Procedures - 35%): Calculate annual taxable income after allowable pension deduction and determine base tax. [8 Marks]
- Question 1.3 (Level 3: Multi-step Complex Procedures - 25%): Calculate net annual tax payable after applying age-based rebates and medical tax credits (MTC), then compute monthly net take-home pay. [8 Marks]
- Question 1.4 (Level 4: Reasoning & Reflection - 20%): Critique the financial impact of moving into a higher tax bracket vs tariff increase, advising the taxpayer on budget mitigation with full mathematical justification. [5 Marks]

Provide a complete step-by-step marking guideline with method marks (M), accuracy marks (A), and continuous accuracy (CA).`
  },
  {
    id: 'prompt-mathlit-11-breakeven',
    category: 'Lesson Planning',
    title: 'Grade 11 Maths Literacy: Break-Even & Packaging Mastery',
    targetSubject: 'Mathematical Literacy',
    targetGrade: '11',
    description: 'Paces a 45-minute lesson comparing algebraic formulas vs graph intersection for Break-even analysis with packaging constraints.',
    tags: ['Grade 11', 'Break-even', 'Packaging', 'Dual Line Graphs'],
    promptText: `Act as a seasoned Mathematical Literacy educator. Design a 45-minute lesson for Grade 11 on Break-Even Analysis (Term 3 Week 3).

Ensure the lesson includes:
1. Real-world Context Hook (5 min): Small bakery or school tuckshop scenario with fixed overheads (rent, equipment) and variable ingredients cost.
2. Dual Representation Teaching (20 min):
   - Table generation: Income = Selling Price × Units vs Total Cost = Fixed Cost + (Unit Cost × Units).
   - Algebraic calculation: Units = Fixed Cost ÷ (Selling Price - Unit Variable Cost).
   - Graphical interpretation: Identifying Break-Even Point (BEP), Profit zone, and Loss zone.
3. IEB-style Learner Practice (15 min): Calculate profit at given volume and find required units for target profit.
4. Exit Check (5 min): Rapid diagnostic check on interpreting graph intersections.`
  },
  {
    id: 'prompt-mathlit-10-scale',
    category: 'Worksheet Generation',
    title: 'Grade 10 Maths Literacy: Maps, Scale & Seating Plans Worksheet',
    targetSubject: 'Mathematical Literacy',
    targetGrade: '10',
    description: 'Generates a classroom-ready 20-mark worksheet with number scales (1:500), bar scales, and stadium/cinema seating grids.',
    tags: ['Grade 10', 'Scale', 'Maps', 'Seating Plans'],
    promptText: `Create a 20-mark printable CAPS & IEB aligned worksheet for Grade 10 Mathematical Literacy on Scale and Floor Plans.

Include:
- Real-world scenario: Community hall layout plan drawn at scale 1:250.
- Level 1: State what 1:250 means in words and measure given line in cm. [4 Marks]
- Level 2: Convert measured length (4.8 cm) to actual distance in meters. [5 Marks]
- Level 3: Calculate the actual floor area in m² and estimate tile requirements including 10% wastage. [7 Marks]
- Level 4: Evaluate seating capacity constraints and suggest optimized chair rows. [4 Marks]
- Full step-by-step memorandum with mark breakdown.`
  },
  {
    id: 'prompt-differentiated-scaffolding',
    category: 'Remediation & Scaffolding',
    title: 'Multi-Grade Differentiated Support & Extension Pack',
    targetSubject: 'All',
    targetGrade: 'All',
    description: 'Creates tiered scaffolding prompts for struggling learners and challenging extension tasks for gifted learners across any ATP topic.',
    tags: ['Differentiated Learning', 'Scaffolding', 'Inclusion', 'All Grades'],
    promptText: `For the given subject [Technology / Maths Literacy] and Grade [8, 9, 10, 11, 12] topic [Insert Topic]:
1. Remediation Tier: Step-by-step visual scaffolding, formula breakdown with filled-in anchor charts, and guided sentence starters for struggling learners.
2. Core Tier: Standard CAPS/ATP pacing tasks with moderate problem solving.
3. Extension Tier: High-order IEB Level 4 thinking challenge, open-ended optimization question, or engineering constraint simulation for advanced learners.`
  },
  {
    id: 'prompt-trademark-learning-models',
    category: 'Pedagogical Frameworks',
    title: "Mr. Mpofu's Trademark Learning Model: 5-Stage Contextual Modeling & GRR Cycle",
    targetSubject: 'Mathematical Literacy',
    targetGrade: '11',
    description: 'Structures an inquiry-based lesson explicitly through Context Provocation, Mathematical Formulation (I Do), Procedural Mastery (We Do), Contextual Interpretation (You Do), and Critical Reflection (Level 4).',
    tags: ['Trademark Learning Model', 'MathLit', 'Contextual Modeling', 'GRR', 'Pedagogy'],
    promptText: `Act as Mr. Mpofu's senior pedagogical mentor. Structure a lesson on [Topic, e.g., Progressive Income Tax / Municipal Tariffs / Inflation] explicitly using our trademark 5-Stage Contextual Modeling & GRR Cycle:

1. Stage 1: Real-World Context & Provocation (5 mins)
- Authentic SA scenario hook (e.g. SARS tax brackets, Eskom electricity bills).
- Socratic question stem to challenge learner assumptions.

2. Stage 2: Mathematical Formulation ("I Do", 15 mins)
- Translate authentic real-world noise into clear variables and formula relationships.
- Teacher modeling of common pitfalls and units.

3. Stage 3: Procedural Mastery ("We Do", 15 mins)
- Guided co-calculation on board with choral cold-calling and mini whiteboards.

4. Stage 4: Contextual Interpretation ("You Do", 15 mins)
- Independent problem solving where answers must be re-translated into authentic English advice for the consumer/business.

5. Stage 5: Critical Reflection & Plenary (Level 4, 10 mins)
- High-order critique: What assumptions fail? Who does this policy disadvantage?`
  },
  {
    id: 'prompt-double-period-pedagogy',
    category: 'Pedagogical Frameworks',
    title: 'Double Period 90-Minute Lab & Simulation Workshop Planner',
    targetSubject: 'All',
    targetGrade: 'All',
    description: 'Paces Thursday double periods (Grade 11 & 12) and Friday double periods (Grade 10) into an engaging 2x45m theory-to-simulation block.',
    tags: ['Double Period', '90-Minute Block', 'Lab Workshop', 'Thursdays Gr 11/12', 'Fridays Gr 10'],
    promptText: `Act as Mr. Mpofu. Design a cohesive 90-minute double period workshop for Grade [10 / 11 / 12] [Subject] on [Topic]:

Block 1 (First 45 Minutes): Direct Modeling & Conceptual Rigor
- 00-10m: Retrieval warm-up & diagnostic challenge.
- 10-30m: Teacher modeling ("I Do") of complex multi-tier scenario with IEB exam nuances.
- 30-45m: Collaborative paired challenge ("We Do") with immediate whiteboard feedback.

Block 2 (Second 45 Minutes): Hands-On Simulation & Exam Sprints
- 45-65m: Independent authentic case study analysis ("You Do") with graded difficulty (Levels 1 to 4).
- 65-80m: Real-time peer moderation using official marking guideline rubrics.
- 80-90m: Formative plenary, exit ticket diagnostic, and synthesis reflection.`
  },
];
