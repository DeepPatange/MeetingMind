// Type definitions for analyzed meeting data

export interface MeetingTask {
  task: string;
  owner?: string;
  dueDate?: string;
}

export interface MeetingDecision {
  decision: string;
  rationale?: string;
}

export interface MeetingQuestion {
  question: string;
  context?: string;
}

export interface MeetingInsight {
  insight: string;
  category?: string;
}

export interface MeetingDeadline {
  deadline: string;
  date?: string;
}

export interface MeetingAttendee {
  name: string;
  role?: string;
}

export interface MeetingFollowUp {
  followUp: string;
  assignee?: string;
}

export interface MeetingRisk {
  risk: string;
  severity?: string;
}

export type MeetingAgendaItem = string | {
  item: string;
  duration?: string;
}

export interface AnalyzedMeetingData {
  'Meeting Name'?: string;
  'Description'?: string;
  'Summary'?: string;
  'Tasks'?: MeetingTask[];
  'Decisions'?: MeetingDecision[];
  'Questions'?: MeetingQuestion[];
  'Insights'?: MeetingInsight[];
  'Deadlines'?: MeetingDeadline[];
  'Attendees'?: MeetingAttendee[];
  'Follow-ups'?: MeetingFollowUp[];
  'Risks'?: MeetingRisk[];
  'Agenda'?: MeetingAgendaItem[];
}
