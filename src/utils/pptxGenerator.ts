import pptxgen from 'pptxgenjs';
import { ATPItem, ClassInfo, SlideContent } from '../types';

export function generate45MinLessonSlides(
  classInfo: ClassInfo,
  atpItem: ATPItem,
  customTitle?: string
): SlideContent[] {
  const isTech = classInfo.subject === 'Technology';
  const isMathLit = classInfo.subject === 'Mathematical Literacy';

  const title = customTitle || atpItem.capsTopic;

  const slides: SlideContent[] = [
    // Slide 1: Title & CAPS Outcomes
    {
      slideNumber: 1,
      title: `${classInfo.name}: ${title}`,
      subtitle: `Term ${atpItem.term} | Week ${atpItem.week} • 45-Minute Lesson • CAPS & IEB Aligned`,
      timingMinutes: 5,
      phase: 'Hook / Baseline (0-5m)',
      learningModelStage: isTech ? 'IDMEC: Alignment & Brief' : 'Learning Model: Context & Outcomes',
      bulletPoints: [
        `Subject: ${classInfo.subject} (Grade ${classInfo.grade})`,
        `Teachers: ${classInfo.teachers.join(', ')}`,
        `Learning Model: ${isTech ? 'IDMEC Engineering Design Cycle' : '5-Stage Contextual Modeling & GRR Cycle'}`,
        `CAPS Reference: ${atpItem.capsPageNo || 'Curriculum Assessment Policy Statement'}`,
        `Lesson Goal: Master ${atpItem.coreConcepts[0] || 'core ATP concepts'} and apply in IEB-style problem contexts.`,
        `Required Equipment: Scientific Calculator / Drawing Instruments / Note Workbook.`,
      ],
      speakerNotes: `Welcome the class promptly. Direct learners to write down the date, Term ${atpItem.term} Week ${atpItem.week}, and today's lesson title. Ensure all learners have necessary writing and calculating/drawing equipment on their desks.`,
    },

    // Slide 2: Prior Knowledge & 5-Minute Hook
    {
      slideNumber: 2,
      title: 'Prior Knowledge & Warm-Up Hook (00:00 - 05:00)',
      timingMinutes: 5,
      phase: 'Hook / Baseline (0-5m)',
      learningModelStage: isTech ? 'IDMEC: Investigate (Context & Need)' : 'Model Stage 1: Real-World Context & Provocation',
      bulletPoints: [
        `Requisite Knowledge: ${atpItem.requisitePreKnowledge}`,
        'Quick Diagnostic Think-Pair-Share: Reflect on the real-world connection to this topic.',
        isTech
          ? 'Identify where this mechanism or structural force appears in everyday South African engineering (e.g. mining hoists, bridges, pylons, cranes).'
          : 'Analyze how this financial tariff, tax bracket, or packaging problem affects South African households and businesses.',
        'Target: Activate core prerequisite terminology before introducing new concepts.',
      ],
      keyFormulaOrConcept: isTech
        ? 'Key Concept: Form Follows Function | Mechanical Advantage = Load ÷ Effort'
        : 'Key Rule: Real-world Context First | Check Units & Rounding Conventions',
      speakerNotes: `Spend exactly 5 minutes here. Cold-call 2 learners to recall prerequisite knowledge: "${atpItem.requisitePreKnowledge}". Highlight the real-world context immediately to establish relevance.`,
    },

    // Slide 3: Core Teaching - Concept Breakdown
    {
      slideNumber: 3,
      title: `Core Concept Breakdown (05:00 - 20:00)`,
      subtitle: 'CAPS Theoretical & Technical Foundations',
      timingMinutes: 15,
      phase: 'Concept Teaching (5-20m)',
      learningModelStage: isTech ? 'IDMEC: Design & Theory ("I Do")' : 'Model Stage 2: Mathematical Formulation ("I Do")',
      bulletPoints: atpItem.coreConcepts.slice(0, 4).map(c => `• ${c}`),
      diagramOrVisualDescription: isTech
        ? 'Schematic visual: First Angle Orthographic Projection / Mechanical Gear Train / Structural Truss diagram showing forces (Tension, Compression, Shear).'
        : 'Visual layout: Stepped tariff rate table / SARS progressive tax bracket / Floor plan with dimension markers / Box & Whisker plot.',
      keyFormulaOrConcept: atpItem.coreConcepts[0] || 'Core CAPS Concept Definition',
      speakerNotes: `Direct instruction phase (15 mins). Walk through each bullet point on the board. Emphasize standard technical terminology required by DBE and IEB assessment guidelines. Ensure learners note the definitions and formulas in their workbooks.`,
    },

    // Slide 4: Worked Example - IEB Past Exam Style
    {
      slideNumber: 4,
      title: `Worked Example: IEB Exam Style (20:00 - 30:00)`,
      subtitle: 'Cognitive Levels 1 to 3 Step-by-Step Modeling',
      timingMinutes: 10,
      phase: 'Worked Examples (20-30m)',
      learningModelStage: isTech ? 'IDMEC: Make & Formulate ("We Do")' : 'Model Stage 3: Procedural Mastery ("We Do")',
      bulletPoints: [
        `Scenario Context: An authentic examination scenario based on South African socio-economic / engineering reality.`,
        isTech
          ? `• Part A (Level 1): State the purpose of the structural member or mechanism. [2 marks]\n• Part B (Level 2): Calculate the velocity ratio or mechanical advantage using given dimensions. [4 marks]\n• Part C (Level 3): Explain why introducing an idler gear or cross-bracing resolves the mechanical problem. [4 marks]`
          : `• Part A (Level 1 - Knowing): Extract the baseline tariff or tax bracket threshold from the table. [2 marks]\n• Part B (Level 2 - Routine): Compute the total cost or monthly tax deduction for given consumption/income. [5 marks]\n• Part C (Level 3 - Complex): Determine the percentage savings or break-even volume between two competitive options. [5 marks]`,
      ],
      iebExamTip: 'IEB Examiner Tip: Always show full method calculations (M marks). Never jump straight to the final answer without units and conversion steps.',
      speakerNotes: `Model the solution clearly on the board. Point out typical learner pitfalls in IEB past papers (e.g. failing to convert units, forgetting VAT, incorrect line styles in orthographic drawings).`,
    },

    // Slide 5: Guided Learner Activity & Independent Practice
    {
      slideNumber: 5,
      title: `Learner Activity: Exam Practice (30:00 - 40:00)`,
      subtitle: 'Classroom Worksheet & Group Problem Solving',
      timingMinutes: 10,
      phase: 'IEB Exam Activity (30-40m)',
      learningModelStage: isTech ? 'IDMEC: Evaluate & Test ("You Do")' : 'Model Stage 4: Contextual Interpretation ("You Do")',
      bulletPoints: [
        'Complete Worksheet Task 1 to Task 3 independently or in designated pairs.',
        `Resources in use: ${atpItem.resources.join(', ')}.`,
        'Level 2 & 3 Challenge: Show all working steps, unit conversions, and algebraic substitutions.',
        'Level 4 IEB Extension (High Order): Critique the outcome, suggest an optimization, or justify a design constraint.',
        'Teacher circulation: Formative checks on accuracy, drawing conventions, and calculator proficiency.',
      ],
      speakerNotes: `Learners engage in active practice (10 mins). Circulate around the classroom, targeting struggling learners with scaffolding anchor charts, and prompting advanced learners with the Level 4 extension challenge.`,
    },

    // Slide 6: Summary, Plenary & Exit Ticket
    {
      slideNumber: 6,
      title: 'Plenary & 5-Minute Exit Ticket (40:00 - 45:00)',
      timingMinutes: 5,
      phase: 'Wrap-up & Exit Ticket (40-45m)',
      learningModelStage: isTech ? 'IDMEC: Communicate & Reflect' : 'Model Stage 5: Critical Reflection (Level 4)',
      bulletPoints: [
        `Key Takeaway: Mastered ${atpItem.capsTopic} in accordance with CAPS pacing.`,
        'Exit Ticket Diagnostic (Answer in 2 minutes):',
        isTech
          ? '1. Name the force acting on the top cord of a loaded beam.\n2. State the formula for Gear Velocity Ratio.\n3. What is the line convention for hidden detail?'
          : '1. State the current South African standard VAT rate.\n2. How do you find the Inter-quartile Range (IQR)?\n3. What is the difference between a number scale and a bar scale?',
        `Homework / Preparation: ${atpItem.informalAssessment || 'Complete assigned workbook exercises.'}`,
      ],
      speakerNotes: `Collect exit ticket responses on mini whiteboards or slips of paper as learners leave. Use these results to pace tomorrow's lesson and target immediate interventions.`,
    },
  ];

  return slides;
}

export async function exportLessonToPPTX(
  classInfo: ClassInfo,
  atpItem: ATPItem,
  slidesData?: SlideContent[]
) {
  const slides = slidesData || generate45MinLessonSlides(classInfo, atpItem);
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'The AI Teaching Assistant (Mr. Mpofu)';
  pptx.company = 'CAPS & IEB Multi-Grade Teaching Assistant';
  pptx.title = `${classInfo.name} - ${atpItem.capsTopic}`;

  // Theme colors
  const primaryColor = '0F172A'; // Slate 900
  const secondaryColor = '0284C7'; // Sky 600
  const accentColor = '059669'; // Emerald 600
  const lightBg = 'F8FAFC'; // Slate 50
  const cardBg = 'FFFFFF';
  const mutedText = '475569';

  slides.forEach((slideContent, index) => {
    const slide = pptx.addSlide();
    slide.background = { color: index === 0 ? primaryColor : lightBg };

    if (index === 0) {
      // Title Slide
      slide.addText(slideContent.title, {
        x: 0.8,
        y: 1.2,
        w: 11.5,
        h: 1.5,
        fontSize: 28,
        bold: true,
        color: 'FFFFFF',
        fontFace: 'Arial',
        align: 'left',
      });

      slide.addText(slideContent.subtitle || '', {
        x: 0.8,
        y: 2.8,
        w: 11.5,
        h: 0.8,
        fontSize: 16,
        color: '38BDF8',
        fontFace: 'Arial',
      });

      // Info card on title slide
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8,
        y: 3.8,
        w: 11.5,
        h: 2.8,
        fill: { color: '1E293B' },
        line: { color: '334155', width: 1 },
      });

      const bullets = slideContent.bulletPoints.map(b => ({
        text: `${b}\n`,
        options: { fontSize: 13, color: 'E2E8F0', bullet: true, fontFace: 'Arial' },
      }));

      slide.addText(bullets, {
        x: 1.2,
        y: 4.1,
        w: 10.7,
        h: 2.2,
        fontFace: 'Arial',
      });
    } else {
      // Standard Slide Header
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y: 0.4,
        w: 12.3,
        h: 1.1,
        fill: { color: cardBg },
        line: { color: 'E2E8F0', width: 1 },
      });

      slide.addText(slideContent.title, {
        x: 0.8,
        y: 0.5,
        w: 8.5,
        h: 0.5,
        fontSize: 19,
        bold: true,
        color: primaryColor,
        fontFace: 'Arial',
      });

      if (slideContent.subtitle) {
        slide.addText(slideContent.subtitle, {
          x: 0.8,
          y: 0.95,
          w: 8.5,
          h: 0.4,
          fontSize: 12,
          color: secondaryColor,
          fontFace: 'Arial',
        });
      }

      // Timing badge & Learning Model Stage badge
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 9.6,
        y: 0.45,
        w: 2.9,
        h: 0.45,
        fill: { color: 'EEF2FF' },
        line: { color: 'C7D2FE', width: 1 },
      });

      slide.addText(`⏱ ${slideContent.phase}`, {
        x: 9.7,
        y: 0.48,
        w: 2.7,
        h: 0.38,
        fontSize: 9,
        bold: true,
        color: '4338CA',
        align: 'center',
        fontFace: 'Arial',
      });

      if (slideContent.learningModelStage) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 9.6,
          y: 0.95,
          w: 2.9,
          h: 0.48,
          fill: { color: 'E6EFEA' },
          line: { color: 'B8D8CD', width: 1 },
        });

        slide.addText(`🎯 ${slideContent.learningModelStage}`, {
          x: 9.65,
          y: 0.98,
          w: 2.8,
          h: 0.42,
          fontSize: 8.5,
          bold: true,
          color: '1D453D',
          align: 'center',
          fontFace: 'Arial',
        });
      }

      // Main Content Box
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y: 1.7,
        w: 8.2,
        h: 5.2,
        fill: { color: cardBg },
        line: { color: 'E2E8F0', width: 1 },
      });

      const bulletItems = slideContent.bulletPoints.map(b => ({
        text: `${b}\n\n`,
        options: { fontSize: 13, color: '1E293B', bullet: true, fontFace: 'Arial' },
      }));

      slide.addText(bulletItems, {
        x: 0.8,
        y: 1.9,
        w: 7.6,
        h: 4.8,
        fontFace: 'Arial',
      });

      // Right Side Panel: Key Formula / Exam Tip / Visual Info
      slide.addShape(pptx.ShapeType.rect, {
        x: 8.9,
        y: 1.7,
        w: 3.9,
        h: 5.2,
        fill: { color: 'F8FAFC' },
        line: { color: 'CBD5E1', width: 1 },
      });

      let rightY = 1.9;

      if (slideContent.keyFormulaOrConcept) {
        slide.addText('🔑 KEY PRINCIPLE', {
          x: 9.1,
          y: rightY,
          w: 3.5,
          h: 0.3,
          fontSize: 10,
          bold: true,
          color: accentColor,
          fontFace: 'Arial',
        });
        rightY += 0.35;

        slide.addText(slideContent.keyFormulaOrConcept, {
          x: 9.1,
          y: rightY,
          w: 3.5,
          h: 1.2,
          fontSize: 11,
          color: '0F172A',
          bold: true,
          fontFace: 'Arial',
        });
        rightY += 1.3;
      }

      if (slideContent.iebExamTip) {
        slide.addText('🎯 IEB EXAM FOCUS', {
          x: 9.1,
          y: rightY,
          w: 3.5,
          h: 0.3,
          fontSize: 10,
          bold: true,
          color: 'B45309',
          fontFace: 'Arial',
        });
        rightY += 0.35;

        slide.addText(slideContent.iebExamTip, {
          x: 9.1,
          y: rightY,
          w: 3.5,
          h: 1.4,
          fontSize: 11,
          color: '78350F',
          fontFace: 'Arial',
        });
        rightY += 1.5;
      }

      if (slideContent.diagramOrVisualDescription) {
        slide.addText('📐 VISUAL & DIAGRAM', {
          x: 9.1,
          y: rightY,
          w: 3.5,
          h: 0.3,
          fontSize: 10,
          bold: true,
          color: '2563EB',
          fontFace: 'Arial',
        });
        rightY += 0.35;

        slide.addText(slideContent.diagramOrVisualDescription, {
          x: 9.1,
          y: rightY,
          w: 3.5,
          h: 1.4,
          fontSize: 10,
          color: mutedText,
          fontFace: 'Arial',
        });
      }

      // Footer
      slide.addText(
        `The AI Teaching Assistant • ${classInfo.name} • Term ${atpItem.term} W${atpItem.week} • 45m Lesson Pacing • Slide ${slideContent.slideNumber}`,
        {
          x: 0.5,
          y: 7.05,
          w: 12.3,
          h: 0.3,
          fontSize: 9,
          color: '94A3B8',
          align: 'center',
          fontFace: 'Arial',
        }
      );
    }

    // Add Speaker Notes
    if (slideContent.speakerNotes) {
      slide.addNotes(slideContent.speakerNotes);
    }
  });

  const fileName = `${classInfo.id}_T${atpItem.term}_W${atpItem.week}_${atpItem.capsTopic.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}_45min_Slides.pptx`;
  await pptx.writeFile({ fileName });
  return fileName;
}
