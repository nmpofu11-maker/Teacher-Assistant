import { PreModerationForm, PostModerationForm, AssessmentTask, ModerationStageStatus } from '../types';

export const OFFICIAL_MODERATION_TIMELINES = {
  PRE_MODERATION: {
    title: 'Pre-Administration Moderation Window',
    standardRule: 'Must be completed 14 to 21 calendar days prior to test/task administration (Strict deadline: Minimum 7 days prior to printing).',
    leadWeeks: 2,
    purpose: 'Quality assurance of paper standard, CAPS/IEB SAG curriculum coverage, Bloom’s cognitive weighting, clear mark scheme, language accessibility, and AI integrity disclosure.'
  },
  POST_MODERATION: {
    title: 'Post-Administration Moderation Window',
    standardRule: 'Must be conducted within 3 to 7 working days following educator marking completion (prior to mark capture into SA-SAMS / IEB portal).',
    lagWeeks: 1,
    purpose: '10% sample script audit (top, middle, bottom) verifying mark consistency, arithmetic accuracy, quality of corrective learner feedback, and Appendix G AI audits.'
  }
};

export function generateDefaultPreModerationForm(task: AssessmentTask): PreModerationForm {
  const isIEB = task.curriculumStandard.includes('IEB');
  return {
    taskId: task.id,
    status: 'APPROVED',
    moderatorName: 'Dr. E. van der Merwe (HOD)',
    moderatorRole: 'HOD',
    saceNumber: 'SACE-8849201',
    moderationDate: '2026-02-14',
    officialAcceptableWindow: `14–21 Days Prior to Task Date (Term ${task.term}, Week ${Math.max(1, task.scheduledWeek - 2)} Deadline)`,
    daysRemainingOrAgo: 12,
    stageStatus: 'DUE_NOW',
    checks: {
      technicalLayout: {
        passed: true,
        comment: `Heading clearly states ${task.subject} Gr ${task.grade}, Total: ${task.totalMarks} marks, Time: ${task.duration}. Formatting and mark allocations per sub-question are unambiguous.`
      },
      curriculumAlignment: {
        passed: true,
        comment: `Content strictly adheres to CAPS / IEB SAG guidelines for Term ${task.term}. Covers prescribed topics: ${task.topicsCovered.slice(0, 3).join(', ')}.`
      },
      cognitiveDistribution: {
        passed: true,
        comment: `Bloom's Taxonomy weights match standard: L1 (${task.cognitiveWeighting.level1_knowing}%), L2 (${task.cognitiveWeighting.level2_routine}%), L3 (${task.cognitiveWeighting.level3_complex}%), L4 (${task.cognitiveWeighting.level4_reasoning}%).`
      },
      markingMemoClarity: {
        passed: true,
        comment: 'Complete answers, step-by-step mark allocations (Method/Accuracy/Consistent Accuracy marks), and alternative methods are provided.'
      },
      languageAndFairness: {
        passed: true,
        comment: 'Language is accessible, appropriate for grade level. Stimulus diagrams and real-world scenarios are free of cultural or socio-economic bias.'
      },
      aiAcademicIntegrity: {
        passed: isIEB,
        comment: isIEB 
          ? 'Appendix G Learner AI Declaration Form is attached and integrated into candidate instructions.'
          : 'Originality declaration and plagiarism guidelines included in student brief.'
      }
    },
    overallComments: `Task ${task.code} meets all quality benchmarks. Approved for duplication and administration.`,
    recommendations: [
      'Ensure high-contrast printing for charts and technical drawings.',
      'Remind learners to show all step-by-step calculation workings for full CA marks.'
    ],
    signatureVerified: true,
    signedAt: '2026-02-14 11:30'
  };
}

export function generateDefaultPostModerationForm(task: AssessmentTask): PostModerationForm {
  return {
    taskId: task.id,
    status: 'MODERATION_APPROVED',
    moderatorName: 'Dr. E. van der Merwe (HOD)',
    moderatorRole: 'HOD',
    saceNumber: 'SACE-8849201',
    moderationDate: '2026-03-04',
    officialAcceptableWindow: `Within 3–7 Working Days Post-Marking (Term ${task.term}, Week ${Math.min(11, task.scheduledWeek + 1)})`,
    stageStatus: 'PENDING_REVIEW',
    sampleSize: 8,
    sampleBreakdown: {
      topLearners: ['Thabo Molefe (88%)', 'Kagiso Ndlovu (84%)', 'Zoe Adams (82%)'],
      middleLearners: ['Aiden Smith (64%)', 'Naledi Khumalo (60%)', 'Liam Pillay (56%)'],
      bottomLearners: ['Sipho Dlamini (42%)', 'Chloe van Zyl (38%)']
    },
    checks: {
      markingConsistency: {
        passed: true,
        comment: 'Marking adhered strictly to the approved memorandum. CA (Consistent Accuracy) rules were applied uniformly across the sample.'
      },
      arithmeticAccuracy: {
        passed: true,
        comment: 'Recalculation of 100% of sample scripts verified: no arithmetic additions or mark transfer discrepancies identified.'
      },
      formativeFeedback: {
        passed: true,
        comment: 'Teacher provided helpful margin annotations and constructive correction guidance on erroneous calculations.'
      },
      markTransferAccuracy: {
        passed: true,
        comment: 'Sample marks matched the electronic record sheet and SA-SAMS capture sheet with 0% error rate.'
      },
      aiUseAudit: {
        passed: true,
        comment: 'Appendix G AI declaration verified against research outputs. No unauthorized AI tool overuse detected.'
      }
    },
    markAdjustmentSuggested: false,
    adjustmentDetails: 'No mark adjustments required. Original teacher marks stand.',
    commonLearnerMisconceptions: [
      'Multi-tier progressive tax bracket calculations (forgetting rebate deduction).',
      'Unit conversion errors between litres, cm³ and m³ in practical dimensioning.'
    ],
    recommendationsForRemediation: [
      'Conduct a 15-minute diagnostic re-teaching hook on tax rebate mechanics.',
      'Provide 2 supplementary practice exercises for borderline candidates.'
    ],
    signatureVerified: true,
    signedAt: '2026-03-04 15:45'
  };
}

const PRE_STORAGE_KEY = 'ai_teacher_pre_moderation_v1';
const POST_STORAGE_KEY = 'ai_teacher_post_moderation_v1';

export function loadPreModerationForms(tasks: AssessmentTask[]): Record<string, PreModerationForm> {
  try {
    const raw = localStorage.getItem(PRE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      tasks.forEach(task => {
        if (!parsed[task.id]) {
          parsed[task.id] = generateDefaultPreModerationForm(task);
        }
      });
      return parsed;
    }
  } catch (e) {
    console.error('Error loading pre-moderation forms', e);
  }

  const initial: Record<string, PreModerationForm> = {};
  tasks.forEach(task => {
    initial[task.id] = generateDefaultPreModerationForm(task);
  });
  return initial;
}

export function savePreModerationForms(data: Record<string, PreModerationForm>): void {
  try {
    localStorage.setItem(PRE_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving pre-moderation forms', e);
  }
}

export function getPreModerationFormForTask(task: AssessmentTask): PreModerationForm {
  try {
    const raw = localStorage.getItem(PRE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed[task.id]) {
        return parsed[task.id];
      }
    }
  } catch (e) {
    console.error('Error fetching pre-moderation form', e);
  }
  return generateDefaultPreModerationForm(task);
}

export function savePreModerationForm(form: PreModerationForm): void {
  try {
    const raw = localStorage.getItem(PRE_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[form.taskId] = form;
    localStorage.setItem(PRE_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving single pre-moderation form', e);
  }
}

export function loadPostModerationForms(tasks: AssessmentTask[]): Record<string, PostModerationForm> {
  try {
    const raw = localStorage.getItem(POST_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      tasks.forEach(task => {
        if (!parsed[task.id]) {
          parsed[task.id] = generateDefaultPostModerationForm(task);
        }
      });
      return parsed;
    }
  } catch (e) {
    console.error('Error loading post-moderation forms', e);
  }

  const initial: Record<string, PostModerationForm> = {};
  tasks.forEach(task => {
    initial[task.id] = generateDefaultPostModerationForm(task);
  });
  return initial;
}

export function savePostModerationForms(data: Record<string, PostModerationForm>): void {
  try {
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving post-moderation forms', e);
  }
}

export function getPostModerationFormForTask(task: AssessmentTask): PostModerationForm {
  try {
    const raw = localStorage.getItem(POST_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed[task.id]) {
        return parsed[task.id];
      }
    }
  } catch (e) {
    console.error('Error fetching post-moderation form', e);
  }
  return generateDefaultPostModerationForm(task);
}

export function savePostModerationForm(form: PostModerationForm): void {
  try {
    const raw = localStorage.getItem(POST_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[form.taskId] = form;
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving single post-moderation form', e);
  }
}

export function getModerationAlertForTask(task: AssessmentTask, currentWeek: number): {
  isPreModDue: boolean;
  isPostModDue: boolean;
  alertText: string;
} {
  const preDueWeek = Math.max(1, task.scheduledWeek - 2);
  const postDueWeek = Math.min(11, task.scheduledWeek + 1);

  const isPreModDue = currentWeek >= preDueWeek && currentWeek <= task.scheduledWeek;
  const isPostModDue = currentWeek >= task.scheduledWeek && currentWeek <= postDueWeek;

  let alertText = '';
  if (isPreModDue) {
    alertText = `Pre-Moderation Due: Complete formal paper audit (Target: Week ${preDueWeek})`;
  } else if (isPostModDue) {
    alertText = `Post-Moderation Due: Conduct 10% sample audit (Target: Week ${postDueWeek})`;
  }

  return {
    isPreModDue,
    isPostModDue,
    alertText
  };
}
